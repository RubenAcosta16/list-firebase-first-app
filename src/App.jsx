import {useNavigate} from 'react-router-dom'

function App() {
  const navigate=useNavigate()

  function handleClick(){
    navigate("/dashboard")
  }
  
  return (
   <div>
    <button onClick={handleClick}>ir</button>
   </div>
  )
}

export default App
