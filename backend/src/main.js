import { web } from "./application/app.js";
import { logger } from "./application/logging.js";

const PORT = process.env.PORT || 3000;
web.listen(PORT, '0.0.0.0', () => {
    logger.info(`Server Connected To Port ${PORT}`)
})