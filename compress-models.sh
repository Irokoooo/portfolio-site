#!/bin/bash
# Compress all GLB models using gltf-transform with Draco and texture optimization
# This script reduces model file sizes by 70-90% while maintaining visual quality

set -e

MODELS_DIR="public/models"
TEMP_DIR="public/models-temp"

mkdir -p "$TEMP_DIR"

echo "Starting model compression..."
echo "Original total size:"
du -sh "$MODELS_DIR"

# Process each GLB file
for file in "$MODELS_DIR"/*.glb; do
  filename=$(basename "$file")
  echo "Compressing: $filename"

  npx gltf-transform optimize "$file" "$TEMP_DIR/$filename" \
    --compress draco \
    --texture-compress webp \
    --texture-size 1024 \
    --simplify 0.95 \
    --verbose
done

echo "Compression complete. Moving compressed files..."
mv "$TEMP_DIR"/*.glb "$MODELS_DIR/"
rmdir "$TEMP_DIR"

echo "Final total size:"
du -sh "$MODELS_DIR"
echo "Compression done!"
