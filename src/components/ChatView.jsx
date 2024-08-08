import ChatBox from './ChatBox';
import {useRef, useState, useEffect} from 'react'
import styles from '../styles/ChatView.module.css';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import Cookies from 'js-cookie';

const ChatView = (props) => {
    const {roomId} = props;
    const [messages, setMessages] = useState([]);  // 채팅 메시지 목록을 상태로 관리
    const [content, setContent] = useState(''); // 입력 필드에서 사용자가 입력한 채팅 메시지 내용을 상태로 관리
    const [client, setClient] = useState(null); // WebSocket 연결을 관리하는 STOMP 클라이언트 객체를 상태로 관리
    const [user, setUser] = useState(null);
    const [userEmail, setUserEmail] = useState('');
    const messagesEndRef = useRef(null);

    // 컴포넌트가 마운트되었을 때 WebSocket 연결을 설정
    // 언마운트될 때 연결을 해제하는 작업을 수행
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

        const stompClient = new Client({ // STOMP 프로토콜을 사용하는 클라이언트 객체를 생성
            webSocketFactory: () => new SockJS(`http://localhost:8080/api/v1/rooms`), // 서버와의 연결을 생성
            // 서버와의 연결이 성공적으로 이루어지면, 특정 주제(/topic/${roomId})를 구독하고 메시지가 도착할 때마다 상태를 업데이트
            onConnect: () => {
                stompClient.subscribe(`/api/v1/rooms/${roomId}`, (message) => {
                    if (message.body) {
                        setMessages((prevMessages) => [...prevMessages, JSON.parse(message.body)]);
                    }
                });
            },

            // 에러 처리 로직
            onStompError: (frame) => {
                console.error(frame.headers['message']);
                console.error(frame.body);
            }
        });

        stompClient.activate();
        setClient(stompClient);
        fetchUserData();

        return () => {
            stompClient.deactivate();
        };
    }, [roomId]);

    const sendMessage = () => {
        if (client && content) {
            client.publish({
                destination: `/send/rooms/${roomId}`,
                body: JSON.stringify({ content, sender: userEmail, roomId }),
            });
            setContent('');
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <div className={styles.ChatView}>
                <div className={styles.ChatList}>
                    {messages.map((msg, index) => (
                        <ChatBox key={index} name={msg.sender} text={msg.content}></ChatBox>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                <div className={styles.ChatInputBox}>
                    <input 
                        type='text' 
                        className={styles.ChatInput}
                        onChange={(e) => setContent(e.target.value)}></input>

                    <button 
                        className={styles.ChatBtn}
                        onClick={sendMessage}>전송
                    </button>
                </div>
            </div>

        </>
    );
}

export default ChatView;