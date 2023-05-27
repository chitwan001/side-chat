import SideNav from '../components/SideNav';

export default function Home() {
  return (
    <div className="grid mx-auto my-auto w-full h-full grid-flow-col grid-cols-[auto_1fr]">
      <div className="grid bg-gray-50 dark:bg-gray-500">
        <SideNav />
      </div>
    </div>
  );
}
