import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-dedux'
import configureStore from './src/store'
import App from './src/components/App'


const store = configureStore()

const Index = () => 
  <Provider store={store}>
    <App />
  </Provider>


ReactDOM.render(<Index />, document.getElementById('app'))