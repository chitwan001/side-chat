import { createRef, useState } from 'react';
import Allchats from './Allchats';
import EachIndividualChat from './EachIndividualChat';
import { ActiveChat, Chat } from '../../types';

export default function Inbox() {
  const parentRef = createRef<HTMLDivElement>();
  const [selectedChat, setSelectedChat] = useState<ActiveChat | null>(null);
  return (
    <div ref={parentRef} className="grid grid-flow-col grid-cols-[1fr_2fr]">
      <Allchats setSelectedChat={setSelectedChat} parentRef={parentRef} />
      {selectedChat ? (
        <EachIndividualChat selectedChat={selectedChat} />
      ) : (
        <></>
      )}
    </div>
  );
}
