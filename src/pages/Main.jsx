import {useRef, useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import styles from '../styles/Main.module.css';

// 인풋 상태관리 방법
// https://react.vlpt.us/basic/08-manage-input.html

const Main = () => {
    const navigate = useNavigate();

    const [resultText, setResultTest] = useState("result");
    const [resultTextColor, setResultTestColor] = useState("black");
    const [userEmail, setUserEmail] = useState("");
    const [newRoomTitleInputValue, setNewRoomTitleInputValue] = useState('')
    const [roomTitleInputValue, setRoomTitleInputValue] = useState('')


    

    useEffect(() => {
        const fetchUserData = async () => {
         
            const userId = Cookies.get('user-id');
            
            if (userId) {
              await fetch(`http://localhost:8080/api/v1/users/${userId}`)
                .then(async(response) => {
                    if (response.status !== 200) {
                        console.error('Error fetching user data:', response.statusText);
                    } 

                    return response.json()
                })
                .then((json => {
                    setUserEmail(json.data.email);
                }))
                .catch(error => {
                    console.error('Error fetching user data:', error);
                })   
            }
        }
    
        fetchUserData();
      }, []);

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

    const moveToVideoChat = () => {
        navigate('/VideoChat');
    }

    const moveToWelcome = () => {
        navigate('/');
    }

    const createInputUpdate = (e) => {
        setNewRoomTitleInputValue(e.target.value)
    }

    const moveInputUpdate = (e) => {
        setRoomTitleInputValue(e.target.value)
    }

    const createRoom = () => {

        const data = {
            title: newRoomTitleInputValue
        }

        const fetchOption = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            credentials: 'include',
            body: JSON.stringify(data),
        }
    
        fetch("http://localhost:8080/api/v1/rooms", fetchOption)
        .then(response => {
            if(response.status === 201) {
                alert("채팅방이 생성성공 !")
            } else {
                console.log(response.status)
                alert("채팅방이 생성실패 !")
            }
        })
        .catch(e => {
            console.log(e);
        })

        setNewRoomTitleInputValue("");
        
    }

    const moveRoom = async () => {
        setRoomTitleInputValue("");
        let roomId = null;
        
        const fetchOption = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
              },
            credentials: 'include',
        }

        await fetch(`http://localhost:8080/api/v1/rooms/id?title=${roomTitleInputValue}`, fetchOption)
            .then(async(response) => {
                if(response.status !== 200) {
                    alert(`${response.status} ${roomTitleInputValue} Not Found`)
                } else {
                    return response.json();
                }
            })
            .then(json => {
                roomId = json.data.id;
            })

        if (roomId === null) {
            return;
        }

        navigate(`/VideoChat/${roomId}`);


    }

    
    
    return (
        <>
            <div className={styles.mainBody}>
                <header className={styles.header}>
                    <div className={styles.username}>{userEmail}</div>
                    <button className={styles.exitBtn} onClick={moveToWelcome}>Logout</button>
                </header>
                


                <main className={styles.mainBox}>


                    <section className={styles.leftBox}>
                        <div className={styles.btnBox}>
                            <button className={styles.commonBtn} onClick={unAuthCall}>비인가 API 호출</button>
                            <button className={styles.commonBtn} onClick={authCall}>인가 API 호출</button>
                        </div>

                        <div className={styles.resultBox} style={{color: resultTextColor}}>{resultText}</div>
                    </section>



                    <section className={styles.rightBox}>

                        <div className={styles.createInputBox}>
                            <label>채팅방 생성</label>
                            <input className={styles.createInput} type='text' placeholder='생성할 방 타이틀을 입력해주세요.' onChange={createInputUpdate} value={newRoomTitleInputValue}></input>
                            <button onClick={createRoom}>생성하기</button>
                        </div>

                        <div className={styles.moveInputBox}>
                            <label>채팅방 입장</label>
                            <input className={styles.moveInput} type='text' placeholder='입장할 방 타이틀을 입력해주세요.' onChange={moveInputUpdate} value={roomTitleInputValue}></input>
                            <button onClick={moveRoom}>입장하기</button>
                        </div>

                    </section>
                </main>
            </div>
        </>
    );
}

export default Main