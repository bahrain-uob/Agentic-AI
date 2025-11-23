import React from 'react'
import defaultImg from '../images/image.png'

export default function Avatar({ src, alt = 'avatar', className = '', onLoad }) {
    // for now the avatar work with the bot only in future we can attach user avatars too from university accounts
  const imgSrc = src ?? defaultImg
  return (
    <img
      src={imgSrc}
      alt={alt}
      className={`w-8 h-8 rounded-full mr-3 shrink-0 ${className}`}
      onLoad={onLoad}
    />
  )
}
