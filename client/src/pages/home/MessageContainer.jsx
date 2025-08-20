import React from "react";
import User from "./User";
import MessageBox from "./MessageBox";
import MessageInputBox from "./MessageInputBox";

const MessageContainer = () => {
  return (
    <div className="flex h-screen w-full flex-col">
      <div className="border-neutral border-b px-3">
        <User showSettings={false} />
      </div>

      <MessageBox />

      <MessageInputBox />
    </div>
  );
};

export default MessageContainer;
