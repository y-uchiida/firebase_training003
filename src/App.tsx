import { useState } from 'react'
import { DashBoard } from './components/DashBoard'
import { Header } from './components/Header'
import { AuthProvider } from './providers/AuthProvider'

function App() {
  const [count, setCount] = useState(0)

  return (
    <AuthProvider>
      <div className="App">
        <Header />
        <DashBoard></DashBoard>
      </div>
    </AuthProvider>
  )
}

export default App
