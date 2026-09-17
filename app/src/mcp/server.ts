import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import fs from "fs/promises";
import path from "path";

// Define the Facility type based on our JSON structure
interface Facility {
  id: string;
  name: string;
  category: string;
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
  
  // Resolve path to the public data directory from this file's location
  // Path assumes running from app/ directory: src/mcp/server.ts
  const dataPath = path.resolve(process.cwd(), "public", "data", "facilities.json");
  
  try {
    const fileContent = await fs.readFile(dataPath, "utf-8");
    facilitiesCache = JSON.parse(fileContent);
    return facilitiesCache || [];
  } catch (error) {
    console.error("Error loading facilities data:", error);
    return [];
  }
}

// Create the MCP server
const server = new McpServer({
  name: "DonaNova-Infrastructure-Server",
  version: "1.0.0"
});

// Tool: Search facilities
server.tool(
  "search_facilities",
  "Search global infrastructure facilities by country, category, or generic keyword.",
  {
    keyword: z.string().optional().describe("A keyword to search in name, description, or owner."),
    country: z.string().optional().describe("Filter by country name (e.g. 'Türkiye', 'ABD', 'Çin')."),
    category: z.string().optional().describe("Filter by category (e.g. 'elektrik', 'datacenter', 'ulasim', 'su')."),
    limit: z.number().optional().default(20).describe("Maximum number of results to return (default 20, max 100).")
  },
  async ({ keyword, country, category, limit }) => {
    const facilities = await loadFacilities();
    
    let filtered = facilities;
    
    if (country) {
      filtered = filtered.filter(f => f.country.toLowerCase() === country.toLowerCase());
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
    
    const actualLimit = Math.min(limit || 20, 100);
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

// Tool: Get facility by ID
server.tool(
  "get_facility_by_id",
  "Get detailed information about a specific infrastructure facility by its ID.",
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
            text: JSON.stringify({ error: `Facility with ID '${id}' not found.` })
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

// Tool: Get infrastructure statistics
server.tool(
  "get_infrastructure_stats",
  "Get aggregate statistics about the global infrastructure dataset.",
  {},
  async () => {
    const facilities = await loadFacilities();
    
    const stats = {
      total_facilities: facilities.length,
      by_category: {} as Record<string, number>,
      by_country: {} as Record<string, number>
    };
    
    for (const f of facilities) {
      stats.by_category[f.category] = (stats.by_category[f.category] || 0) + 1;
      stats.by_country[f.country] = (stats.by_country[f.country] || 0) + 1;
    }
    
    // Sort countries by count (top 10)
    const topCountries = Object.entries(stats.by_country)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
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

// Start the server using stdio transport
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Dona Nova MCP Server running on stdio");
}

main().catch(console.error);
