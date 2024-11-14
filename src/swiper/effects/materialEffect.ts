// @ts-nocheck
import { animate } from "motion";
import { effectInit } from "swiper/effect-utils";
import { SwiperModule } from "swiper/types";

const toggleSlideClasses$1 = (slideEl, condition, className) => {
  if (condition && !slideEl.classList.contains(className)) {
    slideEl.classList.add(className);
  } else if (!condition && slideEl.classList.contains(className)) {
    slideEl.classList.remove(className);
  }
};

const MaterialEffect: SwiperModule = ({ swiper, extendParams, on }) => {
  const EFFECT_NAME = "material";
  let transitionDuration = 0;
  let effect = {
    isCustomEffect : false,
  }


  const mapRange = (
    num: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number
  ) => {
    return ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  };

  const clamp = (num: number, min: number, max: number) => {
    return Math.max(Math.min(num, max), min);
  };  


  swiper.getDirectionLabel = (property) => {
    if (property === 'width') {
      return "--width";
    }
    return property;
  }

  swiper.updateSlidesProgress = function(translate){
    if (translate === void 0) {
      translate = this && this.translate || 0;
    }
    const swiper = this;
    const params = swiper.params;
    const {
      slides,
      rtlTranslate: rtl,
      snapGrid
    } = swiper;
    if (slides.length === 0) return;
    if (typeof slides[0].swiperSlideOffset === 'undefined') swiper.updateSlidesOffset();
    let offsetCenter = -translate;
    if (rtl) offsetCenter = translate;
    swiper.visibleSlidesIndexes = [];
    swiper.visibleSlides = [];
    let spaceBetween = params.spaceBetween;
    if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
      spaceBetween = parseFloat(spaceBetween.replace('%', '')) / 100 * swiper.size;
    } else if (typeof spaceBetween === 'string') {
      spaceBetween = parseFloat(spaceBetween);
    }
    for (let i = 0; i < slides.length; i += 1) {
      const slide = slides[i];
      let slideOffset = slide.swiperSlideOffset;
      if (params.cssMode && params.centeredSlides) {
        slideOffset -= slides[0].swiperSlideOffset;
      }
          

      const slideProgress = (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + spaceBetween);
      const originalSlideProgress = (offsetCenter - snapGrid[0] + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + spaceBetween);
      const slideBefore = -(offsetCenter - slideOffset);
      const slideAfter = slideBefore + swiper.slidesSizesGrid[i];
      const isFullyVisible = slideBefore >= 0 && slideBefore <= swiper.size - swiper.slidesSizesGrid[i];
      const isVisible = slideBefore >= 0 && slideBefore < swiper.size - 1 || slideAfter > 1 && slideAfter <= swiper.size || slideBefore <= 0 && slideAfter >= swiper.size;
      if (isVisible) {
        swiper.visibleSlides.push(slide);
        swiper.visibleSlidesIndexes.push(i);
      }
      toggleSlideClasses$1(slide, isVisible, params.slideVisibleClass);
      toggleSlideClasses$1(slide, isFullyVisible, params.slideFullyVisibleClass);
      slide.progress = rtl ? -slideProgress : slideProgress;
      slide.originalProgress = rtl ? -originalSlideProgress : originalSlideProgress;

      const snapPos = snapGrid[i];
      const nextPos =  snapGrid.length > i+1 ? snapGrid[i+ 1] : (snapGrid[i] + slides[i].swiperSlideSize);

      slide.progress = mapRange(-translate, snapPos, nextPos, 0, 1);
  
  
  
    }
  }
  

  extendParams({
    materialEffect: {
      primarySize: 0.5,
    },
  });

  const setTranslate = () => {
    
    if (swiper.params.effect !== EFFECT_NAME) return;
    effect.isCustomEffect = true;
  

    const primaryWidth =
      swiper.width * swiper.params.materialEffect.primarySize;
    const secondaryWidth =
      (swiper.width -
        primaryWidth -
        swiper.params.spaceBetween * (swiper.slides.length - 1)) /
      (swiper.slides.length - 1);

    swiper.slides.forEach((slide: any, index: number) => {
      const animatedProps = {
        width: 0,
        marginLeft: 0,
      };
      const slideProgress = slide.progress;
      const originalProgress = slide.originalProgress;
      const progress = clamp(
        Math.max(Math.min(Math.abs(slideProgress), 1), 0),
        0,
        1
      );

      if (index === 1 ){
        // console.log(slideProgress, originalProgress);
      }

      const distance = Math.abs(1 - progress);
      animatedProps.width = Math.round(
        mapRange(distance, 0, 1, secondaryWidth, primaryWidth)
      );

      const isLastSlide = index === swiper.slides.length - 1;
      const isFirstSlide = index === 0;
      if (isFirstSlide) {
        if (slideProgress < 0) {
          animatedProps.marginLeft = primaryWidth - animatedProps.width;
        }
      }
      slide.width = animatedProps.width;


      animate(slide, animatedProps, {
        duration: transitionDuration / 1000,
        easing: "ease",
      });
    });
  };

  const setTransition = (duration: number) => {
    if (swiper.params.effect !== EFFECT_NAME) return;
    transitionDuration = duration;
    effect.isCustomEffect = false;
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
        loop: false,
        spaceBetween: 24,
        initialSlide: 0,
        
      };
    },
  });
};
export default MaterialEffect;
