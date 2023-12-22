'use client'

import { useLayoutEffect, useState, useRef } from 'react'

export const useResizableRef = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const targetRef = useRef<HTMLInputElement>(null)

  useLayoutEffect(() => {
    if (targetRef.current) {
      const updateSize = () => {
        setDimensions({
          width: targetRef.current?.offsetWidth || 0,
          height: targetRef.current?.offsetHeight || 0,
        })
      }

      // Set the initial size
      updateSize()

      // Create a ResizeObserver instance and observe the target element
      const resizeObserver = new ResizeObserver(updateSize)
      resizeObserver.observe(targetRef.current)

      // Cleanup the observer on component unmount
      return () => {
        resizeObserver.disconnect()
      }
    }
  }, [targetRef]) // Empty array ensures effect only runs on mount and unmount

  return { targetRef, dimensions }
}
