import React, {useState, useEffect, useRef} from 'react'
import {fetchPhotos } from './api';
import './App.css';

function FetchApp () {

  const [photos, setPhotos] = useState([])
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading ] = useState(false);
  useEffect(() => {
    
    fetchPhotos(pageNumber).then(res => {
      setLoading(true);
      setPhotos([...photos, ...res])
      // setLoading(true);
    });
    // setPhotos
  }, [pageNumber])
  
  const loadMore = () => {
    setPageNumber(prevPageNum => prevPageNum + 1);
    // setLoading(true);
  }
  const pageEnd = useRef()
  let num = 1;

  useEffect(() => {
    if (loading) {
      const observer = new IntersectionObserver((entries) => {
        console.log(entries)
        // entries[0].isIntersecting --> 값이 변경 되지 않는다.. 대체 왜 그럴까....


        // if (entries[0].isIntersecting) {
        //   num++;
        //   loadMore();
        //   if (num >= 2) {
        //     observer.unobserve(pageEnd.current);
        //   }
        //   // setLoading(false);
        // }

      } , {threshold: 1});

      observer.observe(pageEnd.current)
    }
  }, [loading, num])


  return (
    <div className='App'>
      <h1>scroll with react hook</h1>
      {photos && photos.map((photo, index) => {
        return (
          <div className='photos' key={photo.id}>
            <img src={photo.urls.small} alt={photo.alt_description} />
            <p>{photo.alt_description}</p>
          </div>
        )
      })}

      <div className='loading'>
        Loading...
      </div>
      <h3>{photos.length}</h3>
      <button onClick={loadMore} ref={pageEnd}>More</button>
    </div>
  )
} 

export default FetchApp;