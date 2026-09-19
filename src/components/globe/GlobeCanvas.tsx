"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { Zap, Droplets, Plane, Server } from "lucide-react";
import type { DataSourceMeta } from "@/types/infrastructure";
import { useIsMobile } from "@/hooks/useIsMobile";

export interface HotspotLocation {
  id: string;
  name: string;
  category: "elektrik" | "su" | "ulasim" | "datacenter";
  type: string;
  capacity: string;
  country: string;
  status: "operational" | "construction" | "offline";
  owner: string;
  flagEmoji: string;
  lat: number;
  lng: number;
  coordinates: string;
  completionYear?: string;
  investment?: string;
  description?: string;
  tags?: string[];
  dataMeta?: DataSourceMeta;
}

export const REAL_LOCATIONS: HotspotLocation[] = [
  // ── ELEKTRİK (Electricity) ──
  {
    id: "akkuyu",
    name: "Akkuyu Nükleer Güç Santralı",
    category: "elektrik",
    type: "Nükleer Elektrik",
    capacity: "4,800 MW",
    country: "Türkiye (Mersin)",
    status: "construction",
    owner: "Akkuyu Nükleer A.Ş.",
    flagEmoji: "🇹🇷",
    lat: 36.1444,
    lng: 33.5411,
    coordinates: "36.1444° N, 33.5411° E",
    completionYear: "2025",
    investment: "$20 Milyar",
    description: "Türkiye'nin ilk nükleer güç santral projesi. Akdeniz kıyısında 4 reaktör ile ülkenin elektrik ihtiyacının %10'unu sağlayacak.",
    tags: ["Elektrik", "Nükleer", "Mersin", "Akdeniz"],
  },
  {
    id: "karapinar-ges",
    name: "Karapınar YEKA Güneş Santralı",
    category: "elektrik",
    type: "Güneş Elektrik (GES)",
    capacity: "1,350 MW",
    country: "Türkiye (Konya)",
    status: "operational",
    owner: "Kalyon Enerji",
    flagEmoji: "🇹🇷",
    lat: 37.7125,
    lng: 33.5500,
    coordinates: "37.7125° N, 33.5500° E",
    completionYear: "2023",
    investment: "$1 Milyar",
    description: "Avrupa'nın ve Türkiye'nin tek alandaki en büyük güneş enerjisi santrali. 3.5 milyon panelle 2 milyon haneye temiz elektrik sağlıyor.",
    tags: ["Elektrik", "Güneş GES", "Konya", "Temiz Enerji"],
  },
  {
    id: "soma-tes",
    name: "Soma Termik Santralı",
    category: "elektrik",
    type: "Linyit Termik Santral",
    capacity: "1,035 MW",
    country: "Türkiye (Manisa)",
    status: "operational",
    owner: "Anadolu Birlik",
    flagEmoji: "🇹🇷",
    lat: 39.1833,
    lng: 27.6000,
    coordinates: "39.1833° N, 27.6000° E",
    completionYear: "1981",
    investment: "$1.5 Milyar",
    description: "Ege bölgesinin önemli taban yük elektrik üretim tesislerinden biri.",
    tags: ["Elektrik", "Termik", "Manisa", "Şebeke"],
  },
  {
    id: "ataturk-baraji",
    name: "Atatürk Barajı & Su Deposu",
    category: "su",
    type: "Baraj & Tatlı Su Rezervuarı",
    capacity: "48.7 Milyar m³ Su / 2,400 MW HES",
    country: "Türkiye (Şanlıurfa)",
    status: "operational",
    owner: "DSİ / EÜAŞ",
    flagEmoji: "🇹🇷",
    lat: 37.4819,
    lng: 38.3183,
    coordinates: "37.4819° N, 38.3183° E",
    completionYear: "1992",
    investment: "$4 Milyar",
    description: "Güneydoğu Anadolu Projesi'nin (GAP) kalbi. Fırat Nehri üzerinde kurulu olup Türkiye'nin en büyük tatlı su ve hidroelektrik kaynağıdır.",
    tags: ["Su", "Baraj", "GAP", "Fırat", "Hidroelektrik"],
  },
  {
    id: "turkcell-gebze-dc",
    name: "Turkcell Gebze Veri Merkezi",
    category: "datacenter",
    type: "Tier III & Hyperscale DC",
    capacity: "33,000 m² / 10,000 Sunucu Kabini",
    country: "Türkiye (Kocaeli)",
    status: "operational",
    owner: "Turkcell",
    flagEmoji: "🇹🇷",
    lat: 40.8027,
    lng: 29.4307,
    coordinates: "40.8027° N, 29.4307° E",
    completionYear: "2016",
    investment: "$300 Milyon",
    description: "Türkiye'nin en büyük veri merkezlerinden biri. Doğu Akdeniz'in veri ve bulut omurgası.",
    tags: ["Veri Merkezi", "Cloud", "Tier III", "Gebze"],
  },
  {
    id: "equinix-frankfurt",
    name: "Equinix FR5 Frankfurt Campus",
    category: "datacenter",
    type: "DE-CIX Internet Exchange Hub",
    capacity: "14,000 m² / 50 MW Bilişim Gücü",
    country: "Almanya (Frankfurt)",
    status: "operational",
    owner: "Equinix",
    flagEmoji: "🇩🇪",
    lat: 50.1109,
    lng: 8.6821,
    coordinates: "50.1109° N, 8.6821° E",
    completionYear: "2019",
    investment: "$450 Milyon",
    description: "Avrupa kıtasının en yoğun internet trafiğini taşıyan DE-CIX omurga tesislerinden biri.",
    tags: ["Veri Merkezi", "Internet Exchange", "Avrupa", "AI Compute"],
  },
];

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

