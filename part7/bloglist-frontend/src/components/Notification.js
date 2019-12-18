import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const { notification } = props
  if (!notification.message) {
    return null
  }

  const className = 'message ' + (notification.successful ? '' : 'red')

  return (
    <div className={className}>
      {notification.message}
    </div>
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