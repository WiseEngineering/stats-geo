var dgram = require('dgram');
var redis = require("redis");
var config = require('./config/config');

var publisher;
var metrics = {};

function flushMetrics() {
    // Save metrics to backend
    publisher.publish(config.backends.redis.channel, JSON.stringify(metrics));

    // Flush metrics
    metrics = {};
}

function sanitizeStatName(stat) {
    return stat.replace(/[^a-zA-Z_\-0-9\.]/g, '');
}

function saveMetric(message) {
    var packet_data = message.toString();

    if (packet_data.indexOf("\n") > -1) {
        packet_data = packet_data.split("\n")[0];
    }

    // Get sample rate
    if (packet_data.indexOf("@") > -1) {
        var sampled_data = packet_data;
    } else {
        var sampled_data = `${packet_data}@1`;
    }

    // Spplit sample rate and data
    var sample_data = sampled_data.split("@")[0];
    var sample_rate = sampled_data.split("@")[1];

    // Get data points
    if (sample_data.indexOf("|") > -1 && (sample_data.split("|").length) == 3) {
        var data = sample_data.split("|");
    } else {
        var data = [sample_data, '0.0,0.0', 1];
    }

    var key = sanitizeStatName(data[0].toString());
    var coords = data[1].toString();
    var value = Number(data[2] / sample_rate * config.flushInterval / 1000);

    if (typeof metrics[key] == 'undefined') {
        metrics[key] = {};
    }

    if (typeof metrics[key][coords] == 'undefined') {
        metrics[key][coords] = {value: value, count: 1};
    } else {
        metrics[key][coords] = {value: metrics[key][coords].value += value, count: metrics[key][coords].count += 1};
    }
}

function startServer() {
    var server = dgram.createSocket('udp4');
    publisher  = redis.createClient();

    server.on('message', function (message, remote) {
        saveMetric(message);
    });

    server.bind(config.port || 8190, config.host || '127.0.0.1');

    setInterval(flushMetrics, config.flushInterval);
}

startServer();
