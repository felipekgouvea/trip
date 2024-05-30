import { Button } from '@/app/_components/ui/button'
import { formatCurrency } from '@/app/utils/format-currency'

interface ReservationPaymentInfoProps {
  totalPaid: number
}

const ReservationPaymentInfo = ({ totalPaid }: ReservationPaymentInfoProps) => (
  <div>
    <h4 className="mb-3 text-sm font-semibold text-primary-DARK">
      Informações do pagamento
    </h4>
    <div className="flex items-center justify-between">
      <span className="text-sm font-semibold text-primary-DARK">Total</span>
      <span className="text-sm font-semibold text-primary-DARK">
        {formatCurrency(totalPaid)}
      </span>
    </div>
    <div className="mt-5 flex gap-2">
      <Button className="w-full text-white">Realizar Pagamento</Button>
      <Button variant="destructive" className="w-full text-white">
        Cancelar Reserva
      </Button>
    </div>
  </div>
)

export default ReservationPaymentInfo
