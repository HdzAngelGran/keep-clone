import { useFilter } from '../hooks/useFilter'
import Funnel from '../assets/Funnel'
import './Header.css'
import { FILTER_BUTTONS } from '../const'
import { FilterValue } from '../types'

function Header() {
  const { filter, setFilter } = useFilter()

  return (
    <header>
      <h1>ToDo List</h1>
      <nav className="filter">
        <div className="funnel">
          <Funnel width={'1rem'} height={'1rem'} />
        </div>
        {Object.entries(FILTER_BUTTONS).map(([key, { literal }]) => {
          const filterSelected = filter == key
          return (
            <span
              key={key}
              data-active={filterSelected}
              onClick={() => setFilter(key as FilterValue)}
            >
              {literal}
            </span>
          )
        })}
      </nav>
    </header>
  )
}

export default Header
