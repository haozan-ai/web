FROM --platform=linux/amd64 node:19-bullseye-slim

WORKDIR /app

COPY . .

RUN yarn global add pnpm
RUN pnpm install
RUN pnpm run build

EXPOSE 3000

CMD ["yarn","start"]
