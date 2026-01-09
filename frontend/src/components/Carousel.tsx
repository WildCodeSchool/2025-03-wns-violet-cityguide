// React
import { useState, type ReactNode } from "react";

type CarouselProps = {
    children: ReactNode[];
    visibleCount?: number;
};

export default function Carousel({ children, visibleCount = 5 }: CarouselProps) {
    const [index, setIndex] = useState(0);
    const total = children.length;

    // Si aucun élément à afficher
    if (total === 0) {
        return (
            <section className="carousel carousel--empty">
                <p>Aucun élément à afficher.</p>
            </section>
        );
    }

    const safeVisibleCount = Math.min(visibleCount, total);

    const maxIndex = total - safeVisibleCount;

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
                        width: `${(total / safeVisibleCount) * 100}%`,
                        transform: `translateX(-${(index * 100) / total}%)`,
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
