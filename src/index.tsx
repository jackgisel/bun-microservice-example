import {Elysia, t} from "elysia";
import { healthService } from "./services/HealthService.ts";
import { HomeLayout } from "./html/HomeLayout";
import {html} from "@elysiajs/html";

import * as elements from 'typed-html';
import {tasks} from "./db/schema";
import {TasksItem, TasksList} from "./html/Tasks.tsx";
import {eq} from "drizzle-orm";
import {getDb} from "./db";


const PORT = Number(process.env.PORT) || 3000
const db = await getDb()

export const app = new Elysia()
    .use(html())
    .use(healthService)
    .get("/", ({ html }) => {
        return html(
            <HomeLayout>
                <div
                    class='flex flex-col items-center justify-center space-y-4 root-tasks'
                    hx-get='/tasks'
                    hx-trigger='load'
                    hx-swap='innerHTML'
                ></div>
            </HomeLayout>
        )
    })
    .group("/tasks", (app) =>
        app.get("/", async () => {
            const data = await db.select().from(tasks).all();
            return <TasksList tasks={data} />
        })
            .post("/", async ({ body }) => {
                    const { title } = body
                    const task = await db.insert(tasks).values({ title }).returning().get();
                    return <TasksItem task={task} />;
                },
                {
                    body: t.Object({
                        title: t.String({ minLength: 1 }),
                    }),
                })
            .post(
                '/toggle/:id',
                async ({ params }) => {
                    const { id } = params;

                    const task = await db.select().from(tasks).where(eq(tasks.id, id)).get();

                    if (task) {
                        const newTask = await db
                            .update(tasks)
                            .set({ completed: !task.completed })
                            .where(eq(tasks.id, params.id))
                            .returning()
                            .get();
                        return <TasksItem task={newTask} />;
                    }
                },
                {
                    params: t.Object({
                        id: t.Numeric(),
                    }),
                }
            )
            .delete(
                '/:id',
                async ({ params }) => {
                    const { id } = params;
                    console.log("delete")
                    await db.delete(tasks).where(eq(tasks.id, id)).execute();

                    const data = await db.select().from(tasks).all();

                    return <TasksList tasks={data} />;
                },
                {
                    params: t.Object({
                        id: t.Numeric(),
                    }),
                }
            )
    )
    .listen(PORT);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
