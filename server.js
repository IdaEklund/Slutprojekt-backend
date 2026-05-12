import "dotenv/config"; 
import app from "./src/app.js";
import { errorHandler } from "./src/middleware/errorHandler.js";
import { query, connect } from "./src/config/db.js";

const PORT = process.env.PORT ?? 3000;
await connect;


app.listen(PORT, () => {
  console.log(`Server körs på http://localhost:${PORT}`);
});

app.use(errorHandler);