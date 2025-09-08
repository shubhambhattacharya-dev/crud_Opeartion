# Copilot Instructions for `crud_Opeartion` (MERN CRUD)

## Big Picture Architecture
- **Backend:** Node.js/Express REST API in `Backend/` with MongoDB (via Mongoose).
  - Entry: `Backend/server.js` (loads env, connects DB, mounts routes)
  - DB config: `Backend/config/db.js` (uses `MONGO_URL` from `.env`)
  - Data model: `Backend/models/product.model.js` (Product schema)
  - Routes: `Backend/routes/product.routes.js` (CRUD endpoints for `/api/products`)
- **Frontend:** Placeholder in `frontend/` (no code yet)
- **Data Flow:**
  - API endpoints (`/api/products`) interact with MongoDB via Mongoose model.
  - All requests/responses use JSON.

## Developer Workflows
- **Start server (dev):** `npm run dev` (uses `nodemon` for hot reload)
- **Start server (prod):** `npm start`
- **Environment:**
  - MongoDB URI in `.env` (`MONGO_URL`)
  - Default port: 8000 (can override with `PORT` in `.env`)
- **No tests defined** (see `package.json`)

## Project-Specific Conventions
- **ES Modules:** All JS files use `import`/`export` syntax (`type: "module"` in `package.json`).
- **Routes:**
  - All product routes are prefixed with `/api/products`.
  - Route handlers return `{ success, data|message }` JSON objects.
- **Error Handling:**
  - Errors logged to console, responses use HTTP status codes and JSON error messages.
- **Model Naming:**
  - Mongoose model is named `Product` (capitalized), exported as default from `product.model.js`.
- **Config:**
  - DB connection logic is in `Backend/config/db.js` and called from `server.js`.

## Integration Points & External Dependencies
- **MongoDB:** via `mongoose`, connection string in `.env`.
- **Express:** for routing and middleware.
- **dotenv:** loads environment variables.
- **nodemon:** for development hot reload (dev only).

## Examples & Patterns
- **Add new model:** Place schema in `Backend/models/`, register with `mongoose.model`, export default.
- **Add new route:** Create file in `Backend/routes/`, import in `server.js`, mount with `app.use()`.
- **API response pattern:**
  ```js
  res.status(200).json({ success: true, data: ... });
  res.status(400).json({ success: false, message: ... });
  ```
- **DB connection:**
  ```js
  import { connectDB } from './config/db.js';
  connectDB();
  ```

## Key Files & Directories
- `Backend/server.js` — main entry, mounts routes, starts server
- `Backend/config/db.js` — DB connection logic
- `Backend/models/product.model.js` — Product schema/model
- `Backend/routes/product.routes.js` — Product CRUD API
- `.env` — MongoDB URI and other secrets
- `package.json` — scripts, dependencies, ES module config

---
_If any section is unclear or missing, please provide feedback to improve these instructions._
