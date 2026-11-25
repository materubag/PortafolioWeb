---
slug: "smartpick-recommender"
lang: "es"
title: "SmartPick"
subtitle: "Recomendación personalizada de productos"
description: "Sistema híbrido que combina similitud de contenido e interacciones colaborativas para ordenar productos de una tienda en línea."
summary: "Proyecto colaborativo de comercio electrónico. Mi participación se centró en implementar el recomendador de productos en el backend."
category: "Sistemas de recomendación y comercio electrónico"
period: "Por confirmar"
status: "Proyecto colaborativo"
technologies: ["TF-IDF", "Similitud coseno", "Puntuación colaborativa", "API"]
theme: "violet"
repositories:
  [
    {
      "label": "Frontend",
      "url": "https://github.com/Cuadrado1224/SmartPick-frontend",
    },
    {
      "label": "Backend",
      "url": "https://github.com/Cuadrado1224/SmartPick-backend",
    },
  ]
featured: false
order: 8
contributions:
  ["Implementación del sistema de recomendación de productos en el backend."]
results:
  [
    "El ranking integra dos señales interpretables y ofrece una salida cuando el perfil textual es insuficiente.",
  ]
limitations:
  [
    "El resultado es un ranking heurístico sin entrenamiento neuronal, embeddings preentrenados ni predicción supervisada de compra. Las señales demográficas son auxiliares. Quedan por verificar precisión, equidad y despliegue. Los repositorios enlazados no estaban disponibles para revisión pública.",
  ]
---

## Contexto y problema

El perfil textual combina títulos y categorías de favoritos, guardados y compras, con ese orden de prioridad, más términos de búsquedas guardadas. El texto pasa a minúsculas, se normaliza en Unicode, elimina tildes, se tokeniza y descarta palabras vacías y términos cortos.

## Solución y arquitectura

La frecuencia normalizada de términos y el IDF suavizado `log((N + 1) / (df + 1)) + 1` producen vectores dispersos representados con mapas. El producto punto dividido por las magnitudes de los vectores calcula el coseno entre perfil y candidato. En paralelo, provincia, grupo etario y género cuando está disponible agrupan usuarios similares. Sus favoritos suman 3 y sus guardados 2.

Con perfil textual, el ranking usa `100 × cosineSimilarity + collaborativeScore`. Aplica desempates y relega compras previas al final. En arranque en frío, se apoya en las señales colaborativas disponibles y criterios alternativos. La API devuelve los productos ordenados.

**Flujo.** Favoritos, guardados, compras y búsquedas → perfil → TF-IDF → coseno. Usuarios similares → interacciones → puntuación colaborativa. Ambas ramas convergen en la puntuación, el ranking y la respuesta de API.
