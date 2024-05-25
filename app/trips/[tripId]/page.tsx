const TripDetails = ({ params }: { params: { tripId: string } }) => {
  return <h2>{params.tripId}</h2>
}

export default TripDetails
