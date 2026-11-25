# For Alka, Always ♥ — React website

## Run on Windows
1. ZIP extract karo.
2. Extracted folder `alka-dark-romance-v2` mein PowerShell/Terminal kholo.
3. Run:
   ```powershell
   npm.cmd install
   npm.cmd run dev
   ```
4. Browser mein `http://localhost:5173` kholo.

## Add your photos
Photos `public/photos/` folder mein rakho. Default names:
`photo1.jpg`, `photo2.jpg`, `photo3.jpg`, `photo4.jpg`, `photo5.jpg`, `photo6.jpg`.
Agar filenames different hain, `src/main.jsx` mein `PHOTO_FILES` array update karo.

## Add your song
Song ko `public/music/our-song.mp3` naam se rakho. Alka ko website par Play button dabana hoga; browser autoplay block kar sakta hai.

## Build
```powershell
npm.cmd run build
```
Output `dist/` folder mein banega. Vercel/Netlify par deploy kar sakte ho.

## Customize
Love letter, captions aur proposal responses `src/main.jsx` mein clearly labelled hain.
Photos/song folder mein add karne ke baad dev server refresh kar do.
