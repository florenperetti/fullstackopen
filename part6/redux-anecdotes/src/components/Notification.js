import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const { notification } = props
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (!notification) {
    return null
  }
  return (
    <div style={style}>
      {notification}
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