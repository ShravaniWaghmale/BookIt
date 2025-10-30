export default function ExperienceCard({ experience }: any) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <img src={experience.image} alt={experience.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-teal-700">{experience.title}</h2>
        <p className="text-gray-600 text-sm mt-1">{experience.description}</p>
        <p className="text-orange-600 font-bold mt-2">₹{experience.price}</p>
        <button className="mt-3 w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600">
          Book Now
        </button>
      </div>
    </div>
  );
}
