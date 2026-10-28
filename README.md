# Frontend — ApplianceRegister

## Local development
1. Install Node.js 20+.
2. Copy `.env.example` to `.env`.
3. Set `VITE_API_BASE_URL=http://localhost:8080/api`.
4. Run `npm install` and `npm run dev`.

## Vercel deployment
- Import this frontend repository into Vercel.
- Framework preset: Vite.
- Root directory: repository root.
- Build command: `npm run build`.
- Output directory: `dist`.
- Environment variable: `VITE_API_BASE_URL=https://YOUR-RENDER-SERVICE.onrender.com/api`.
- Redeploy after changing environment variables.

Vite variables prefixed with `VITE_` are embedded into the client bundle. Never put database passwords or private secrets in frontend environment variables.
