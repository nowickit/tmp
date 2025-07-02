#!/bin/bash
echo "Starting force merges..."
while true; do
  curl -s -X POST "localhost:9200/loadtest/_forcemerge?max_num_segments=1" > /dev/null
done
