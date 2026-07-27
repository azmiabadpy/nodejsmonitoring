# 🚀 Node.js Application Monitoring with Prometheus & Grafana

An end-to-end DevOps monitoring and observability project that demonstrates how to deploy a containerized Node.js application on AWS EC2 and monitor application and infrastructure metrics using Prometheus, Grafana, and Node Exporter.

---

## 📌 Project Overview

This project implements a complete monitoring stack running on an AWS EC2 instance.

The Node.js application exposes custom application metrics through a `/metrics` endpoint. Prometheus collects these metrics, Grafana visualizes them through dashboards, and Grafana Alerting detects application availability issues.

The project demonstrates how application monitoring and infrastructure monitoring can be combined into a complete observability solution.

---

## 🏗️ Architecture

```text
                         AWS EC2 Instance
┌─────────────────────────────────────────────────────┐
│                                                     │
│        Node.js Application                          │
│        Docker Container                             │
│        Port: 3000                                   │
│              │                                      │
│              │ /metrics                             │
│              ▼                                      │
│        Prometheus                                   │
│        Port: 9090                                   │
│              │                                      │
│              ▼                                      │
│        Grafana                                      │
│        Port: 3001                                   │
│                                                     │
│        Node Exporter                               │
│        Port: 9100                                   │
│        EC2 Host Metrics                             │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Monitoring Flow

```text
Node.js Application
        │
        ▼
   Docker Container
        │
        ▼
     /metrics
        │
        ▼
    Prometheus
        │
        ▼
      Grafana
        │
        ▼
Dashboards & Alerts
```

---

# 🎯 Project Objectives

This project demonstrates:

* Deploying a Node.js application on AWS EC2
* Containerizing applications using Docker
* Exposing custom application metrics
* Collecting metrics using Prometheus
* Monitoring Linux infrastructure using Node Exporter
* Creating Grafana dashboards
* Monitoring application performance
* Monitoring EC2 infrastructure performance
* Creating Grafana alert rules
* Detecting application downtime automatically
* Using Docker networking for service communication
* Implementing application observability

---

# 🛠️ Technology Stack

| Technology    | Purpose                            |
| ------------- | ---------------------------------- |
| Node.js       | Application Runtime                |
| Express.js    | Web Framework                      |
| Docker        | Application Containerization       |
| AWS EC2       | Cloud Infrastructure               |
| Prometheus    | Metrics Collection                 |
| Grafana       | Metrics Visualization and Alerting |
| Node Exporter | Linux Host Monitoring              |
| PromQL        | Metrics Query Language             |

---

# 📂 Project Structure

```text
nodejsmonitoring/
│
├── monitoring/
│   ├── grafana alert fired
│   ├── grafana-processup
│   ├── grafana2
│   ├── grafanadashboard
│   └── nodesjs_browser
│
├── .dockerignore
├── .gitignore
├── Dockerfile
├── app.js
├── metrics.js
├── package-lock.json
├── package.json
└── prometheus.yml
```

### Project Components

| Component        | Description                                 |
| ---------------- | ------------------------------------------- |
| `app.js`         | Main Node.js application                    |
| `metrics.js`     | Prometheus metrics configuration            |
| `Dockerfile`     | Docker image configuration                  |
| `prometheus.yml` | Prometheus scrape configuration             |
| `monitoring/`    | Grafana screenshots and monitoring evidence |
| `package.json`   | Node.js project dependencies                |
| `.dockerignore`  | Files excluded from Docker build context    |
| `.gitignore`     | Files excluded from Git                     |

---

# 🚀 Node.js Application

The Node.js application exposes the following endpoints:

```text
GET /
GET /health
GET /metrics
```

## Application Port

```text
3000
```

Access the application:

```text
http://<EC2_PUBLIC_IP>:3000
```

Health check:

```text
http://<EC2_PUBLIC_IP>:3000/health
```

Metrics endpoint:

```text
http://<EC2_PUBLIC_IP>:3000/metrics
```

---

# 📊 Application Metrics

The application exposes Prometheus metrics through:

```text
/metrics
```

To view the metrics:

```bash
curl http://localhost:3000/metrics
```

---

## 📈 HTTP Metrics

The application collects HTTP metrics such as:

* Total HTTP requests
* Request rate
* Request method
* Response status code
* Request latency

Example metrics:

```text
http_requests_total
http_request_duration_seconds
```

These metrics help monitor application performance and traffic patterns.

---

## 🟢 Node.js Runtime Metrics

The application also exposes Node.js runtime metrics, including:

```text
nodejs_heap_size_total_bytes
nodejs_heap_size_used_bytes
nodejs_eventloop_lag_mean_seconds
nodejs_gc_duration_seconds
process_cpu_user_seconds_total
process_resident_memory_bytes
```

These metrics help monitor:

* Heap memory usage
* CPU usage
* Event loop performance
* Garbage collection
* Process memory usage

---

# 🐳 Docker Deployment

The Node.js application runs inside a Docker container.

Build the Docker image:

```bash
docker build -t nodejs-monitoring .
```

Run the application:

```bash
docker run -d \
  --name monitorc \
  -p 3000:3000 \
  nodejs-monitoring
