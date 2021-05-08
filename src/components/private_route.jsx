import React from "react"
import { useI18next } from 'gatsby-plugin-react-i18next';
import { isLoggedIn } from "../services/auth"

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  const {navigate} = useI18next()
  if (!isLoggedIn() && location.pathname !== `/admin/login`) {
    navigate("/")
    return null
  }

  return <Component {...rest} />
}

export default PrivateRoute
