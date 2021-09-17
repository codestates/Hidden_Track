import React from 'react';
import Toast from './Toast';
import './Notifications.scss';

function Notification ({ notice }) {
  return (
    <div className='notification-container top-right'>
      {
      notice.map((el) =>
        <Toast key={el.uuid} text={el.message} dismissTime={el.dismissTime} />
      )
    }
    </div>
  );
}

export default Notification;
