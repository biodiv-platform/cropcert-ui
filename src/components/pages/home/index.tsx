import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Button, ButtonGroup, Image } from "@chakra-ui/react";
import { ENDPOINT } from "@static/constants";
import { useKeenSlider } from "keen-slider/react";
import React from "react";

export default function HomePageComponent() {
  const [sliderRef, slider] = useKeenSlider(
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
      (_slider) => {
        let timeout;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            _slider.moveToIdx(_slider.track.details.abs + 1);
          }, 5000);
        }
        _slider.on("created", () => {
          _slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          _slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        _slider.on("dragStarted", clearNextTimeout);
        _slider.on("animationEnded", nextTimeout);
        _slider.on("updated", nextTimeout);
      },
    ]
  );

  return (
    <>
      <Box ref={sliderRef} className="keen-slider" my={6}>
        {new Array(39).fill(0).map((_, i) => (
          <Box className="keen-slider__slide" key={i} overflow="visible">
            <Image
              width="100%"
              borderRadius="lg"
              boxShadow="lg"
              loading="lazy"
              background="gray.300"
              src={`${ENDPOINT.PAGES}/image/crop-img-${i + 1}.jpg`}
            />
          </Box>
        ))}
      </Box>
      <Box textAlign="right" mb={6}>
        <ButtonGroup spacing={4} variant="outline" colorScheme="blue">
          <Button leftIcon={<ArrowBackIcon />} onClick={() => slider?.current?.prev()}>
            Previous
          </Button>
          <Button rightIcon={<ArrowForwardIcon />} onClick={() => slider?.current?.next()}>
            Next
          </Button>
        </ButtonGroup>
      </Box>
    </>
  );
}
