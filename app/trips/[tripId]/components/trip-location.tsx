import { Button } from '@/app/_components/ui/button'
import { Trip } from '@prisma/client'
import Image from 'next/image'

interface TripLocationProps {
  trip: Trip
}

const TripLocation = ({ trip }: TripLocationProps) => {
  return (
    <div>
      <h3 className="mb-5 font-semibold text-primary-DARK">Localização</h3>
      <div className="relative mb-5 h-[208px] w-full">
        <Image src="/map.png" alt={trip?.name} fill className="object-cover" />
      </div>
      <h4 className="mb-2 text-sm font-semibold text-primary-DARK">
        {trip.location}
      </h4>
      <p className="mb-10 mt-1 text-justify text-xs text-primary-DARK">
        {trip.locationDescription}
      </p>
      <Button
        variant="outline"
        className="mb-5 w-full border-2 border-primary text-sm font-bold text-primary hover:text-primary "
      >
        Ver no Google Maps
      </Button>
    </div>
  )
}

export default TripLocation