/* ── WebGL 3D Point Cloud for 3,160+ Infrastructure Facilities ────────── */
function InfrastructurePointCloud({ locations }: { locations: HotspotLocation[] }) {
  const [positions, colors] = useMemo(() => {
    const p = new Float32Array(locations.length * 3);
    const c = new Float32Array(locations.length * 3);

    locations.forEach((loc, i) => {
      const v = latLngToVector3(loc.lat, loc.lng, 1.008);
      p[i * 3] = v.x;
      p[i * 3 + 1] = v.y;
      p[i * 3 + 2] = v.z;

      // High-contrast luminous colors
      if (loc.category === "su") {
        c[i * 3] = 0.0; c[i * 3 + 1] = 0.95; c[i * 3 + 2] = 1.0; // Electric Cyan
      } else if (loc.category === "datacenter") {
        c[i * 3] = 0.2; c[i * 3 + 1] = 0.95; c[i * 3 + 2] = 0.5; // Emerald Green
      } else if (loc.category === "ulasim") {
        c[i * 3] = 0.85; c[i * 3 + 1] = 0.45; c[i * 3 + 2] = 1.0; // Neon Violet
      } else if (loc.type.includes("Güneş") || loc.type.includes("Solar")) {
        c[i * 3] = 1.0; c[i * 3 + 1] = 0.85; c[i * 3 + 2] = 0.2; // Amber Gold
      } else if (loc.type.includes("Nükleer") || loc.type.includes("Nuclear")) {
        c[i * 3] = 0.9; c[i * 3 + 1] = 0.3; c[i * 3 + 2] = 1.0; // Purple
      } else {
        c[i * 3] = 0.3; c[i * 3 + 1] = 0.85; c[i * 3 + 2] = 0.4; // Green
      }
    });

    return [p, c];
  }, [locations]);

  if (locations.length === 0) return null;

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.024}
        vertexColors
        transparent
        opacity={0.92}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ── Preload Earth Texture ────────────────────────────────────────────── */
try {
  useTexture.preload("/textures/earth-blue-marble.jpg");
} catch {}

