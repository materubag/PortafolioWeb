---
slug: "cm-stock"
lang: "es"
title: "CM Stock"
subtitle: "Sistema de gestión de muestras"
description: "Gestión y trazabilidad de muestras para una empresa fabricante de pantuflas."
summary: "El equipo desarrolló un sistema para organizar muestras, imágenes, estados y procesos internos desde un mismo entorno."
category: "Proyecto empresarial colaborativo"
year: 2026
period: "Abril – julio de 2026"
role: "Desarrollador Full Stack"
status: "Terminado y en uso por la empresa"
technologies:
  ["React", "Vite", "JavaScript", "JSX", "Node.js", "PostgreSQL", "Docker"]
theme: "mint"
repositories:
  [
    {
      "url": "https://github.com/ARCM-Solutions/CmStock-Frontend",
      "label": "Frontend",
    },
    {
      "url": "https://github.com/ARCM-Solutions/CmStock-Backend",
      "label": "Backend",
    },
  ]
featured: true
order: 1
contributions:
  [
    "Configuración inicial de frontend y backend",
    "Desarrollo de filtros y tablas de consulta",
    "Gestión de imágenes",
    "Preparación de datos iniciales con seeders",
  ]
results:
  [
    "El sistema fue completado y la empresa lo utiliza, según la información del proyecto.",
  ]
limitations:
  [
    "La documentación pública omite imágenes, datos de clientes y detalles internos.",
  ]
---

## Contexto y problema

Centralizar la consulta de muestras y facilitar su seguimiento en los procesos internos.

## Solución y arquitectura

La interfaz en React permite consultar las muestras y filtrarlas. El backend en Node.js gestiona los datos almacenados en PostgreSQL. Docker forma parte del entorno de trabajo.
