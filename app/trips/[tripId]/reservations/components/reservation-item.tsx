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
        <Card className="bg-white shadow-lg">
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
            <div>
              <h4 className="mb-3 text-sm font-semibold text-primary-DARK">
                Informações do preço
              </h4>
              <div className="flex items-center justify-between">
                <span className="text-sm text-primary-DARK">Total</span>
                <span className="text-sm font-semibold text-primary-DARK">
                  R$ {Number(reservation.totalPaid)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-5 space-y-5">
        <div>
          <span>Data: </span>
          <div className="flex">
            <p>
              {format(reservation.startDate, " dd 'de' MMMM ", {
                locale: ptBR,
              })}
            </p>
            {' - '}
            <p>
              {format(reservation.endDate, " dd 'de' MMMM ", { locale: ptBR })}
            </p>
          </div>
        </div>

        <div>
          <span>Hópedes</span>
          <p>{reservation.guests} hóspedes</p>
        </div>

        <Button
          // disabled={isReservationLoading}
          // onClick={handleReservationClick}
          className="w-full text-white"
        >
          {/* {isReservationLoading && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )} */}
          Finalizar reserva
        </Button>
      </div>
    </>
  )
}

export default ReservationItem
