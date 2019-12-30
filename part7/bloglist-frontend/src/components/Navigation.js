import React from 'react'
import { connect } from 'react-redux'
import {
  Link
} from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

const Navigation = ({ user, handleLogout }) => {
  return (
    <Menu inverted>
      <Menu.Item as={Link} to={'/'}>Blogs</Menu.Item> <Menu.Item as={Link} to={'/users'}>Users</Menu.Item>
      <Menu.Menu position='right'>
        <Menu.Item>{user.name} logged in</Menu.Item>
        <Menu.Item
          name="logout"
          onClick={handleLogout}
        />
      </Menu.Menu>
    </Menu>
  )
}

const mapStateToProps = ({ userStore }) => {
  return {
    user: userStore
  }
}

export default connect(mapStateToProps)(Navigation)