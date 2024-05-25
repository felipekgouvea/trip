import { Trip } from '@prisma/client'
import ReactCountryFlag from 'react-country-flag'

interface TripInfoProps {
  trip: Trip
}

const TripInfo = ({ trip }: TripInfoProps) => {
  return (
    <div className="space-y-1">
      <h2 className="text-lg font-bold text-primary-DARK">{trip.name}</h2>
      <div className="flex items-center gap-1">
        <ReactCountryFlag
          countryCode={trip.countryCode}
          svg
          style={{ fontSize: '.8rem' }}
        />
        <p className="text-xs">{trip.location}</p>
      </div>
      <p className="text-grayPrimary text-xs">
        <span className="font-semibold text-primary">
          R${trip.pricePerDay.toString()}
        </span>{' '}
        por noite
      </p>
    </div>
  )
}

export default TripInfo
