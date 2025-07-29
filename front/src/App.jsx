import Header from './components/Header'
import List from './components/List'
import { CommentsProvider } from './context/comments'
import { FilterProvider } from './context/filters'
import { TodoProvider } from './context/todo'

function App() {
  return (
    <FilterProvider>
      <TodoProvider>
        <CommentsProvider>
          <Header />
          <List />
        </CommentsProvider>
      </TodoProvider>
    </FilterProvider>
  )
}

export default App
