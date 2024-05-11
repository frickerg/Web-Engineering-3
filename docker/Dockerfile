FROM node:22

# Set Time Zone
ENV TZ="Europe/Zurich"
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# SHELL [ "/bin/bash", "-euxo", "pipefail", "-c" ]

# Installs the necessary and useful tools, e.g. for accessing devices for debugging
RUN <<EOT
    apt-get -y update
    apt-get -y upgrade
    apt-get -y install git tree
    apt-get -y clean
    rm -rf /var/lib/apt/lists/*
EOT

# Install pnpm
RUN npm install -g pnpm

# Set work directory
WORKDIR /workdir

###################################################################################################
### Dieser Teil funktioniert nicht wie erwünscht. pnpm i im container manuel ausführeb!
###################################################################################################

# Copy 'package.json', 'package-lock.json' (if exists), and other neccessary files
COPY ../package*.json ../pnpm-lock.yaml ./

# Install projekt-dependencies
# RUN pnpm i
# RUN pnpm i --store=/.pnpm-store

# Copy project directory
# COPY . .

# Build React/Vite project (optional, could be also executed on-the-fly at development)
# RUN pnpm run build

###################################################################################################

# Der Port, auf dem der Container lauscht
EXPOSE 3000

# Führe den Vite Dev-Server aus
CMD ["/bin/bash", "--", "/root/entry.sh" ]
COPY ./docker/entry.sh /root/entry.sh
