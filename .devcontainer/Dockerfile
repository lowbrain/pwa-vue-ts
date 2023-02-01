ARG VERSION_TAG=latest
FROM mcr.microsoft.com/devcontainers/javascript-node:${VERSION_TAG}

# OS Setting
RUN \
    # Locale setting for JPN
    apt-get update \
    && apt-get install -y task-japanese \
    && sed -i -E 's/# (ja_JP.UTF-8)/\1/' /etc/locale.gen \
    && locale-gen ja_JP.UTF-8

# Development tools
