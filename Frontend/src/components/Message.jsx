import React, { forwardRef } from 'react';

const Message = forwardRef(({ message }, ref) => {
  const authUser = JSON.parse(localStorage.getItem("ChatApp"));
  const itsMe = message.senderId === authUser.user._id;

  const chatName = itsMe ? "justify-end" : "justify-start";
  const bgColor = itsMe ? "bg-blue-500 text-white" : "bg-slate-300";



  return (
    <div className="p-4">
      <div className={`flex ${chatName}`}>
        <div className={`rounded-2xl m-2 p-2 px-4 w-auto max-w-xs ${bgColor}`} ref={ref}>
          {message.message}
        </div>
      </div>
    </div>
  );
});

export default Message;
