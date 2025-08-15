# 3D Models Directory

This directory contains 3D models (GLB/GLTF files) for the product showcase.

## How to Add 3D Models

1. **Download free models** from:
   - [Sketchfab](https://sketchfab.com/3d-models?features=downloadable&sort_by=-likeCount)
   - [Poly Pizza](https://poly.pizza/)
   - [Kenney.nl](https://kenney.nl/assets) (free low-poly assets)

2. **Model requirements**:
   - Format: `.glb` or `.gltf`
   - Size: < 10MB recommended for web performance
   - Optimized for web (low polygon count)

3. **Example models to search for**:
   - "wireless headphones"
   - "bluetooth speaker"
   - "earbuds"
   - "audio equipment"

4. **Naming convention**:
   - `headphones.glb` - Main product headphones
   - `earbuds.glb` - Wireless earbuds
   - `speaker.glb` - Bluetooth speaker
   - `studio-headphones.glb` - Studio headphones
   - `charger.glb` - Wireless charger

## Current Implementation

The app currently uses a Canvas-based 2D visualization as a placeholder. When you add real GLB files:

1. Install React Three Fiber dependencies:
   ```bash
   npm install @react-three/fiber @react-three/drei three
   ```

2. Replace the placeholder component in `product-viewer-3d.tsx` with the actual 3D loader

3. Update the model paths in `server/routes.ts` to match your GLB files

## Features Supported

- ✅ Interactive rotation/animation
- ✅ Color variant switching (visual feedback)
- ✅ Responsive design
- ✅ Loading states
- ✅ Control instructions
- 🔄 Real 3D models (when GLB files added)
- 🔄 Orbit controls (when Three.js enabled)
- 🔄 Realistic lighting (when Three.js enabled)