import React, { useEffect, useState } from 'react';
import getCookie from '../utils/getCookie.js';


const Training = () => {
  const [words, setWords] = useState([]);
  const [count, setCount] = useState(0);
  const [showRightAnswer, setShowRightAnswer] = useState(false);

  useEffect(() => {
    getWords();
  }, []);
  
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

  const nextWord = (type) => {
    const token = getCookie('csrftoken');
    const data = {}
    if (type === 'wrong') {
      data.wrong_answer = true
    } else if (type === 'right') {
      data.right_answer = true
    }

			fetch(`/api/word/edit/${words[count].id}/`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Accept': 'application/json',
						'X-CSRFToken': token,
					},
					body: JSON.stringify(data),
				})
				.then(response => {
					const statusCode = response.status;
					const data = response.json();
					return Promise.all([statusCode, data]);
				})
				.then(result => {
					const statusCode =  result[0];
					const data =  result[1];
		
					if ([200, 201].includes(statusCode)){
            if (count + 1 <= words.length) {
              setCount(count + 1);
            } else {
              window.location.reload();
            }
            setShowRightAnswer(false);
					} else {
						console.error(data);
					}
				})
  }

  if (!words.length)
    return null

  return (
    <div id="training" className='container d-flex flex-column align-items-center justify-content-center'>
      <h2 className='mb-4'>Тренажер</h2>
      <span>{count + 1}/{words.length}</span>
      <span className='fw-bold'>{words[count].text}</span>
      {showRightAnswer ? 
        <span>{words[count].translation}</span>
      : <span onClick={() => setShowRightAnswer(true)}>Показать правильный ответ</span>
      }
      <div className="btn-group mt-3" role="group">
        <button className='btn btn-danger' onClick={() => nextWord('wrong')}>Неверно</button>
        <button className='btn btn-success' onClick={() => nextWord('right')}>Верно</button>
      </div>
    </div>
  )
}

export default Training;