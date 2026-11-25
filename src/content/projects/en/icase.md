---
slug: "icase"
lang: "en"
title: "ICASE"
subtitle: "Computer-aided software engineering"
description: "A CASE tool that turns project descriptions into requirements, data models, diagrams, and prototypes."
summary: "A university project for a computer-aided software development course that turns narrative descriptions into reviewable artifacts."
category: "CASE tools and software engineering"
period: "To be confirmed"
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
    "The contract separates provider output from the persisted model and presentation. Concrete artifacts make the analysis reviewable.",
  ]
limitations:
  [
    "The factory includes Gemini, Ollama, OpenAI, and n8n. The default provider is `MockAIProvider`. End-to-end execution with external providers remains unverified. The described workflow produces models, diagrams, and prototypes.",
  ]
---

## Context and problem

A free-text description passes through an analysis service that produces requirements, actors, entities, screens, navigation, and architecture. A validator checks the structure and relationships before persistence.

## Solution and architecture

Express coordinates analysis and saves artifacts in a Prisma and PostgreSQL transaction. The React interface presents Mermaid entity, navigation, and architecture diagrams and renders controlled prototypes. Docker Compose defines the environment. The repository includes automated analysis and document tests.

**Flow.** Description → analysis → validated contract → PostgreSQL → diagrams and prototypes.
