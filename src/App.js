import React from 'react'
import { Grommet } from 'grommet'

const theme = {
  global: {
    font: {
      family: 'Roboto',
      size: '14px',
      height: '20px',
    },
  },
}

const App = () => {
  return <Grommet theme={theme}>Hello world!</Grommet>
}

export default App
