import React from 'react'

import { AuthProvider } from './AuthContext'
import ThemeContainer from './ThemeContainer'

const AppProvider: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <ThemeContainer>{children}</ThemeContainer>
    </AuthProvider>
  )
}

export default AppProvider
