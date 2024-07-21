import {useRef, useState, useEffect} from 'react'
import styles from '../styles/Join.module.css';

const Join = () => {
    const [time, setTime] = useState(180);
    const [isTiming, setIsTiming] = useState(false);
    const [joinDisable, setJoinDisable] = useState(true);
    const [authBtnColor, setAuthBtnColor] = useState("tomato");
    const emailRef = useRef("");
    const codeRef = useRef("");
    const passwordRef = useRef("");

    useEffect(() => {
        let timer;
        if (isTiming) {
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
        const data = {
            email: emailRef.current
        }

        const fetchOption = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(data)
        }
    
        fetch("http://localhost:8080/api/v1/auth/mail", fetchOption)
        .then(response => {
            console.log(response.status);
        });
        
        setIsTiming(true);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const inputEmail = (event) => {
        emailRef.current = event.target.value;
    }

    const inputCode = (event) => {
        codeRef.current = event.target.value;
    }

    const inputPassword = (event) => {
        passwordRef.current = event.target.value;
    }
    
    const validateCode = () => {
        const fetchOption = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
              },
        }
    
        fetch(`http://localhost:8080/api/v1/auth/mail?email=${emailRef.current}&code=${codeRef.current}`, fetchOption)
        .then(response => {
            if(response.status === 200) {
                setAuthBtnColor("blue");
                setJoinDisable(false);
            }
        });
    }

    const join = (e) => {
        e.preventDefault();

        const data = {
            email: emailRef.current,
            password: passwordRef.current
        }

        const fetchOption = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(data)
        }
    
        fetch("http://localhost:8080/api/v1/users", fetchOption)
        .then(response => {
            if(response.status == 201) {
                alert('가입완료');
                window.close();
            }
        });

    }



    return (
        <>
            <div className={styles.joinBody}>

                <form className={styles.joinForm}>
                    <div className={styles.emailBox}>
                        <div className={styles.commonLabelBox}>
                            <label>이메일</label>
                        </div>
                        <input placeholder='Email' onInput={inputEmail}></input>
                        <button type="button" onClick={startTimer}>인증하기</button>
                    </div>

                    <div className={styles.authBox}>
                        <div className={styles.commonLabelBox}>
                            <label>인증번호</label>
                        </div>
                        <input placeholder={formatTime(time)} onInput={inputCode}></input>
                        <button 
                            type="button" 
                            className={styles.authBtn} 
                            style={{backgroundColor: authBtnColor}}
                            onClick={validateCode}
                        >확인</button>
                    </div>

                    <div className={styles.passwordBox}>
                        <div className={styles.commonLabelBox}>
                            <label>비밀번호</label>
                        </div>
                        <input placeholder='Password' type='password' onInput={inputPassword}></input>
                    </div>


                    <button 
                        type="submit" 
                        className={styles.joinBtn} 
                        disabled={joinDisable}
                        onClick={join}
                    >
                        가입하기
                    </button>
                </form>

            </div>
        </>
    )
}

export default Join;