# Sengandhal Farmers Connect — mobile frontend

Expo 54 / React Native mobile app for farmers and buyers. The API backend is
in the separate [Backend-repo](https://github.com/babukrishnan/Backend-repo).

## First run on Samsung Android with Expo Go (Windows PowerShell)

```powershell
git clone https://github.com/babukrishnan/Frontend-repo.git
cd Frontend-repo
git switch --track origin/feature/client-ready-marketplace
npm.cmd ci
```

The backend must be deployed first. Follow
[DEPLOY_FREE_HOSTING.md](https://github.com/babukrishnan/Backend-repo/blob/feature/client-ready-marketplace/DEPLOY_FREE_HOSTING.md)
to use a free Render web service, Neon Postgres and Cloudinary images.

Create a **local** `.env` file in this frontend repository:

```dotenv
EXPO_PUBLIC_API_URL=https://YOUR-SERVICE.onrender.com
```

Use the root of your actual backend URL, without `/api`. Never put
database credentials, tokens or server secrets into `EXPO_PUBLIC_*` values.

```powershell
npx.cmd expo start --go --clear
```

Scan the terminal QR code using Expo Go on the phone. Keep both devices on
the same Wi-Fi, or start with `npx.cmd expo start --go --tunnel --clear`
if the phone cannot reach the laptop.

Android remote push notifications aren't available in Expo Go; use a custom
development build when notification testing is required.

## Common issues

- `Set EXPO_PUBLIC_API_URL`: create `.env` with the Render hostname and
  restart Expo. This is intentionally not hardcoded to the expired Railway URL.
- Login fails / backend returns 404: open the Render URL in a browser and
  confirm `/` and `/api/products/` work. Allow extra time for a sleeping
  free instance to start.
- Product images don't load: check Cloudinary configuration in the backend.
- PowerShell blocks `npm.ps1`: use `npm.cmd` and `npx.cmd` as above.
- User accounts from Railway are missing: the new Neon database is empty
  until old data is restored from a backup.

This feature branch is for testing; check CI and security before releasing
it to a paying client.
