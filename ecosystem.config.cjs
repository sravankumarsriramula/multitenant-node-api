module.exports = {
  apps: [
    {
      name: "multitenant-api",
      script: "src/server.ts",
      interpreter: "node",
      node_args: "--import tsx",
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3000
      }
    }
  ]
};
