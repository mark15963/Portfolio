import ModelCanvas from "./components/Model";
import Render from "./components/Model";

const Article = () => {
    return (
        <article style={{
            display: 'flex',
            justifyContent: "space-between"
        }}>
            <div style={{
                width: '100%',
                height: 'fit-content',
                border: '7px double black',
            }}>
                <div style={{ width: '100%', textAlign: 'center' }}>A 3D model Three.js</div>
                <ModelCanvas />
            </div>
            <div style={{
                margin: '20px'
            }}>
                ARTICLE
            </div>
            <div style={{
                width: '100%',
                height: '80px',
                border: '7px double black',
            }}>

            </div>
        </article>
    )
}

export default Article