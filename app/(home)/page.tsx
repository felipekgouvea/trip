import QuickSearch from './components/quicks/quick-search'
import TripeSearch from '../_components/trips/tripe-search'
import TripsRecommended from '../_components/trips/trips-recommended'

export const metadata = {
  title: 'HomePage',
}

const HomePage = () => {
  return (
    <div>
      <TripeSearch />
      <QuickSearch />
      <TripsRecommended />
    </div>
  )
}

export default HomePage
