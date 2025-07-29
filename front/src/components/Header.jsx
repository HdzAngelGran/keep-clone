import { useFilter } from '../hooks/useFilter'
import Funnel from '../assets/Funnel'
import './Header.css'

function Header() {
  const { filter, setFilter } = useFilter()

  return (
    <header>
      <h1>ToDo List</h1>
      <nav className="filter">
        <div className="funnel">
          <Funnel width={'1rem'} height={'1rem'} />
        </div>
        <span data-active={filter == 'all'} onClick={() => setFilter('all')}>
          Todos
        </span>
        <span
          data-active={filter == 'pending'}
          onClick={() => setFilter('pending')}
        >
          Pendientes
        </span>
        <span
          data-active={filter == 'completed'}
          onClick={() => setFilter('completed')}
        >
          Completadas
        </span>
      </nav>
    </header>
  )
}

export default Header
