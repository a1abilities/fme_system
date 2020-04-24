import React from 'react';
import {confirmAlert} from './ReactConfirmAlert.js';

export const handleConfirmation = (title, content, data, callback) => {
  confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div className='custom-ui'>
          <h1>{title}</h1>
          <p>{content}</p>
          <button onClick={onClose}>No</button>
          <button onClick={() => {onClose(); callback(data);}}>Yes</button>
        </div>
      )
    }
  })
}

// export default {handleConfirmation};