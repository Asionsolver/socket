import { IoIosSend } from "react-icons/io";

const MessageInputBox = () => {
  return (
    <div className="border-neutral flex w-full items-center justify-between border-t">
      <input
        type="text"
        placeholder="Type a message here..."
        className="w-full p-5 ring-0 outline-none"
      />

      <button className="hover:bg-neutral border-neutral mr-6 rounded-full border p-2">
        <IoIosSend color="white" size={25} />
      </button>
    </div>
  );
};

export default MessageInputBox;
