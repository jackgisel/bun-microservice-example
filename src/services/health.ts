import {Elysia} from "elysia";

function handleHealth () {
    return {
        "status": 200,
        "message": "Service is healthy"
    }
}

export const healthService = (app: Elysia) => {
    return app.group("/health", (app) =>
        app.get('/', handleHealth)
    )
}