```

Check running containers:

```bash
sudo docker ps
```

View application logs:

```bash
sudo docker logs monitorc
```

---

# 🌐 Docker Networking

The monitoring components communicate through Docker networking.

Prometheus scrapes the Node.js application using:

```text
http://monitorc:3000/metrics
```

Prometheus scrapes Node Exporter using:

```text
http://node-exporter:9100/metrics
```

Using Docker container names allows services to communicate internally without relying on public IP addresses.

---

# 📈 Prometheus

Prometheus collects metrics from:

* Node.js Application
* Node Exporter

## Prometheus Port

```text
9090
```

Access Prometheus:

```text
http://<EC2_PUBLIC_IP>:9090
```

---

## ⚙️ Prometheus Configuration

The Prometheus configuration uses scrape jobs to collect metrics from the Node.js application and Node Exporter.

Example:

```yaml
global:
  scrape_interval: 15s

scrape_configs:

  - job_name: nodejs-app
    static_configs:
      - targets: ["monitorc:3000"]

  - job_name: node-exporter
    static_configs:
      - targets: ["node-exporter:9100"]
```

---

## 🔍 Verify Prometheus Targets

```bash
curl http://localhost:9090/api/v1/targets
```

Expected targets:

```text
nodejs-app       UP
node-exporter    UP
```

---

# 🖥️ Node Exporter

Node Exporter collects Linux host and EC2 infrastructure metrics.

## Node Exporter Port

```text
9100
```

Check Node Exporter metrics:

```bash
curl http://localhost:9100/metrics
```

Node Exporter provides metrics related to:

* CPU usage
* Memory usage
* Disk usage
* Filesystem usage
* Network traffic

Example metrics:

```text
node_cpu_seconds_total
node_memory_MemAvailable_bytes
node_filesystem_size_bytes
node_network_receive_bytes_total
```

---

# 📊 Grafana

Grafana is used to visualize metrics collected by Prometheus.

## Grafana Ports

Grafana container port:

```text
3000
```

EC2 host port:

```text
3001
```

Access Grafana:

```text
http://<EC2_PUBLIC_IP>:3001
```

---

## 📊 Grafana Dashboard Monitoring

The Grafana dashboards provide visibility into:

### Application Monitoring

* HTTP request count
* Request rate
* Request latency
* Response status codes
* Node.js heap memory
* Node.js CPU usage
* Application availability

### Infrastructure Monitoring

* EC2 CPU usage
* Memory usage
* Disk usage
* Filesystem usage
* Network traffic

---

# 📸 Grafana Dashboard Screenshots

The following screenshots demonstrate the Grafana dashboards and monitoring results created during this project.

> **Note:** The image filenames below must exactly match the actual filenames in the `monitoring` folder. If GitHub shows `.png` extensions, add `.png` to the paths below.

---

## 📊 Grafana Dashboard

This dashboard provides a centralized view of application monitoring metrics collected from the Node.js application.

![Grafana Dashboard](./monitoring/grafanadashboard)

---

## 📈 Application Monitoring

This Grafana dashboard visualizes application performance and runtime metrics collected through Prometheus.

![Application Monitoring](./monitoring/grafana2)

---

## 🌐 Node.js Browser Monitoring

This screenshot demonstrates the Node.js application monitoring dashboard and collected application metrics.

![Node.js Application Monitoring](./monitoring/nodesjs_browser)

---

# 🚨 Grafana Alerting

A Grafana alert rule was configured to monitor the availability of the Node.js application.

## PromQL Query

```promql
up{job="nodejs-app"}
```

## Alert Condition

```text
up < 1
```

The alert detects when the Node.js application becomes unavailable.

---

## 🔄 Alert Flow

```text
Application Running
        │
        ▼
   Alert Normal
        │
        │ docker stop monitorc
        ▼
 Application Down
        │
        ▼
     Pending
        │
        ▼
    Firing 🚨
        │
        │ docker start monitorc
        ▼
