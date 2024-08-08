import {useRef, useState, useEffect} from 'react'
import styles from '../styles/Welcome.module.css';
import { useNavigate } from 'react-router-dom';
import kakaoIcon from '../assets/kakao-talk.png';


const Welcome = () => {

    const navigate = useNavigate();

    const emailRef = useRef("");
    const passwordRef = useRef("");

    const inputEmail = (event) => {
        emailRef.current = event.target.value;
    }

    const inputPassword = (event) => {
        passwordRef.current = event.target.value;
    }

    const moveToJoin = () => {
        window.open(
            "/join",
            "join",
            "width=500, height=500, top=0, left=0, resizable=yes"
        )
    }

    const moveToKaKaoLogin = () => {
        navigate('/');
      };

    const login = (e) => { //로그인성공하면 아이디와 쿠키 유지해야핢 
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
                body: JSON.stringify(data),
                credentials: 'include'
            }
        
            fetch("http://localhost:8080/api/v1/auth/login", fetchOption)
            .then(response => {
                if(response.status == 200) {
                    window.location.href="/main";
                } else {
                    alert('로그인 실패!');
                }
            });
    }



    return (
      <>
        <div className={styles.welcomeBody}>
            <form className={styles.loginForm} action='/main'>
                <input className={styles.emailInput} type="text" placeholder='Email' onInput={inputEmail}></input>
                <input className={styles.passwordInput} type="password" placeholder='Password' onInput={inputPassword}></input>

                <button className={styles.loginBtn} type="submit" onClick={login}>Login</button>
                <button className={styles.joinBtn} onClick={moveToJoin} type='button'>Join</button>

                <img className={styles.kakaoIcon} src={kakaoIcon} alt="kakao" onClick={moveToKaKaoLogin}></img>
            </form>

        </div>
      </>
    );
}


export default Welcome;