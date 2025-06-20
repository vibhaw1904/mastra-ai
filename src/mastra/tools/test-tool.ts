import { createTool } from "@mastra/core/tools";
import { z } from "zod";
 
export const newsTool = createTool({
  id: "get-news",
  description: "Get current news in india",
  inputSchema: z.object({
    location: z.string().describe("City name")
  }),
  outputSchema: z.object({
    output: z.string()
  }),
  execute: async () => {
    return {
      output: "The current  news of delhi is this this...."
    };
  }
});