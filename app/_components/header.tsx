import Image from "next/image";

const Header = () => {
  return ( 
    <header className="flex items-center justify-between px-5 py-5 bg-white">
      <Image
        src='/logo.png'
        alt="Logo Marca da empresa"
        width='183'
        height='32'
      />
      <span className="text-[#590BD8] font-semibold text-sm">Login</span>
    </header>
   );
}
 
export default Header;