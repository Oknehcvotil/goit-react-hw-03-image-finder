import { Component } from 'react';
import PropTypes from 'prop-types';
import getImgs from 'services/getImgs';
import ImageGalleryItem from 'components/ImageGalleryItem';
import { toast } from 'react-toastify';

class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    isLoading: false,
    loadMore: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;

    if (
      prevProps.searchValue !== this.props.searchValue ||
      prevState.page !== page
    ) {
      if (page === 1) {
        this.setState({ images: [], loadMore: false });
      }

      this.setState({ isLoading: true });
      try {
        const data = await getImgs(this.props.searchValue, page);
        const { hits, totalHits } = data;

        const perPage = 12;
        const totalPages = Math.ceil(totalHits / perPage);

        if (totalHits === 0 || !hits) {
          this.setState({ isLoading: false });
          toast.error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          return;
        }

        if (totalPages > 1) {
          this.setState({ loadMore: true });
        }

        if (page === totalPages) {
          toast.info(
            "We're sorry, but you've reached the end of search results."
          );
          this.setState({ loadMore: false });
        }

        if (page === 1) {
          toast.success(`Hooray! We found ${totalHits} images.`);
        }

        this.setState(state => ({ images: [...state.images, ...hits] }));
      } catch (error) {
        toast.error(`${error.message}`);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleLoadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
      isLoading: true,
    }));
  };

  render() {
    const { images, isLoading, loadMore } = this.state;

    return (
      <>
        <ul className="gallery">
          {images.map(({ id, webformatURL, tags }) => (
            <ImageGalleryItem key={id} id={id} img={webformatURL} alt={tags} />
          ))}
          {isLoading && <h1>Loading...</h1>}
          {loadMore && (
            <button type="button" onClick={this.handleLoadMore}>
              Load more...
            </button>
          )}
        </ul>
      </>
    );
  }
}

export default ImageGallery;
