---
slug: "reasons"
lang: "en"
title: "REASONS"
subtitle: "Research management platform"
description: "A web platform for browsing and managing a research group’s researchers, projects, and publications."
summary: "The project organizes public and administrative content for a research group. This case study describes the team’s work."
category: "Full-stack development"
period: "To be confirmed"
role: "Project collaboration"
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
    "Separating routes, components, services, controllers, and models gives changes to the interface and data contracts clear boundaries.",
  ]
limitations:
  [
    "Scope is based on the modules and routes reviewed. Individual responsibilities, end-to-end coverage, and deployment status remain unconfirmed.",
  ]
---

## Context and problem

The public site brings together researcher profiles, projects, publications, group information, and contact details. Protected administrative routes provide listings and forms for creating and editing content.

## Solution and architecture

Angular Router separates public and administrative areas. HttpClient services and the authentication interceptor connect modules to the Express REST API. The backend uses Sequelize and PostgreSQL, with Zod schemas and middleware for authentication and file uploads. The publications controller implements pagination.

**Flow.** Angular → Express REST API → Sequelize → PostgreSQL.
