# 🚀 Deployment Guide

## Deploy on Vercel (Recommended)

1. **Sign up for Vercel**
   - Visit https://vercel.com
   - Sign up with GitHub

2. **Import Project**
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects Vite configuration

3. **Deploy**
   - Click "Deploy"
   - Your app will be live in minutes!
   - Get a free `yourapp.vercel.app` URL

## Deploy on Netlify

1. **Sign up for Netlify**
   - Visit https://netlify.com
   - Sign up with GitHub

2. **Deploy Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **Add _redirects file**
   Create `public/_redirects`:
   ```
   /*    /index.html   200
   ```

## Deploy on GitHub Pages

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**
   ```json
   {
     "homepage": "https://yourusername.github.io/recipe-hub",
     "scripts": {
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Update vite.config.js**
   ```javascript
   base: '/recipe-hub/'
   ```

4. **Deploy**
   ```bash
   npm run build
   npm run deploy
   ```

## Environment Variables

If using API keys (future):
- Create `.env` file
- Add to `.gitignore`
- Use `import.meta.env.VITE_API_KEY` in code
- Set environment variables in hosting platform

## Performance Tips

- ✅ Already using Vite (lightning fast)
- ✅ Code splitting with React Router
- ✅ Optimized production build
- Consider adding lazy loading for images
- Consider adding PWA support

## Custom Domain

After deployment, you can add a custom domain:
- Vercel: Project Settings → Domains
- Netlify: Domain Settings → Add custom domain
- GitHub Pages: Repository Settings → Pages → Custom domain

---

**Note**: This project is already optimized for production. Just push to GitHub and deploy! 🎉
