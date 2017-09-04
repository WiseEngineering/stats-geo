#!/bin/bash

#generate coordinates values
while [  True ]; do
	long=$(($RANDOM % 52 - 124))"."$(($RANDOM % 32767))
	lat=$(($RANDOM % 23 + 26))"."$(($RANDOM % 32767))
	metric_value=$(($RANDOM % 25))

	sleep_time=$(($RANDOM % 5 + 1))
	sleep $sleep_time

	#echo "purchase|$lat,$long|$metric_value@0.1"

	exec_str="echo \"purchase|$lat,$long|$metric_value@0.1\" | nc -u -w0 127.0.0.1 8190"

	eval $exec_str
done
