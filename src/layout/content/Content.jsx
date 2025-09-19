import Article from "./Article"
import PersonAtDesk from "./components/PersonAtDesk"

import styles from './style/content.module.scss'

const Content = ({ onShowLeftWindow, onShowRightWindow, refresh, stop }) => {

    const handleClickLeft = () => onShowLeftWindow()
    const handleClickRight = () => onShowRightWindow()

    return (
        <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column'
        }}>
            <main>
                <div
                    style={{
                        display: 'flex',
                        width: '100%',
                        height: 'auto',
                        alignItems: 'center',
                    }}
                >
                    <button
                        onClick={handleClickLeft}
                        className={styles.button}
                    >
                        »
                    </button>
                    <div
                        className={styles.bg}
                    >
                        <PersonAtDesk stop={stop} refresh={refresh} />
                    </div>
                    <button
                        onClick={handleClickRight}
                        className={styles.button}
                    >
                        «
                    </button>
                </div>

            </main>
            <Article />
        </div>
    )
}

export default Content