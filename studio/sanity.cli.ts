import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: 'aqniv96b',
    dataset: 'production',
  },
  // The deployed dashboard will live at https://rotaract-chicago.sanity.studio
  studioHost: 'rotaract-chicago',
  autoUpdates: true,
  deployment: {
    appId: 'h081wxvc8n3fgngh5oenwvjt',
  },
});
