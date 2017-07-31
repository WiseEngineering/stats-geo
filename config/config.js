module.exports = {
    host: '127.0.0.1',
    port: 8190,
    flushInterval: 10000, // Miliseconds
    aggregate_radius: 1000, // [1, 10, 100, 1000, 10000] meters
    backend: 'redis',
    backends: {
        redis: {
            host: '127.0.0.1',
            port: 6379,
            channel: 'stats'
        }
    }
}
