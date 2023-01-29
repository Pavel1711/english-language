import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

const Training = () => {
  const [words, setWords] = useState([]);

  useEffect(() => {
    getWords();
  }, [])

  const getWords = () => {
    fetch('/api/word/all/')
      .then(response => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
      })
      .then(result => {
        const statusCode =  result[0];
        const data =  result[1];
  
        if ([200, 201].includes(statusCode)){
          setWords(data)
        }
      })
  }

  return (
    <div id="create" className='container d-flex flex-column align-items-center justify-content-center'>
      <h1 className='mb-5'>Тренажер</h1>
    </div>
  )
}

export default Training;