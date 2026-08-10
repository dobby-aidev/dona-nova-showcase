/**
 * DONA NOVA — Unified Data API Route
 * 
 * /api/data endpoint'i tüm veri kaynaklarını birleştiren
 * tek giriş noktasıdır.
 * 
 * Örnek istekler:
 *   GET /api/data?type=grid&region=DE
 *   GET /api/data?type=grid&region=CISO&source=eia
 *   GET /api/data?type=plants&country=TR&fuel=solar
 *   GET /api/data?type=carbon&zone=DE
 *   GET /api/data?type=stats
 */

import { NextRequest, NextResponse } from "next/server";
import { fetchEntsoeTotalLoad, fetchEntsoeGenerationMix, ENTSOE_AREAS } from "@/lib/data-sources/entsoe-client";
import { fetchEiaHourlyDemand, EIA_REGIONS } from "@/lib/data-sources/eia-client";
import { fetchCarbonIntensity, fetchPowerBreakdown, powerBreakdownToGridData } from "@/lib/data-sources/electricity-maps-client";
import { fetchGlobalPowerPlants, getCountryCapacitySummary, getGlobalFuelMix } from "@/lib/data-sources/power-plants";
import type { EnergySubtype } from "@/types/infrastructure";

// ─── Route Handler ────────────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  try {
    switch (type) {

      // ── Elektrik Şebeke Verisi ──
      case "grid": {
        const region = searchParams.get("region") ?? "DE";
        const source = searchParams.get("source") ?? "auto";

        let gridData = null;

        if (source === "eia" || (source === "auto" && EIA_REGIONS[region as keyof typeof EIA_REGIONS])) {
          gridData = await fetchEiaHourlyDemand(region);
        }
        
        if (!gridData && source !== "eia") {
          if (ENTSOE_AREAS[region as keyof typeof ENTSOE_AREAS]) {
            gridData = await fetchEntsoeGenerationMix(region as keyof typeof ENTSOE_AREAS);
          }
        }

        if (!gridData) {
          return NextResponse.json(
            { error: `Bölge bulunamadı veya veri alınamadı: ${region}` },
            { status: 404 }
          );
        }

        return NextResponse.json({
          data: gridData,
          meta: {
            source: gridData.source,
            fetchedAt: new Date().toISOString(),
            cacheHit: false,
          },
        });
      }

      // ── Karbon Yoğunluğu ──
      case "carbon": {
        const zone = searchParams.get("zone") ?? "DE";
        
        const [carbon, breakdown] = await Promise.allSettled([
          fetchCarbonIntensity(zone),
          fetchPowerBreakdown(zone),
        ]);

        const carbonData = carbon.status === "fulfilled" ? carbon.value : null;
        const breakdownData = breakdown.status === "fulfilled" && breakdown.value
          ? powerBreakdownToGridData(breakdown.value)
          : null;

        return NextResponse.json({
          data: {
            carbon: carbonData,
            grid: breakdownData,
          },
          meta: {
            source: "electricity_maps",
            fetchedAt: new Date().toISOString(),
            cacheHit: false,
          },
        });
      }

      // ── Global Power Plant Verisi ──
      case "plants": {
        const country = searchParams.get("country")?.toUpperCase();
        const fuel = searchParams.get("fuel") as EnergySubtype | null;
        const minMW = parseInt(searchParams.get("minMW") ?? "0");
        const limit = parseInt(searchParams.get("limit") ?? "500");

        const plants = await fetchGlobalPowerPlants({
          countryCode: country,
          fuelType: fuel ? [fuel] : undefined,
          minCapacityMW: minMW || undefined,
          limit: Math.min(limit, 2000), // Max 2000 per request
        });

        return NextResponse.json({
          data: plants,
          meta: {
            source: "global_power_plant_db",
            fetchedAt: new Date().toISOString(),
            count: plants.length,
          },
        });
      }

      // ── Genel İstatistikler ──
      case "stats": {
        const [countrySummary, fuelMix] = await Promise.allSettled([
          getCountryCapacitySummary(),
          getGlobalFuelMix(),
        ]);

        return NextResponse.json({
          data: {
            countries: countrySummary.status === "fulfilled" ? countrySummary.value.slice(0, 20) : [],
            fuelMix: fuelMix.status === "fulfilled" ? fuelMix.value : [],
          },
          meta: {
            source: "global_power_plant_db",
            fetchedAt: new Date().toISOString(),
          },
        });
      }

      // ── API Bağlantı Testi ──
      case "test": {
        const { testEiaConnection } = await import("@/lib/data-sources/eia-client");
        const { testEntsoeConnection } = await import("@/lib/data-sources/entsoe-client");
        const { testElectricityMapsConnection } = await import("@/lib/data-sources/electricity-maps-client");

        const [eia, entsoe, electricityMaps] = await Promise.allSettled([
          testEiaConnection(),
          testEntsoeConnection(),
          testElectricityMapsConnection(),
        ]);

        return NextResponse.json({
          tests: {
            eia: eia.status === "fulfilled" ? eia.value : { success: false, message: "Test başarısız" },
            entsoe: entsoe.status === "fulfilled" ? entsoe.value : { success: false, message: "Test başarısız" },
            electricityMaps: electricityMaps.status === "fulfilled" ? electricityMaps.value : { success: false, message: "Test başarısız" },
          },
          timestamp: new Date().toISOString(),
        });
      }

      default:
        return NextResponse.json(
          {
            error: "Geçersiz type parametresi",
            validTypes: ["grid", "carbon", "plants", "stats", "test"],
            examples: [
              "/api/data?type=grid&region=DE",
              "/api/data?type=carbon&zone=TR",
              "/api/data?type=plants&country=TR&minMW=100",
              "/api/data?type=stats",
              "/api/data?type=test",
            ],
          },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("[API/data] Beklenmeyen hata:", error);
    return NextResponse.json(
      {
        error: "Sunucu hatası",
        message: error instanceof Error ? error.message : "Bilinmeyen hata",
      },
      { status: 500 }
    );
  }
}

// Cache headers
export const dynamic = "force-dynamic";
export const revalidate = 0;
