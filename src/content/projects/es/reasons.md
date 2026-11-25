---
slug: "reasons"
lang: "es"
title: "REASONS"
subtitle: "Plataforma de gestión de investigación"
description: "Plataforma web para consultar y gestionar investigadores, proyectos y publicaciones de un grupo de investigación."
summary: "El proyecto organiza el contenido público y administrativo de un grupo de investigación. El caso describe el trabajo del equipo."
category: "Desarrollo Full Stack"
period: "Por confirmar"
role: "Colaboración en el proyecto"
technologies:
  [
    "Angular 21",
    "TypeScript",
    "Express",
    "PostgreSQL",
    "Sequelize",
    "Tailwind CSS",
    "SCSS",
    "Angular Router",
    "Angular Reactive Forms",
    "Angular HttpClient",
    "Node.js",
    "JWT",
    "bcryptjs",
    "Multer",
    "Zod",
  ]
theme: "lavender"
repositories:
  [
    {
      "label": "Frontend",
      "url": "https://github.com/materubag/REASONS_Frontend",
    },
    {
      "label": "Backend",
      "url": "https://github.com/materubag/REASONS_backend",
    },
  ]
featured: false
order: 6
contributions: []
results:
  [
    "La separación entre rutas, componentes, servicios, controladores y modelos permite evolucionar la interfaz y los contratos de datos con responsabilidades claras.",
  ]
limitations:
  [
    "El alcance se basa en los módulos y rutas revisados. Quedan por confirmar las responsabilidades individuales, la cobertura funcional de extremo a extremo y el estado de despliegue.",
  ]
---

## Contexto y problema

El sitio público reúne investigadores, proyectos, publicaciones, información del grupo y contacto. Las rutas administrativas protegidas ofrecen listados y formularios de alta y edición de contenido.

## Solución y arquitectura

Angular Router separa las áreas públicas y administrativas. Los servicios HttpClient y el interceptor de autenticación conectan los módulos con la API REST de Express. El backend usa Sequelize y PostgreSQL, con esquemas Zod y middleware de autenticación y carga de archivos. El controlador de publicaciones implementa paginación.

**Flujo.** Angular → API REST Express → Sequelize → PostgreSQL.
