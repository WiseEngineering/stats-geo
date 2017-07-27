module.exports = {
    host: '127.0.0.1',
    port: 8190,
    flushInterval: 10000,
    backend: "redis",
    backends: {
        redis: {
            host: '127.0.0.1',
            port: 6379,
            channel: 'stats'
        }
    }
}
