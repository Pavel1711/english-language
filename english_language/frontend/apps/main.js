import React from 'react'
import { render } from 'react-dom'
import App from './main/App'

const indexPage = document.querySelector('#main');

if (indexPage) {
  render(<App/>, indexPage)
}
