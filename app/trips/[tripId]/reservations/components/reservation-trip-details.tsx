import { Badge } from '@/app/_components/ui/badge'
import { Trip, TripStatus } from '@prisma/client'
import Image from 'next/image'
import ReactCountryFlag from 'react-country-flag'

interface ReservationTripDetailsProps {
  trip: Trip
  status: TripStatus
}

const ReservationTripDetails = ({
  trip,
  status,
}: ReservationTripDetailsProps) => (
  <>
    <div className="flex gap-5">
      <div className="relative mt-3 h-[106px] w-[154px]">
        <Image
          src={trip.coverImage}
          alt={`Imagem da viagem ${trip.name}`}
          fill
          className="rounded-xl object-cover"
        />
      </div>
      <div className="relative flex w-full flex-col justify-center">
        <h3 className="font-semibold text-primary-DARK">{trip.name}</h3>
        <div className="flex items-center gap-1">
          <ReactCountryFlag countryCode={trip.countryCode} svg />
          <p className="text-xs">{trip.location}</p>
        </div>
        <div className="absolute right-0 top-2 text-white">
          <Badge className="hover:bg-primary">{status}</Badge>
        </div>
      </div>
    </div>
  </>
)

export default ReservationTripDetails
