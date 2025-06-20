import { anthropic } from '@ai-sdk/anthropic';
import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { LibSQLStore } from '@mastra/libsql';
import { weatherTool } from '../tools/weather-tool';
import { newsTool } from '../tools/test-tool';
// import * as tools from '@mastra/yc-hn-tools'


export const newsAgent = new Agent({
  name: 'news-agent',
  instructions: `
      You are a helpful news assistant that provides accurate curent news in the city.

      Your primary function is to help users get news details for specific locations. When responding:
      - Always ask for a location if none is provided
      - If the location name isn’t in English, please translate it
      - If giving a location with multiple parts (e.g. "New York, NY"), use the most relevant part (e.g. "New York")
      - Include relevant details like current location of the news, wind conditions, and precipitation
      - Keep responses concise but informative

      Use the weatherTool to fetch current weather data.
`,
  model: anthropic('claude-3-5-sonnet-20241022'),
  tools: { newsTool },
  memory: new Memory({
    storage: new LibSQLStore({
      url: 'file:../mastra.db', // path is relative to the .mastra/output directory
    }),
  }),
});
