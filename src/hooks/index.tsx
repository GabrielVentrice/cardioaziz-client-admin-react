import React from 'react'

import { AuthProvider } from './AuthContext'
import ThemeContainer from './ThemeContainer'

const AppProvider: React.FC = ({ children }) => {
  return (
    <ThemeContainer>
      <AuthProvider>{children}</AuthProvider>
    </ThemeContainer>
  )
}

export default AppProvider
