import { HomeIcon, HotelIcon, TractorIcon, WarehouseIcon } from 'lucide-react'

const QuickSearch = () => {
  return (
    <div className="mx-auto p-5">
      <div className="flex items-center">
        <div className="h-[1px] w-full bg-gray-300"></div>
        <h2 className="whitespace-nowrap px-5 text-sm font-normal text-secondary">
          Tente pesquisar por
        </h2>
        <div className="h-[1px] w-full bg-gray-300"></div>
      </div>

      <div className="mt-5 flex w-full justify-between">
        <div className="flex flex-col items-center gap-1">
          <HotelIcon size={35} className="text-secondary" />
          <p className="text-sm text-secondary">Hotel</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <TractorIcon size={35} className="text-secondary" />
          <p className="text-sm text-secondary">Fazenda</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <HomeIcon size={35} className="text-secondary" />
          <p className="text-sm text-secondary">Chalé</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <WarehouseIcon size={35} className="text-secondary" />
          <p className="text-sm text-secondary">Pousada</p>
        </div>
      </div>
    </div>
  )
}

export default QuickSearch
