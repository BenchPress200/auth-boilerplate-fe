import {useState, useEffect} from 'react'
import styles from '../styles/Join.module.css';

const Join = () => {
    const [time, setTime] = useState(180);
    const [isTiming, setIsTiming] = useState(false);

    useEffect(() => {
        let timer;
        if (isTiming) {
            console.log('hi')
            timer = setInterval(() => {
                setTime(prevTime => {
                    if (prevTime <= 1) {
                        clearInterval(timer);
                        setIsTiming(false);

                        return 0;
                    }
                    
                    return prevTime - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isTiming]);

    const startTimer = () => {
        setIsTiming(true);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };



    return (
        <>
            <div className={styles.joinBody}>

                <form className={styles.joinForm}>
                    <div className={styles.emailBox}>
                        <div className={styles.commonLabelBox}>
                            <label>이메일</label>
                        </div>
                        <input placeholder='Email'></input>
                        <button type="button" onClick={startTimer}>인증하기</button>
                    </div>

                    <div className={styles.authBox}>
                        <div className={styles.commonLabelBox}>
                            <label>인증번호</label>
                        </div>
                        <input placeholder={formatTime(time)}></input>
                        <button type="button" >확인</button>
                    </div>

                    <div className={styles.passwordBox}>
                        <div className={styles.commonLabelBox}>
                            <label>비밀번호</label>
                        </div>
                        <input placeholder='Password'></input>
                    </div>


                    <button type="submit">가입하기</button>
                </form>

            </div>
        </>
    )
}

export default Join;