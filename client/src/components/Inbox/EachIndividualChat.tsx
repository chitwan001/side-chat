import { createRef, useEffect, useState } from 'react';
import { useAuth } from '../../context/auth-context';
import { ActiveChat, userType } from '../../types';
import Avatar from '../Avatar';
import EachChatComponent from './EachChatComponent';

export default function EachIndividualChat({
  selectedChat,
}: {
  selectedChat: ActiveChat;
}) {
  const { user } = useAuth();
  const getUser = (users: userType[]) => {
    for (let auser = 0; auser < users.length; auser++) {
      if (users[auser]?._id !== user?._id) {
        return users[auser];
      }
    }
  };
  const parentRef = createRef<HTMLDivElement>();
  const chatContentRef = createRef<HTMLDivElement>();
  const [parentHeight, setParentHeight] = useState(0);
  useEffect(() => {
    if (parentRef.current) {
      setParentHeight(parentRef.current.clientHeight - 225);
    }
  }, [parentRef]);
  useEffect(() => {
    parentRef.current?.scrollTo({ left: 0, top: parentHeight });
  }, [chatContentRef]);
  return (
    <div className="grid rounded" ref={parentRef}>
      <section className=" m-[10px] grid grid-rows-[80px_auto_125px] bg-white">
        <div className="flex justify-between items-center border-b-2">
          <div className="grid p-[15px]">
            <div className="flex space-x-4 items-center">
              <div className="grid">
                <Avatar
                  className="overflow-hidden grid w-[50px] h-[50px] rounded-full"
                  userAvatar={{
                    seed: getUser(selectedChat.users)?.seed || '',
                    stripe: getUser(selectedChat.users)?.stripe || '',
                    backgroundColor:
                      getUser(selectedChat.users)?.backgroundColor || '',
                  }}
                />
              </div>
              <div className="flex flex-col">
                <h3 className="font-semibold text-lg">
                  {selectedChat.users.map((auser, id) =>
                    auser?._id !== user?._id
                      ? auser?.firstName + ' ' + auser?.lastName
                      : ''
                  )}
                </h3>
                <p className="text-light text-gray-400">
                  {selectedChat.users.map((auser, id) =>
                    auser?._id !== user?._id ? auser?.email : ''
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            maxHeight: parentHeight + 'px',
            height: parentHeight + 'px',
          }}
          className="grid w-full max-w-full overflow-y-scroll"
        >
          <div ref={chatContentRef} className="grid m-[10px] h-auto">
            {selectedChat.chats.map((chat, id) => (
              <EachChatComponent chat={chat} id={id} />
            ))}
          </div>
        </div>
        <div className="grid">
          <section className="border grid grid-rows-[auto_1fr] gap-[5px] ml-[20px] mr-[20px] mb-[10px] rounded-xl bg-gray-50">
            <textarea
              className="w-full bg-gray-50 p-2 rounded-xl resize-none"
              placeholder="Type your reply here..."
            ></textarea>
            <div className="flex items-center justify-end mr-[10px] mb-[5px]">
              <button className="bg-purple-600 text-white px-6 py-2 rounded-xl">
                Reply
              </button>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
