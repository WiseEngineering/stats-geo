# StatsG
GEO oriented stats aggregation server.

Inspired by Etsy/StatsD.

Aggregates metrics values by GPS coordinates and translates aggregated data to subscribers using Pub/Sub pattern.

# Run dev server
`npm install`

`node stats.js`

# Send sample stats
Basic protocol

`<metric_name>|<lat,lon>|<value>[@sample_rate]`

Command line example

`echo "purchase|49.54044734889645,25.58182640021074|10@0.1" | nc -u -w0 127.0.0.1 8190`
