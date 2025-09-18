import Menu from "../components/Menu"

const Header = () => {
    return (
        <>
            <header
                style={{
                    height: '80px',
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: '#fffee6ff',
                    zIndex: 0
                }}
            >
                <Menu />
            </header>
        </>
    )
}

export default Header