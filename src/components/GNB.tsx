import SideMenuButton from "./SideMenuButton";

export default async function GNB() {
  return (
    <header className='bg-background-1'>
      <nav className='p-3'>
        <div className='flex'>
          <SideMenuButton />
          <h2 className='text-white'>TOONS</h2>
        </div>
      </nav>
    </header>
  );
}
