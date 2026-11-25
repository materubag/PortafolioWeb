---
slug: "face-access-cnn"
lang: "en"
title: "FaceAccessCNN"
subtitle: "CNN-based face recognition"
description: "Local face recognition with a custom CNN and simulated access."
summary: "A local webcam application covering image acquisition, review, training, and calibration."
category: "AI and computer vision"
year: 2026
period: "2026"
status: "Experimental"
technologies:
  [
    "Python",
    "PyTorch",
    "OpenCV",
    "YuNet",
    "NumPy",
    "scikit-learn",
    "Matplotlib",
    "CNN",
  ]
theme: "violet"
repositories:
  [{ "url": "https://github.com/materubag/FaceAccessCNN", "label": "GitHub" }]
featured: true
order: 4
contributions: ["Co-authored the project’s original code."]
results:
  [
    "The workflow separates data by session, reserves validation for calibration, and includes automated tests.",
  ]
limitations:
  [
    "Liveness detection is outside the scope, and a photograph or screen can potentially fool the system.",
    "Access is simulated locally. The prototype lacks real lock control and is unsuitable for production physical security.",
    "Private biometric weights are excluded from public distribution.",
    "ESP32 and servo motor integration is a possible future extension.",
  ]
---

## Context and problem

Explore how a CNN trained from scratch can recognize identities in a simulated access workflow.

## Solution and architecture

YuNet detects the face and five landmarks for extracting and aligning the region of interest. A grayscale 96 × 96 input is processed with a 3 × 3 median filter. The CNN classifies identities. The decision uses class, score, and the margin between the top two predictions, requires consecutive confirmations, and simulates a timed opening.

### Technical documentation

[Training](https://github.com/materubag/FaceAccessCNN/blob/HEAD/docs/training.md) · [Results](https://github.com/materubag/FaceAccessCNN/blob/HEAD/docs/results.md) · [Licenses and privacy](https://github.com/materubag/FaceAccessCNN/blob/HEAD/docs/licenses.md) · [Verification](https://github.com/materubag/FaceAccessCNN/blob/HEAD/docs/verification.md)
