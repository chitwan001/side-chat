import { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import { generateAndReturnAvatar } from '../utils';
export default function Avatar({
  className,
  userAvatar,
}: {
  className: string;
  userAvatar: { seed: string; stripe: string; backgroundColor: string };
}) {
  const [svg, setSvg] = useState('');
  useEffect(() => {
    async function getSvg() {
      let svg = await generateAndReturnAvatar(
        userAvatar.stripe,
        userAvatar.seed,
        userAvatar.backgroundColor
      );
      setSvg(svg);
    }
    getSvg();
  });
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
