import React from 'react'
import AdminLayout from './layout/adminLayout'
import { Route, Routes } from 'react-router'
// landing page
import LandingPage from './pages/web/Home/Home'

// admin
import Dashboard from './pages/admin/Dashboard/Dashboard'
import Settings from './pages/admin/Settings/Settings'
import Login from './pages/admin/Auth/Login'
import AdminPrivateRoute from './components/AdminPrivateRoute'
import Profile from './pages/admin/Settings/components/Profile'
import Charges from './pages/admin/Settings/components/Charges'
import TermConditions from './pages/admin/Settings/components/Term&Conditions'
import PrivacyPolicyPage from './pages/admin/Settings/components/PrivacyPolicyPage'
import RefundPolicy from './pages/admin/Settings/components/RefundPolicy'
import AboutUs from './pages/admin/Settings/components/AboutUs'
import Cms from './pages/web/Cms/Cms'
import College from './pages/admin/College/College'
import Enquiry from './pages/admin/Enquiry/Enquiry'
import EditCollegeForm from './pages/admin/College/components/EditCollegeForm'
import User from './pages/admin/User/User'

function App() {
  return (
    <>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path='/cms/:page' element={<Cms />} />

        {/* admin route */}
        <Route path='/admin/login' element={<Login />} />
        <Route path='/admin' element={<AdminPrivateRoute> <AdminLayout /> </AdminPrivateRoute>}>
          <Route index element={<Dashboard />} />
          <Route path='user' element={<User />} />
          <Route path='enquiry' element={<Enquiry />} />
          <Route path='college' element={<College />} />
          <Route path='college/:id' element={<EditCollegeForm />} />
          <Route path='settings' element={<Settings />} />
          {/* <Route path='settings/profile' element={<Profile />} /> */}
          <Route path='settings/charges' element={<Charges />} />
          <Route path='terms-and-conditions/:type' element={<TermConditions />} />
          <Route path='privacy-policy/:type' element={<PrivacyPolicyPage />} />
          <Route path='refund-policy/:type' element={<RefundPolicy />} />
          <Route path='about-us/:type' element={<AboutUs />} />
        </Route>
        <Route path='*' element={<LandingPage />} />
      </Routes>
    </>
  )
}

export default App
