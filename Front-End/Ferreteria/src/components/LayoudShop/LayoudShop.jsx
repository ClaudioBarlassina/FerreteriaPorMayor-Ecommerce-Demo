import { useState } from 'react'
import styles from './LayoudShop.module.css'
import CardCarrito from '../Card1-Carrito/CardCarrito.jsx'
import CheckoutButton from '../StripeFront/CheckoutButton.jsx'
import { useNavigate } from "react-router-dom";


import btn from '../../../public/boton.png'
export default function LayoutShop({
  logo,
  children,
  onSearch,
  cartOpen,
  setCartOpen,
  prod,
  incr,
  decr,
  elim,
  user,
  logout,
  
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  
const navigate = useNavigate();
  const total = prod.reduce((acc, item) => {
    return acc + item.precio * item.cantidad
  }, 0)
  {
    console.log('Productos en carrito:', prod)
  }
  return (
    <>
      <header className={styles.navbar}>
        <span className={styles.brand}>
          <img src={logo} style={{ width: 50 }} alt="" />
        </span>

        <input
          type="text"
          className="search"
          onChange={(e) => onSearch(e.target.value)}
        />
        <div className={styles.actions}>
          
          {!user ? (
    <button onClick={() => navigate("/login")}>👤</button>
  ) : (
    <>
      <span style={{ fontSize: 12 }}>{user.email}</span>
      <button onClick={logout}>Salir</button>
    </>
  )}
          <button onClick={() => setMenuOpen(true)}>☰</button>
          <button onClick={() => setCartOpen(true)}>🛒</button>
        </div>
      </header>

      <main className={styles.content}>{children}</main>
      <div
        className={`${styles.overlay} ${menuOpen || cartOpen ? styles.overlayOpen : ''}`}
        onClick={() => {
          setMenuOpen(false)
          setCartOpen(false)
        }}
      />

      <aside className={`${styles.drawer} ${menuOpen ? styles.open : ''}`}>
        <button onClick={() => setMenuOpen(false)}>✕</button>

        <a href="/">Inicio</a>
        <a href="/productos">Productos</a>
        <a href="/contacto">Contacto</a>
      </aside>

      <aside className={`${styles.cart} ${cartOpen ? styles.open : ''}`}>
        <img src={btn} alt="Botón" style={{width:30, marginBottom:40, }} onClick={() => setCartOpen(false)}/>
        
       
        <h3 style={{borderBottom: '1px solid #ccc'}}>Carrito</h3>

        <div className={styles.cartContent}>
          {prod.map((item) => (
            <CardCarrito
              key={item.id}
              image={item.imagen}
              title={item.nombre}
              price={item.precio}
              quantity={item.cantidad}
              onIncrease={() => incr(item.id)}
              onDecrease={() => decr(item.id)}
              onRemove={() => elim(item.id)}
            />
          ))}
        </div>

        {prod.length > 0 && (
          <div className={styles.cartFooter}>
            <div className={styles.totalRow}>
              <span>Total:</span>
              <strong>U$S{total.toLocaleString()}</strong>
            </div>
             
            <div className={styles.cartButtons}>
              {/* <button
                className={styles.btnPrimary}
                onClick={() => console.log('Finalizar compra')}
              >
                Finalizar compra
              </button> */}

              <CheckoutButton
                productos={prod}
              
              />

              <button
               style={{ height: 35, borderRadius: 15 }}
                onClick={() => setCartOpen(false)}
              >
                Seguir comprando
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  )
}
