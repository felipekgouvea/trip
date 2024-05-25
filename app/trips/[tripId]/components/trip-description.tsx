import { Trip } from '@prisma/client'
import { CircleCheckIcon } from 'lucide-react'

interface TripDescriptionProps {
  trip: Trip
}

const TripDescription = ({ trip }: TripDescriptionProps) => {
  return (
    <div>
      <h3 className="mb-3 font-semibold text-primary-DARK">Sobre a viagem</h3>
      <p className="mb-10 mt-1 text-justify text-xs text-primary-DARK">
        {trip.description}
      </p>

      <h3 className="mb-3 font-semibold text-primary-DARK">Destaques</h3>
      <div className="mb-10 grid grid-cols-2 gap-2">
        {trip.highlights.map((highlight) => (
          <>
            <span className="flex items-center gap-1 text-xs" key={highlight}>
              <CircleCheckIcon size={14} className="text-primary" />
              {highlight}
            </span>
          </>
        ))}
      </div>
    </div>
  )
}

export default TripDescription
