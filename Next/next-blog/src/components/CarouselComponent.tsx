"use client";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
        slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1, // optional, default to 1.
    },
};
type Props = {
    children: React.ReactNode;
};
function CarouselComponent({ children }: Props) {
    return (
        <>
            <Carousel infinite centerMode showDots responsive={responsive} itemClass="m-2">
                {children}
            </Carousel>
        </>
    );
}

export default CarouselComponent;
