# stats-geo
GEO oriented stats aggregation server.

Aggregates metrics values by GPS coordinates and translates aggregated data to subscribers using Pub/Sub pattern.

# Run dev
`node stats.js`

# Send sample stats
`echo "purchase:49.54044734889645,25.58182640021074:1" | nc -u -w0 127.0.0.1 8190`
