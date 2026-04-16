import React from 'react'
import { useEffect, useState } from 'react'
import { getProducts } from '../api/products.api.js'
import LayoudShopLogin from '../components/LayoudShopLogin/LayoudShop.jsx'
import AuthComponent from "../components/LayoudShopLogin/components/AuthModal/AuthComponent.jsx"
import Paginas from '../components/Paginacion/Paginacion.jsx'
import Filtros from '../components/FiltroAutomatico/FiltroAut.jsx'
import Grid from '../components/Grid-Cuadricula/Grid.jsx'
import Card from "../components/Card1-Ecom/Card.jsx"
import logo from "../../public/logo.webp"
import useStore from '../store/useStore2.js'

import { use } from 'react'

const Home = () => {
  const [cartOpen, setCartOpen] = useState(false)
  const [products, setProducts] = useState([])
  const[onSearch, setOnSearch] = useState("")
  const [pag, setPag] = useState({})
  const [es, setes] = useState(1)
 
  const [valores, setvalores] = useState({
    category: '',
    brand: '',
    price: '',
    name: '',
  })

const addCarrito = useStore(state => state.addCarrito)
const Productos = useStore(state => state.Carrito)
const addAumentar = useStore(state => state.addAumentar) 
const addDisminuir = useStore(state => state.addDisminuir)
const addEliminar = useStore(state => state.addEliminar)
const user = useStore(state => state.user)
const logout = useStore(state => state.logout)


  useEffect(() => {
    
    getProducts({  categoria: valores.category, page: es, marca: valores.brand, nombre: onSearch }) // opcional: filtros
      .then((res) => {
        // tu backend devuelve JSON
        const prods = res.data.products || res.data
       
        setProducts(prods.data)
        setPag(prods)


      })
      .catch((err) => console.error('Error al cargar productos:', err))
  }, [valores, es, onSearch])


  const handler = (product) => {
    console.log("Agregar al carrito:", product)
    addCarrito(product)
    setCartOpen(true)
  }

  return (

    
    <div className="home">

    <LayoudShopLogin onSearch={setOnSearch} 
    logo={logo} 
    prod={Productos} 
    cartOpen={cartOpen} 
    setCartOpen={setCartOpen} 
    incr={addAumentar} 
    decr={addDisminuir} 
    elim={addEliminar} 
    user={user} 
    logout={logout} 
    authComponent={<AuthComponent />}
   filtroMenuLa={<Filtros
        filters={[
          {
            name: 'category',
            label: 'Categoría',
            options: ['Maquinaria', 'Herramientas Eléctricas', 'Limpieza Industrial', 'Herramientas Manuales', 'Medición', 'Jardinería', 'Construcción', 'Cerrajería', 'Herrajes', 'Pinturas', 'Abrasivos', 'Pegamentos', 'Selladores', 'Electricidad', 'Plomería', 'Seguridad', 'Cercas', 'Fijaciones', 'Accesorios', 'Lubricantes']
          },
          {
            name: 'brand',
            label: 'Marca',
            options: ['Caterpillar', 'Campbell Hausfeld', 'Lincoln Electric', 'Kärcher', 'Makita', 'Truper', 'DeWalt', 'Stanley', 'Lufkin', 'PB Swiss', 'Vise-Grip', 'Bosch', 'Empire', 'Starrett', 'Bahco', 'Bellota', 'Tramontina', 'Felco', 'Yale', 'Master Lock', 'Hager', 'Sherwin Williams', 'Harris', 'Wooster', '3M', 'Resistol', 'Sika', 'Leviton', 'Philips', 'Condumex', 'Pavco', 'Krylon', 'Grival', 'Vaughan', 'Mayhew', 'West Chester', 'MSA', 'Uvex', 'Werner', 'Deacero', 'Aceros', 'Mezcla', 'Fisher', 'Marshalltown', 'Purdy', 'Milwaukee', 'Irwin', 'WD-40', 'Hilti']
          },
          {
            name: 'price',
            label: 'Precio',
            options: [
              { 'menor de $100000': 100000 }, //  se puede agregar objetos
              { 'Hasta  $300.000': 300000 },
              { 'Hasta  $500.000': 500000 },
            ],
          },
        ]}
        onChange={setvalores}
      />}
    >
   <div style={{marginTop:210}}>

    <div className="filtro-desktop" style={{
  
    position: 'fixed',
    top:75,
    left: 0,
    width: '100%',
    zIndex: 1000,
    background: 'rgba(255, 255, 255, 0.36)', // opcional (semi transparente)
    backdropFilter: 'blur(5px)', // efecto vidrio (opcional)
  }}>
      <Filtros
        filters={[
          {
            name: 'category',
            label: 'Categoría',
            options: ['Maquinaria', 'Herramientas Eléctricas', 'Limpieza Industrial', 'Herramientas Manuales', 'Medición', 'Jardinería', 'Construcción', 'Cerrajería', 'Herrajes', 'Pinturas', 'Abrasivos', 'Pegamentos', 'Selladores', 'Electricidad', 'Plomería', 'Seguridad', 'Cercas', 'Fijaciones', 'Accesorios', 'Lubricantes']
          },
          {
            name: 'brand',
            label: 'Marca',
            options: ['Caterpillar', 'Campbell Hausfeld', 'Lincoln Electric', 'Kärcher', 'Makita', 'Truper', 'DeWalt', 'Stanley', 'Lufkin', 'PB Swiss', 'Vise-Grip', 'Bosch', 'Empire', 'Starrett', 'Bahco', 'Bellota', 'Tramontina', 'Felco', 'Yale', 'Master Lock', 'Hager', 'Sherwin Williams', 'Harris', 'Wooster', '3M', 'Resistol', 'Sika', 'Leviton', 'Philips', 'Condumex', 'Pavco', 'Krylon', 'Grival', 'Vaughan', 'Mayhew', 'West Chester', 'MSA', 'Uvex', 'Werner', 'Deacero', 'Aceros', 'Mezcla', 'Fisher', 'Marshalltown', 'Purdy', 'Milwaukee', 'Irwin', 'WD-40', 'Hilti']
          },
          {
            name: 'price',
            label: 'Precio',
            options: [
              { 'menor de $100000': 100000 }, //  se puede agregar objetos
              { 'Hasta  $300.000': 300000 },
              { 'Hasta  $500.000': 500000 },
            ],
          },
        ]}
        onChange={setvalores}
      />
      
        <Paginas totalPaginas={pag.pages} pagina={pag.page} handler={setes} />
      </div>
      
        <Grid minWidth={200} gap={10}  >
        {products?.map((product) => (
          <Card   key={product.id} title={product.nombre} price={product.precio} image={product.imagen}   action={
            <button style={{ height: 35, borderRadius: 15 }} onClick={()=> handler(product) }>
                  Agregar al carrito
                </button>
              }/>
            ))}
      </Grid>

   
</div>

       
      </LayoudShopLogin>      

    </div>
  )
}

export default Home
