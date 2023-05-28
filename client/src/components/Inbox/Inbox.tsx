import { createRef } from 'react';
import Allchats from './Allchats';

export default function Inbox() {
  const parentRef = createRef<HTMLDivElement>();
  return (
    <div ref={parentRef} className="grid grid-flow-col grid-cols-[1fr_2fr]">
      <Allchats parentRef={parentRef} />
      <div className="grid"></div>
    </div>
  );
}
