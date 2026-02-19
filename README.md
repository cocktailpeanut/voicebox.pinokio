# Voicebox (Pinokio Launcher)

1-click Pinokio launcher for https://github.com/jamiepine/voicebox.

## What this launcher does

- Clones the Voicebox source repository
- Installs frontend and backend dependencies
- Installs Python runtime dependencies (including optional MLX support on Apple Silicon)
- Starts the local web UI and backend service
- Exposes a one-click menu for install/start/update/reset

## Usage

### Install

Click **Install** to:

1. Clone `https://github.com/jamiepine/voicebox` into `app`
2. Run `bun install`
3. Create `app/backend/env` and install Python dependencies
4. Install Qwen3-TTS

### Start

Click **Start** to:

1. Start backend with `uvicorn backend.main:app --host 127.0.0.1 --port 17493`
2. Start web frontend in `app/web` with `bun run dev`
3. Open the detected web URL from Pinokio UI

### Update

Click **Update** to pull latest changes and refresh JS/Python dependencies.

### Reset

Click **Reset** to remove the cloned `app` folder and all local install artifacts.

## API access

Voicebox is a REST API at `http://127.0.0.1:17493`.

### API docs

- OpenAPI UI: `http://127.0.0.1:17493/docs`
- Health: `GET /health`
- Profiles: `GET /profiles`, `POST /profiles`
- Generate speech: `POST /generate`

### JavaScript (fetch)

```javascript
const response = await fetch("http://127.0.0.1:17493/profiles")
const profiles = await response.json()
console.log(profiles)
```

### Python (requests)

```python
import requests
r = requests.get("http://127.0.0.1:17493/health")
print(r.json())
```

### Curl

```bash
curl -X POST http://127.0.0.1:17493/generate \
  -H "Content-Type: application/json" \
  -d '{"text":"Hello world","profile_id":"YOUR_PROFILE_ID","language":"en"}'
```

## Notes

- First run may download Qwen3-TTS/Whisper models from HuggingFace on first generation.
- Requires Bun and a compatible Python toolchain (3.11+).
