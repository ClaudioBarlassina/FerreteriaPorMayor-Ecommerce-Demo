export default function CheckoutButton({ productos, user }) {


  const handleCheckout = async () => {
    try {
    
      const response = await fetch("https://full-stack-ecommerce-d1a4.onrender.com/api/payment/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: productos,
        email: user, 
        }),
      })

      const data = await response.json()

      // 🔥 Redirección directa
     
      window.location.href = data.url

    } catch (error) {
      console.error("Error:", error)
    }
  }

  return (
    <button onClick={handleCheckout} style={{ height: 35, borderRadius: 15 }} disabled={!user}>
      Pagar ahora
    </button>
  )
}