import { Elysia } from "elysia";
import { healthService } from "./services/health";

const PORT = Number(process.env.PORT) || 3000

export const app = new Elysia()
    .use(healthService)
    .get("/", () => "Hello from Bun perf testing")
    .listen(PORT);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
