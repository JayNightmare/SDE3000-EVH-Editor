module.exports = {
  ci: {
    collect: {
      startServerCommand: "npm run build && npx serve -s build -p 3000",
      startServerReadyPattern: "Local:",
      startServerReadyTimeout: 30000,
      url: ["http://localhost:3000"],
      numberOfRuns: 1,
    },
    assert: {
      assertions: {
        "categories:pwa": ["error", { minScore: 0.9 }],
        "installable-manifest": "error",
        "service-worker": "error",
        "works-offline": "error",
        "themed-omnibox": "warn",
        "content-width": "warn",
        "apple-touch-icon": "warn",
        "maskable-icon": "warn",
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
