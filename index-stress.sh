#!/bin/bash
echo "Starting indexing loop..."
for i in {1..100000}; do
  curl -s -X POST "localhost:9200/loadtest/_doc" -H 'Content-Type: application/json' -d "{\"text\": \"$(openssl rand -hex 64)\"}" > /dev/null
done
