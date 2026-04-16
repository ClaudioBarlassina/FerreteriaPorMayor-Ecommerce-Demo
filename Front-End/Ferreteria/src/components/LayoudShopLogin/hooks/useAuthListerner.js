import { useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../../../components/LayoudShopLogin/firebase/firebase.js"
import useStore from "../../../store/useStore2.js"

export default function useAuthListener() {
  const setUser = useStore((s) => s.setUser)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
    })

    return () => unsubscribe()
  }, [])
}