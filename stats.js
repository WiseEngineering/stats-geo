const dgram  = require('dgram')
    , redis  = require("redis")
    , config = require('./config/config');

let publisher
  , metrics = {};

function flushMetrics() {
    // Aggregate metrics
    let stats = {};
    for (metric in metrics) {
        for (coords in metrics[metric]) {
            if (typeof stats[metric] == 'undefined') {
                stats[metric] = {};
            }

            stats[metric][coords] = {value: metrics[metric][coords].value / (config.flushInterval / 1000), count: metrics[metric][coords].count / (config.flushInterval / 1000)}
        }
    }

    // Save metrics to backend
    if (config.backend == "redis") {
        console.log("flush");
        console.log(stats);

        publisher.publish(config.backends[config.backend].channel, JSON.stringify(stats));
    }

    // Flush metrics
    metrics = {};
}

function sanitizeStatName(stat) {
    return stat.replace(/[^a-zA-Z_\-0-9\.]/g, '');
}

function roundCoords(string_coords) {
    let ranges_map = {1: 5, 10: 4, 100: 3, 1000: 2, 10000: 1};

    if (!(config.aggregate_radius in ranges_map)) {
        config.aggregate_radius = 1000;
    }

    let round = ranges_map[config.aggregate_radius];

    if (string_coords.indexOf(",") > -1) {
        let coords = string_coords.split(",");
    }

    let lat = Number(coords[0]).toFixed(round);
    let lon = Number(coords[1]).toFixed(round);

    return `${lat},${lon}`;
}

function saveMetric(message) {
    let packet_data = message.toString();

    if (packet_data.indexOf("\n") > -1) {
        packet_data = packet_data.split("\n")[0];
    }

    // Get sample rate
    if (packet_data.indexOf("@") > -1) {
        let sampled_data = packet_data;
    } else {
        let sampled_data = `${packet_data}@1`;
    }

    // Spplit sample rate and data
    let sample_data = sampled_data.split("@")[0];
    let sample_rate = sampled_data.split("@")[1];

    // Get data points
    if (sample_data.indexOf("|") > -1 && (sample_data.split("|").length) == 3) {
        let data = sample_data.split("|");
    } else {
        let data = [sample_data, '0.0,0.0', 1];
    }

    let key = sanitizeStatName(data[0].toString());
    let string_coords = roundCoords(data[1].toString());
    let value = Number(data[2] / sample_rate);

    if (typeof metrics[key] == 'undefined') {
        metrics[key] = {};
    }

    if (typeof metrics[key][string_coords] == 'undefined') {
        metrics[key][string_coords] = {value: value, count: 1};
    } else {
        metrics[key][string_coords] = {value: metrics[key][string_coords].value += value, count: metrics[key][string_coords].count += 1};
    }
}

function startServer() {
    let server = dgram.createSocket('udp4');

    if (config.backend == "redis") {
        publisher = redis.createClient(config.backends[config.backend].port, config.backends[config.backend].host);
    }

    server.on('message', function (message, remote) {
        console.log(message);
        saveMetric(message);
    });

    server.bind(config.port || 8190, config.host || '127.0.0.1');

    setInterval(flushMetrics, config.flushInterval);
}

startServer();
