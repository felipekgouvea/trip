import { HomeIcon, HotelIcon, TractorIcon, WarehouseIcon } from 'lucide-react'
import QuickSearchTitle from './quick-search-title'

const QuickSearch = () => {
  return (
    <div className="mx-auto p-5">
      <QuickSearchTitle title="Tente pesquisar por" />

      <div className="mb-5 mt-5 flex w-full justify-between">
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

      <QuickSearchTitle title="Destinos Recomendados" />
    </div>
  )
}

export default QuickSearch
