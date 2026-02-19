module.exports = {
  run: [
    {
      method: "shell.run",
      params: {
        message: "git pull",
        path: "app"
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app",
        message: [
          "npm install"
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app/backend",
        venv: "env",
        message: [
          "uv pip install -r requirements.txt"
        ]
      }
    },
    {
      when: "{{platform === 'darwin' && arch === 'arm64' && exists('app/backend/requirements-mlx.txt')}}",
      method: "shell.run",
      params: {
        path: "app/backend",
        venv: "env",
        message: [
          "uv pip install --prerelease=allow -r requirements-mlx.txt"
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app/backend",
        venv: "env",
        message: [
          "uv pip install --upgrade git+https://github.com/QwenLM/Qwen3-TTS.git"
        ]
      }
    }
  ]
}
