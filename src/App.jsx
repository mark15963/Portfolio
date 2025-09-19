import { useState } from 'react'
import Content from './layout/content/Content'
import Footer from './layout/footer/Footer'
import Header from './layout/header/Header'
import { LeftSideWindow, RightSideWindow } from './layout/content/components/SideWindows'

export default function App() {
  const [showLeftWindow, setShowLeftWindow] = useState(false)
  const [showRightWindow, setShowRightWindow] = useState(false)
  const [refresh, setRefresh] = useState(0)

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh'
    }}>
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
    </div>
  )
}