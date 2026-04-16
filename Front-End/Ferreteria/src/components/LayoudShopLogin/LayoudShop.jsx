import { useState } from 'react'
import styles from './LayoudShop.module.css'
import CardCarrito from '../../components/Card1-Carrito/CardCarrito' 
import CheckoutButton from '../StripeFront/CheckoutButton.jsx'

import btn from './img/boton.png' // 🔥 FALTABA

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
  authComponent,
  filtroMenuLa
}) {
  const [menuOpen, setMenuOpen] = useState(false)
// 
  // 🔥 FALTABA EL TOTAL
  const total = prod.reduce((acc, item) => {
    return acc + item.precio * item.cantidad
  }, 0)
  const totalCantidad = prod.reduce((acc, item) => {
  return acc + item.cantidad
}, 0)
  
  return (
    <>
      <header className={styles.navbar}>
        <span className={styles.brand}>
          <img src={logo} style={{ width: 50}} alt="" />
        </span>

        <input
          type="text"
          className="search"
          onChange={(e) => onSearch(e.target.value)}
        />

        <div className={styles.actions}>
          <div style={{ display: 'flex', alignItems: 'center', gap:5, border: '1px solid #5e5e5e', padding: '5px 10px', borderRadius: 20 }}>

          {!user ? (
            <span style={{border: '1px solid #5e5e5e', padding: '5px 10px', borderRadius: 15, background: '#149bf5', color: 'white'}}>No logueado</span>
          ) : (
            <>
            {console.log(user)}
              <span style={{ fontSize: 12  }}>{user.displayName || user.email}</span>
              <button onClick={logout} style={{border: '1px solid #5e5e5e', padding: '5px 10px', borderRadius: 15, background: '#149bf5', color: 'white'}}>Salir</button>
            </>
          )}
          </div>

          <button onClick={() => setMenuOpen(true)}>☰</button>

          {/* 🔒 BLOQUEA CARRITO SI NO LOGIN */}
          <button onClick={() => user && setCartOpen(true)}>
            🛒
          <span>{totalCantidad}</span>
          </button>
        </div>
      </header>

      {/* 🔥 BLUR + BLOQUEO */}
      <main
        className={styles.content}
        style={{
          filter: user ? "none" : "blur(6px)",
          pointerEvents: user ? "auto" : "none",
          transition: "0.3s",
        }}
      >
        {children}
      </main>

      <div
        className={`${styles.overlay} ${
          menuOpen || cartOpen ? styles.overlayOpen : ''
        }`}
        onClick={() => {
          setMenuOpen(false)
          setCartOpen(false)
        }}
      />

      <aside className={`${styles.drawer} ${menuOpen ? styles.open : ''}`}>
        <button onClick={() => setMenuOpen(false)}>✕</button>
    {filtroMenuLa}
        {/* <a href="/">Inicio</a>
        <a href="/productos">Productos</a>
        <a href="/contacto">Contacto</a> */}
      </aside>

      <aside className={`${styles.cart} ${cartOpen ? styles.open : ''}`}>
       <img src={btn} alt="Botón" style={{width:30, marginBottom:40, }} onClick={() => setCartOpen(false)}/>
        <h3 style={{borderBottom: '1px solid #ccc', fontFamily: 'Arial, sans-serif'}}>Carrito</h3>

        <div className={styles.cartContent}>
          {console.log(prod)}
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
              <strong>US${total.toLocaleString()}</strong>
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
                             user={user.email}
                           
                           />

              <button
                className={styles.btnSecondary}
                onClick={() => setCartOpen(false)}
              >
                Seguir comprando
              </button>
            </div>
          </div>
        )}
      </aside>

      {/* 🔥 ESTO ES LO QUE LO HACE REUTILIZABLE */}
      {!user && authComponent}
    </>
  )
}