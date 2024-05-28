import { Prisma } from '@prisma/client'

interface TripConfirmationItem {
  reservation: Prisma.TripReservationGetPayload<{
    include: {
      trip: true
    }
  }>
}

const TripConfirmationItem = ({ reservation }: TripConfirmationItem) => {
  return <div></div>
}

export default TripConfirmationItem
