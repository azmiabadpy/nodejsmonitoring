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

Application port:

3000
🌐 Application Running on AWS EC2

The Node.js application is deployed on an AWS EC2 instance and accessed through the EC2 public IP.

The application can be accessed using:

http://<EC2_PUBLIC_IP>:3000
📊 Application Metrics

The application exposes Prometheus-compatible metrics through:

/metrics

Example:

curl http://localhost:3000/metrics
HTTP Request Metrics

The application tracks total HTTP requests using:

http_requests_total

Example:

http_requests_total{
  method="GET",
  route="/",
  status_code="200"
}

This allows monitoring of:

HTTP request count
HTTP method
Request route
HTTP status code
HTTP Request Latency

The application also exposes:

http_request_duration_seconds

This metric is used to monitor application response time.

The histogram includes:

http_request_duration_seconds_bucket
http_request_duration_seconds_sum
http_request_duration_seconds_count
Node.js Runtime Metrics

The Prometheus client also exposes Node.js runtime metrics, including:

nodejs_heap_size_total_bytes
nodejs_heap_size_used_bytes
nodejs_eventloop_lag_mean_seconds
nodejs_gc_duration_seconds
process_cpu_user_seconds_total
process_resident_memory_bytes

These metrics help monitor the health and performance of the Node.js process.

🐳 Docker Containers

The monitoring stack runs using Docker containers.

The main containers are:

monitorc
prometheus
grafana
node-exporter

Check running containers:

sudo docker ps

Example architecture:

Node.js Application
        │
        │ Port 3000
        ▼
    monitorc

Prometheus
        │
        │ Port 9090
        ▼

Grafana
        │
        │ Port 3001
        ▼

Node Exporter
        │
        │ Port 9100
        ▼

EC2 Host Metrics
🌐 Docker Networking

The containers communicate using a Docker network.

Prometheus connects to the Node.js application using the container name:

http://monitorc:3000/metrics

Prometheus connects to Node Exporter using:

http://node-exporter:9100/metrics

Using Docker container names allows services to communicate internally without using public IP addresses.

📈 Prometheus

Prometheus collects and stores metrics from:

The Node.js application
Node Exporter

Prometheus runs on:

Port: 9090

Access Prometheus:

http://<EC2_PUBLIC_IP>:9090
Prometheus Configuration

Example prometheus.yml:

global:
  scrape_interval: 15s

scrape_configs:
  - job_name: "nodejs-app"
    static_configs:
      - targets: ["monitorc:3000"]

  - job_name: "node-exporter"
    static_configs:
      - targets: ["node-exporter:9100"]

Prometheus scrapes:

Node.js Application:
http://monitorc:3000/metrics

and:

Node Exporter:
http://node-exporter:9100/metrics
✅ Verify Prometheus Targets

Targets can be checked using:

curl http://localhost:9090/api/v1/targets

Expected targets:

nodejs-app       UP
node-exporter    UP
🖥️ Node Exporter

Node Exporter provides infrastructure-level metrics for the EC2 host.

It exposes metrics on:

Port: 9100

Test Node Exporter:

curl http://localhost:9100/metrics

Node Exporter provides metrics related to:

CPU usage
Memory usage
Disk usage
Filesystem usage
Network traffic
System performance

Examples:

node_cpu_seconds_total
node_memory_MemTotal_bytes
node_memory_MemAvailable_bytes
node_filesystem_size_bytes
node_network_receive_bytes_total
📊 Grafana

Grafana is used to visualize the metrics collected by Prometheus.

Grafana runs inside a Docker container.

Container port:

3000

EC2 host port:

3001

Port mapping:

EC2 Port 3001 → Container Port 3000

Grafana can be accessed at:

http://<EC2_PUBLIC_IP>:3001
📈 Grafana Dashboard

The Grafana dashboard is connected to Prometheus as its data source.

The dashboard can be used to monitor:

Application Metrics
HTTP Requests
HTTP Status Codes
Request Latency
Node.js Memory
Node.js CPU
Application Availability
Infrastructure Metrics
EC2 CPU
EC2 Memory
EC2 Disk
Filesystem
Network Traffic
🚨 Application Down Alert

