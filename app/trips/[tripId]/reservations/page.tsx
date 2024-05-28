import { getReservations } from '@/app/api/actions/get-reservations'
import ReservationItem from './components/reservation-item'
import { authOptions } from '@/app/_lib/auth'
import { getServerSession } from 'next-auth'

const ReservationsPage = async () => {
  const session = await getServerSession(authOptions)

  if (!session?.user) return

  const reservations = await getReservations((session?.user as any).id)

  return (
    <div className="p-5">
      <h1>Minhas Viagens</h1>
      {reservations.map((reservation) => (
        <ReservationItem reservation={reservation} key={reservation.id} />
      ))}
    </div>
  )
}

export default ReservationsPage
