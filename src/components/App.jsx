import { useState, useEffect } from 'react';
import * as API from 'services/getImages';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from 'components/Loader/Loader';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [showBtn, setShowBtn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchValue) {
      return;
    }
    setLoading(true);
    API.getImages(searchValue, page)
      .then(images => {
        if (!images.hits.length) {
          setImages([]);
          setShowBtn(false);
          return toast.info('No images found');
        }
        setImages(prevImages => [...prevImages, ...images.hits]);
        setShowBtn(page < Math.ceil(images.totalHits / API.perPage));
      })
      .catch(error => setError(error))
      .finally(setLoading(false));
  }, [searchValue, page]);

  const handleSubmit = searchValue => {
    setSearchValue(searchValue);
    setPage(1);
    setImages([]);
    setShowBtn(false);
    setLoading(false);
    setError(null);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

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
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery images={images} />
      {showBtn ? <Button onClick={handleLoadMore} /> : null}
      <ToastContainer autoClose={2500} />
    </div>
  );
};
