import { Trip } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import ReactContryFlag from 'react-country-flag'

interface TripItemProps {
  trip: Trip
}

const TripItem = ({ trip }: TripItemProps) => {
  return (
    <Link href={`/trips/${trip.id}`}>
      <div className="flex flex-col gap-1">
        <div className="relative h-[300px] w-[300px] ">
          <Image
            src={trip.coverImage}
            alt={trip.name}
            fill
            className="rounded-xl object-cover"
          />
        </div>
        <h3>{trip.name}</h3>
        <div className="flex items-center gap-1">
          <ReactContryFlag countryCode={trip.countryCode} svg />
          <p>{trip.location}</p>
        </div>
        <p className="text-grayPrimary text-xs">
          <span className="font-medium text-primary">
            R${trip.pricePerDay.toString()}
          </span>{' '}
          por dia
        </p>
      </div>
    </Link>
  )
}

export default TripItem
