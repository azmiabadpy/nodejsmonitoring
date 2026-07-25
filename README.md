
# 🚀 Node.js Application Monitoring with Prometheus & Grafana

An end-to-end DevOps monitoring project that demonstrates how to deploy a containerized Node.js application on AWS EC2 and monitor both application and infrastructure metrics using **Prometheus**, **Grafana**, and **Node Exporter**.

---

# 📌 Project Overview

This project showcases a complete monitoring stack running on an AWS EC2 instance.

```
                    AWS EC2 Instance
┌──────────────────────────────────────────────────┐
│                                                  │
│   Node.js Application (Docker)                   │
│   Port: 3000                                     │
│   └── /metrics                                   │
│              │                                   │
│              ▼                                   │
│       Prometheus (Port 9090)                     │
│              │                                   │
│              ▼                                   │
│        Grafana (Port 3001)                       │
│                                                  │
│   Node Exporter (Port 9100)                      │
│   Collects EC2 Host Metrics                      │
└──────────────────────────────────────────────────┘
```

---

# 🎯 Objectives

This project demonstrates:

- Deploying a Node.js application on AWS EC2
- Containerizing applications using Docker
- Exposing application metrics with Prometheus
- Monitoring Linux/EC2 infrastructure using Node Exporter
- Visualizing metrics using Grafana dashboards
- Creating Grafana alerts for application availability

---

# 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js | Application Runtime |
| Express.js | Web Framework |
| Docker | Containerization |
| AWS EC2 | Cloud Infrastructure |
| Prometheus | Metrics Collection |
| Grafana | Monitoring & Dashboards |
| Node Exporter | Linux/EC2 Monitoring |
| PromQL | Metrics Query Language |

---

# 📂 Project Structure

```
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
```

---

# 🚀 Node.js Application

The application exposes the following endpoints:

- `GET /`
- `GET /health`
- `GET /metrics`

Container Name:

```
monitorc
```

Application Port:

```
3000
```

Access:

```
http://<EC2_PUBLIC_IP>:3000
```

---

# 📊 Application Metrics

Prometheus scrapes metrics from:

```
/metrics
```

Example:

```bash
curl http://localhost:3000/metrics
```

### HTTP Metrics

- http_requests_total
- http_request_duration_seconds

These metrics provide:

- Request Count
- Request Method
- Status Code
- Request Latency

### Node.js Runtime Metrics

- nodejs_heap_size_total_bytes
- nodejs_heap_size_used_bytes
- nodejs_eventloop_lag_mean_seconds
- nodejs_gc_duration_seconds
- process_cpu_user_seconds_total
- process_resident_memory_bytes

---

# 🐳 Docker Containers

The monitoring stack consists of:

- monitorc
- prometheus
- grafana
- node-exporter

Check running containers:

```bash
sudo docker ps
```

---

# 🌐 Docker Networking

Containers communicate internally using Docker networking.

Prometheus scrapes:

```
http://monitorc:3000/metrics
```

Node Exporter:

```
http://node-exporter:9100/metrics
```

Using container names avoids the need for public IP communication.

---

# 📈 Prometheus

Prometheus collects metrics from:

- Node.js Application
- Node Exporter

Runs on:

```
Port 9090
```

Access:

```
http://<EC2_PUBLIC_IP>:9090
```

### Sample Configuration

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

Verify targets:

```bash
curl http://localhost:9090/api/v1/targets
```

Expected:

```
nodejs-app      UP
node-exporter   UP
```

---

# 🖥️ Node Exporter

Node Exporter exposes Linux host metrics.

Runs on:

```
Port 9100
```

Check metrics:

```bash
curl http://localhost:9100/metrics
```

Metrics include:

- CPU Usage
- Memory Usage
- Disk Usage
- Filesystem Usage
- Network Traffic

Example Metrics:

- node_cpu_seconds_total
- node_memory_MemAvailable_bytes
- node_filesystem_size_bytes
- node_network_receive_bytes_total

---

# 📊 Grafana

Grafana visualizes Prometheus metrics.

Container Port:

```
3000
```

Host Port:

```
3001
```

Access:

```
http://<EC2_PUBLIC_IP>:3001
```

Dashboard includes:

### Application Monitoring

- HTTP Requests
- Request Latency
- Response Status
- Node.js Memory
- Node.js CPU
- Application Availability

### Infrastructure Monitoring

- CPU Usage
- Memory Usage
- Disk Usage
- Filesystem Usage
- Network Traffic

---

# 🚨 Grafana Alert

An alert monitors application availability.

Query:

```promql
up{job="nodejs-app"}
```

Condition:

```
up < 1
```

Alert Flow

```
Application Running
      │
      ▼
   Alert Normal
      │
docker stop monitorc
      │
      ▼
Application Down
      │
      ▼
    Pending
      │
      ▼
    Firing 🚨
      │
docker start monitorc
      │
      ▼
Application Running
      │
      ▼
 Alert Normal
```

---

# 🛠️ Useful Commands

### Running Containers

```bash
sudo docker ps
```

### View Application Logs

```bash
sudo docker logs monitorc
```

### View Prometheus Logs

```bash
sudo docker logs prometheus
```

### View Metrics

```bash
curl http://localhost:3000/metrics
```

### Node Exporter Metrics

```bash
curl http://localhost:9100/metrics
```

### Prometheus Targets

```bash
curl http://localhost:9090/api/v1/targets
```

### Stop Application

```bash
sudo docker stop monitorc
```

### Start Application

```bash
sudo docker start monitorc
```

---

# 📚 DevOps Concepts Demonstrated

- Docker Containerization
- Docker Networking
- AWS EC2 Deployment
- Prometheus Monitoring
- Grafana Dashboards
- PromQL
- Grafana Alerting
- Node Exporter
- Application Monitoring
- Infrastructure Monitoring
- Health Checks
- Observability

---

# 🚀 Future Improvements

- Docker Compose
- Persistent Volumes
- Alertmanager Integration
- Email Notifications
- Slack Notifications
- Nginx Reverse Proxy
- HTTPS (SSL/TLS)
- GitHub Actions CI/CD
- Terraform Infrastructure Automation
- Loki Log Aggregation
- ELK Stack Integration
- Advanced Grafana Dashboards
- CPU, Memory, Disk & Network Alerts

---

# 🎯 Project Outcome

This project demonstrates a complete monitoring pipeline:

```
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

The solution provides comprehensive monitoring for both:

- ✅ Application Health
- ✅ EC2 Infrastructure Health

It also automatically detects application downtime and generates alerts for quick response.

---

# 👨‍💻 Author

**Abadur Rahaman Azmi**

**Cloud & DevOps Engineer**

**Skills**

- AWS
- Docker
- Kubernetes
- Terraform
- Jenkins
- CI/CD
- Linux
- Prometheus
- Grafana
- Monitoring & Observability

