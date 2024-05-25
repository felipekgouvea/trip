import { Trip } from '@prisma/client'
import { db } from '../../_lib/prisma'
import TripItem from './trip-item'

const TripsRecommended = async () => {
  const trips = await db.trip.findMany({})

  return (
    <div className="flex flex-col items-center gap-8">
      {trips.map((trip: Trip) => (
        <TripItem key={trip.id} trip={trip} />
      ))}
    </div>
  )
}

export default TripsRecommended
