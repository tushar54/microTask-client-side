import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import img from '../../public/user/img.jpg'
import img1 from '../../public/user/img1.jpg'
import img2 from '../../public/user/img2.jpg'
import img3 from '../../public/user/img3.jpg'


const FeedbackSlider = () => {
    const feedbacks = [
        {
            id: 1,
            photo: img,
            name: "John Doe",
            quote: "This service was fantastic! Highly recommended.",
        },
        {
            id: 2,
            photo: img1,
            name: "Jane Smith",
            quote: "An amazing experience. Will definitely come back!",
        },
        {
            id: 3,
            photo:  img2,
            name: "Alice Johnson",
            quote: "Great customer service and quick responses.",
        },
        {
            id: 4,
            photo:  img3,
            name: "Michael Brown",
            quote: "Truly exceeded my expectations. Thank you!",
        },
    ];

    return (
        <div className="p-6 ">
            <h2 className="text-3xl font-bold text-center mb-8">What Our Users Say</h2>
            <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                spaceBetween={30}
                slidesPerView={1}
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
            >
                {feedbacks.map((feedback) => (
                    <SwiperSlide key={feedback.id}>
                        <div className="flex flex-col items-center  p-6 rounded-lg shadow-lg">
                            <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                                <img
                                    src={feedback.photo}
                                    alt={feedback.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{feedback.name}</h3>
                            <p className=" text-center italic">"{feedback.quote}"</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default FeedbackSlider;
