import React, { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    console.log('Modal componentDidMount');
    window.addEventListener('keydown', this.handleKeyDown());
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown());
  }
  handleKeyDown = e => {
    if (e.code === 'Escape') {
      console.log('ESC');
      this.props.onClose();
    }
  };
  handleBackdropClick = e => {
    console.log('BackdropClick');
  };
  render() {
    return createPortal(
      <div className="Overlay onClick={this.handleBackdropClick}">
        <div className="Modal">
          <img src="" alt="" />
        </div>
      </div>,
      modalRoot,
    );
  }
}

export default Modal;
