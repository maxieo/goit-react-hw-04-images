import React from "react";
import PropTypes from 'prop-types'
import error from '../../images/error.png'
import {MessageErrorStyle} from './messageError.styled'

export const MessageError = ({ message }) => { 
  return (
    <MessageErrorStyle>
      {message}
      <img src={error} alt="error" width='900px' />    
    </MessageErrorStyle>
  )
}

MessageError.propTypes = {
  message: PropTypes.string.isRequired
}
