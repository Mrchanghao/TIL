import { useCallback, useEffect, useRef } from 'react';

const useScrollListener = (element, handleScroll, throttle = 5000) => {
  const scrollingTimer = useRef();

  // const listentoScroll = useCallback((e) => {
  //   clearTimeout(scrollingTimer.current);
  //   scrollingTimer.current = setTimeout(() => {
  //    requestAnimationFrame(() => {
  //      handleScroll(e);
  //    }),  
  //    throttle});
  //   // requestAnimationFrame(() => handleScroll(e));

  // }, [handleScroll, throttle])

  // const removeScrollListener = useCallback(() => {
  //   if(element.current) {
  //     clearTimeout(scrollingTimer.current);
  //     element.current?.removeEventListener('scroll', listentoScroll)
  //   }
  // }, [scrollingTimer, throtle]);

  const listenToScroll = useCallback((e) => {
    element.current?.removeEventListener('scroll', listenToScroll);
    clearTimeout(scrollingTimer.currnet);

    scrollingTimer.current = setTimeout(() => element.current?.addEventListener('scroll', listenToScroll), throttle);

    handleScroll(e);

  }, [throttle, element, handleScroll])


  useEffect(() => {
    const currentElement = element.current;
    if(currentElement) {
      currentElement.addEventListener('scroll', listenToScroll);
    }
    return () => {
      currentElement?.removeEventListener('scroll', listenToScroll);
      clearTimeout(scrollingTimer.current)
    }
  }, [listentoScroll, element])
}


const Component = () => {
  const containerRef = useRef(null);

  const handleScroll = console.log('scrolling');

  useScrollListener(containerRef, handleScroll);

  return (
    <div ref={containerRef}>

    </div>
  )

}

// Promise race 

/**
 * method was released 
 * Promise.race() return Promise that settles as soon as one of the promises in the iterable argument settles 
 * Promise.race(iterable);
 * 
*/

function getUser(endpoint) {
  return fetch(`https://superfire.${endpoint}.com/users`)
    .then(response => response.json());
}

const promises = [getUser("jp"), getUser("uk"), getUser("us"), getUser("au"), getUser("in")];

try {
  let users = await Promise.any(promises);
  console.log(users);
} catch (error) {
  console.log(error);
}