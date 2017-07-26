var dgram = require('dgram');
var server = dgram.createSocket('udp4');
var config = require('./config/config');

var metrics = {};

function flushMetrics() {
    // Aggregate and save metrics to backend
    metrics = {};
}

function sanitizeStatName(stat) {
    return stat.replace(/[^a-zA-Z_\-0-9\.]/g, '');
}

function saveMetric(message) {
    var packet_data = message.toString();

    if (packet_data.indexOf(":") > -1 && (packet_data.split(":").length) == 3) {
        var data = packet_data.split(":");
    } else {
        var data = [packet_data, '0 - 0', '1'];
    }

    var key = data[0];
    var coords = data[1];
    var value = data[2];

    if (value.indexOf("\n") > -1) {
        value = value.split("\n")[0];
    }

    var key = sanitizeStatName(key);
    value = Number(value);

    if (typeof metrics[key] == 'undefined') {
        metrics[key] = {};
    }

    if (typeof metrics[key][coords] == 'undefined') {
        metrics[key][coords] = value;
    } else {
        metrics[key][coords] += value;
    }

    console.log(metrics);
}

function startServer() {
    server.on('message', function (message, remote) {
        saveMetric(message);
    });

    server.bind(config.port || 8190, config.host || '127.0.0.1');

    setInterval(flushMetrics, config.flushInterval);
}

startServer();
