import React from 'react'

type LoadingSpinnerProps = {
  color: string;
  size: string;
  thickness: string;
}

const LoadingSpinner = ({ color, size, thickness }: LoadingSpinnerProps) => {
  return (
    <span className={`${color} ${size} ${thickness} border-t-transparent rounded-full animate-spin`}></span>
  )
}

export default LoadingSpinner