import Searchbar from 'components/Searchbar';
import ContentInfo from 'components/ImageGallery';
import { Component } from 'react';

class App extends Component {
  state = {
    searchValue: '',
    isShowModal: false,
    isLoading: false,
  };

  handleModal = () => {
    const { isShowModal } = this.state;

    isShowModal
      ? this.setState({ isShowModal: false })
      : this.setState({ isShowModal: true });
  };

  // closeModal = () => {
  // this.setState({ isShowModal: false });
  // };

  handleSearch = searchValue => {
    this.setState({ searchValue });
  };

  render() {
    return (
      <>
        <Searchbar handleSearch={this.handleSearch} />
        <ContentInfo searchValue={this.state.searchValue} />
      </>
    );
  }
}

export default App;
