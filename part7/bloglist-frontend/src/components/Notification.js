import React from 'react'
import { connect } from 'react-redux'

import { Message } from 'semantic-ui-react'

const Notification = (props) => {
  const { notification } = props
  if (!notification.message) {
    return null
  }

  const color = notification.successful ? 'green' : 'red'

  return (
    <Message color={color}>
      {notification.message}
    </Message>
  )
}

const mapStateToProps = ({ notification }) => {
  return {
    notification
  }
}

export default connect(
  mapStateToProps
)(Notification)