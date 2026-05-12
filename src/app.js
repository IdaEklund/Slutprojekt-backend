import express from 'express';
import routes from './routes/routes.js'
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(express.json()); 

app.use('/api/spel', routes);
//Om en request inte matchar ovanstående routes:
app.use((req, res) => {
  res.status(404).json({ error: "Sidan hittades inte." });
});

app.use(errorHandler);


export default app;