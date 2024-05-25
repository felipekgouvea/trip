import Image from 'next/image'

const Footer = () => {
  return (
    <div className="mt-10 bg-[#F5F5F5] py-5">
      <footer className=" flex flex-col items-center gap-1">
        <Image
          src="/logo.png"
          alt="Logo Marca do APP"
          width={106}
          height={23}
        />
        <p className="text-xs font-semibold text-primary-DARK">
          Todos os direitos reservados.
        </p>
      </footer>
    </div>
  )
}

export default Footer
