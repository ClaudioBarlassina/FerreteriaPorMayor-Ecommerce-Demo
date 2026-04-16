import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"

import useAuthListener from "./components/LayoudShopLogin/hooks/useAuthListerner" 
import { use } from "react"




function App() {
useAuthListener() // 🔐 Escucha cambios de autenticación
  return (
    <div className="app">
   
     

       <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/productos" element={"<Productos />"} />
      <Route path="/carrito" element={"<Carrito />"} />
      <Route path="/producto/:id" element={"<Detalle />"} />
      <Route path="/contacto" element={"<Contacto />"} />
 

    </Routes>
    </div>
  )
}

export default App
