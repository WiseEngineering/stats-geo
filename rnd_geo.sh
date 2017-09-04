#!/bin/bash

#generate coordinates values
while [  True ]; do
	long=$(($RANDOM % 360 - 180))"."$(($RANDOM % 32767))
	lat=$(($RANDOM % 180 - 90))"."$(($RANDOM % 32767))
	metric_value=$(($RANDOM % 500))

	sleep_time=$(($RANDOM % 2 + 1))

	sleep $sleep_time

	#echo "purchase|$lat,$long|$metric_value@0.1"

	exec_str="echo \"purchase|$lat,$long|$metric_value@0.1\" | nc -u -w1 127.0.0.1 8190"

	eval $exec_str
done
