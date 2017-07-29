module.exports = {
    backend: "redis",
    backends: {
        redis: {
            host: '127.0.0.1',
            port: 6379,
            channel: 'stats'
        }
    }
}
