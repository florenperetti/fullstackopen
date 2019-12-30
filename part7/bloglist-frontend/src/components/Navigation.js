import React from 'react'
import Logout from './Logout'
import { connect } from 'react-redux'
import {
  Link
} from 'react-router-dom'

const Navigation = ({ user, handleLogout }) => {

  const navStyles = {
    border: 'solid',
    borderWidth: 1,
    backgroundColor: '#e0e0e0',
    marginBottom: 5
  }

  return (
    <div className="blog" style={navStyles}>
      <Link to={'/'}>Blogs</Link> <Link to={'/users'}>Users</Link> {user.name} logged in <Logout onClick={handleLogout}></Logout>
    </div>
  )
}

const mapStateToProps = ({ userStore }) => {
  return {
    user: userStore
  }
}

export default connect(mapStateToProps)(Navigation)