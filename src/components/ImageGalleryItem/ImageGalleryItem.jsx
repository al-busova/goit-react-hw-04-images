// import PropTypes from "prop-types";
import { Component } from "react";
import { Image} from "./ImageGalleryItem.styled";
import { Modal } from "components/Modal/Modal";

export default class ImageGalleryItem extends Component {
  state = {
    showModal: false
  }
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }
  handleKeyDown = e => {
    if (e.code === 'Escape') {
        this.setState({ showModal: false })
      }
  }
  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.toggleModal();
  }
}
  toggleModal = () => {
    this.setState(({ showModal }) => ({showModal: !showModal}))
  }

  render() {
     const { url, tags, bigUrl } = this.props;
    return (<><Image src={url} alt={tags} onClick={this.toggleModal} />  
      {this.state.showModal && <Modal bigUrl={bigUrl} alt={tags} onBackdrop ={this.handleBackdropClick} />} </>
  );
  }
 
}

// ImageGalleryItem.propTypes = {
//     name: PropTypes.string.isRequired,
//     number: PropTypes.string.isRequired,
//     id: PropTypes.string.isRequired,
//     deleteContact: PropTypes.func.isRequired
// };