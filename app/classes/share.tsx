import { FacebookShareButton, FacebookIcon } from 'react-share'

export const FacebookShare = () => {
  const href = typeof window !== 'undefined' ? `${window.location.href}` : ''

  return (
    <FacebookShareButton url={href}>
      <FacebookIcon />
    </FacebookShareButton>
  )
}

export const Share = () => (
  <div className="share-container">
    Share
    <FacebookShare />
  </div>
)
