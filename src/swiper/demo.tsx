import { Swiper, SwiperSlide } from "swiper/react"; 
import "swiper/css"; 
import MaterialEffect from "./effects/materialEffect";

export default function Demo() {
  return (
    <div className="w-full">
      <Swiper
        modules={[MaterialEffect]}
        effect="material"
        className="bg-green-400"
      >
        <SwiperSlide>
          <Slide
            image="https://plus.unsplash.com/premium_photo-1661962309696-c429126b237e?q=80&w=2000&h=600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            title="Welcome to Our Demo"
            description="Explore the features and functionalities of our platform through this interactive demo. Click through to see how our solution can streamline your workflow and enhance productivity."
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image="https://images.unsplash.com/photo-1528696334500-245a1b1b67f4?q=80&w=2000&h=600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            title="Key Features"
            description="Discover the standout features that set us apart. From user-friendly interfaces to powerful analytics, each slide highlights a unique aspect of our service, designed to meet your needs."
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image="https://images.unsplash.com/photo-1714083158866-e0eca7ca219d?q=80&w=2000&h=600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            title="Get Started Today"
            description="Ready to take the next step? This slider guides you through the easy onboarding process. Sign up now and unlock the full potential of our platform with a free trial!"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image="https://images.unsplash.com/photo-1528696334500-245a1b1b67f4?q=80&w=2000&h=600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            title="Key Features"
            description="Discover the standout features that set us apart. From user-friendly interfaces to powerful analytics, each slide highlights a unique aspect of our service, designed to meet your needs."
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

type SlideProps = {
  title: string;
  description: string;
  image: string;
};
function Slide({ title, description, image }: SlideProps) {
  return (
    <div className="border-2 border-dashed border-red-600 pointer-events-none">
      <img
        src={image}
        alt="img"
        className="w-full h-[400px] object-cover object-center"
      />
      <div className="p-10 bg-gray-400">
        <div className="max-w-2xl">
          <h1 className="text-2xl">{title}</h1>
          <p className="text-lg leading-normal mt-5">{description}</p>
        </div>
      </div>
    </div>
  );
}
