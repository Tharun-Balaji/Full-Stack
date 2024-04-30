import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId,io } from "../socket/socket.js";



export async function sendMessage(request,response){
    // console.log("Message sent", request.params.id);
    try {
        const {message} = request.body;
        const {id: receiverId} = request.params;
        const senderId = request.user._id;

        let conversation = await Conversation.findOne({
            participants:{
                $all : [senderId, receiverId]
            }
        });

        if (!conversation){
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            });
        }

        const newMessage = new Message({ 
            senderId, 
            receiverId, 
            message 
        });

        if (newMessage){
            conversation.messages.push(newMessage._id);
        }


        // await conversation.save();
        // await newMessage.save();

        //this will run in parallel
        await Promise.all([
            conversation.save(),
            newMessage.save()
        ]);

        // Socket functionality
        const receiverSocketId = getReceiverSocketId(receiverId);

        if (receiverSocketId) {
          io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        response.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in sendMessage controller =>", error.message);
        response.status(500).json({
            error: "Internal Server Error"
        });
    }
}

export async function getMessages(request, response) {
  try {
    const { id: userToChatId } = request.params;
    const senderId = request.user._id;

    const conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, userToChatId],
      },
    }).populate("messages");

    if (!conversation) {
      return response.status(200).json([]);
    }

    const messages = conversation.messages;

    response.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessage controller =>", error.message);
    response.status(500).json({
      error: "Internal Server Error",
    });
  }
}