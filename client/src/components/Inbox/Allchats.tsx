import { useEffect, useState } from 'react';
import { useAuth } from '../../context/auth-context';
import { ActiveChat, Chat, userType } from '../../types';
import Avatar from '../Avatar';
import IndividualInboxChat from './IndividualInboxChat';
import NewChat from './NewChat';
export default function Allchats({
  parentRef,
  setSelectedChat,
}: {
  parentRef: React.RefObject<HTMLDivElement>;
  setSelectedChat: React.Dispatch<React.SetStateAction<ActiveChat | null>>;
}) {
  const [parentHeight, setParentHeight] = useState(
    parentRef.current?.clientHeight || 0
  );
  useEffect(() => {
    if (parentRef.current) {
      setParentHeight(parentRef.current.clientHeight);
    }
  }, [parentRef]);
  const { user } = useAuth();
  const [activeChats, setActiveChats] = useState<ActiveChat[]>([]);
  useEffect(() => {
    if (user) {
      setActiveChats(user.activeChats);
      console.log(user.activeChats);
    }
  }, [user]);
  const [newChatEnabled, setNewChatEnabled] = useState(false);
  return (
    <div
      style={{ height: `${parentHeight}px`, maxHeight: `${parentHeight}px` }}
      className={`grid pt-[10px] pl-[10px] overflow-y-scroll`}
    >
      {user ? (
        <section className="flex relative flex-col pt-3 pr-[10px] w-full bg-gray-50 min-h-full max-h-fit">
          <label className="px-3">
            <input
              className="rounded-lg p-4 bg-gray-100 transition duration-200 focus:outline-none focus:ring-2 w-full"
              placeholder="Search..."
            />
          </label>

          <ul className="mt-6">
            {activeChats.map((chat, id) => (
              <div
                className="grid"
                onClick={() => {
                  setSelectedChat(chat);
                }}
              >
                <IndividualInboxChat id={id} chat={chat} />
              </div>
            ))}
          </ul>
          {newChatEnabled ? <NewChat /> : <></>}
          <div className="grid absolute bottom-[20px] hover:bg-purple-800 cursor-pointer z-30 right-[20px] w-[60px] h-[60px] bg-purple-700 rounded-full">
            <div className="grid place-self-center font-bold text-slate-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi w-[40px] h-[40px] bi-plus"
                viewBox="0 0 16 16"
              >
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
              </svg>
            </div>
          </div>
        </section>
      ) : (
        <></>
      )}
    </div>
  );
}
