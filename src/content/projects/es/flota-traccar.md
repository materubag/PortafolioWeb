---
slug: "flota-traccar"
lang: "es"
title: "Flota Traccar"
subtitle: "Integración ERP y GPS"
description: "Integración de Odoo y Traccar para asociar vehículos con dispositivos GPS y representar su última posición en el ERP."
summary: "Proyecto académico de integración entre Odoo Fleet y un servidor de seguimiento GPS."
category: "Integración de sistemas e IoT"
period: "Por confirmar"
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
    "El modelo y las vistas dejan explícita la relación vehículo–dispositivo. El aislamiento de las bases facilita separar los datos del ERP de los del servidor GPS.",
  ]
limitations:
  [
    "El flujo hacia Odoo representa la integración prevista. Los campos y ajustes revisados no demuestran sincronización automática de extremo a extremo, seguimiento en tiempo real validado, pruebas con equipos GPS físicos ni despliegue productivo.",
  ]
---

## Contexto y problema

Separar la recepción de posiciones del registro de vehículos permite que cada servicio cumpla una responsabilidad distinta. Docker Compose conecta Odoo, Traccar y PostgreSQL por una red interna. Odoo y Traccar usan bases separadas dentro del mismo motor.

## Solución y arquitectura

El módulo `fleet_traccar` extiende `fleet.vehicle`, valida que el identificador numérico de Traccar sea único y configura la conexión a la API. Las vistas XML muestran latitud, longitud, velocidad y marca temporal de la última posición. El repositorio documenta cómo enviar posiciones simuladas a Traccar y contiene utilidades de inicialización, respaldo y restauración.

**Flujo.** GPS o simulador → Traccar → API REST → módulo `fleet_traccar` → Odoo Fleet. Ambos servicios guardan sus datos en bases separadas.
