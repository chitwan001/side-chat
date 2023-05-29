import { useAuth } from '../../context/auth-context';
import { Chat } from '../../types';
import UserAvatar from '../UserAvatar';

export default function EachChatComponent({
  chat,
  id,
}: {
  chat: Chat;
  id: number;
}) {
  const { user } = useAuth();
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
  return (
    <div className="grid">
      {user?._id === chat.from?._id ? (
        <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
          <div>
            <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
              <p className="text-sm">{chat.body}</p>
            </div>
            <span className="text-xs text-gray-500 leading-none">
              {getTimeDifference(chat)}
            </span>
          </div>
          <div className="flex-shrink-0 h-[40px] w-[40px] rounded-full bg-gray-300">
            <UserAvatar className="overflow-hidden rounded-full" />
          </div>
        </div>
      ) : (
        <div className="flex w-full mt-2 space-x-3 max-w-xs">
          <div className="flex-shrink-0 h-[40px] w-[40px] rounded-full bg-gray-300"></div>
          <div>
            <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
              <p className="text-sm">{chat.body}</p>
            </div>
            <span className="text-xs text-gray-500 leading-none">
              2 min ago
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
