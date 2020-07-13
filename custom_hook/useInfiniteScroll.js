import { useState, useEffect } from 'react'

const useInfiniteScroll = (callback) => {
  const [isFetching, setIsFetching] = useState(false);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    ) return;
    setIsFetching(true);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);

  }, []);

  useEffect(() => {
    if (!isFetching) return;

    callback();

  }, [isFetching]);

  return [isFetching, setIsFetching];

};

export default useInfiniteScroll;