/* ── Fallback Globe while Texture Loads (Deep Obsidian Sapphire) ──────── */
function EarthLoadingFallback() {
  return (
    <group>
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color="#0d1b2a"
          roughness={0.65}
          metalness={0.15}
        />
      </mesh>
      {/* Subtle Atmospheric Halo Glow */}
      <mesh scale={1.022}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.12}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

/* ── Verified NASA Blue Marble Earth Texture Loader ───────────────────── */
function NASAEarthGlobe({
  locations,
  activeFilter,
  selectedId,
  onSelectAsset,
  settings,
}: {
  locations: HotspotLocation[];
  activeFilter: string;
  selectedId: string | null;
  onSelectAsset: (loc: HotspotLocation | null) => void;
  settings?: {
    quality: "ultra" | "high" | "performance";
    autoRotate: boolean;
    showAtmosphere: boolean;
    refreshInterval: string;
  };
}) {
  const earthGroupRef = useRef<THREE.Group>(null!);
  const isMobile = useIsMobile();

  // Suspense-powered reliable texture loader
  const earthTexture = useTexture("/textures/earth-blue-marble.jpg");
  earthTexture.colorSpace = THREE.SRGBColorSpace;

  const autoRotateEnabled = settings ? settings.autoRotate : true;
  const showAtmosphereEnabled = settings ? settings.showAtmosphere : true;
  const quality = settings ? settings.quality : "high";

  useFrame((state) => {
    if (earthGroupRef.current && autoRotateEnabled) {
      earthGroupRef.current.rotation.y = state.clock.getElapsedTime() * 0.012;
    }
  });

  const filtered = useMemo(() => {
    if (activeFilter === "all") return locations;
    return locations.filter((l) => l.category === activeFilter);
  }, [locations, activeFilter]);

  // Featured pins for interactive inspection (clean limit on mobile for compositor performance)
  const featuredLocations = useMemo(() => {
    const selectedLoc = locations.find((l) => l.id === selectedId);
    const topList = filtered.slice(0, isMobile ? 8 : 35);
    if (selectedLoc && !topList.some((l) => l.id === selectedLoc.id)) {
      return [...topList, selectedLoc];
    }
    return topList;
  }, [filtered, locations, selectedId, isMobile]);

  const meshSegments = useMemo(() => {
    if (quality === "ultra") return isMobile ? 64 : 128;
    if (quality === "high") return isMobile ? 48 : 96;
    return isMobile ? 32 : 64;
  }, [quality, isMobile]);

  return (
    <group ref={earthGroupRef}>
      {/* 3D Earth Mesh with Photorealistic NASA Blue Marble */}
      <mesh>
        <sphereGeometry args={[1, meshSegments, meshSegments]} />
        <meshStandardMaterial
          map={earthTexture}
          roughness={0.55}
          metalness={0.06}
        />
      </mesh>

      {/* Atmospheric Halo Glow (Real-time toggleable, depthWrite: false ensures it NEVER occludes Earth) */}
      {showAtmosphereEnabled && (
        <mesh scale={1.022}>
          <sphereGeometry args={[1, isMobile ? 32 : 64, isMobile ? 32 : 64]} />
          <meshBasicMaterial
            color="#38bdf8"
            transparent
            opacity={0.12}
            side={THREE.BackSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* 3,160+ Points Point Cloud */}
      <InfrastructurePointCloud locations={filtered} />

      {/* Featured Interactive Pins */}
      {featuredLocations.map((loc) => (
        <HotspotMarker
          key={loc.id}
          location={loc}
          activeFilter={activeFilter}
          selectedId={selectedId}
          onSelect={onSelectAsset}
        />
      ))}
    </group>
  );
}

/* ── Sleek Proximity-Scaled Pin ───────────────────────────────────────── */
function HotspotMarker({
  location,
  activeFilter,
  selectedId,
  onSelect,
}: {
  location: HotspotLocation;
  activeFilter: string;
  selectedId: string | null;
  onSelect: (loc: HotspotLocation | null) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const { camera } = useThree();
  const groupRef = useRef<THREE.Group>(null!);

  const position = useMemo(
    () => latLngToVector3(location.lat, location.lng, 1.014),
    [location.lat, location.lng]
  );

  const worldPos = useMemo(() => new THREE.Vector3(), []);
  const normalVec = useMemo(() => new THREE.Vector3(), []);
  const camDir = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    if (!groupRef.current) return;

    groupRef.current.getWorldPosition(worldPos);

    // Backface culling
    normalVec.copy(worldPos).normalize();
    camDir.copy(camera.position).sub(worldPos).normalize();
    const dot = normalVec.dot(camDir);

    if (dot < 0.12) {
      groupRef.current.visible = false;
      return;
    }
    groupRef.current.visible = true;

    // Zoom-in shrinking to prevent overlap
    const dist = camera.position.distanceTo(worldPos);
    const dynamicScale = THREE.MathUtils.clamp((dist - 1.2) * 0.18 + 0.16, 0.20, 0.65);
    groupRef.current.scale.setScalar(dynamicScale);
  });

  if (activeFilter !== "all" && location.category !== activeFilter) {
    return null;
  }

  const isWater = location.category === "su";
  const isTransport = location.category === "ulasim";
  const isDatacenter = location.category === "datacenter";
  const isSelected = selectedId === location.id;

  let IconComponent = Zap;
  let colorTheme = "border-amber-400 bg-amber-950/95 text-amber-300";

  if (isWater) {
    IconComponent = Droplets;
    colorTheme = "border-cyan-400 bg-cyan-950/95 text-cyan-300";
  } else if (isTransport) {
    IconComponent = Plane;
    colorTheme = "border-purple-400 bg-purple-950/95 text-purple-300";
  } else if (isDatacenter) {
    IconComponent = Server;
    colorTheme = "border-emerald-400 bg-emerald-950/95 text-emerald-300";
  }

  return (
    <group ref={groupRef} position={position}>
      {/* Surface Laser Beam */}
      <line>
        <bufferGeometry
          attach="geometry"
          {...new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(0, 0, 0.035),
          ])}
        />
        <lineBasicMaterial
          attach="material"
          color={isWater ? "#00f0ff" : "#f59e0b"}
          transparent
          opacity={0.5}
        />
      </line>

      {/* Floating Micro HTML Pin */}
      <Html sprite transform distanceFactor={2.2} zIndexRange={[100, 0]} center>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="relative pointer-events-auto flex flex-col items-center select-none"
        >
          {/* Tooltip on Hover */}
          {hovered && !isSelected && (
            <div className="absolute bottom-full mb-1.5 px-3 py-1 rounded-xl border border-[#faebd7]/30 bg-[#090a0f]/95 backdrop-blur-xl text-white shadow-2xl pointer-events-none flex items-center gap-2 whitespace-nowrap z-50 text-[11px] font-bold">
              <span className="truncate max-w-[160px] text-[#fcf8ee]">{location.name}</span>
              <span className="text-cyan-400 font-mono text-[9.5px]">({location.capacity})</span>
            </div>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(isSelected ? null : location);
            }}
            className={`cursor-pointer transition-all duration-200 flex h-4 w-4 items-center justify-center rounded-full shadow-xl border backdrop-blur-md ${colorTheme} ${
              isSelected
                ? "ring-2 ring-cyan-400 scale-125 z-50 opacity-100 bg-cyan-600 text-white"
                : hovered
                ? "scale-120 opacity-100 ring-1 ring-white/60"
                : "opacity-85 hover:opacity-100"
            }`}
          >
            <IconComponent className="h-2 w-2" />
          </button>
        </div>
      </Html>
    </group>
  );
}

