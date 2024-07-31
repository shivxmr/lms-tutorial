#!/bin/bash 

docker tag lms-tutorial-frontend:latest akarx/lms-frontend
docker tag lms-tutorial-prisma-studio:latest akarx/lms-prisma-studio
docker tag lms-tutorial-db:latest akarx/lms-db

docker push akarx/lms-frontend:latest
docker push akarx/lms-prisma-studio
docker push akarx/lms-db