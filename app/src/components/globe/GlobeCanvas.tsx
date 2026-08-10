"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import { Zap, Droplets, X, MapPin, Building2, Calendar, TrendingUp, Plane, Server } from "lucide-react";
import { DataBadge } from "@/components/ui/DataBadge";
import type { DataSourceMeta } from "@/types/infrastructure";

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
    id: "noor-abu-dhabi",
    name: "Noor Abu Dhabi Solar",
    category: "elektrik",
    type: "Güneş Elektrik",
    capacity: "1,177 MW",
    country: "Birleşik Arap Emirlikleri",
    status: "operational",
    owner: "TAQA",
    flagEmoji: "🇦🇪",
    lat: 24.2422,
    lng: 54.6478,
    coordinates: "24.2422° N, 54.6478° E",
    completionYear: "2019",
    investment: "$870 Milyon",
    description: "Ortadoğu'nun devasa güneş santrallerinden biri. Abu Dabi elektrik şebekesini besler.",
    tags: ["Elektrik", "Solar", "Ortadoğu"],
  },

  // ── SU (Water) ──
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
    description: "Türkiye'nin en büyük tatlı su rezervuarı ve GAP sulama projelerinin merkezi su kaynağı.",
    tags: ["Su Kaynağı", "Baraj", "GAP Sulama", "Şanlıurfa"],
  },
  {
    id: "keban-baraji",
    name: "Keban Barajı & Su Havzası",
    category: "su",
    type: "Tatlı Su Rezervuarı",
    capacity: "31 Milyar m³ Su / 1,330 MW HES",
    country: "Türkiye (Elazığ)",
    status: "operational",
    owner: "DSİ",
    flagEmoji: "🇹🇷",
    lat: 38.8000,
    lng: 38.7500,
    coordinates: "38.8000° N, 38.7500° E",
    completionYear: "1975",
    investment: "$1.2 Milyar",
    description: "Doğu Anadolu bölgesinin en büyük su toplama havzası ve elektrik üretim noktası.",
    tags: ["Su Havzası", "Baraj", "Elazığ", "Fırat"],
  },
  {
    id: "melen-su-hatti",
    name: "Melen Su İsale Hattı & Barajı",
    category: "su",
    type: "İçme Suyu Hattı",
    capacity: "1.07 Milyar m³/Yıl",
    country: "Türkiye (Düzce / İstanbul)",
    status: "operational",
    owner: "İSKİ / DSİ",
    flagEmoji: "🇹🇷",
    lat: 41.0833,
    lng: 30.9500,
    coordinates: "41.0833° N, 30.9500° E",
    completionYear: "2014",
    investment: "$1.5 Milyar",
    description: "İstanbul'un yıllık içme ve kullanma suyu ihtiyacının %60'ından fazlasını sağlayan kritik su iletim projesi.",
    tags: ["İçme Suyu", "İstanbul", "Su Hattı", "İSKİ"],
  },

  // ── ULAŞIM & DATACENTER ──
  {
    id: "istanbul-igb",
    name: "İstanbul Havalimanı (IST)",
    category: "ulasim",
    type: "Ulaşım Hub'ı",
    capacity: "200M Yolcu/Yıl",
    country: "Türkiye (İstanbul)",
    status: "operational",
    owner: "İGA",
    flagEmoji: "🇹🇷",
    lat: 41.2753,
    lng: 28.7519,
    coordinates: "41.2753° N, 28.7519° E",
    completionYear: "2018",
    investment: "$10.2 Milyar",
    description: "Dünyanın en büyük havalimanı terminallerinden biri ve Kıtalararası lojistik merkezi.",
    tags: ["Havalimanı", "Lojistik", "İstanbul"],
  },
  {
    id: "huaian-datacenter",
    name: "Huai'an Yapay Zeka Veri Merkezi",
    category: "datacenter",
    type: "Veri Merkezi Kümesi",
    capacity: "600 MW",
    country: "Çin",
    status: "construction",
    owner: "Alibaba Cloud",
    flagEmoji: "🇨🇳",
    lat: 33.5800,
    lng: 119.0200,
    coordinates: "33.5800° N, 119.0200° E",
    completionYear: "2025",
    investment: "$1.2 Milyar",
    description: "Yapay zeka modellerinin eğitimi ve bulut hesaplama için tasarlanmış yeşil veri merkezi.",
    tags: ["Data Center", "AI Compute", "Çin"],
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

/* ── WebGL 3D Point Cloud for 35,000+ Power Plants ───────────────────── */
function PowerPlantsPointCloud({ locations }: { locations: HotspotLocation[] }) {
  const [positions, colors] = useMemo(() => {
    const p = new Float32Array(locations.length * 3);
    const c = new Float32Array(locations.length * 3);

    locations.forEach((loc, i) => {
      const v = latLngToVector3(loc.lat, loc.lng, 1.008);
      p[i * 3] = v.x;
      p[i * 3 + 1] = v.y;
      p[i * 3 + 2] = v.z;

      // Color by category/type
      if (loc.category === "su") {
        c[i * 3] = 0.22; c[i * 3 + 1] = 0.74; c[i * 3 + 2] = 0.97; // Sky blue
      } else if (loc.type.includes("Güneş") || loc.type.includes("Solar")) {
        c[i * 3] = 0.98; c[i * 3 + 1] = 0.8; c[i * 3 + 2] = 0.08; // Amber
      } else if (loc.type.includes("Nükleer") || loc.type.includes("Nuclear")) {
        c[i * 3] = 0.66; c[i * 3 + 1] = 0.33; c[i * 3 + 2] = 0.97; // Purple
      } else {
        c[i * 3] = 0.2; c[i * 3 + 1] = 0.8; c[i * 3 + 2] = 0.4; // Emerald
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
        size={0.02}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
      />
    </points>
  );
}

/* ── Real Photorealistic NASA Blue Marble Earth Texture Loader ─────────── */
function PhotorealisticNASAEarthMesh({
  locations,
  activeFilter,
  selectedId,
  onSelectAsset,
  lang,
}: {
  locations: HotspotLocation[];
  activeFilter: string;
  selectedId: string | null;
  onSelectAsset: (loc: HotspotLocation | null) => void;
  lang: "tr" | "en";
}) {
  const earthGroupRef = useRef<THREE.Group>(null!);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin("anonymous");
    loader.load(
      "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg",
      (loadedTexture) => {
        loadedTexture.colorSpace = THREE.SRGBColorSpace;
        setTexture(loadedTexture);
      },
      undefined,
      (err) => {
        console.warn("NASA texture load error fallback", err);
      }
    );
  }, []);

  useFrame((state) => {
    if (earthGroupRef.current) {
      earthGroupRef.current.rotation.y = state.clock.getElapsedTime() * 0.015;
    }
  });

  // Filtered locations
  const filtered = useMemo(() => {
    if (activeFilter === "all") return locations;
    return locations.filter(l => l.category === activeFilter);
  }, [locations, activeFilter]);

  // Featured locations get interactive HTML badges (limit to top 40 for clean UI)
  const featuredLocations = useMemo(() => {
    const selectedLoc = locations.find(l => l.id === selectedId);
    const topList = filtered.slice(0, 35);
    if (selectedLoc && !topList.some(l => l.id === selectedLoc.id)) {
      return [...topList, selectedLoc];
    }
    return topList;
  }, [filtered, locations, selectedId]);

  return (
    <group ref={earthGroupRef}>
      {/* 3D Globe Sphere */}
      <mesh>
        <sphereGeometry args={[1, 128, 128]} />
        {texture ? (
          <meshStandardMaterial
            map={texture}
            roughness={0.6}
            metalness={0.1}
          />
        ) : (
          <meshPhongMaterial color="#0c2340" emissive="#061224" />
        )}
      </mesh>

      {/* Atmosphere Glow */}
      <mesh scale={1.025}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.12}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 3D WebGL Point Cloud for thousands of Power Plants */}
      <PowerPlantsPointCloud locations={filtered} />

      {/* Interactive Floating Micro Markers (Locked to rotation) */}
      {featuredLocations.map((loc) => (
        <HotspotMarker
          key={loc.id}
          location={loc}
          activeFilter={activeFilter}
          selectedId={selectedId}
          onSelect={onSelectAsset}
          lang={lang}
        />
      ))}
    </group>
  );
}

/* ── Sleek High-Tech Micro HTML Pin Badge (Dynamic Camera Distance Scaled) ── */
function HotspotMarker({
  location,
  activeFilter,
  selectedId,
  onSelect,
  lang,
}: {
  location: HotspotLocation;
  activeFilter: string;
  selectedId: string | null;
  onSelect: (loc: HotspotLocation | null) => void;
  lang: "tr" | "en";
}) {
  const [hovered, setHovered] = useState(false);
  const { camera } = useThree();
  const groupRef = useRef<THREE.Group>(null!);
  const [scale, setScale] = useState(1);

  const position = useMemo(() => latLngToVector3(location.lat, location.lng, 1.015), [location.lat, location.lng]);

  useFrame(() => {
    if (groupRef.current) {
      const worldPos = new THREE.Vector3();
      groupRef.current.getWorldPosition(worldPos);
      const dist = camera.position.distanceTo(worldPos);
      // Zoom IN (dist ~ 1.6 => scale ~ 0.48), Zoom OUT (dist ~ 4.5 => scale ~ 1.35)
      const computedScale = THREE.MathUtils.clamp(dist * 0.3, 0.45, 1.35);
      setScale(computedScale);
    }
  });

  if (activeFilter !== "all" && location.category !== activeFilter) {
    return null;
  }

  const isWater = location.category === "su";
  const isTransport = location.category === "ulasim";
  const isDatacenter = location.category === "datacenter";
  const isSelected = selectedId === location.id;

  let IconComponent = Zap;
  let borderClass = "border-amber-500/50 bg-amber-950/90 text-amber-300";

  if (isWater) {
    IconComponent = Droplets;
    borderClass = "border-sky-500/50 bg-sky-950/90 text-sky-300";
  } else if (isTransport) {
    IconComponent = Plane;
    borderClass = "border-purple-500/50 bg-purple-950/90 text-purple-300";
  } else if (isDatacenter) {
    IconComponent = Server;
    borderClass = "border-emerald-500/50 bg-emerald-950/90 text-emerald-300";
  }

  return (
    <group ref={groupRef} position={position} scale={[scale, scale, scale]}>
      {/* Laser point line down to surface */}
      <line>
        <bufferGeometry attach="geometry" {...new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0,0,0), new THREE.Vector3(0,0,0.04)])} />
        <lineBasicMaterial attach="material" color={isWater ? "#38bdf8" : "#f59e0b"} transparent opacity={0.6} />
      </line>

      {/* Sleek High-Tech Floating Micro HTML Pin */}
      <Html sprite transform distanceFactor={2.5} zIndexRange={[100, 0]} center>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="relative pointer-events-auto flex flex-col items-center select-none"
        >
          {/* Micro Compact Tooltip on Hover */}
          {hovered && !isSelected && (
            <div className="absolute bottom-full mb-1 px-2 py-0.5 rounded-lg border border-blue-500/40 bg-slate-950/90 backdrop-blur-md text-white shadow-xl pointer-events-none flex items-center gap-1 whitespace-nowrap z-50 text-[10px] font-bold">
              <span className="truncate max-w-[120px]">{location.name}</span>
              <span className="text-emerald-400 text-[9px] font-mono">({location.capacity})</span>
            </div>
          )}

          {/* Micro Pin Dot Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(isSelected ? null : location);
            }}
            className={`cursor-pointer transition-all duration-200 flex h-4 w-4 items-center justify-center rounded-full shadow-xl backdrop-blur-md border ${borderClass} ${
              isSelected ? "ring-2 ring-blue-500 scale-125 z-50 opacity-100 bg-blue-600 text-white" : hovered ? "scale-110 opacity-100" : "opacity-80"
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
  const [pos] = useMemo(() => {
    const count = 1200;
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3]     = (Math.random() - 0.5) * 40;
      p[i * 3 + 1] = (Math.random() - 0.5) * 40;
      p[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    return [p];
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[pos, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#93c5fd" size={0.015} transparent opacity={0.4} />
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
  return (
    <div className="absolute inset-0 w-full h-full z-0">
      <Canvas
        camera={{ position: [0, 0, 3.0], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <directionalLight position={[5, 3, 5]} intensity={2.0} />
        <ambientLight intensity={0.5} />
        
        <StarField />
        <PhotorealisticNASAEarthMesh
          locations={locations}
          activeFilter={activeFilter}
          selectedId={selectedAsset ? selectedAsset.id : null}
          onSelectAsset={onSelectAsset || (() => {})}
          lang={lang}
        />
        
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          zoomSpeed={0.8}
          rotateSpeed={0.6}
          minDistance={1.6}
          maxDistance={4.5}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
}
