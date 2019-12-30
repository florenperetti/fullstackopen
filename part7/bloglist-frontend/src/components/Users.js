import React from 'react'
import {
  Link
} from 'react-router-dom'

const User = ({ user }) => {
  const totalBlogs = user.blogs.length
  return (
    <tr>
      <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
      <td>{totalBlogs}</td>
    </tr>
  )
}

const Users = (props) => {
  const users = () => props.users.map(user => <User key={user.id} user={user}></User>)
  return (
    <div>
        <table>
          <thead>
            <tr>
              <td></td>
              <td>blogs created</td>
            </tr>
          </thead>
          <tbody>
            {users()}
          </tbody>
        </table>
    </div>
  )
}

export default Users