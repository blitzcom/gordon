import React, { useContext, useState } from 'react';
import classnames from 'classnames';

import socket from '../io/context';
import useStore from '../useStore';

function MessageLauncher() {
  const io = useContext(socket);
  const [state, dispatch] = useStore();

  const chat = state.chats[state.chat];

  if (!chat) {
    return null;
  }

  const hasMessage = chat.message.length > 0;

  const launchMessage = (e) => {
    io.emit('message:push', {
      content: chat.message,
      from: state.username,
      to: state.chat,
    });

    dispatch({ type: 'chat:message:set', value: '', chat: state.chat });
  };

  const buttonClasses = classnames(
    'border-l px-4 font-bold focus:outline-none',
    {
      'text-gray-800': hasMessage,
      'text-gray-400': !hasMessage,
    },
  );

  return (
    <div className="px-3 py-3">
      <div className="flex overflow-hidden border rounded text-gray-800">
        <input
          className="w-full pl-2 py-1"
          onChange={(e) =>
            dispatch({
              type: 'chat:message:set',
              value: e.target.value,
              chat: state.chat,
            })
          }
          placeholder="Type your message"
          type="text"
          value={chat.message}
        />

        <button onClick={launchMessage} className={buttonClasses}>
          Send
        </button>
      </div>
    </div>
  );
}

export default MessageLauncher;
