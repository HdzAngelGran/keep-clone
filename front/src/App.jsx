import List from './components/List'
import { TodoProvider } from './context/todo'

function App() {
  return (
    <TodoProvider>
      <List />
    </TodoProvider>
  )
}

export default App
