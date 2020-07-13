# custom hook

## useDebounec
```javascript
import { useState, useEffect } from 'react'

const useDebounec = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    })

    return () => {
      clearTimeout(handler);
    }

  }, [delay, value]);

  return debouncedValue;

};

export default useDebounce;

```

## useInfiniteScroll
```javascript
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

```

