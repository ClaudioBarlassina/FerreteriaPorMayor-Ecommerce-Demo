// controllers/payment.controller.js

import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY) // 🔐 usar .env

// 🔥 CREAR SESIÓN
export const createSession = async (req, res) => {
  try {
    const { items, email } = req.body
  

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'No hay productos' })
    }

    const line_items = items.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.nombre,
          description: `${item.marca} - ${item.categoria}`,
          images: [item.imagen],
        },
        unit_amount: item.precio * 100,
      },
      quantity: item.cantidad || 1,
    }))

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',

      customer_email: email,
      shipping_address_collection: {
        allowed_countries: ['AR'],
      },

      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 2000,
              currency: 'usd',
            },
            display_name: 'Envío estándar',
          },
        },
      ],

      metadata: {
        total_items: items.length,
      },

      success_url:
        'http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:5173/cancel',
    })

    res.json({ url: session.url })
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ error: 'Error al crear sesión' })
  }
}

// 🔥 OBTENER SESIÓN (CLAVE)
export const getSession = async (req, res) => {
  try {
    const { sessionId } = req.params

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items.data.price.product'], // 🔥 importante
    })
    console.log('LINE ITEMS:', session.line_items.data)

    res.json(session)
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ error: 'Error obteniendo sesión' })
  }
}
