import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
   updateProfile,
} from "firebase/auth"
import { auth } from "../firebase/firebase"
import useStore from "../../../store/useStore2"

export default function useAuthActions() {
  const setUser = useStore((state) => state.setUser)

  // 🔥 proveedor Google
  const provider = new GoogleAuthProvider()

  const register = async (email, password, nombre) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)

    // 🔥 GUARDAR NOMBRE
    await updateProfile(res.user, {
      displayName: nombre,
    })

    console.log("✅ USUARIO REGISTRADO:", res.user)

    // 🔥 importante: refrescar user
    setUser({ ...res.user, displayName: nombre })

  } catch (err) {
    console.log("❌ ERROR REGISTER:", err)
    throw err
  }
}
  const login = async (email, password) => {
    console.log("🔥 CLICK LOGIN")

    try {
      const res = await signInWithEmailAndPassword(auth, email, password)

      console.log("✅ LOGUEADO EN FIREBASE")

      setUser(res.user)
    } catch (err) {
      console.log("❌ ERROR:", err)
      throw err
    }
  }

  // 🔥 LOGIN GOOGLE
  const loginGoogle = async () => {
    console.log("🔥 CLICK GOOGLE")

    try {
      const res = await signInWithPopup(auth, provider)

      console.log("✅ LOGIN GOOGLE")
      console.log("👤 USER:", res.user)

      setUser(res.user)
    } catch (err) {
      console.log("❌ ERROR GOOGLE:", err)
      throw err
    }
  }

  const logout = async () => {
    await signOut(auth)
    setUser(null)
  }

  return {
    login,
    register,
    logout,
    loginGoogle, // 🔥 importante exportarlo
  }
}