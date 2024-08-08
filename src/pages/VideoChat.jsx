import {useRef, useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import ChatView from '../components/ChatView';
import styles from '../styles/VideoChat.module.css';
import Cookies from 'js-cookie';

const VideoChat = () => {
    const navigate = useNavigate();

    const { roomId } = useParams();
    const [user, setUser] = useState(null);
    const [userEmail, setUserEmail] = useState('');
    const [room, setRoom] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const fetchOption = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                  },
                credentials: 'include',
            }
            const userId = Cookies.get('user-id');

            await fetch(`http://localhost:8080/api/v1/users/${userId}`, fetchOption)
                .then(response => {
                    if(response.status !== 200) {
                        alert(`User with ${userId} Not Found`)
                    } else {
                        return response.json();
                    }
                })
                .then(json => {
                    setUser(json.data);
                    setUserEmail(json.data.email)
                })
        };

        const fetchRoomData = async () => {

            const fetchOption = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                  },
                credentials: 'include',
            }

            await fetch(`http://localhost:8080/api/v1/rooms/${roomId}`, fetchOption)
            .then(response => {
                if(response.status !== 200) {
                    alert(`Room with ${roomId} Not Found`)
                } else  {
                    return response.json();
                }
            })
            .then(json => {
                setRoom(json.data);
            })
        };

        fetchUserData();
        fetchRoomData();
    }, [roomId]);

    const exit = () => {
        navigate('/main')
    }

    return (
        <>
            <div className={styles.VideoChatBody}>
                <header className={styles.VideoChatHeader}>
                    <div className={styles.username}>{userEmail}</div>
                    <button className={styles.VideoChatExitBtn} onClick={exit}>나가기</button>
                </header>

                <div className={styles.VideoChatSection}>

                    <div className={styles.VideoView}>

                    </div>

                    <ChatView roomId={roomId}></ChatView>
                    
                </div>


            </div>
        </>
    )
}

export default VideoChat