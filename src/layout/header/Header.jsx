import Navbar from "./components/Navbar"

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
                    background: '#241c50ff',
                    zIndex: 0
                }}
            >
                <Navbar />
            </header>
        </>
    )
}

export default Header