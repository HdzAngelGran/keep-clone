import Header from './components/Header'
import List from './components/List'
import { FilterProvider } from './context/filters'
import { TodoProvider } from './context/todo'

function App() {
  return (
    <FilterProvider>
      <TodoProvider>
        <Header />
        <List />
      </TodoProvider>
    </FilterProvider>
  )
}

export default App
