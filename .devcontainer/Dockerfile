# Use an official runtime as a parent image
FROM mcr.microsoft.com/vscode/devcontainers/base:ubuntu

# Set the working directory in the container
WORKDIR /workspace

# Install any dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    # Add other packages here
    && apt-get clean -y && rm -rf /var/lib/apt/lists/*

# Copy the local code to the container's workspace.
COPY . /workspace/
