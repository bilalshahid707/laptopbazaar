export const TestimonialCard = ({ props }) => {
  return (
    <div className="bg-white box rounded-lg p-6 w-80 border border-gray-200">
      <div className="custom-flex space-x-4 w-full">
        <img
          src="https://randomuser.me/api/portraits/men/45.jpg"
          alt="John Doe"
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h4 className="font-semibold text-black">{props.user?.name}</h4>
          <div className="flex text-yellow-500">
            {Array.from({length:props.rating}).map((star, index) => (
              <ion-icon name="star" key={index}></ion-icon>
            ))}
          </div>
        </div>
      </div>
      <p className="text-black text-base mt-4">{props.review}</p>
    </div>
  );
};

export default TestimonialCard;
