#!/bin/bash
echo "Starting search stress..."
while true; do
  curl -s -X GET "localhost:9200/loadtest/_search" -H 'Content-Type: application/json' -d '{
    "query": {
      "wildcard": {
        "text": {
          "value": "*a*"
        }
      }
    },
    "sort": ["_score"]
  }' > /dev/null
done
