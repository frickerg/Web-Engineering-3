# Verwende ein offizielles Node.js 16 Image als Basis
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

# Installiere pnpm
RUN npm install -g pnpm

# Arbeitsverzeichnis im Container festlegen
WORKDIR /workdir

# # Kopiere 'package.json' und 'package-lock.json' (falls vorhanden)
# COPY ../package*.json ./

# Kopiere das Projektverzeichnis in das Arbeitsverzeichnis im Container
COPY . .

# COPY /home/ech70737/dotfiles.git/.bashrc .

# Installiere Projekt-Abhängigkeiten, einschließlich Entwicklungsabhängigkeiten
# RUN pnpm i
#
# # Baue das React/Vite Projekt (optional, kann auch on-the-fly beim Entwickeln geschehen)
# RUN pnpm run build

# RUN pnpm i
# RUN pnpm add @typescript-eslint/parser@latest @typescript-eslint/eslint-plugin@latest


# Der Port, auf dem der Container lauscht
EXPOSE 3000

# Führe den Vite Dev-Server aus
CMD ["/bin/bash", "--", "/root/entry.sh" ]
# CMD ["pnpm", "run", "dev", "/bin/bash", "--", "/root/entry.sh" ]
COPY ./entry.sh /root/entry.sh
