import { Component } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalImg } from './modal.styled';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.closeModal);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModal);
  }

  closeModal = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  closeModalClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <Overlay onClick={this.closeModalClick}>
        <ModalImg>
          <img src={this.props.largeImageURL} alt={this.props.tags} />
        </ModalImg>
      </Overlay>
    );
  }
}


Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
}