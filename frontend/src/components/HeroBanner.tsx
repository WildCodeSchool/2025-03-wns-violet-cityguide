// React
import React from "react";

// Types
type HeroBannerProps = {
    img: string,
    children?: React.ReactNode
}

export default function HeroBanner({ img, children }: HeroBannerProps) {

    return (
        <div 
        role="banner"
        className="gradientBackground"
             style={{
                 backgroundImage: `linear-gradient(to bottom, 
                 rgba(1,43,88,0.1), rgba(1,43,88,1)), 
                 url(${img})`
             }}
        >
            {children}
        </div>
    )
}
