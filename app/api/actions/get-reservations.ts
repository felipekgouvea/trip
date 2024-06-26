'use server'

import { db } from '@/app/_lib/prisma'

export const getReservations = async (userId: string) => {
  const reservations = await db.tripReservation.findMany({
    where: {
      userId,
    },
    orderBy: {
      startDate: 'asc',
    },
    include: {
      trip: true,
    },
  })

  return reservations
}
