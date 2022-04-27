import { Box, Image } from "@chakra-ui/react";
import { ENDPOINT } from "@static/constants";
import { useKeenSlider } from "keen-slider/react";
import React from "react";

export default function HomePageComponent() {
  const [sliderRef] = useKeenSlider(
    {
      loop: true,
      breakpoints: {
        "(min-width: 400px)": {
          slides: { perView: 2, spacing: 10 },
        },
        "(min-width: 1000px)": {
          slides: { perView: 6, spacing: 20 },
        },
      },
      slides: { perView: 1 },
    },
    [
      (slider) => {
        let timeout;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.moveToIdx(slider.track.details.abs + (slider as any).options.slides.perView);
          }, 8000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  return (
    <Box ref={sliderRef} className="keen-slider" my={6}>
      {new Array(39).fill(0).map((_, i) => (
        <Box className="keen-slider__slide" key={i} overflow="visible">
          <Image
            width="100%"
            borderRadius="lg"
            boxShadow="lg"
            loading="lazy"
            background="gray.300"
            src={`${ENDPOINT.PAGES}/image/h-slider-${i + 1}.jpg`}
          />
        </Box>
      ))}
    </Box>
  );
}
