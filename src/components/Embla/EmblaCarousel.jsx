"use client";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
// import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButton";
import Image from "next/image";

const EmblaCarousel = ({ slides }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3000, stopOnInteraction: false }),
  ]);

  // const { selectedIndex, scrollSnaps, onDotButtonClick } =
  //   useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className="lg:w-screen lg:h-screen  mx-auto">
      {/* Viewport */}
      <div className="overflow-hidden   h-full " ref={emblaRef}>
        <div className="flex h-full  touch-pan-y touch-pinch-zoom -ml-4">
          {slides?.map((img, index) => (
            <div
              className="flex-[0_0_100%] h-full  min-w-0 pl-4 transform-gpu"
              key={index}
            >
              <div className="flex items-center justify-center select-none  h-full ">
                <div className="">
                  <Image
                    src={img?.photo}
                    width={1600}
                    height={750}
                    alt={img.name}
                    className="w-screen lg:h-screen lg:object-cover object-center"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-[auto_1fr] justify-between gap-4 mt-6">
        {/* Prev / Next buttons */}
        {/* <div className="grid grid-cols-2 gap-2 items-center">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div> */}

        {/* Dots */}
        {/* <div className="flex flex-wrap justify-end items-center -mr-1">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={`w-10 h-10 flex items-center justify-center rounded-full ${
                index === selectedIndex
                  ? "after:content-[''] after:w-6 after:h-6 after:rounded-full after:border-2 after:border-gray-900"
                  : "after:content-[''] after:w-6 after:h-6 after:rounded-full after:border-2 after:border-gray-400"
              }`}
            />
          ))}
        </div> */}
      </div>
    </section>
  );
};

export default EmblaCarousel;
