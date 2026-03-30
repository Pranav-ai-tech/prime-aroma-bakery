import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider } from 'antd'
import App from './App'
import './index.css'

const theme = {
  token: {
    colorPrimary: '#6B3E26',
    colorPrimaryHover: '#8B5E3C',
    borderRadius: 14,
    fontFamily: 'Inter, sans-serif',
    colorBgContainer: '#FFFFFF',
    colorBgLayout: '#FFF5E1',
  },
  components: {
    Button: {
      primaryColor: '#FFFFFF',
      borderRadius: 14,
    },
    Card: {
      borderRadius: 14,
    },
  },
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider theme={theme}>
      <App />
    </ConfigProvider>
  </React.StrictMode>
)
