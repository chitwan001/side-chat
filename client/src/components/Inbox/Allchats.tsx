import { useEffect, useState } from 'react';
import { useAuth } from '../../context/auth-context';
import { ActiveChat, Chat, userType } from '../../types';
import Avatar from '../Avatar';
import IndividualInboxChat from './IndividualInboxChat';
export default function Allchats({
  parentRef,
}: {
  parentRef: React.RefObject<HTMLDivElement>;
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

  return (
    <div
      style={{ height: `${parentHeight}px` }}
      className={`grid pt-[10px] pl-[10px] overflow-y-scroll`}
    >
      {user ? (
        <section className="flex flex-col pt-3 pr-[10px] w-full bg-gray-50 min-h-full max-h-fit">
          <label className="px-3">
            <input
              className="rounded-lg p-4 bg-gray-100 transition duration-200 focus:outline-none focus:ring-2 w-full"
              placeholder="Search..."
            />
          </label>

          <ul className="mt-6">
            {activeChats.map((chat, id) => (
              <IndividualInboxChat id={id} chat={chat} />
            ))}
          </ul>
        </section>
      ) : (
        <></>
      )}
    </div>
  );
}
