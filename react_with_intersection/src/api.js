import {URL} from './constants';

export async function fetchPhotos(pageNum) {
  const res = await fetch(`${URL}&page=${pageNum}&per_page=10`);
  try {
    const json = await res.json()
    const data = await json;
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error)
  }

  // return data;
} 


