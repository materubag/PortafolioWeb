---
slug: "trello-github"
lang: "en"
title: "Trello → GitHub"
subtitle: "Branch creation workflow"
description: "An n8n workflow that creates GitHub branches from Trello cards."
summary: "The automation connects board events with the start of development work in a repository."
category: "Automation and integration"
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
contributions: ["Developed the n8n integration workflow"]
results:
  [
    "The workflow links task management and branch creation through events and REST calls.",
  ]
limitations: ["Permanent production deployment is unconfirmed."]
---

## Context and problem

Reduce manual steps when creating a branch for a development card.

## Solution and architecture

A webhook receives the Trello update. n8n validates the data and checks for the `dev` label. It builds a name from the card title, looks up `develop`, and creates a `feature/` branch through the GitHub API.
