import { db } from '@/app/_lib/prisma'
import TripImage from './components/trip-image'
import TripInfo from './components/trip-info'
import TripForm from './components/trip-form'
import TripDescription from './components/trip-description'
import TripLocation from './components/trip-location'

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
        <TripForm />
        <TripDescription trip={trip} />
        <TripLocation trip={trip} />
      </div>
    </div>
  )
}

export default TripPage
