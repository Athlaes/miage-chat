import { WebSocket } from "ws";
import { wsChannels } from "../index";
import { db } from "../data/database";
import { Request } from "express";
import { messageDao } from "../data/dao/messages.dao";

const controller: any = {};

controller.ws = (ws: WebSocket, req: Request) => {
  doOnConnection(ws, req);

  ws.on("error", console.error);

  ws.on("message", (data: any) => {
    data = JSON.parse(data);
    data.authorId = data.user.id;
    data.channelId = data.channel.id;
    db.models.Message.create(data)
      .then((created) => {
        messageDao
          .findOneById(created.toJSON().id)
          .then((res: any) => {
            wsChannels[req.params.channelName].forEach((subscriber: WebSocket) => {
              if (subscriber.OPEN) {
                subscriber.send(JSON.stringify(res));
              }
            });
          })
          .catch((err: any) => console.log(err));
      })
      .catch((err: any) => {
        console.log(err);
      });
  });
};

const doOnConnection = (ws: WebSocket, req: Request) => {
  if (!wsChannels[req.params.channelName]) {
    wsChannels[req.params.channelName] = [ws];
  } else {
    wsChannels[req.params.channelName].push(ws);
  }

  console.log("new connection to Channel : ", req.params.channelName)

  messageDao
    .getAllMessagesFromChannelName(req.params.channelName)
    .then((res: any) => ws.send(JSON.stringify(res)))
    .catch((err: any) => {
      console.log(err);
    });
};

export const webSocketController = controller;
