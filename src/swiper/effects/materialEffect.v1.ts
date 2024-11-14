import { effectInit } from "swiper/effect-utils";
import { SwiperSlide } from "swiper/element";
import { SwiperModule } from "swiper/types";

const MaterialEffect: SwiperModule = ({ swiper, extendParams, on }) => {
  const EFFECT_NAME = "material";
  let currentTransitionSpeed = 0;
  extendParams({
    materialEffect: {
      primarySize: 0.5,
      secondarySize: 0.2,
    },
  });

  const getTransitionSpeed = () => {
    const transitionSpeed = currentTransitionSpeed;
    currentTransitionSpeed = 0;
    return transitionSpeed;
  };

  const mapRange = (
    num: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number
  ) => {
    // num = Math.max(Math.min(num, inMax), inMin);
    return ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  };

  const xsetTranslate = () => {
    if (swiper.params.effect !== EFFECT_NAME) return;
    const {
      width: swiperWidth,
      height: swiperHeight,
      slides,
      slidesSizesGrid,
      activeIndex,
      progress,
      wrapperEl,
    } = swiper as any;
    const durationInSeconds = getTransitionSpeed() / 1000;

    const primarySlideWidth =
      swiperWidth * swiper.params.materialEffect.primarySize;
    const secondarySlideWidth =
      swiper.params.materialEffect.secondarySize === "auto"
        ? (swiperWidth -
            (primarySlideWidth +
              (slides.length - 1) * swiper.params.spaceBetween)) /
          (slides.length - 1)
        : primarySlideWidth;

    // Resize slides
    slides.forEach((slide: any, index: number) => {
      const slideProgress = slide.progress;
      const progress = Math.max(Math.min(Math.abs(slideProgress), 1), 0);
      //   Set slide width
      if (progress > 1 || progress < -1) return;
      const distance = Math.abs(1 - progress);
      const width = mapRange(
        distance,
        0,
        1,
        secondarySlideWidth,
        primarySlideWidth
      );
      slide.style.width = `${width}px`;
    });

    // Wraper translate
    slides.forEach((slide: any, index: number) => {
      const slideProgress = slide.progress;
      //   const progress = Math.max(Math.min(slideProgress, 1), 0);
      if (index === activeIndex) {
        const targetX = 0 - secondarySlideWidth * index;
        const slideX = secondarySlideWidth * slideProgress;
        const offsetX =
          swiper.params.spaceBetween * (index - 1) * slideProgress;

        const translatX = targetX - slideX + offsetX;
        wrapperEl.style.transform = `translateX(${translatX}px)`;

        console.log(offsetX, swiper.params.spaceBetween * index);
      }
    });
  };

  const setTranslate = () => {
    if (swiper.params.effect !== EFFECT_NAME) return;
    const primaryWidth =
      swiper.width * swiper.params.materialEffect.primarySize;
    const secondaryWidth =
      swiper.width * swiper.params.materialEffect.secondarySize;

    const progress = swiper.progress;
    const translateStart = 0;
    const translateEnd = secondaryWidth * (swiper.slides.length - 1);

    swiper.slides.forEach((slide: any, index: number) => {
      const slideProgress = slide.progress;
      const progress = Math.max(Math.min(Math.abs(slideProgress), 1), 0);
      if (progress > 1 || progress < -1) return;
      const distance = Math.abs(1 - progress);
      const width = mapRange(distance, 0, 1, secondaryWidth, primaryWidth);
      slide.style.width = `${width}px`;
      slide.width = width;
    });

    const activeIndex = Math.min(
      Math.max(
        swiper.activeIndex +
          Math.floor(swiper.slides[swiper.activeIndex].progress),
        0
      ),
      swiper.slides.length - 1
    );

    const activeSlide = swiper.slides[activeIndex];
    const activeSlideProgres = activeSlide.progress;
    const leftSlidesCount = activeIndex;
    const rightSlidesCount = swiper.slides.length - (activeIndex + 1);
    const leftSlidesWidth = leftSlidesCount * secondaryWidth;
    const rightSlidesWidth = rightSlidesCount * secondaryWidth;
    const activeSlideWidth = activeSlide.width;
    const extra = activeSlideWidth + rightSlidesWidth - swiper.width;
    let translate = leftSlidesWidth;
    if (extra < 0) {
      translate += extra;
    }

    swiper.wrapperEl.style.transform = `translateX(${translate * -1}px)`;
    console.log(extra);
  };

  const setTransition = (duration: number) => {
    if (swiper.params.effect !== EFFECT_NAME) return;
    currentTransitionSpeed = duration;
  };

  effectInit({
    effect: EFFECT_NAME,
    swiper,
    on,
    setTranslate,
    setTransition,
    overwriteParams: () => {
      if (swiper.params.effect !== EFFECT_NAME) return {};

      return {
        watchSlidesProgress: true,
        virtualTranslate: true,
        slidesPerView: 1,
        spaceBetween: 0,
      };
    },
  });
};
export default MaterialEffect;
