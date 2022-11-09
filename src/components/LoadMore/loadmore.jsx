import PropTypes from 'prop-types'
import {ButtonDiv, ButtonStyle } from './loadmore.styled.js'

export const Button = ({ loadMore }) => { 
  return (
    <ButtonDiv>
      <ButtonStyle type='button' onClick={ loadMore }>Load More</ButtonStyle>
    </ButtonDiv>
    
  )
}

Button.propTypes = {
  loadMore: PropTypes.func.isRequired
}