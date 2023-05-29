import { useEffect, useState } from 'react';
import { useAuth } from '../../context/auth-context';
import { ActiveChat, Chat, userType } from '../../types';
import Avatar from '../Avatar';

export default function IndividualInboxChat({
  chat,
  id,
}: {
  chat: ActiveChat;
  id: number;
}) {
  const { user } = useAuth();
  const getUser = (users: userType[]) => {
    let thisUser: userType = user;
    users.forEach((aUser) => {
      if (aUser?._id !== user?._id) {
        thisUser = aUser;
      }
    });
    return thisUser;
  };
  const getTimeDifference = (chat: Chat) => {
    let sentTime = new Date(chat.sentTime);
    let leftTime = Math.ceil(new Date().getSeconds() - sentTime.getSeconds());
    if (leftTime < 10) {
      return 'Just a few seconds ago';
    } else if (60 > leftTime && leftTime > 10) {
      return leftTime + 's ago';
    } else if (leftTime < 3600) {
      return Math.ceil(leftTime / 60) + 'min ago';
    } else {
      return Math.ceil(leftTime / 3600) + 'hr ago';
    }
  };
  const [timeDifference, setTimeDifference] = useState(
    getTimeDifference(chat.chats.length > 1 ? chat.chats[-1] : chat.chats[0])
  );
  useEffect(() => {
    setInterval(() => {
      setTimeDifference(
        getTimeDifference(
          chat.chats.length > 1 ? chat.chats[-1] : chat.chats[0]
        )
      );
    }, 60000);
  }, []);
  return (
    <li
      key={id + '-chat'}
      className={`py-5 ${
        chat.chats.length > 1
          ? chat.chats[-1].status === 'unread'
            ? 'font-bold text-indigo-600'
            : ''
          : chat.chats[0].status === 'unread'
          ? 'font-bold text-indigo-600'
          : ''
      }  border-b grid gap-[10px] cursor-pointer grid-cols-[auto_1fr] px-3 transition hover:bg-indigo-100`}
    >
      <div className="grid">
        <Avatar
          className="overflow-hidden grid w-[50px] h-[50px] rounded-full"
          userAvatar={{
            seed: getUser(chat.users)?.seed || '',
            stripe: getUser(chat.users)?.stripe || '',
            backgroundColor: getUser(chat.users)?.backgroundColor || '',
          }}
        />
      </div>
      <div className="grid">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">
            {chat.users.map((auser, id) =>
              auser?._id !== user?._id
                ? auser?.firstName + ' ' + auser?.lastName
                : ''
            )}
          </h3>
          <p className="text-md text-gray-400">{timeDifference}</p>
        </div>
        <div className="text-md italic">
          {chat.chats.length > 1 ? chat.chats[-1].body : chat.chats[0].body}
        </div>
      </div>
    </li>
  );
}
