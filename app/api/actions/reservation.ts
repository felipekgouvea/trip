'use server'

import { db } from '@/app/_lib/prisma'

export const createReservation = async (
  endDate: Date,
  startDate: Date,
  totalPaid: number,
  guests: number,
  tripId: string,
  userId: string,
) => {
  const reservation = await db.tripReservation.create({
    data: {
      endDate,
      startDate,
      totalPaid,
      guests,
      tripId,
      userId,
      status: 'PENDING',
    },
  })

  return reservation
}
