import QuickSearch from '../_components/quick-search'
import TripeSearch from '../_components/tripe-search'

export const metadata = {
  title: 'HomePage',
}

const HomePage = () => {
  return (
    <div>
      <TripeSearch />

      <QuickSearch />
    </div>
  )
}

export default HomePage
