import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalImg } from './modal.styled';

export function Modal ({largeImageURL, tags, onClose}) {
  // componentDidMount() {
  //   window.addEventListener('keydown', this.closeModal);
  // }
  // componentWillUnmount() {
  //   window.removeEventListener('keydown', this.closeModal);
  // }
  useEffect(() => { 
    window.addEventListener('keydown', closeModal)

    return () => {
      window.removeEventListener ('keydown', closeModal)
    }
  })

  function closeModal(e) {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const closeModalClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
    return (
      <Overlay onClick={closeModalClick}>
        <ModalImg>
          <img src={largeImageURL} alt={tags} />
        </ModalImg>
      </Overlay>
    );
  
}


Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
}