const pino = require("pino");
export const logger = pino({
    transport: {
        target: "pino-pretty",
    },
});

export default logger;
