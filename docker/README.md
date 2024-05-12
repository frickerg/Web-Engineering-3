# Docker Environment

## Setup

### Building the Docker Image
To build the image locally, run the following command in the root directory of this project:

**Docker**:

```bash
docker build -t <image-name> .
```

**Docker compose**:

```bash
docker compose build
```

### Running the Container

**Docker**:

```bash
docker run -it <image-name> .
```

**Docker compose**:

```bash
docker compose up -d
docker compose attach <image-name>
```

**Devcontainer VSCode**:

```bash
code .
```

perform `Open in container` inside vscode

## Development Inside the Container

### Installing Dependencies
Perform `pnpm i` inside the container to install dependencies. 
> **Note** that this will install the `.pnpm-store` in the workspace which might not be ideal.</br>
> **Potential Issues**: Running pnpm i in a directory that is mounted as a volume can lead to issues since node_modules will link back to this `.pnpm-store`. Switching between running commands inside the container and locally on the host may require re-executing `pnpm i` to ensure consistency. This is a hypothesis and needs to be verified.

### Running the Development Server

`pnpm run dev` may not work as expected because it binds to localhost which is isolated within the Docker container. Instead, use:

```bash
pnpm run dev --host
```

This command will make the development server accessible via the global IP address of the host machine, allowing devices on the same network to access the server.

## Notes

Ensure that your Docker setup correctly maps ports and volumes as needed to facilitate development.
Regularly verify the consistency and performance of your development environment to troubleshoot issues related to dependency management with Docker and pnpm.
