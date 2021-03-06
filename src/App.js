import React, { useState } from 'react'
import { Box, Button, Grommet, Heading, Text } from 'grommet'
import AppBar from './componants/AppBar'

const sounds = {
  A: new Audio('do.wav'),
  B: new Audio('re.wav'),
  C: new Audio('mi.wav'),
  D: new Audio('fa.wav'),
}

const theme = {
  global: {
    colors: {
      brand: '#228BE6',
    },
    font: {
      family: 'Roboto',
      size: '14px',
      height: '20px',
    },
  },
}

const SimonButton = props => {
  const { label, color, textColor, onClick } = props

  return (
    <Button
      onClick={onClick}
      label={
        <Text color={textColor} size="xxlarge">
          {label}
        </Text>
      }
      primary
      fill
      color={color}
    />
  )
}

const flashButton = letter => {
  sounds[letter].play()
}

const newRound = seq => {
  const items = ['A', 'B', 'C', 'D']
  const newLetter = items[Math.floor(Math.random() * items.length)]
  const roundSequence = seq.concat(newLetter)
  roundSequence.split('').forEach((letter, index) => {
    console.log(`letter: ${letter}`)
    setTimeout(() => flashButton(letter), (2 + index) * 500)
  })
  console.log(roundSequence)
  return roundSequence
}

const App = () => {
  const [bestScore, setBestScore] = useState(0)
  const [sequence, setSequence] = useState(() => newRound(''))
  const [userSequence, setUserSequence] = useState('')

  const pressButton = letter => {
    sounds[letter].play()

    const newUserSequence = userSequence.concat(letter)
    if (sequence.slice(0, newUserSequence.length) === newUserSequence) {
      if (sequence.length === newUserSequence.length) {
        // won this round
        setBestScore(Math.max(sequence.length, bestScore))
        const nextRound = newRound(sequence)
        setSequence(nextRound)
        setUserSequence('')
      } else {
        // not done yet
        setUserSequence(newUserSequence)
      }
    } else {
      // lost round
      setSequence(newRound(''))
      setUserSequence('')
    }
  }

  return (
    <Grommet theme={theme} full>
      <Box fill>
        <AppBar>
          <Heading level="1" size="small" margin="none">
            Simon
          </Heading>
          <Text size="xlarge">Current: {sequence.length}</Text>
          <Text size="xlarge">Record: {bestScore}</Text>
        </AppBar>

        <Box direction="column" flex overflow={{ horizontal: 'hidden' }}>
          <Box direction="row" flex overflow={{ horizontal: 'hidden' }}>
            <Box flex align="center" justify="center">
              <SimonButton
                label="A"
                color="red"
                textColor="white"
                onClick={() => pressButton('A')}
              />
            </Box>
            <Box flex align="center" justify="center">
              <SimonButton
                label="B"
                color="blue"
                textColor="white"
                onClick={() => pressButton('B')}
              />
            </Box>
          </Box>

          <Box direction="row" flex overflow={{ horizontal: 'hidden' }}>
            <Box flex align="center" justify="center">
              <SimonButton
                label="C"
                color="green"
                textColor="white"
                onClick={() => pressButton('C')}
              />
            </Box>
            <Box flex align="center" justify="center">
              <SimonButton
                label="D"
                color="yellow"
                textColor="black"
                onClick={() => pressButton('D')}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Grommet>
  )
}

export default App
