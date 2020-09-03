import React, { createContext, useCallback, useState, useContext } from 'react'
import api from '../services/api'

interface User {
  nome: string
}

interface IParams {
  role: string
}

interface AuthState {
  token: string
  user: User
}

interface SignInCredential {
  email: string
  password: string
}

interface IAuthContext {
  user: User
  token: string
  signIn({ email, password }: SignInCredential, role: string): void
  signOut(): void
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('CardioAziz:token')
    const user = localStorage.getItem('CardioAziz:user')

    if (token && user) {
      return { token, user: JSON.parse(user) }
    }

    return {} as AuthState
  })

  const signIn = useCallback(
    async ({ email, password }: SignInCredential, role: string) => {
      let params: IParams = { role: '' }

      params['role'] = role

      const response = await api.post(
        '/authenticate',
        { username: email, password },
        { params }
      )

      const { token, user } = response.data

      localStorage.setItem('CardioAziz:token', token)
      localStorage.setItem('CardioAziz:user', JSON.stringify(user))

      setData({ token, user })
    },
    []
  )

  const signOut = useCallback(() => {
    localStorage.removeItem('CardioAziz:token')
    localStorage.removeItem('CardioAziz:user')

    setData({} as AuthState)
  }, [])

  return (
    <AuthContext.Provider
      value={{ user: data.user, token: data.token, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): IAuthContext {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context
}
