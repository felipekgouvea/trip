import { Separator } from '@/app/_components/ui/separator'
import { Button } from '@/app/_components/ui/button'
import { db } from '@/app/_lib/prisma'
import Image from 'next/image'
import ReactCountryFlag from 'react-country-flag'
import { CircleCheckIcon } from 'lucide-react'

const TripDetails = async ({ params }: { params: { tripId: string } }) => {
  const trip = await db.trip.findUnique({
    where: {
      id: params.tripId,
    },
  })

  if (!trip) return

  return (
    <div>
      <div className="relative h-[208px] w-full">
        <Image
          src={trip?.coverImage}
          alt={trip?.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="space-y-1 px-5 pt-3">
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

      <div className="px-5">
        <div></div>
        <Button className="mb-10 w-full text-white">Reservar agora</Button>

        <Separator className="mb-10 bg-primary-GRAY opacity-50" />

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

        <h3 className="mb-5 font-semibold text-primary-DARK">Localização</h3>
        <div className="relative mb-5 h-[208px] w-full">
          <Image
            src="/map.png"
            alt={trip?.name}
            fill
            className="object-cover"
          />
        </div>
        <h4 className="mb-2 text-sm font-semibold text-primary-DARK">
          {trip.location}
        </h4>
        <p className="mb-10 mt-1 text-justify text-xs text-primary-DARK">
          {trip.locationDescription}
        </p>
        <Button
          variant="outline"
          className="mb-5 w-full border-2 border-primary text-sm font-bold text-primary hover:text-primary "
        >
          Ver no Google Maps
        </Button>
      </div>

      <div className="bg-[#F5F5F5] py-5">
        <footer className="flex flex-col items-center gap-1">
          <Image
            src="/logo.png"
            alt="Logo Marca do APP"
            width={106}
            height={23}
          />
          <p className="text-xs font-semibold text-primary-DARK">
            Todos os direitos reservados.
          </p>
        </footer>
      </div>
    </div>
  )
}

export default TripDetails
