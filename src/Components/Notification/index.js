import React from 'react';
import Toast from './Toast';
import './index.scss';

function Notification ({ notice }) {
  return (
    <div className={notice.length === 0 ? null : 'notification-container'}>
      {
      notice.map((el) =>
        <Toast key={el.uuid} text={el.message} dismissTime={el.dismissTime} />
      )
    }
    </div>
  );
}

export default Notification;
