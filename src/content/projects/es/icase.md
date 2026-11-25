---
slug: "icase"
lang: "es"
title: "ICASE"
subtitle: "Ingeniería de software asistida"
description: "Herramienta CASE que convierte descripciones de proyectos en requisitos, modelos de datos, diagramas y prototipos."
summary: "Proyecto universitario de Desarrollo Asistido por Software para transformar una descripción narrativa en artefactos revisables."
category: "Herramientas CASE e ingeniería de software"
period: "Por confirmar"
technologies:
  [
    "React",
    "Vite",
    "Express",
    "Prisma",
    "PostgreSQL",
    "JavaScript",
    "Node.js",
    "Mermaid",
    "Docker Compose",
  ]
theme: "sand"
repositories:
  [{ "label": "GitHub", "url": "https://github.com/materubag/Proyecto_ICase" }]
featured: false
order: 7
contributions: []
results:
  [
    "El contrato separa la salida del proveedor del modelo persistido y de la presentación. El análisis puede revisarse a través de artefactos concretos.",
  ]
limitations:
  [
    "La fábrica incluye Gemini, Ollama, OpenAI y n8n. El proveedor por defecto es `MockAIProvider`. Queda sin verificar una ejecución completa con los proveedores externos. El flujo descrito produce modelos, diagramas y prototipos.",
  ]
---

## Contexto y problema

Una descripción libre pasa por un servicio de análisis que produce requisitos, actores, entidades, pantallas, navegación y arquitectura. Un validador comprueba la estructura y las relaciones antes de persistir.

## Solución y arquitectura

Express coordina el análisis y guarda los artefactos en una transacción con Prisma y PostgreSQL. La interfaz React presenta diagramas Mermaid de entidades, navegación y arquitectura, y renderiza prototipos de forma controlada. Docker Compose describe el entorno. El repositorio incluye pruebas automatizadas para análisis y documentos.

**Flujo.** Descripción → análisis → contrato validado → PostgreSQL → diagramas y prototipos.
