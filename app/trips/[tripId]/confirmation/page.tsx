'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Trip } from '@prisma/client'
import { toast } from 'sonner'
import { Button } from '@/app/_components/ui/button'
import Image from 'next/image'
import { Card, CardContent } from '@/app/_components/ui/card'
import { Separator } from '@/app/_components/ui/separator'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import ReactCountryFlag from 'react-country-flag'
import { createReservation } from '@/app/api/actions/reservation'

const TripConfirmation = ({ params }: { params: { tripId: string } }) => {
  const [trip, setTrip] = useState<Trip | null>()
  const [totalPrice, setTotalPrice] = useState<number>(0)

  const router = useRouter()

  const { status, data } = useSession()

  const searchParams = useSearchParams()

  useEffect(() => {
    const fetchTrip = async () => {
      const response = await fetch(`/api/trips/check`, {
        method: 'POST',
        body: JSON.stringify({
          tripId: params.tripId,
          startDate: searchParams.get('startDate'),
          endDate: searchParams.get('endDate'),
        }),
      })

      const res = await response.json()

      if (res?.error) {
        return router.push('/')
      }

      setTrip(res.trip)
      setTotalPrice(res.totalPrice)
    }

    if (status === 'unauthenticated') {
      router.push('/')
    }

    fetchTrip()
  }, [status, searchParams, params, router])

  if (!trip) return null

  const handleReservationClick = async () => {
    if (!data?.user) return

    const guestsReservation = parseInt(guests)
    try {
      await createReservation(
        endDate,
        startDate,
        totalPrice,
        guestsReservation,
        trip.id,
        (data.user as any).id,
      )
      toast.success('Reserva realizada com sucesso.')
    } catch (error) {
      toast.error('Error ao fizalizar a reserva')
    }
  }

  const startDate = new Date(searchParams.get('startDate') as string)
  const endDate = new Date(searchParams.get('endDate') as string)
  const guests = searchParams.get('guests')

  return (
    <div className="p-5">
      <h1 className="text-xl font-semibold">Sua viagem</h1>
      {/* CARD */}
      <div className="mt-5">
        <Card className="bg-white shadow-lg">
          <CardContent>
            <div className="flex gap-5">
              <div className="relative mt-3 h-[106px] w-[154px]">
                <Image
                  src={trip.coverImage}
                  alt={trip.name}
                  fill
                  className="rounded-xl object-cover"
                />
              </div>
              <div className="flex w-full flex-col justify-center">
                <h3 className="font-semibold text-primary-DARK">{trip.name}</h3>
                <div className="flex items-center gap-1">
                  <ReactCountryFlag countryCode={trip.countryCode} svg />
                  <p className="text-xs">{trip.location}</p>
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
                  R$ {totalPrice}
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
            <p>{format(startDate, " dd 'de' MMMM ", { locale: ptBR })}</p>
            {' - '}
            <p>{format(endDate, " dd 'de' MMMM ", { locale: ptBR })}</p>
          </div>
        </div>

        <div>
          <span>Hópedes</span>
          <p>{guests} hóspedes</p>
        </div>

        <Button onClick={handleReservationClick} className="w-full text-white">
          Finalizar reserva
        </Button>
      </div>
    </div>
  )
}

export default TripConfirmation
