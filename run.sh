#!/bin/bash

docker build -t home-decor-frontend .

docker run --name home-decor-frontend -e NEXT_PUBLIC_API_URL="http://localhost:8000" -p 3000:3000 home-decor-frontend