'use server'

import { db } from '@/app/_lib/prisma'

export const getReservationById = async (tripId: string) => {
  const getReservation = db.tripReservation.findMany({
    where: {
      tripId,
    },
    include: {
      trip: true,
    },
  })

  return getReservation
}
