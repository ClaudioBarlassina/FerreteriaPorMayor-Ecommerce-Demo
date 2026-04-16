import { useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"

export default function Success() {
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get("session_id")

 const [order, setOrder] = useState([])

useEffect(() => {
  if (!sessionId) return

  fetch(`http://localhost:3000/api/payment/session/${sessionId}`)
    .then(res => res.json())
    .then(data => {
      const items = data.line_items.data.map(item => ({
        nombre: item.description,
        precio: item.price.unit_amount / 100,
        cantidad: item.quantity,
        imagen: item.price.product.images[0]
      }))

      setOrder(items)
    })
    .catch(err => console.error(err))
}, [sessionId])
  const total = order.reduce((acc, item) => {
    return acc + item.precio * item.cantidad
  }, 0)

  return (
 <div style={{
  minHeight: "100vh",
  background: "linear-gradient(135deg, #f5f7fa, #e4ecf3)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px"
}}>

  <div style={{
    background: "#fff",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    padding: "30px",
    width: "100%",
    maxWidth: "700px"
  }}>

    <h1 style={{ marginBottom: "10px" }}>🎉 Pago realizado con éxito</h1>
    <p style={{ color: "#666" }}>Gracias por tu compra</p>

    <p style={{
      fontSize: "12px",
      color: "#999",
      marginBottom: "20px"
    }}>
      ID: {sessionId}
    </p>

    <h2 style={{
      borderBottom: "2px solid #eee",
      paddingBottom: "10px",
      marginBottom: "20px"
    }}>
      🧾 Detalle de compra
    </h2>

    <div>
      {order.map((item) => (
        <div key={item.id} style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
          padding: "15px",
          borderRadius: "12px",
          marginBottom: "10px",
          background: "#fafafa",
          transition: "0.2s"
        }}>

          <img
            src={item.imagen}
            alt=""
            style={{
              width: "70px",
              height: "70px",
              objectFit: "cover",
              borderRadius: "10px"
            }}
          />

          <div style={{ flex: 1, textAlign: "left" }}>
            <strong style={{ fontSize: "16px" }}>{item.nombre}</strong>
            <p style={{ margin: "5px 0", color: "#666" }}>
              Cantidad: {item.cantidad}
            </p>
          </div>

          <div style={{
            fontWeight: "bold",
            fontSize: "16px"
          }}>
            US${(item.precio * item.cantidad).toLocaleString()}
          </div>

        </div>
      ))}
    </div>

    <div style={{
      marginTop: "20px",
      paddingTop: "15px",
      borderTop: "2px solid #eee",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <h3>Total</h3>
      <h2>U$S{total.toLocaleString()}</h2>
    </div>

    <a
      href="/"
      style={{
        display: "block",
        marginTop: "25px",
        textAlign: "center",
        background: "#000",
        color: "#fff",
        padding: "12px",
        borderRadius: "10px",
        textDecoration: "none",
        fontWeight: "bold",
        transition: "0.2s"
      }}
    >
      Volver a la tienda
    </a>

  </div>
</div>
  )
}