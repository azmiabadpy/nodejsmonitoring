const client = require("prom-client");

// Collect default Node.js runtime metrics
client.collectDefaultMetrics();

// Count total HTTP requests
const httpRequestsTotal = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status_code"],
});

// Measure HTTP request duration
const httpRequestDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "HTTP request duration in seconds",
  labelNames: ["method", "route", "status_code"],
  buckets: [0.1, 0.5, 1, 2, 5],
});

module.exports = {
  client,
  httpRequestsTotal,
  httpRequestDuration,
};
