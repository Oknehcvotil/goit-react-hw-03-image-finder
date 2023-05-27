import { Component } from 'react';
import PropTypes from 'prop-types';
import getImgs from 'services/getImgs';
import ImageGalleryItem from 'components/ImageGalleryItem';

class ImageGallery extends Component {
  state = {
    images: [],
    isLoading: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchValue !== this.props.searchValue) {
      this.setState({ isLoading: true });
      try {
        const response = await getImgs(this.props.searchValue);

        this.setState({ images: response });
      } catch (error) {
        console.log(error);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  render() {
    const { images, isLoading } = this.state;
    return (
      <>
        {isLoading && <h1>Loading...</h1>}
        <ul className="gallery">
          {images.map(({ id, webformatURL, tags }) => (
            <ImageGalleryItem key={id} id={id} img={webformatURL} alt={tags} />
          ))}
        </ul>
      </>
    );
  }
}

export default ImageGallery;
