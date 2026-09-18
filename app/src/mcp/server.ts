import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import fs from "fs/promises";
import path from "path";

// Define the Facility type based on our JSON structure
export interface Facility {
  id: string;
  name: string;
  category: "elektrik" | "su" | "ulasim" | "datacenter" | string;
  type: string;
  capacity: string;
  country: string;
  status: string;
  owner: string;
  flagEmoji: string;
  lat: number;
  lng: number;
  coordinates: string;
  completionYear: string;
  description: string;
  tags: string[];
  dataMeta: {
    sourceName: string;
    license: string;
    lastUpdated: string;
    reliabilityScore: number;
  };
}

// Global cache for facilities data
let facilitiesCache: Facility[] | null = null;

async function loadFacilities(): Promise<Facility[]> {
  if (facilitiesCache) return facilitiesCache;
  
  // Robust multi-path resolution for CLI, IDE, or app root invocation
  const possiblePaths = [
    path.resolve(process.cwd(), "public", "data", "facilities.json"),
    path.resolve(process.cwd(), "app", "public", "data", "facilities.json"),
    path.resolve(process.cwd(), "dona-nova-showcase", "public", "data", "facilities.json"),
    path.resolve(__dirname, "../../public/data/facilities.json"),
    path.resolve(__dirname, "../../../public/data/facilities.json"),
  ];

  for (const candidate of possiblePaths) {
    try {
      const fileContent = await fs.readFile(candidate, "utf-8");
      facilitiesCache = JSON.parse(fileContent);
      if (facilitiesCache && facilitiesCache.length > 0) {
        return facilitiesCache;
      }
    } catch {
      // continue to next path
    }
  }

  console.error("Warning: Could not locate facilities.json in any expected directory.");
  return [];
}

// Create the MCP server instance
const server = new McpServer({
  name: "DonaNova-Infrastructure-Radar-Server",
  version: "1.2.0"
});

// ── Tool 1: Search Facilities ──────────────────────────────────────────
server.tool(
  "search_facilities",
  "Search global infrastructure facilities by country, category, type, or generic keyword.",
  {
    keyword: z.string().optional().describe("A keyword to search in facility name, description, owner, or type."),
    country: z.string().optional().describe("Filter by country name (e.g. 'Türkiye', 'United States', 'Japan', 'Germany')."),
    category: z.enum(["elektrik", "datacenter", "ulasim", "su"]).optional().describe("Filter by infrastructure category."),
    limit: z.number().optional().default(25).describe("Maximum number of results to return (default 25, max 100).")
  },
  async ({ keyword, country, category, limit }) => {
    const facilities = await loadFacilities();
    let filtered = facilities;
    
    if (country) {
      const c = country.toLowerCase();
      filtered = filtered.filter(f => f.country.toLowerCase().includes(c));
    }
    
    if (category) {
      filtered = filtered.filter(f => f.category.toLowerCase() === category.toLowerCase());
    }
    
    if (keyword) {
      const kw = keyword.toLowerCase();
      filtered = filtered.filter(f => 
        f.name.toLowerCase().includes(kw) || 
        f.description.toLowerCase().includes(kw) ||
        f.owner.toLowerCase().includes(kw) ||
        f.type.toLowerCase().includes(kw)
      );
    }
    
    const actualLimit = Math.min(limit || 25, 100);
    const results = filtered.slice(0, actualLimit);
    
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({
            total_matches: filtered.length,
            returned: results.length,
            data: results
          }, null, 2)
        }
      ]
    };
  }
);

// ── Tool 2: Get Facility by ID ──────────────────────────────────────────
server.tool(
  "get_facility_by_id",
  "Get detailed telemetry and verification data for a specific facility by its exact ID.",
  {
    id: z.string().describe("The exact ID of the facility (e.g. 'asset-tr-1001').")
  },
  async ({ id }) => {
    const facilities = await loadFacilities();
    const facility = facilities.find(f => f.id === id);
    
    if (!facility) {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({ error: `Facility with ID '${id}' not found in Dona Nova database.` })
          }
        ],
        isError: true
      };
    }
    
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(facility, null, 2)
        }
      ]
    };
  }
);

// ── Tool 3: Get Global Infrastructure Statistics ───────────────────────
server.tool(
  "get_infrastructure_stats",
  "Get aggregated statistics about the 3,160 verified facilities across categories, types, and top countries.",
  {},
  async () => {
    const facilities = await loadFacilities();
    
    const stats = {
      total_verified_facilities: facilities.length,
      by_category: {} as Record<string, number>,
      by_type: {} as Record<string, number>,
      by_country: {} as Record<string, number>,
      audit_meta: {
        sources: ["World Resources Institute (GPPD)", "ENTSO-E Transparency", "OpenStreetMap", "US EIA"],
        radar_fps: "60 FPS Photorealistic WebGL 3D",
        license: "CC-BY 4.0 / Open Source"
      }
    };
    
    for (const f of facilities) {
      stats.by_category[f.category] = (stats.by_category[f.category] || 0) + 1;
      stats.by_type[f.type] = (stats.by_type[f.type] || 0) + 1;
      stats.by_country[f.country] = (stats.by_country[f.country] || 0) + 1;
    }
    
    // Sort top 12 countries by count
    const topCountries = Object.entries(stats.by_country)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 12)
      .reduce((obj, [key, val]) => {
        obj[key] = val;
        return obj;
      }, {} as Record<string, number>);
      
    stats.by_country = topCountries;
    
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(stats, null, 2)
        }
      ]
    };
  }
);

// ── Tool 4: Query AI Data Centers ──────────────────────────────────────
server.tool(
  "query_ai_datacenters",
  "Query Tier IV and Tier III Hyperscale AI compute data centers globally with capacity metrics.",
  {
    country: z.string().optional().describe("Optional country filter."),
    limit: z.number().optional().default(20).describe("Maximum results (max 50).")
  },
  async ({ country, limit }) => {
    const facilities = await loadFacilities();
    let datacenters = facilities.filter(f => f.category === "datacenter");
    
    if (country) {
      const c = country.toLowerCase();
      datacenters = datacenters.filter(f => f.country.toLowerCase().includes(c));
    }
    
    const actualLimit = Math.min(limit || 20, 50);
    const results = datacenters.slice(0, actualLimit);
    
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({
            total_ai_datacenters: datacenters.length,
            returned: results.length,
            facilities: results
          }, null, 2)
        }
      ]
    };
  }
);

// ── Tool 5: Query Water & Reservoir Networks ───────────────────────────
server.tool(
  "query_water_networks",
  "Query strategic fresh water reservoirs, mega irrigation dams, and desalination plants.",
  {
    type: z.string().optional().describe("Filter by type (e.g. 'Desalinizasyon', 'Rezervuar', 'Baraj')."),
    limit: z.number().optional().default(20).describe("Maximum results (max 50).")
  },
  async ({ type, limit }) => {
    const facilities = await loadFacilities();
    let waterFacilities = facilities.filter(f => f.category === "su");
    
    if (type) {
      const t = type.toLowerCase();
      waterFacilities = waterFacilities.filter(f => f.type.toLowerCase().includes(t));
    }
    
    const actualLimit = Math.min(limit || 20, 50);
    const results = waterFacilities.slice(0, actualLimit);
    
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({
            total_water_facilities: waterFacilities.length,
            returned: results.length,
            facilities: results
          }, null, 2)
        }
      ]
    };
  }
);

// Start the MCP server using stdio transport
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Dona Nova Infrastructure MCP Server v1.2.0 initialized and listening on stdio.");
}

main().catch(console.error);
