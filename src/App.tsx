import { TaskForm } from "./components/TaskForm"
import { TaskList } from "./components/TaskList"
function App() {

  return (
    <>
      <h1 className="text-4xl font-bold">CEFIM Task App</h1>
      <TaskForm />
      <TaskList />
    </>
  )
}

export default App