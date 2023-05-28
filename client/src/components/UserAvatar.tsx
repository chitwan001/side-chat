import { useState } from 'react';
import parse from 'html-react-parser';
import { getUserAvatar } from '../utils/generateAvatar';
export default function UserAvatar({ className }: { className: string }) {
  const [svg, setSvg] = useState(getUserAvatar());
  return svg === '' ? (
    <div className="place-content-center grid w-[50px] h-[50px] bg-slate-300 rounded-full">
      <svg
        className="animate-spin h-[20px] w-[20px] mr-3"
        viewBox="0 0 24 24"
      ></svg>
    </div>
  ) : (
    <div className={className}>{parse(svg)}</div>
  );
}
