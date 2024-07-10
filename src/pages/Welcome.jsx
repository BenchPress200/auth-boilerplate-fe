import styles from '../styles/Welcome.module.css';


const moveToJoin = () => {
    window.open(
        "/join",
        "join",
        "width=500, height=500, top=0, left=0, resizable=yes"
    )
}


const Welcome = () => {
    return (
      <>
        <div className={styles.welcomeBody}>

            <form className={styles.loginForm} action='/main'>
                <input className={styles.emailInput} type="text" placeholder='Email'></input>
                <input className={styles.passwordInput} type="text" placeholder='Password'></input>
                <button className={styles.loginBtn} type="submit">Login</button>
                <button className={styles.joinBtn} onClick={moveToJoin} type='button'>Join</button>
            </form>

        </div>
      </>
    );
}


export default Welcome;