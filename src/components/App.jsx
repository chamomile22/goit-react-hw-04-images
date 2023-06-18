import { Component } from 'react';
import * as API from 'services/getImages';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from 'components/Loader/Loader';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    searchValue: '',
    images: [],
    page: 1,
    showBtn: false,
    loading: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchValue, page } = this.state;
    if (prevState.searchValue !== searchValue || prevState.page !== page) {
      this.setState({ loading: true });
      API.getImages(searchValue, page)
        .then(images => {
          if (!images.hits.length) {
            this.setState({ images: [], showBtn: false });
            return toast.info('No images found');
          }

          return this.setState(prevState => ({
            images: [...prevState.images, ...images.hits],
            showBtn: page < Math.ceil(images.totalHits / API.perPage),
          }));
        })
        .catch(error => this.setState({ error }))
        .finally(this.setState({ loading: false }));
    }
  }

  handleSubmit = searchValue => {
    this.setState({
      searchValue,
      page: 1,
      images: [],
      showBtn: false,
      loading: false,
      error: null,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    let { images, showBtn, loading, error } = this.state;
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        {error && <h1>{error.message}</h1>}
        {loading && (
          <Loader>
            <ThreeDots
              color={'#ffffff'}
              wrapperStyle={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          </Loader>
        )}
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery images={images} />
        {showBtn ? <Button onClick={this.handleLoadMore} /> : null}
        <ToastContainer autoClose={2500} />
      </div>
    );
  }
}