function StarField() {
  const starsRef = useRef<THREE.Points>(null!);

  const [pos, cols] = useMemo(() => {
    const count = 5000;
    const p = new Float32Array(count * 3);
    const c = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      if (i < 3000) {
        // Wide celestial background plane covering the entire camera frustum including far-left sidebar
        p[i * 3]     = (Math.random() - 0.5) * 36; // -18 to +18 covers full wide screen
        p[i * 3 + 1] = (Math.random() - 0.5) * 24; // -12 to +12
        p[i * 3 + 2] = -3 - Math.random() * 25;    // behind earth
      } else {
        // Spherical surrounding cosmos
        const r = 8 + Math.random() * 32;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        p[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
        p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        p[i * 3 + 2] = r * Math.cos(phi);
      }

      // Star Color Palette: Pure Diamond White (75%), Golden Supernova (18%), Celestial Cyan (7%)
      const rand = Math.random();
      if (rand < 0.75) {
        c[i * 3] = 1.0; c[i * 3 + 1] = 1.0; c[i * 3 + 2] = 1.0; // Pure brilliant white
      } else if (rand < 0.93) {
        c[i * 3] = 1.0; c[i * 3 + 1] = 0.88; c[i * 3 + 2] = 0.45; // Golden Supernova
      } else {
        c[i * 3] = 0.65; c[i * 3 + 1] = 0.92; c[i * 3 + 2] = 1.0; // Celestial Cyan
      }
    }
    return [p, c];
  }, []);

  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.y = state.clock.getElapsedTime() * 0.0016;
    }
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[pos, 3]} />
        <bufferAttribute attach="attributes-color" args={[cols, 3]} />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        size={0.046}
        sizeAttenuation
        transparent
        opacity={0.96}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export function GlobeCanvas({
  locations = REAL_LOCATIONS,
  activeFilter = "all",
  selectedAsset,
  onSelectAsset,
  lang = "tr",
}: {
  locations?: HotspotLocation[];
  activeFilter?: string;
  selectedAsset?: HotspotLocation | null;
  onSelectAsset?: (location: HotspotLocation | null) => void;
  lang?: "tr" | "en";
}) {
  const isMobile = useIsMobile();

  const [globeSettings, setGlobeSettings] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("dona_radar_settings");
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return {
      quality: "high" as const,
      autoRotate: true,
      showAtmosphere: true,
      refreshInterval: "10",
    };
  });

  useEffect(() => {
    const handleSettingsChange = (e: any) => {
      if (e.detail) {
        setGlobeSettings(e.detail);
      }
    };
    window.addEventListener("dona:settings-change", handleSettingsChange);
    return () => window.removeEventListener("dona:settings-change", handleSettingsChange);
  }, []);

  const dprRange: [number, number] = useMemo(() => {
    if (globeSettings.quality === "ultra") return isMobile ? [1, 2.0] : [1, 2.5];
    if (globeSettings.quality === "high") return isMobile ? [1, 1.5] : [1, 1.75];
    return [1, 1.0]; // eco performance
  }, [globeSettings.quality, isMobile]);

  return (
    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden" style={{ background: "#07080e" }}>
      <Canvas
        camera={{ position: [0, 0, isMobile ? 3.4 : 2.9], fov: isMobile ? 50 : 45 }}
        dpr={dprRange}
        gl={{
          antialias: globeSettings.quality !== "performance" && !isMobile,
          alpha: false,
          powerPreference: "high-performance",
          preserveDrawingBuffer: false,
        }}
        onCreated={({ gl, scene }) => {
          gl.setClearColor(0x07080e, 1);
          scene.background = new THREE.Color(0x07080e);
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.05;
        }}
      >
        {/* Calibrated Studio Cinematic Lighting — rich contrast, zero white blowout */}
        <ambientLight intensity={0.75} color="#dbeafe" />
        <directionalLight position={[5, 3.5, 5]} intensity={1.45} color="#fffcf2" />
        <directionalLight position={[-5, -2, -4]} intensity={0.5} color="#38bdf8" />
        <hemisphereLight groundColor="#07080e" color="#60a5fa" intensity={0.35} />
        
        <StarField />
        <React.Suspense fallback={<EarthLoadingFallback />}>
          <NASAEarthGlobe
            locations={locations}
            activeFilter={activeFilter}
            selectedId={selectedAsset ? selectedAsset.id : null}
            onSelectAsset={onSelectAsset || (() => {})}
            settings={globeSettings}
          />
        </React.Suspense>
        
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          zoomSpeed={isMobile ? 0.55 : 0.75}
          rotateSpeed={isMobile ? 0.45 : 0.55}
          minDistance={isMobile ? 1.6 : 1.45}
          maxDistance={isMobile ? 5.5 : 4.2}
          enableDamping={true}
          dampingFactor={0.05}
          autoRotate={false}
          touches={{
            ONE: THREE.TOUCH.ROTATE,
            TWO: THREE.TOUCH.DOLLY_ROTATE,
          }}
        />
      </Canvas>
    </div>
  );
}
