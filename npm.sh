#!/bin/bash
docker run -v $PWD:/code -w /code -it --rm node:latest npm $@