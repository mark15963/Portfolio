export default function Menu() {
    return (
        <menu
            style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                margin: 0,
                padding: 0,
            }}
        >
            <Link text='О себе' url='#' />
            <Link text='Контакты' url='#' />
            <Link text='...' url='#' />
        </menu>
    )
}

const Link = ({ text, url }) => {
    return (
        <a
            href={url}
            style={{
                textDecoration: 'none',
                margin: '0 10px',
                color: 'aliceblue'
            }}
        >
            {text}
        </a>
    )
}