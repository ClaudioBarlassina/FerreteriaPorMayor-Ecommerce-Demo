import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Success from "./pages/Success"
import useAuthListener from "./components/LayoudShopLogin/hooks/useAuthListerner" 
import { use } from "react"




function App() {
useAuthListener() // 🔐 Escucha cambios de autenticación
  return (
    <div className="app">
   
     

       <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/success" element={<Success />} />
     
      <Route path="/productos" element={"<Productos />"} />
      <Route path="/carrito" element={"<Carrito />"} />
      <Route path="/producto/:id" element={"<Detalle />"} />
      <Route path="/contacto" element={"<Contacto />"} />
 

    </Routes>
    </div>
  )
}

export default App
