#!/bin/bash

endpoint=staging.eastafricacoffee.org

microservices=( "traceability-api" )

for m in "${microservices[@]}"
do
    wget -O "$m.json" "https://$endpoint/$m/api/swagger.json"
    npx sw2dts "$m.json" > "src/interfaces/$m.ts"
    rm "$m.json"
done
