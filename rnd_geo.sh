#!/bin/bash

#generate metrics name


MC=0
MCC=25 #metrics count
#generate metrics names
while [  $MC -lt $MCC ]; do
	metrics[$MC]=$(cat /dev/random | LC_CTYPE=LC_ALL tr -dc "[:alpha:]" | head -c 16)

	let MC=MC+1

done



POINTS=100
COUNTER=0
#generate coordinates values
 while [  $COUNTER -lt $POINTS ]; do

 	long=$(($RANDOM %361-180))"."$(($RANDOM % 32767))
 	lat=$(($RANDOM %181-90))"."$(($RANDOM % 32767))
	metric_value=$(($RANDOM % $MCC))
 	
	sleep($(($RANDOM % 5)))
	exec_str="echo \""${metrics[$metric_value]}"|"$lat","$long"|10@0.1\"  | nc -u -w0 192.168.7.133 8190"

 	eval $exec_str
 	let COUNTER=COUNTER+1 


 done
