import "@splidejs/react-splide/css";

import { Box } from "@chakra-ui/react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import React from "react";

export function PageSlider({ images, description }) {
  if (images?.length === 0) return null;

  return (
    <>
      <Box position="absolute" top={0} left={0} bottom={0} right={0}>
        <Splide
          options={{
            fixedHeight: 300,
            type: "fade",
            pagination: false,
            arrows: false,
            autoplay: true,
            rewind: true,
          }}
        >
          {images.map((image) => (
            <SplideSlide key={image.url}>
              <img src={image.url} alt={image.url} />
              {description}
            </SplideSlide>
          ))}
        </Splide>
      </Box>
      <Box
        position="absolute"
        top={0}
        left={0}
        bottom={0}
        right={0}
        bgGradient="linear(to-r, blackAlpha.500, blackAlpha.400)"
      />
    </>
  );
}
