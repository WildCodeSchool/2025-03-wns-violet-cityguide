// React
import { useState, type ReactNode } from "react";

type CarouselProps = {
    children: ReactNode[];
    visibleCount?: number;
};

export default function Carousel({ children, visibleCount = 4 }: CarouselProps) {
    const [index, setIndex] = useState(0);

    const total = children.length;
    const maxIndex = total - visibleCount;

    const prev = () => setIndex((cardNumber) => (cardNumber <= 0 ? maxIndex : cardNumber - 1));
    const next = () => setIndex((cardNumber) => (cardNumber >= maxIndex ? 0 : cardNumber + 1));

    const goTo = (cardNumber: number) => setIndex(cardNumber);

    return (
        <section className="carousel">
            {/* Navigation */}
            <div className="carousel__nav carousel__nav--prev" onClick={prev}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
            </div>

            <div className="carousel__viewport">
                <div
                    className="carousel__track"
                    style={{
                        width: `${(total / visibleCount) * 100}%`,
                        transform: `translateX(-${(index * 100) / total * visibleCount}%)`,
                    }}
                >
                    {children.map((child, idx) => (
                        <div
                            className="carousel__slide"
                            key={idx}
                            style={{ width: `${100 / total}%` }}
                        >
                            {child}
                        </div>
                    ))}
                </div>
            </div>

            <div className="carousel__nav carousel__nav--next" onClick={next}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
            </div>

            {/* Dots */}
            <div className="carousel__dots">
                {[...Array(maxIndex + 1)].map((_, i) => (
                    <button
                        key={i}
                        className={`carousel__dot ${i === index ? "carousel__dot--active" : ""}`}
                        onClick={() => goTo(i)}
                    />
                ))}
            </div>
        </section>
    );
}
