import { db } from '@/app/_lib/prisma'
import TripImage from './components/trip-image'
import TripInfo from './components/trip-info'
import TripDescription from './components/trip-description'
import TripLocation from './components/trip-location'
import TripReservation from './components/trip-reservation'

const TripPage = async ({ params }: { params: { tripId: string } }) => {
  const trip = await db.trip.findUnique({
    where: {
      id: params.tripId,
    },
  })

  if (!trip) return

  return (
    <div className="space-y-4">
      <TripImage coverImage={trip.coverImage} name={trip.name} />
      <div className=" px-5">
        <TripInfo trip={trip} />
        <TripReservation
          pricePerDay={Number(trip.pricePerDay)}
          tripEndDate={trip.endDate}
          tripId={trip.id}
          tripStartDate={trip.startDate}
          maxGuests={trip.maxGuests}
        />
        <TripDescription trip={trip} />
        <TripLocation trip={trip} />
      </div>
    </div>
  )
}

export default TripPage
