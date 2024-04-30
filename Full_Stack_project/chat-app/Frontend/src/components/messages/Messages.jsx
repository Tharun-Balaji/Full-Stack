import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import useListenMessages from "../../hooks/useListenMessages";
import MessageSkeletons from "../skeletons/MessageSkeletons";
import Message from "./Message";


export default function Messages() {
  const {messages,loading} = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef();

  useEffect( () => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({behavior: "smooth"});
    }, 100)
  },[messages])
  // console.log("message => ", messages);
  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id}  ref={lastMessageRef} >
          <Message  message={message} />
          </div>
        ))}
      {loading && [0, 1, 2].map((_, idx) => <MessageSkeletons key={idx} />)}
      {!loading && messages.length === 0 && (
        <p className="text-center">
          {" "}
          {"Send a message to start the conversation"}{" "}
        </p>
      )}
    </div>
  );
}
