import express from 'express';
import { json, urlencoded } from 'body-parser';
import { mainRouter } from "./routes/index.js";
import expressWs from 'express-ws';
import { webSocketController } from './controllers/web-socket.controller.js';

const port = process.env.PORT || 8080;
const cors = require('cors');

export const wsChannels : any = {}

const expressws = expressWs(express());
const app = expressws.app


app.use(urlencoded({ extended: true }));
app.use(json());

app.ws("/ws/messages/:channelName", webSocketController.ws);

app.use(cors({
  origin: '*'
}));
app.use('/api', mainRouter);

app.use((err : any, req : any, res : any, next : any) => {
  res.status(err.status || 400).json({
    success: false,
    message: err.message || 'An error occured.',
    errors: err.error || [],
  });
});

app.use((req : any, res : any) => {
  res.status(404).json({ success: false, message: 'Resource not found.' });
});

app.listen(port, () => console.log("Server started on port " + port));

export const application = app;
