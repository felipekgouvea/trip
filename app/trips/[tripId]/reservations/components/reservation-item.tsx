import { Card, CardContent } from '@/app/_components/ui/card'
import { Separator } from '@/app/_components/ui/separator'
import { Prisma } from '@prisma/client'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import ReservationTripDetails from './reservation-trip-details'
import ReservationPaymentInfo from './reservation-payment-info'

interface ReservationItemProps {
  reservation: Prisma.TripReservationGetPayload<{
    include: {
      trip: true
    }
  }>
}

const ReservationItem = ({ reservation }: ReservationItemProps) => {
  const { trip, status, startDate, endDate, guests, totalPaid } = reservation

  return (
    <>
      {/* CARD */}
      <div className="mt-5">
        <Card className="bg-white shadow-md shadow-muted-foreground">
          <CardContent>
            <ReservationTripDetails trip={trip} status={status} />
            <Separator className="mb-5 mt-5 bg-muted-foreground opacity-50" />
            <div className="mt-5 space-y-5">
              <h4 className="mb-3 text-sm font-semibold text-primary-DARK">
                Sobre a viagem
              </h4>
              <div>
                <span>Data </span>
                <div className="flex">
                  <p>
                    {format(startDate, " dd 'de' MMMM ", {
                      locale: ptBR,
                    })}
                  </p>
                  {' - '}
                  <p>
                    {format(endDate, " dd 'de' MMMM ", {
                      locale: ptBR,
                    })}
                  </p>
                </div>
              </div>

              <div>
                <span>Hópedes</span>
                <p>{guests} hóspedes</p>
              </div>
            </div>
            <Separator className="mb-5 mt-5 bg-muted-foreground opacity-50" />
            <ReservationPaymentInfo totalPaid={Number(totalPaid)} />
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default ReservationItem
