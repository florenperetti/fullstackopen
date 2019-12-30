import React from 'react'
import {
  Link
} from 'react-router-dom'

import { Table } from 'semantic-ui-react'

const User = ({ user }) => {
  const totalBlogs = user.blogs.length
  return (
    <Table.Row>
      <Table.Cell><Link to={`/users/${user.id}`}>{user.name}</Link></Table.Cell>
      <Table.Cell>{totalBlogs}</Table.Cell>
    </Table.Row>
  )
}

const Users = (props) => {
  const users = () => props.users.map(user => <User key={user.id} user={user}></User>)
  return (
    <div>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell>blogs created</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users()}
        </Table.Body>
      </Table>
    </div>
  )
}

export default Users