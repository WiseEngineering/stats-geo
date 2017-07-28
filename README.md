# stats-geo
GEO oriented stats aggregation server.

Inspired by Etsy/StatsD.

Aggregates metrics values by GPS coordinates and translates aggregated data to subscribers using Pub/Sub pattern.

# Run dev server
`npm install`

`node stats.js`

# Send sample stats
`echo "metric_nane|lat,lon|value[@sample_rate]" | nc -u -w0 127.0.0.1 8190`

`echo "purchase|49.54044734889645,25.58182640021074|10@0.1" | nc -u -w0 127.0.0.1 8190`
