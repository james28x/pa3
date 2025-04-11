import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Menu from './components/Menu'
import ValueIteration from './components/ValueIteration'
import PolicyIteration from './components/PolicyIteration'
import QLearning from './components/QLearning'
import './App.css'

function App() {
  return (
    <Router basename='/pa3'>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/value-iteration" element={<ValueIteration />} />
        <Route path="/policy-iteration" element={<PolicyIteration />} />
        <Route path="/q-learning" element={<QLearning />} />
      </Routes>
    </Router>
  )
}

export default App
