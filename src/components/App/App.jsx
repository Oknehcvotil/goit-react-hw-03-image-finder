import Searchbar from 'components/Searchbar';
import ContentInfo from 'components/ImageGallery';
import { Component } from 'react';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

class App extends Component {
  state = {
    searchValue: '',
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
    if (searchValue === this.state.searchValue) {
      return;
    }
    this.setState({ searchValue });
  };

  render() {
    return (
      <>
        <Searchbar handleSearch={this.handleSearch} />
        <ContentInfo searchValue={this.state.searchValue} />
        <ToastContainer position="top-right" autoClose={3000} />
      </>
    );
  }
}

export default App;
