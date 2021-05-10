import * as React from 'react'
import {useNotification} from './contexts/notification'

function NotifDisplay() {
  const {
      state: { msg, type },
  } = useNotification()
  return ( msg && 
      <div className="notif"><b>{type}</b> : { msg }</div>
  )
}

function Notify( message, type ) {
    const { dispatch } = useNotification();
    let time = 60;
    switch(type) {
        // Set TTL in seconds
        case 'info':
            time='10';
            break;
        default:
            break;
    }
    setTimeout( () => dispatch({msg: false}), time * 100);
}

export {NotifDisplay, Notify}
