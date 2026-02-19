module.exports = {
  daemon: true,
  run: [
    {
      method: "shell.run",
      params: {
        path: "app",
        venv: "backend/env",
        message: [
          "python -m uvicorn backend.main:app --port 17493 --reload"
        ],
        on: [{
          event: "/(http:\\/\\/\\S+)/",
          done: true
        }]
      }
    },
    {
      method: "local.set",
      params: {
        apiUrl: "{{input.event[1]}}"
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app",
        env: {
          BROWSER: "none",
          VITE_SERVER_URL: "{{local.apiUrl}}"
        },
        message: [
          "cd web && npm exec vite -- --config ../../web-vite.config.mjs"
        ],
        on: [{
          event: "/(http:\\/\\/\\S+)/",
          done: true
        }]
      }
    },
    {
      method: "local.set",
      params: {
        url: "{{input.event[1]}}",
        apiUrl: "{{local.apiUrl}}"
      }
    }
  ]
}
