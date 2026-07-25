# 🚀 Node.js Application Monitoring with Prometheus & Grafana

A hands-on DevOps monitoring project demonstrating how to deploy a containerized Node.js application on AWS EC2 and monitor both application and infrastructure metrics using Prometheus, Grafana, and Node Exporter.

---

## 📌 Project Overview

This project implements an end-to-end monitoring stack:

```text
┌──────────────────────────────┐
│        AWS EC2 Instance      │
│                              │
│  ┌────────────────────────┐  │
│  │  Node.js Application    │  │
│  │  Container: monitorc    │  │
│  │  Port: 3000             │  │
│  │  /metrics               │  │
│  └─────────────┬──────────┘  │
│                │              │
│                ▼              │
│  ┌────────────────────────┐  │
│  │      Prometheus        │  │
│  │      Port: 9090        │  │
│  └─────────────┬──────────┘  │
│                │              │
│                ▼              │
│  ┌────────────────────────┐  │
│  │       Grafana           │  │
│  │       Port: 3001        │  │
│  └────────────────────────┘  │
│                              │
│  ┌────────────────────────┐  │
│  │     Node Exporter      │  │
│  │     Port: 9100         │  │
│  │   EC2 Host Metrics     │  │
│  └────────────────────────┘  │
└──────────────────────────────┘

# 🎯 Objectives

This project demonstrates:

Deploying a Node.js application on AWS EC2
Containerizing the application with Docker
Exposing application metrics using Prometheus client libraries
Running Prometheus as a Docker container
Running Grafana as a Docker container
Monitoring EC2 infrastructure using Node Exporter
Connecting Prometheus with Grafana
Creating Grafana dashboards
Creating and testing an application-down alert

| Technology    | Purpose                        |
| ------------- | ------------------------------ |
| Node.js       | Application runtime            |
| Express.js    | Web application framework      |
| Docker        | Containerization               |
| AWS EC2       | Cloud infrastructure           |
| Prometheus    | Metrics collection and storage |
| Grafana       | Visualization and alerting     |
| Node Exporter | EC2/Linux host monitoring      |
| PromQL        | Query language for Prometheus  |


monitor/
│
├── app.js
├── package.json
├── package-lock.json
├── Dockerfile
├── .dockerignore
│
├── monitoring/
│   └── prometheus.yml
│
└── images/
    ├── nodejs-app-ec2.png
    └── grafana-alert-firing.png

# 🚀 Node.js Application

The Node.js application exposes the following endpoints:

GET /
GET /health
GET /metrics

The application is containerized using Docker.

Container name:
monitorc



