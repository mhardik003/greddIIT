import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
  conversationId: {
    type: String,
  },
  sender: {
    type: String,
  },
  message_text: {
    type: String,
  },
  timestamps: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
