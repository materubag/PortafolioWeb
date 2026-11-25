---
slug: "trello-github"
lang: "es"
title: "Trello → GitHub"
subtitle: "Automatización de ramas"
description: "Un workflow n8n para crear ramas de GitHub a partir de tarjetas de Trello."
summary: "La automatización conecta eventos del tablero con el inicio del trabajo en el repositorio."
category: "Automatización e integración"
year: 2026
period: "2026"
technologies:
  [
    "n8n",
    "Trello API",
    "GitHub API",
    "Webhooks",
    "REST API",
    "PostgreSQL",
    "Docker",
  ]
theme: "sand"
repositories:
  [{ "url": "https://github.com/materubag/8n8n_das", "label": "GitHub" }]
featured: true
order: 3
contributions: ["Desarrollo del workflow de integración con n8n"]
results:
  [
    "El flujo conecta la gestión de tareas con la creación de ramas mediante eventos y llamadas REST.",
  ]
limitations:
  ["El estado de un despliegue permanente en producción está sin confirmar."]
---

## Contexto y problema

Reducir los pasos manuales al crear una rama para una tarjeta de desarrollo.

## Solución y arquitectura

Un webhook recibe la actualización de Trello. n8n valida los datos y comprueba la etiqueta `dev`. A partir del título genera un nombre, consulta la referencia de `develop` y crea una rama `feature/` mediante la API de GitHub.
