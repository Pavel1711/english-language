import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import getCookie from '../utils/getCookie.js';

const Create = () => {
    const text = useRef(null);
    const translation = useRef(null);
    const pastForm = useRef(null);
		const [type, setType] = useState("noun");
		const [errors, setErrors] = useState(null);

    const sendForm = () => {
			setErrors(null);
			const data = {
				text: text.current.value,
				translation: translation.current.value,
				type
			}
			if (type === 'verb') {
				data.past_form = pastForm.current.value;
			}

			const token = getCookie('csrftoken');

			fetch('/api/word/create/', {
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
						text.current.value = null;
						translation.current.value = null;
						pastForm.current.value = null;
						setType("noun");
					} else {
						setErrors(data);
					}
				})
    }

		console.log("errors==", errors)

    return (
        <div id="create" className='container d-flex flex-column align-items-center justify-content-center'>
            <h1 className='mb-5'>Добавление слова или фразы</h1>
            <div className='form p-4 d-flex flex-column gap-3'>
                <div>
                    <label htmlFor="word" className="form-label">Слово</label>
                    <input type="text" className={classNames('form-control', {
											'is-invalid': errors?.hasOwnProperty('text')
										})} id="text" ref={text}/>
										{errors?.hasOwnProperty('text') && <span className='error'>{errors.text}</span>}
                </div>
                <div>
                    <label htmlFor="translate" className="form-label">Перевод</label>
                    <input type="text" className={classNames('form-control', {
											'is-invalid': errors?.hasOwnProperty('translation')
										})} id="translation" ref={translation}/>
										{errors?.hasOwnProperty('translation') && <span className='error'>{errors.translation}</span>}
                </div>
                <div>
                    <label htmlFor="type" className="form-label">Тип</label>
                    <select className="form-select" aria-label="type" id="type" value={type} onChange={e => setType(e.target.value)}>
                        <option value="noun">Существительное</option>
                        <option value="adjective">Прилагательное</option>
                        <option value="verb">Глагол</option>
                        <option value="phrase">Фраза</option>
                    </select>
                </div>
                {type === "verb" &&
                    <div>
                        <label htmlFor="past-form" className="form-label">Прошедшая форма</label>
                        <input type="text" className="form-control" id="past-form" ref={pastForm}/>
                    </div>
                }
                <button className="btn btn-primary" onClick={sendForm}>Создать</button>
            </div>
        </div>
    )
}

export default Create;