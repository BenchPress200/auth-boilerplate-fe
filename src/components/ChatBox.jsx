import {useRef, useState, useEffect} from 'react'

import styles from '../styles/ChatBox.module.css';

const ChatBox = (props) => {
    const {name, text} = props;

    return (
        <>
            <div className={styles.ChatBox}>
                <div className={styles.Name}>
                    {name}    
                </div>

                <div className={styles.Text}>
                    {text}
                </div>
            </div>
        </>
    );
}

export default ChatBox; 