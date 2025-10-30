export default function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
  return (
    <div className="flex justify-center mt-6">
      <input
        type="text"
        placeholder="Search experiences..."
        onChange={(e) => onSearch(e.target.value)}
        className="border border-teal-400 rounded-l-lg px-4 py-2 w-72 focus:outline-none"
      />
      <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-r-lg">
        Search
      </button>
    </div>
  );
}
