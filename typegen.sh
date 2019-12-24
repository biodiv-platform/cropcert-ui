#!/bin/bash

endpoint=localhost

microservices=( "cropcert" "user" "pages" "traceability" )

for m in "${microservices[@]}"
do
    wget -O "$m.json" "http://$endpoint/$m/api/swagger.json"
    npx sw2dts "$m.json" > "types/$m.d.ts"
    rm "$m.json"
done
