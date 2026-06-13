import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: 'aqniv96b',
    dataset: 'production',
  },
  // The deployed dashboard will live at https://rotaract-chicago.sanity.studio
  studioHost: 'rotaract-chicago',
  autoUpdates: true,
});