A Grafana alert was created to detect when the Node.js application becomes unavailable.

The alert uses the Prometheus metric:

up{job="nodejs-app"}

The alert condition is:

up < 1
Alert Logic

When the application is running:

up = 1

The alert condition is false:

1 < 1 = FALSE

The alert remains:

Normal

When the application is stopped:

up = 0

The alert condition becomes true:

0 < 1 = TRUE

The alert changes to:

Pending → Firing
Alert Configuration
Query:
up{job="nodejs-app"}

Condition:
Is below 1

Evaluation interval:
1 minute

Pending period:
1 minute

Keep firing for:
0 seconds
🚨 Alert Firing Successfully

The application-down alert was tested by stopping the Node.js container:

sudo docker stop monitorc

Prometheus detected:

up{job="nodejs-app"} = 0

After the configured pending period, Grafana changed the alert state to:

Firing

🔄 Recovering the Application

The application can be started again using:

sudo docker start monitorc

Once Prometheus detects:

up{job="nodejs-app"} = 1

the alert returns to:

Normal
🧪 Alert Testing Flow
┌────────────────────────┐
│ Node.js App Running    │
│ up = 1                 │
└────────────┬───────────┘
             │
             ▼
        Alert Normal
             │
             │ docker stop monitorc
             ▼
┌────────────────────────┐
│ Node.js App Down       │
│ up = 0                 │
└────────────┬───────────┘
             │
             ▼
          Pending
             │
             ▼
          Firing 🚨
             │
             │ docker start monitorc
             ▼
┌────────────────────────┐
│ Node.js App Recovered  │
│ up = 1                 │
└────────────┬───────────┘
             │
             ▼
        Alert Normal
🔍 Monitoring Architecture

This project implements two monitoring layers.

1. Application Monitoring

The Node.js application provides:

HTTP Request Metrics
Request Latency
Node.js Heap Memory
Node.js CPU
Event Loop Metrics
Garbage Collection Metrics
Application Availability
2. Infrastructure Monitoring

Node Exporter provides:

EC2 CPU Metrics
EC2 Memory Metrics
EC2 Disk Metrics
Filesystem Metrics
Network Metrics
Linux System Metrics
🧠 Key DevOps Concepts Demonstrated

This project demonstrates practical knowledge of:

Docker containerization
Docker networking
AWS EC2 deployment
Prometheus metrics
Prometheus scraping
PromQL
Grafana dashboards
Grafana alerting
Application monitoring
Infrastructure monitoring
Observability
Health checks
Container troubleshooting
🛠️ Useful Commands
Check Running Containers
sudo docker ps
View Application Logs
sudo docker logs monitorc
View Prometheus Logs
sudo docker logs prometheus
Check Application Metrics
curl http://localhost:3000/metrics
Check Node Exporter Metrics
curl http://localhost:9100/metrics
Check Prometheus Targets
curl http://localhost:9090/api/v1/targets
Stop Application
sudo docker stop monitorc
Start Application
sudo docker start monitorc
🏭 Production Improvements

Possible future improvements include:

Docker Compose for managing the complete stack
Persistent storage for Prometheus
Persistent storage for Grafana
Alertmanager integration
Email notifications
Slack notifications
HTTPS using Nginx
CI/CD using GitHub Actions
Infrastructure provisioning using Terraform
Centralized logging using Loki
ELK Stack integration
More advanced Grafana dashboards
CPU, memory, disk, and network alerts
🎓 Project Outcome

This project implements an end-to-end monitoring solution:

Node.js Application
        ↓
Docker Container
        ↓
AWS EC2
        ↓
Prometheus Metrics
        ↓
Node Exporter
        ↓
Prometheus
        ↓
Grafana Dashboards
        ↓
Grafana Alerting

The final system monitors both:

Application Health
+
EC2 Infrastructure Health

and automatically detects when the Node.js application becomes unavailable.

👨‍💻 Author

Abadur Rahaman Azmi

Cloud & DevOps | AWS | Docker | Kubernetes | Terraform | CI/CD | Monitoring & Observability

