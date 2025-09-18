import { useState } from 'react'
import Content from './layout/Content'
import Footer from './layout/Footer'
import Header from './layout/Header'
import { LeftSideWindow, RightSideWindow } from './components/SideWindows'

function App() {
  const [showLeftWindow, setShowLeftWindow] = useState(false)
  const [showRightWindow, setShowRightWindow] = useState(false)
  const [refresh, setRefresh] = useState(0)

  return (
    <>
      {showLeftWindow && (
        <LeftSideWindow onClose={() => {
          setShowLeftWindow(false)
          setRefresh(prev => prev + 1)
        }} />
      )}

      {showRightWindow && (
        <RightSideWindow onClose={() => {
          setShowRightWindow(false)
          setRefresh(prev => prev + 1)
        }} />
      )}

      <Header />
      <Content
        onShowLeftWindow={() => {
          if (showRightWindow) {
            setShowRightWindow(false)
            setShowLeftWindow(true)
          }
          setShowLeftWindow(true)
        }}
        onShowRightWindow={() => {
          if (setShowLeftWindow) {
            setShowLeftWindow(false)
            setShowRightWindow(true)
          }
          setShowRightWindow(true)

        }}
        refresh={refresh}
        stop={showLeftWindow || showRightWindow}
      />
      <Footer />
    </>
  )
}

export default App
