import React, { useState, useEffect } from 'react'
import WordCloud from 'react-d3-cloud';
import { tokenizeReviews, rotate, fontSizeMapper, isStopWord } from './utils';


const ReviewCloud = (props) => {
  const [appId, setAppId] = useState('284882215');
  const [reviews, setReviews] = useState(null);
  const [words, setWords] = useState([])
  
  useEffect(() => {
    
    let newWords = tokenizeReviews(props.reviews);
    setWords([...newWords]);
  }, [props.reviews])

  
  useEffect(() => {
    
  })



  const handleChange = (e) => {
    let newAppID = e.target.value;
    setAppId(newAppID);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(appId);
    props.getReviews(appId);
  };
  /*
  
  
  this.words? = tokenizeReviews(props.reviews)
  */
  return (
    <div className="center" style={{ justifyContent: 'center', alignItems: "center"}}>
      <form onSubmit={handleSubmit} >
        <label>iTunes App Id:</label>
        <input type="text" value={appId} onChange={handleChange} />
          <input type="submit" value="CREATE WORDCLOUD" />
      </form>
       <div
       style={{transform: `translateX(-10%)`}}
          >
          <WordCloud
            height={window.screen.availHeight - 12}
            width={window.screen.availWidth }
            data={words}
            fontSizeMapper={fontSizeMapper}
            rotate={rotate}/>
        </div>
    </div>
  )
}


export default ReviewCloud;