#!/bin/bash

# Script para optimizar fotos de la boda
# Requiere ImageMagick: brew install imagemagick

echo "🖼️  Optimizando fotos de la boda..."

# Crear carpeta de fotos optimizadas
mkdir -p public/photos/optimized

# Contador
count=0

# Optimizar cada foto
for file in public/photos/_Z*.jpg; do
  filename=$(basename "$file")
  output="public/photos/optimized/$filename"

  echo "📸 Procesando: $filename"

  # Redimensionar y optimizar
  # - Máximo 2000px de ancho
  # - Calidad 85%
  # - Progressive JPEG
  convert "$file" \
    -resize 2000x2000\> \
    -quality 85 \
    -interlace Plane \
    "$output"

  count=$((count + 1))
done

echo ""
echo "✅ $count fotos optimizadas en public/photos/optimized/"
echo ""
echo "📊 Comparación de tamaños:"
du -sh public/photos/*.jpg | head -5
echo "vs"
du -sh public/photos/optimized/*.jpg | head -5
echo ""
echo "💡 Próximo paso: Reemplaza /photos/ por /photos/optimized/ en el código"
