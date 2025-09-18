import PersonAtDesk from "../components/PersonAtDesk"

import styles from './content.module.scss'

const Content = ({ onShowLeftWindow, onShowRightWindow, refresh, stop }) => {

    const handleClickLeft = () => onShowLeftWindow()
    const handleClickRight = () => onShowRightWindow()

    return (
        <>
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
            <article>
                ARTICLE
            </article>
        </>
    )
}

export default Content