Application Running
        │
        ▼
   Alert Normal
```

---

# 🚨 Grafana Alert Screenshots

## 🚨 Alert Fired

The application container was stopped to simulate application downtime.

```bash
sudo docker stop monitorc
```

Grafana detected that the application was unavailable and triggered the configured alert.

![Grafana Alert Fired](./monitoring/grafana alert fired)

---

## ✅ Application Process Up

After the application was restarted, the monitoring system detected that the application had returned to a healthy state.

```bash
sudo docker start monitorc
```

![Application Process Up](./monitoring/grafana-processup)

---

# 🧪 Testing Application Availability

To test the alerting system, the Node.js container was stopped:

```bash
sudo docker stop monitorc
```

The following sequence occurs:

```text
Node.js Application
        │
        ▼
Container Stopped
        │
        ▼
Prometheus Detects Target Down
        │
        ▼
Grafana Alert Evaluation
        │
        ▼
Alert Firing
```

After restarting the container:

```bash
sudo docker start monitorc
```

The application becomes available again:

```text
Container Started
        │
        ▼
Prometheus Detects Target Up
        │
        ▼
Grafana Evaluates Condition
        │
        ▼
Alert Returns to Normal
```

---

# 🛠️ Useful Commands

## Check Running Containers

```bash
sudo docker ps
```

## View All Containers

```bash
sudo docker ps -a
```

## View Application Logs

```bash
sudo docker logs monitorc
```

## Follow Application Logs

```bash
sudo docker logs -f monitorc
```

## View Application Metrics

```bash
curl http://localhost:3000/metrics
```

## View Node Exporter Metrics

```bash
curl http://localhost:9100/metrics
```

## Check Prometheus Targets

```bash
curl http://localhost:9090/api/v1/targets
```

## Stop the Application

```bash
sudo docker stop monitorc
```

## Start the Application

```bash
sudo docker start monitorc
```

## Restart the Application

```bash
sudo docker restart monitorc
```

---

# 📚 DevOps Concepts Demonstrated

* Docker Containerization
* Docker Networking
* AWS EC2 Deployment
* Prometheus Monitoring
* Grafana Dashboards
* Grafana Alerting
* PromQL
* Node Exporter
* Application Monitoring
* Infrastructure Monitoring
* Health Checks
* Observability
* Application Availability Monitoring
* Container Monitoring
* Metrics Collection
* Incident Detection

---

# 🚀 Future Improvements

Planned improvements include:

* Docker Compose deployment
* Persistent volumes for Prometheus and Grafana
* Alertmanager integration
* Email notifications
* Slack notifications
* Nginx reverse proxy
* HTTPS using SSL/TLS
* GitHub Actions CI/CD
* Terraform infrastructure automation
* Loki log aggregation
* ELK Stack integration
* Advanced Grafana dashboards
* CPU alerts
* Memory alerts
* Disk alerts
* Network alerts

---

# 🎯 Project Outcome

This project demonstrates a complete monitoring and observability pipeline:

```text
Node.js Application
        │
        ▼
Docker Container
        │
        ▼
AWS EC2
        │
        ▼
Prometheus
        │
        ▼
Node Exporter
        │
        ▼
Grafana Dashboards
        │
        ▼
Grafana Alerts
```

The monitoring solution provides visibility into both application and infrastructure health.

## ✅ Application Monitoring

* HTTP requests
* Request latency
* Node.js runtime metrics
* Heap memory usage
* CPU usage
* Application availability

## ✅ Infrastructure Monitoring

* EC2 CPU usage
* Memory usage
* Disk usage
* Filesystem usage
* Network traffic

## ✅ Alerting

The monitoring system automatically detects application downtime and generates alerts, enabling faster incident detection and response.

---

# 👨‍💻 Author

## Abadur Rahaman Azmi

### Cloud & DevOps Engineer

### Skills

* AWS
* Docker
* Kubernetes
* Terraform
* Jenkins
* CI/CD
* Linux
* Prometheus
* Grafana
* Monitoring & Observability

---

## 📌 About This Project

A production-style Node.js monitoring and observability project using Prometheus and Grafana to collect application metrics, visualize system performance, monitor EC2 infrastructure, and configure real-time application availability alerting.
