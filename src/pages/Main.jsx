import styles from '../styles/Main.module.css';

const Main = () => {
    return (
        <>
            <div className={styles.mainBody}>

                <div className={styles.mainBox}>
                    <div className={styles.btnBox}>
                        <button className={styles.commonBtn}>비인가 API 호출</button>
                        <button className={styles.commonBtn}>인가 API 호출</button>
                        <button className={styles.commonBtn}>쿠키 삭제</button>
                    </div>

                    <div className={styles.resultBox}>result</div>
                </div>
            </div>
        </>
    );
}

export default Main