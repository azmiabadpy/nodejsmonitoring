const http = require("http");

const {
  client,
  httpRequestsTotal,
  httpRequestDuration,
} = require("./metrics");

const hostname = "0.0.0.0";
const port = 3000;

const server = http.createServer(async (req, res) => {
  const startTime = process.hrtime();

  // Function to record application metrics
  const recordMetrics = (route, statusCode) => {
    const elapsed = process.hrtime(startTime);

    const durationInSeconds =
      elapsed[0] + elapsed[1] / 1e9;

    // Increment request counter
    httpRequestsTotal.inc({
      method: req.method,
      route: route,
      status_code: statusCode,
    });

    // Record request duration
    httpRequestDuration.observe(
      {
        method: req.method,
        route: route,
        status_code: statusCode,
      },
      durationInSeconds
    );
  };

  // Prometheus metrics endpoint
  if (req.url === "/metrics") {
    res.statusCode = 200;
    res.setHeader(
      "Content-Type",
      client.register.contentType
    );

    const metrics = await client.register.metrics();

    res.end(metrics);

    return;
  }

  // Health check endpoint
  if (req.url === "/health") {
    recordMetrics("/health", 200);

    res.statusCode = 200;

    res.setHeader(
      "Content-Type",
      "application/json"
    );

    res.end(
      JSON.stringify({
        status: "UP",
      })
    );

    return;
  }

  // Main application endpoint
  if (req.url === "/") {
    recordMetrics("/", 200);

    res.statusCode = 200;

    res.setHeader(
      "Content-Type",
      "text/plain"
    );

    res.end(
      "Hello from my Node.js application!\n"
    );

    return;
  }

  // 404 endpoint
  recordMetrics("unknown", 404);

  res.statusCode = 404;

  res.setHeader(
    "Content-Type",
    "text/plain"
  );

  res.end("Not Found\n");
});

server.listen(port, hostname, () => {
  console.log(
    `Server running on http://${hostname}:${port}`
  );
});
