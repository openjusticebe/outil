import * as React from 'react'
import {useNotification} from './contexts/notification'

function NotifDisplay() {
    const {
        state: { msg, type },
    } = useNotification()
  return ( msg && <div className="notif"><b>{type}</b> : { msg }</div>)
}

function Notify( message, type ) {
    const { dispatch } = useNotification();
    dispatch({ msg: message });
}

export {NotifDisplay, Notify}
