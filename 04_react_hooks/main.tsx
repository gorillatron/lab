import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { StoreProvider } from './src/Store'
import App from './src/components/App'


const Index = () => 
  <StoreProvider>
    <App />
  </StoreProvider>


ReactDOM.render(<Index />, document.getElementById('app'))