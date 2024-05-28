import { Button } from '@/app/_components/ui/button'
import { Card, CardContent } from '@/app/_components/ui/card'
import { Separator } from '@/app/_components/ui/separator'
import { Prisma } from '@prisma/client'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Image from 'next/image'
import ReactCountryFlag from 'react-country-flag'

interface ReservationItemProps {
  reservation: Prisma.TripReservationGetPayload<{
    include: {
      trip: true
    }
  }>
}

const ReservationItem = ({ reservation }: ReservationItemProps) => {
  return (
    <>
      {/* CARD */}
      <div className="mt-5">
        <Card className="bg-white shadow-md shadow-muted-foreground">
          <CardContent>
            <div className="flex gap-5">
              <div className="relative mt-3 h-[106px] w-[154px]">
                <Image
                  src={reservation.trip.coverImage}
                  alt={reservation.trip.name}
                  fill
                  className="rounded-xl object-cover"
                />
              </div>
              <div className="flex w-full flex-col justify-center">
                <h3 className="font-semibold text-primary-DARK">
                  {reservation.trip.name}
                </h3>
                <div className="flex items-center gap-1">
                  <ReactCountryFlag
                    countryCode={reservation.trip.countryCode}
                    svg
                  />
                  <p className="text-xs">{reservation.trip.location}</p>
                </div>
              </div>
            </div>
            <Separator className="mb-5 mt-5 bg-muted-foreground opacity-50" />
            <div className="mt-5 space-y-5">
              <h4 className="mb-3 text-sm font-semibold text-primary-DARK">
                Sobre a viagem
              </h4>
              <div>
                <span>Data </span>
                <div className="flex">
                  <p>
                    {format(reservation.startDate, " dd 'de' MMMM ", {
                      locale: ptBR,
                    })}
                  </p>
                  {' - '}
                  <p>
                    {format(reservation.endDate, " dd 'de' MMMM ", {
                      locale: ptBR,
                    })}
                  </p>
                </div>
              </div>

              <div>
                <span>Hópedes</span>
                <p>{reservation.guests} hóspedes</p>
              </div>
            </div>
            <Separator className="mb-5 mt-5 bg-muted-foreground opacity-50" />

            <div>
              <h4 className="mb-3 text-sm font-semibold text-primary-DARK">
                Informações do pagamento
              </h4>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-primary-DARK">
                  Total
                </span>
                <span className="text-sm font-semibold text-primary-DARK">
                  R$ {Number(reservation.totalPaid)}
                </span>
              </div>
              <div className="mt-5 flex gap-2">
                <Button className="w-full text-white">
                  Realizar Pagamento
                </Button>
                <Button variant="destructive" className="w-full text-white">
                  Cancelar Reserva
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default ReservationItem
