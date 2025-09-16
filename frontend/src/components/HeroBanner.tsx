// Types
type HeroBannerProps = {
    img: string
}

export default function HeroBanner({ img }: HeroBannerProps) {

    return (
        <div className="gradientBackground"
             style={{
                 backgroundImage: `linear-gradient(to bottom, 
                 rgba(1,43,88,0.1), rgba(1,43,88,1)), 
                 url(${img})`
             }}
        />
    )
}