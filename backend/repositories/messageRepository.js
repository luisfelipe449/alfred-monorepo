import { Messages } from "../models/message.model.js";

export const getMessages = async () => {
  const messages = await Messages.findAll();
  console.log(messages);
  return messages;
};
