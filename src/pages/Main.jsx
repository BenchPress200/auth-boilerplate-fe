import {useRef, useState, useEffect} from 'react'

import styles from '../styles/Main.module.css';

const Main = () => {
    const [resultText, setResultTest] = useState("result");
    const [resultTextColor, setResultTestColor] = useState("black");

    const unAuthCall = () => {
        const fetchOption = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
              },
            credentials: 'include'
        }
    
        fetch(`http://localhost:8080/api/v1/test/unauth`, fetchOption)
        .then(response => {
            if(response.status === 200) {
                setResultTest("UnAuth OK");
                setResultTestColor("blue");
            } else {
                setResultTest("Failed");
                setResultTestColor("red");
            }
        });
    }

    const authCall = () => {
        const fetchOption = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
              },
            credentials: 'include'
        }
    
        fetch(`http://localhost:8080/api/v1/test/auth`, fetchOption)
        .then(response => {
            if(response.status === 200) {
                setResultTest("Auth OK");
                setResultTestColor("blue");
            } else {
                setResultTest("Failed");
                setResultTestColor("red");
            }
        });
    }

    
    
    return (
        <>
            <div className={styles.mainBody}>

                <div className={styles.mainBox}>
                    <div className={styles.btnBox}>
                        <button className={styles.commonBtn} onClick={unAuthCall}>비인가 API 호출</button>
                        <button className={styles.commonBtn} onClick={authCall}>인가 API 호출</button>
                    </div>

                    <div className={styles.resultBox} style={{color: resultTextColor}}>{resultText}</div>
                </div>
            </div>
        </>
    );
}

export default Main