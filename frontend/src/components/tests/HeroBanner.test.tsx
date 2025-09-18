import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom";
import HeroBanner from "../HeroBanner";

describe("HeroBanner", async () => {
    
    // nous nous assurons que HeroBanner s'affiche
    it("renders without crashing", () => {
        render(<HeroBanner img="test.jpg" />); 
        const banner = screen.getByRole("banner");
        expect(banner).toBeInTheDocument();
    }); 
    
    // nous nous assurons que l'image qui s'affiche est la bonne '
    it("applies the correct background image", () => {
        render(<HeroBanner img="test.jpg" />); 
        const banner = screen.getByRole("banner");
        expect(banner).toHaveStyle(
            "background-image: linear-gradient(to bottom, rgba(1,43,88,0.1), rgba(1.43.88.1)), url(test.jpg)"
        )
    })

    // que le text que contient la HeroBanner s'affiche correctement 
    it("renders children", () => {
        render(
            <HeroBanner img="test.jpg">
                <span>Child content</span>
            </HeroBanner>
        ); 
        expect(screen.getByText("Child content")).toBeInTheDocument()
    });
    
    //et que la class gradientBackGround est correctement utilisée
    it("has the correct class name", () => {
        render(<HeroBanner img='test.jpg' />); 
        const banner = screen.getByRole("banner");
        expect(banner).toHaveClass('gradientBackground');
    });
});