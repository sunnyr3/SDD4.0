# SDD4.0

## Developers
* Sunny Ruan
* Pengqin Wu
* Houming Zhu
* Asura Shen
* Zhicheng Guo

## Development Setup

The recommended development environment uses Docker and Docker Compose. This allows for quick setup and guaranteed consistency between different os.

### Setup for the first time
#### For Windows
1. Install [Docker Desktop](https://docs.docker.com/docker-for-windows/install/), and run it after installation.
2. Open PowerShell, run `docker-compose build` in the project directory. This will build, start and attach the containers for each service.

#### For MaxOs
1. Install [Docker Desktop](https://docs.docker.com/docker-for-mac/install/), and run it after installation.
2. Open terminal, run `docker-compose build` in the project directory.

## Development Process
1. Run `docker-compose up` to start all services.
2. Hack
3. `ctrl+c` to exit docker, and run `docker-compose down` when you are done working. Docker is sometimes resource intensive, so it's best to shut down your containers when you are not working on project.

## Services
Right now, docker-compose initiates 2 services:
1. `server` contains API backend.
2. `client` is React JS frontend.
3. *database will be added.*