import React from 'react'
import { Box, Grommet, Heading, Text } from 'grommet'
import AppBar from './componants/AppBar'

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
  return (
    <Grommet theme={theme} full>
      <Box fill>
        <AppBar>
          <Heading level="1" size="small" margin="none">
            Simon
          </Heading>
          <Text>Score: 99</Text>
          <Text>Record: 99</Text>
        </AppBar>

        <Box direction="column" flex overflow={{ horizontal: 'hidden' }}>
          <Box direction="row" flex overflow={{ horizontal: 'hidden' }}>
            <Box flex align="center" justify="center">
              A
            </Box>
            <Box flex align="center" justify="center">
              B
            </Box>
          </Box>

          <Box direction="row" flex overflow={{ horizontal: 'hidden' }}>
            <Box flex align="center" justify="center">
              C
            </Box>
            <Box flex align="center" justify="center">
              D
            </Box>
          </Box>
        </Box>
      </Box>
    </Grommet>
  )
}

export default App
