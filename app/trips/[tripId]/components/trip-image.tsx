import Image from 'next/image'

interface TripImageProps {
  coverImage: string
  name: string
}

const TripImage = ({ coverImage, name }: TripImageProps) => {
  return (
    <div className="relative h-[208px] w-full">
      <Image src={coverImage} alt={name} fill className="object-cover" />
    </div>
  )
}

export default TripImage
