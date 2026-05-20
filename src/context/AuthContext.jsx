import { createContext, useEffect, useState } from "react"
import toast from "react-hot-toast"

export const AuthContext = createContext()

const AUTH_STORAGE = "lush-auth"
const USERS_STORAGE = "lush-users"

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem(AUTH_STORAGE)
    return saved ? JSON.parse(saved) : null
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_STORAGE, JSON.stringify(user))
    } else {
      localStorage.removeItem(AUTH_STORAGE)
    }
  }, [user])

  const getUsers = () => {
    return JSON.parse(localStorage.getItem(USERS_STORAGE) || "[]")
  }

  const saveUsers = (users) => {
    localStorage.setItem(USERS_STORAGE, JSON.stringify(users))
  }

  const createToken = () => {
    return `jwt-${Math.random().toString(36).slice(2)}-${Date.now()}`
  }

  const register = ({ name, email, password }) => {
    const users = getUsers()
    const existingUser = users.find((item) => item.email === email)

    if (existingUser) {
      throw new Error("This email is already registered.")
    }

    const role = email === "mughaltalha@lush.com" ? "admin" : "user"
    const newUser = {
      name,
      email,
      password,
      role,
      token: createToken(),
    }

    saveUsers([...users, newUser])

    const authUser = {
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      token: newUser.token,
    }

    setUser(authUser)
    toast.success("Registration successful")
    return authUser
  }

  const login = ({ email, password }) => {
    const users = getUsers()
    const existingUser = users.find(
      (item) => item.email === email && item.password === password,
    )

    if (!existingUser) {
      throw new Error("Invalid email or password.")
    }

    const authUser = {
      name: existingUser.name,
      email: existingUser.email,
      role: existingUser.role,
      token: existingUser.token || createToken(),
    }

    setUser(authUser)
    toast.success("Login successful")
    return authUser
  }

  const logout = () => {
    setUser(null)
    toast.success("Logged out")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isAdmin: user?.role === "admin",
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
