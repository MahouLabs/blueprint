ARG NODE_VERSION=20.6.1
FROM node:${NODE_VERSION}-slim
WORKDIR /app

LABEL fly_launch_runtime="Remix"
ENV NODE_ENV="production"

# Install bun
RUN npm install -g bun

# Install dependencies
COPY package.json bun.lockb ./
RUN bun install 
# RUN bun install --production
COPY . .

# Build app
RUN bun run build

EXPOSE 3000
CMD [ "bun", "run", "start" ]
