---
slug: "smartpick-recommender"
lang: "en"
title: "SmartPick"
subtitle: "Personalized product recommendations"
description: "A hybrid system combining content similarity and collaborative interactions to rank products for an online store."
summary: "A collaborative e-commerce project. My work focused on implementing the product recommender in the backend."
category: "Recommender systems and e-commerce"
period: "To be confirmed"
status: "Collaborative project"
technologies: ["TF-IDF", "Cosine similarity", "Collaborative scoring", "API"]
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
contributions: ["Implemented the backend product recommendation system."]
results:
  [
    "The ranking combines two interpretable signals and provides a fallback when the text profile is insufficient.",
  ]
limitations:
  [
    "The result is a heuristic ranking without neural training, pretrained embeddings, or supervised purchase prediction. Demographics are auxiliary signals. Accuracy, fairness, and deployment remain unverified. The linked repositories were unavailable for public review.",
  ]
---

## Context and problem

The text profile combines product titles and categories from favorites, saved items, and purchases in that order of priority, plus terms from saved searches. Preprocessing lowercases and normalizes Unicode, removes accents, tokenizes, and drops stopwords and short terms.

## Solution and architecture

Normalized term frequency and smoothed IDF `log((N + 1) / (df + 1)) + 1` produce sparse vectors backed by maps. The dot product divided by the vector magnitudes gives the cosine between profile and candidate. A parallel branch groups similar users by province, age group, and gender where available. Their favorites add 3 and saved items add 2.

With a text profile, ranking uses `100 × cosineSimilarity + collaborativeScore`. It applies tie-breakers and moves previous purchases to the bottom. For cold start, it falls back to available collaborative signals and alternative sorting criteria. The API returns ranked products.

**Flow.** Favorites, saves, purchases, and searches → profile → TF-IDF → cosine. Similar users → interactions → collaborative score. Both branches feed the combined score, ranking, and API response.
