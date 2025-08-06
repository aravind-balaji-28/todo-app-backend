module.exports = {
  apps: [
    {
      name: "todo-app",
      script: "./app.js",
      watch: true,
      out_file: "./logs/out.log",
      error_file: "./logs/error.log",
      log_file: "./logs/combined.log",

      env: {
        NODE_ENV: "development",
        PORT: 3000
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 7200
      }
    }
  ]
};
