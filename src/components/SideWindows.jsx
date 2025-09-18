import styles from './sideWindows.module.scss'

export const LeftSideWindow = ({ onClose }) => {
    return (
        <div
            className={styles.overlay}
            onClick={onClose}
        >
            <div
                className={styles.containerLeft}
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    className={styles.window}
                >
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex voluptates tempore atque officiis ipsa exercitationem veritatis facere! Asperiores incidunt, vel nulla atque mollitia, non sunt quasi maxime, nam doloremque ducimus.
                </div>
            </div>
        </div>
    )
}

export const RightSideWindow = ({ onClose }) => {
    return (
        <div
            className={styles.overlay}
            onClick={onClose}
        >
            <div
                className={styles.containerRight}
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    className={styles.window}
                >
                    Сайт для записи и ведения пациентов - Volmed
                    <img
                        src="../../imgs/volmed.png"
                        alt=""
                        style={{
                            width: '300px'
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
