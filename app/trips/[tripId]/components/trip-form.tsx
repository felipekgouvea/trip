import { Button } from '@/app/_components/ui/button'
import { Input } from '@/app/_components/ui/input'
import { Separator } from '@/app/_components/ui/separator'

const TripForm = () => {
  return (
    <div className="mt-5">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Data de Ínicio"
            className=" border border-primary-GRAY"
          />
          <Input
            placeholder="Data Final"
            className=" border border-primary-GRAY"
          />
        </div>
        <Input placeholder="Hóspedes" className=" border border-primary-GRAY" />
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-sm font-medium text-primary-DARK">
          Total (7 noites)
        </span>
        <span className="text-sm font-medium text-primary-DARK">R$ 2.660</span>
      </div>

      <Button className="mb-10 mt-2 w-full text-white">Reservar agora</Button>

      <Separator className="mb-10 bg-primary-GRAY opacity-50" />
    </div>
  )
}

export default TripForm
