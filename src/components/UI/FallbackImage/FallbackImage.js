import React, {Component} from 'react';
import AuxHoc from '../../../hoc/Aux-hoc/Aux-hoc';
import Modal from '../Modal/Modal';
import classes from './FallbackImage.css';

class FallbackImage extends Component {
  state = {
    failed: false,
    openModal: false
  }

  fallback = () => {
    if (this.props.fallbackSrc) {
      this.setState({ failed: true });
    }
  };

  openImageModal = () => {
    this.setState({
      openModal: true
    });
  }

  closeImageModal = () => {
      this.setState( { openModal: false } );
  }

  render() {
    let imageTag = null;

    if (this.state.failed) {
      imageTag = <img alt={this.props.alt} src={this.props.fallbackSrc} />;
    } else {
      imageTag = <img alt={this.props.alt} 
      src={this.props.src} onClick={this.openImageModal} onError={this.fallback} />;
    }

    return (
      <AuxHoc>
        {imageTag}
        {this.state.openModal ? 
          <div className={classes.fallBack}>
            <Modal show={this.state.openModal} modalClosed={this.closeImageModal} style={{'height': '50%'}}>
              <img src={this.props.fullImage} alt={this.props.alt} />
            </Modal>
          </div>
        : null}
      </AuxHoc>
    );
  }
}

export default FallbackImage;