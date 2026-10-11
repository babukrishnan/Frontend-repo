# Connect Sengandhal Expo to the free backend

1. Deploy the backend from Backend-repo's feature/client-ready-marketplace branch using HOSTING_MIGRATION.md.
2. Copy the actual Render https://...onrender.com URL from your Render dashboard.
3. In the frontend folder, copy .env.example to .env, then replace the sample URL with your real Render URL.
4. In Windows PowerShell run: npm.cmd ci, then npx.cmd expo start --go --clear.
5. Scan the new QR code in Expo Go and test /api/products/ and signup with a test account.

Do not use the old Railway URL; it is expired. Expo must be restarted for .env changes to be loaded. Render free instances sleep after 15 minutes of inactivity so your first API request may be slow. Cloudinary stores product images, and this app now supports its absolute image URLs.

Never commit a database connection string, Cloudinary URL, private secret, or actual user password.
