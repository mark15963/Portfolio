export default function Menu() {
    return (
        <menu
            style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                margin: 0,
                padding: 0
            }}
        >
            <a
                href="#"
                style={{
                    textDecoration: 'none',
                    margin: '0 10px'
                }}
            >
                О себе
            </a>
            <a
                href="#"
                style={{
                    textDecoration: 'none',
                    margin: '0 10px'
                }}
            >
                Контакты
            </a>
            <a
                href="#"
                style={{
                    textDecoration: 'none',
                    margin: '0 10px'
                }}
            >
                ...
            </a>
        </menu>
    )
}