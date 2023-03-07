import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { LoginPage } from '../auth/pages/LoginPage'
import { DanaRoutes } from '../dana/routes/DanaRoutes'

export const AppRouter = () => {
  return (
    <>
        <Routes>
            <Route path='Login' element={<LoginPage/>}/>
            <Route path='/*' element={<DanaRoutes/>}/>
        </Routes>    
    </>
  )
}
