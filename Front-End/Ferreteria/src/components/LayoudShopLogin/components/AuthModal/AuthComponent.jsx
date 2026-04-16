import { useState } from "react"
import useAuthActions from "../../hooks/useAuthActions"
import styles from "./AuthModal.module.css"

export default function AuthComponent() {
  const { login, register, loginGoogle } = useAuthActions()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLogin, setIsLogin] = useState(true)
  const [error, setError] = useState("")
  const [nombre, setNombre] = useState("")

  const handleSubmit = async () => {
    try {
      if (isLogin) {
        await login(email, password)
      } else {
        await register(email, password, nombre)
      }

      setError("")
    } catch (err) {
      console.log("❌ ERROR AUTH:", err)

      // mensajes simples
      if (err.code === "auth/invalid-credential") {
        setError("Usuario o contraseña incorrecta")
      } else if (err.code === "auth/email-already-in-use") {
        setError("El email ya está registrado")
      } else if (err.code === "auth/weak-password") {
        setError("La contraseña debe tener al menos 6 caracteres")
      } else {
        setError("Error al autenticar")
      }
    }
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>{isLogin ? "Iniciar sesión" : "Registrarse"}</h2>

{!isLogin && (
  <input
   className={styles.input}
    placeholder="Nombre"
    onChange={(e) => setNombre(e.target.value)}
  />
)}
        <input
          className={styles.input}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className={styles.input}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className={styles.button} onClick={handleSubmit}>
          {isLogin ? "Entrar" : "Registrarse"}
        </button>

        {/* 🔥 GOOGLE LOGIN */}
        <button
          className={styles.button}
          onClick={loginGoogle}
          style={{ background: "#fff", color: "#000", border: "1px solid #ccc" }}
        >
          🔵 Ingresar con Google
        </button>

        {/* ❌ ERROR */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* 🔁 SWITCH */}
        <p
          className={styles.switch}
          onClick={() => {
            setIsLogin(!isLogin)
            setError("")
          }}
        >
          {isLogin ? "Crear cuenta" : "Ya tengo cuenta"}
        </p>
      </div>
    </div>
  )
}