import React, { useState } from 'react'
import { Box, Button, Grommet, Heading, Text } from 'grommet'
import AppBar from './componants/AppBar'

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

const newRound = roundLength => {
  const items = ['A', 'B', 'C', 'D']
  const roundSequence = [...Array(roundLength)]
    .map(() => items.splice(Math.floor(Math.random() * items.length), 1)[0])
    .join('')
  console.log(roundSequence)
  return roundSequence
}

const App = () => {
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [sequence, setSequence] = useState('A')
  const [userSequence, setUserSequence] = useState('')

  const pressButton = letter => {
    console.log(`pressed ${letter}`)
    const newUserSequence = userSequence.concat(letter)

    console.log(`seq ${sequence}`)
    console.log(`usr ${newUserSequence}`)

    if (sequence.slice(0, newUserSequence.length) === newUserSequence) {
      console.log('-- 1 --')
      if (sequence.length === newUserSequence.length) {
        console.log('-- 1 1 --')
        // won this round
        const newScore = sequence.length
        setBestScore(Math.max(newScore, bestScore))
        const nextRound = newRound(newScore + 1)
        setSequence(nextRound)
        setScore(newScore)
        setUserSequence('')
      } else {
        console.log('-- 1 2 --')
        // not done yet
        setUserSequence(newUserSequence)
      }
    } else {
      console.log('-- 2 --')
      // lost round
      setScore(0)
      setUserSequence('')
      setSequence(newRound(1))
    }
  }

  return (
    <Grommet theme={theme} full>
      <Box fill>
        <AppBar>
          <Heading level="1" size="small" margin="none">
            Simon
          </Heading>
          <Text>Score: {score}</Text>
          <Text>Record: {bestScore}</Text>
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
