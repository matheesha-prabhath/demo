# Futuristic Graphic Designer Portfolio Demo

A responsive static portfolio/product showcase website for a graphic designer. Customers can browse sample work and contact the designer through pre-filled WhatsApp messages.

## Quick customization

1. Open `script.js` and change:
   ```js
   const whatsappNumber = "94770000000";
   ```
   Use the full country code without `+`, spaces or dashes.

2. Open `index.html` and replace:
   - `NEXA Studio` with the client's brand name.
   - Sample project names and descriptions.
   - Service descriptions and statistics.

3. Replace the CSS mockups with real images later by adding images to `assets/` and using an `<img>` inside each `.project-image` block.

## GitHub Pages deployment

1. Create a new public GitHub repository.
2. Upload all files from this folder to the repository root.
3. Open repository **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Choose `main` and `/ (root)`, then save.
6. GitHub will publish it at:
   `https://YOUR-USERNAME.github.io/REPOSITORY-NAME/`

## Notes

- This is a static website, so GitHub Pages is suitable.
- The floating WhatsApp icon uses the official green color.
- Clicking a product image or enquiry button opens a confirmation popup before WhatsApp.
- WhatsApp enquiries use `wa.me` links; no backend is required.
- A custom domain can be connected later from GitHub Pages settings.
