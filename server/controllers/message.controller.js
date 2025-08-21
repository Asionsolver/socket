import { asyncHandler } from "../utils/asyncHandler.utility.js";
import { errorHandler } from "../utils/errorHandler.utility.js";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = asyncHandler(async (req, res, next) => {
  const senderId = req.user._id;
  const receiverId = req.params.receiverId;
  const message = req.body.message;

  if (!senderId || !receiverId || !message) {
    return next(new errorHandler("Please provide all field 🚫", 400));
  }
  // Find the conversation
  let conversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
  });

  // If conversation does not exist, then create conversation
  if (!conversation) {
    conversation = await Conversation.create({
      participants: [senderId, receiverId],
    });
  }

  const newMessage = await Message.create({
    senderId,
    receiverId,
    message,
  });

  // socket.io

  if (newMessage) {
    conversation.messages.push(newMessage._id);
    await conversation.save();
  }

  res.status(200).json({
    success: true,
    responseData: newMessage,
  });
});

export const getMessage = asyncHandler(async (req, res, next) => {
  const myId = req.user._id;
  const otherParticipantId = req.params.otherParticipantId;

  if (!myId || !otherParticipantId) {
    return next(new errorHandler("Please provide all field 🚫", 400));
  }
  // Find the conversation
  let conversation = await Conversation.findOne({
    participants: { $all: [myId, otherParticipantId] },
  }).populate("messages");

  // If conversation does not exist, return empty array with a message
  if (!conversation) {
    return res.status(200).json({
      success: true,
      responseData: [],
      message: "No messages found with this user 📭",
    });
  }

  // If conversation exists but no messages
  if (!conversation.messages || conversation.messages.length === 0) {
    return res.status(200).json({
      success: true,
      responseData: [],
      message: "No messages yet with this user 📨",
    });
  }
  // Normal cas
  res.status(200).json({
    success: true,
    responseData: conversation,
  });
});
