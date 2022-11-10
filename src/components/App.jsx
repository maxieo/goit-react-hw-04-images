import React, {useState, useEffect} from 'react';
import { Searchbar } from './SearchBar/searchbar';
import { fetchImg } from './api';
import { ImageGallery } from './ImageGallery/imageGallery';
import { AppStyle } from './App.styled';
import { MessageError } from './MessageError/messageError.jsx';
import { Button } from './LoadMore/loadmore.jsx';
import { Loader } from './Loader/loader.jsx';
import { Modal } from './Modal/modal.jsx';

export const App = () => {
  const [search, setSearch] = useState(null)
  const [page, setPage] = useState(null)
  const [images, setImages] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [status, setStatus] = useState('idle')
  const [modal, setModal] = useState(false)
  const [tags, setTags] = useState(null)
  const [largeImageURL, setLargeImageURL] = useState('')

    useEffect(() => { 
      if (search && page) {
        setStatus('loading')

        fetchImg(search, page).then(res => { 
          const images = res.hits.map(image => { 
            return {
              id: image.id,
              webformatURL: image.webformatURL,
              tags: image.tags,
              largeImageURL: image.largeImageURL,
            }
          })
          setImages(prevState => [...prevState, ...images])
          setTotalPages(Math.ceil(res.totalHits / 12))
          setStatus('resolved')
        })
          .catch(e => { 
            setStatus('failed')
          })
      }
    }, [search, page])
   

  const handleSearch = search => {
    setSearch(search)
    setImages([])
    setPage(1)
  };

  const loadMore = () => {
    setPage (state => state + 1)
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const openModal = e => {
    const largeImageURL = e.target.dataset.large
    const tags = e.target.alt
    if (e.target.nodeName === 'IMG') {
      setModal(!modal);
      setLargeImageURL(largeImageURL)
      setTags(tags)
      }
    }

    return (
      <AppStyle>
        <Searchbar onSubmit={handleSearch} />
        {status === 'failed' && (
          <MessageError message={`Sorry, this request is failed for "${search}"(((`} />
        )}
        {images.length > 0 && (
          <ImageGallery
            results={images}
            openModal={openModal}
          />
        )}
        
        {status === 'loading' && <Loader />}
        {images.length > 0 && status === 'resolved' && page !== totalPages && (
          <Button loadMore={loadMore}></Button>
        )}
        {modal && (
          <Modal
            largeImageURL={largeImageURL}
            tags={tags}
            onClose={toggleModal}
          />
        )}
      </AppStyle>
    );
}  
  
