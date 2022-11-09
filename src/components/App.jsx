import { Component } from 'react';
import { Searchbar } from './SearchBar/searchbar';
import { fetchImg } from './api';
import { ImageGallery } from './ImageGallery/imageGallery';
import { AppStyle } from './App.styled';
import { MessageError } from './MessageError/messageError.jsx';
import { Button } from './LoadMore/loadmore.jsx';
import { Loader } from './Loader/loader.jsx';
import { Modal } from './Modal/modal.jsx';

export class App extends Component {
  state = {
    search: '',
    page: 1,
    images: [],
    totalPages: 1,
    status: 'idle',
    modal: false,
    tags: null,
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (
      prevState.search !== this.state.search ||
      prevState.page !== this.state.page
    ) {
      this.setState({ status: 'loading' });
      fetchImg(this.state.search, this.state.page)
        .then(res => {
          const images = res.hits.map(image => {
            return {
              id: image.id,
              webformatURL: image.webformatURL,
              tags: image.tags,
              largeImageURL: image.largeImageURL,
            };
          });
          this.setState(prevState => ({
            images: [...prevState.images, ...images],
            totalPages: Math.ceil(res.totalHits / 12),
            status: 'resolved',
          }));
        })
        .catch(e => {
          this.setState({ status: 'failed' });
        });
    }
  };

  handleSearch = search => {
    this.setState({ search: search, page: 1, images: [] });
  };

  loadMore = () => {
    this.setState(state => ({ page: state.page + 1 }));
  };

  toggleModal = e => {
    this.setState(({ modal }) => ({ modal: !modal }));
  };

  openModal = e => {
    const largeImageURL = e.target.dataset.large;
    const tags = e.target.alt;
    if (e.target.nodeName === 'IMG') {
      this.setState(({ modal }) => ({
        modal: !modal,
        largeImageURL: largeImageURL,
        tags: tags,
      }));
    }
  };

  render() {
    return (
      <AppStyle>
        <Searchbar onSubmit={this.handleSearch} />
        {this.state.status === 'failed' && (
          <MessageError message={`Sorry, this request is failed for "${this.state.search}"(((`} />
        )}
        {this.state.images.length > 0 && (
          <ImageGallery
            results={this.state.images}
            openModal={this.openModal}
          />
        )}
        {this.state.status === 'loading' && <Loader />}
        {this.state.status === 'resolved' && (
          <Button loadMore={this.loadMore}></Button>
        )}
        {this.state.modal && (
          <Modal
            largeImageURL={this.state.largeImageURL}
            tags={this.state.tags}
            onClose={this.toggleModal}
          />
        )}
      </AppStyle>
    );
  }
}
