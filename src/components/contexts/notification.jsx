import * as React from 'react'

const NotificationContext = React.createContext()

function setMsg(state, action) {
    return { msg : action.msg, type: action.type };
}

function NotifProvider({children}) {
    const [state, dispatch] = React.useReducer(setMsg, {msg: false, type: false});
    const notify = (msg, type) => {
        dispatch({msg : msg, type : type});
        // Hard coded time out, can be done better
        let tm = type.toLowerCase() == 'info' ? 5000 : 20000;
        setTimeout(() => dispatch({msg:false}), tm);
    };
    const value = {state, dispatch, notify};
    return  (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );

}

function useNotification() {
    const context = React.useContext(NotificationContext);
    if (context === undefined) {
        console.log('error');
        throw new Error('useNotification must be used within a NotifProvider');
    }
    return context;
}

export {NotifProvider, useNotification};
