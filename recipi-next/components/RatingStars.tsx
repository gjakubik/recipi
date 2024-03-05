'use client'

import { useTheme } from 'next-themes'
import { useRive, useStateMachineInput } from '@rive-app/react-canvas'

const ASPECT_RATIO = 373 / 104

interface RatingStarsProps {
  width?: number
  setRating?: React.Dispatch<React.SetStateAction<number>>
}

export const RatingStars = ({ width = 160, setRating }: RatingStarsProps) => {
  const theme = useTheme()
  const { rive, RiveComponent } = useRive({
    src:
      theme.resolvedTheme === 'light'
        ? '/rive/rating_animation_light.riv'
        : '/rive/rating_animation.riv',
    stateMachines: 'State Machine 1',
    autoplay: true,
  })

  const rating = useStateMachineInput(rive, 'State Machine 1', 'rating', 0)

  return (
    <RiveComponent
      style={{ width, height: width / ASPECT_RATIO }}
      onClick={(e) => {
        // Use offsetX to get the click position relative to the canvas
        const clickX = e.nativeEvent.offsetX
        const widthPerStar = width / 5
        const clickedStar = Math.ceil(clickX / widthPerStar)

        if (!rating) return
        setRating && setRating(clickedStar)
        rating.value = clickedStar
      }}
    />
  )
}
