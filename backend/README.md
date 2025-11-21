# TinyLink Backend

## Setup
1. Copy `.env.example` to `.env` and fill `MONGO_URI` (MongoDB Atlas) and optionally `PORT`.
2. Install dependencies:
   ```
   cd backend
   npm install
   ```
3. Run in development:
   ```
   npm run dev
   ```
4. Start production:
   ```
   npm start
   ```

## Endpoints
- `GET /healthz`
- `POST /api/links` - create link (409 if code exists)
- `GET /api/links` - list links
- `GET /api/links/:code` - get stats
- `DELETE /api/links/:code` - delete link
- `GET /:code` - redirect (302)
