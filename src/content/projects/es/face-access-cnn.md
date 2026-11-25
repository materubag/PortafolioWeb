---
slug: "face-access-cnn"
lang: "es"
title: "FaceAccessCNN"
subtitle: "Reconocimiento facial mediante CNN"
description: "Reconocimiento facial local con una CNN propia y simulación de acceso."
summary: "Aplicación local de webcam que abarca adquisición de imágenes, revisión, entrenamiento y calibración."
category: "Inteligencia artificial y visión por computador"
year: 2026
period: "2026"
status: "Experimental"
technologies:
  [
    "Python",
    "PyTorch",
    "OpenCV",
    "YuNet",
    "NumPy",
    "scikit-learn",
    "Matplotlib",
    "CNN",
  ]
theme: "violet"
repositories:
  [{ "url": "https://github.com/materubag/FaceAccessCNN", "label": "GitHub" }]
featured: true
order: 4
contributions: ["Coautoría del código propio del proyecto."]
results:
  [
    "El flujo separa datos por sesiones, reserva la validación para calibrar la decisión e incluye pruebas automatizadas.",
  ]
limitations:
  [
    "La detección de vida está fuera del alcance y una fotografía o pantalla podría engañar al sistema.",
    "El acceso es una simulación local. El prototipo carece de control de cerraduras reales y de preparación para producción como producto de seguridad física.",
    "Los pesos biométricos privados quedan fuera de la distribución pública.",
    "ESP32 y servomotor son una posible ampliación futura.",
  ]
---

## Contexto y problema

Explorar cómo una CNN entrenada desde cero puede reconocer identidades en un flujo de acceso simulado.

## Solución y arquitectura

YuNet detecta el rostro y cinco puntos de referencia para extraer y alinear la región de interés. La entrada de 96 × 96 píxeles se convierte a escala de grises y se aplica un filtro de mediana de 3 × 3. La CNN clasifica identidades. La decisión combina clase, puntuación y margen entre las dos primeras predicciones, exige confirmaciones consecutivas y simula una apertura temporal.

### Documentación técnica

[Entrenamiento](https://github.com/materubag/FaceAccessCNN/blob/HEAD/docs/training.md) · [Resultados](https://github.com/materubag/FaceAccessCNN/blob/HEAD/docs/results.md) · [Licencias y privacidad](https://github.com/materubag/FaceAccessCNN/blob/HEAD/docs/licenses.md) · [Verificación](https://github.com/materubag/FaceAccessCNN/blob/HEAD/docs/verification.md)
