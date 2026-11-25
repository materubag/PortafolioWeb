---
slug: "flota-traccar"
lang: "en"
title: "Flota Traccar"
subtitle: "ERP and GPS integration"
description: "Integrates Odoo and Traccar to associate vehicles with GPS devices and represent their last known position in the ERP."
summary: "An academic integration project connecting Odoo Fleet and a GPS tracking server."
category: "Systems integration and IoT"
period: "To be confirmed"
technologies:
  [
    "Odoo 16",
    "Python",
    "Traccar 6.16",
    "PostgreSQL 15",
    "Docker",
    "Docker Compose",
    "XML",
  ]
theme: "mint"
repositories:
  [
    {
      "label": "GitHub",
      "url": "https://github.com/materubag/ProyectoFlotaTraccar",
    },
  ]
featured: false
order: 5
contributions: []
results:
  [
    "The model and views make the vehicle–device association explicit. Separate databases keep ERP and GPS server records apart.",
  ]
limitations:
  [
    "The flow into Odoo represents the intended integration. The reviewed fields and settings do not establish automated end-to-end synchronization, validated live tracking, testing with physical hardware, or production deployment.",
  ]
---

## Context and problem

Separating position ingestion from fleet records gives each service a distinct responsibility. Docker Compose connects Odoo, Traccar, and PostgreSQL on an internal network. Odoo and Traccar use separate databases within the same engine.

## Solution and architecture

The `fleet_traccar` module extends `fleet.vehicle`, enforces uniqueness of the numeric Traccar ID, and configures the API connection. XML views expose the last position’s latitude, longitude, speed, and timestamp. The repository documents simulated positions sent to Traccar and includes initialization, backup, and restore utilities.

**Flow.** GPS or simulator → Traccar → REST API → `fleet_traccar` module → Odoo Fleet. Each service stores data in a separate database.
