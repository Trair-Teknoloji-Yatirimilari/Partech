module.exports = {
  apps: [
    {
      name: "parstech",
      script: "npm",
      args: "start -- -p 3080",
      cwd: "/home/parstech",
      env: {
        PORT: 3080,
        NODE_ENV: "production",
        HOSTNAME: "127.0.0.1",
      },
      error_file: "/var/log/parstech-error.log",
      out_file: "/var/log/parstech-out.log",
      time: true,
      instances: 1,
      exec_mode: "fork",
    },
  ],
};
