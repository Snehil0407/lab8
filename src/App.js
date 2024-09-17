import React, { useState } from 'react';
import newYorkImage from './images/newyork.jpg';
import londonImage from './images/london.jpg';
import parisImage from './images/paris.jpg';
import backgroundImage from './images/background.jpg';
import { FaStar } from 'react-icons/fa';

const airlineData = [
  {
    id: 1,
    title: 'Flight to New York',
    features: 'Non-stop, Wi-Fi available, Meals included',
    additionalInfo: 'Departure: 10:00 AM | Arrival: 1:00 PM | Duration: 3 hours',
    imgSrc: newYorkImage,
  },
  {
    id: 2,
    title: 'Flight to London',
    features: '1 Stop, Wi-Fi available, Premium seating',
    additionalInfo: 'Departure: 5:00 PM | Arrival: 8:00 AM | Duration: 10 hours',
    imgSrc: londonImage,
  },
  {
    id: 3,
    title: 'Flight to Paris',
    features: 'Non-stop, Wi-Fi available, Business Class',
    additionalInfo: 'Departure: 9:00 AM | Arrival: 12:00 PM | Duration: 3 hours',
    imgSrc: parisImage,
  },
];

function App() {
  const [likedFlights, setLikedFlights] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [flightRatings, setFlightRatings] = useState({});

  const toggleLike = (id) => {
    setLikedFlights((prevLikes) => ({
      ...prevLikes,
      [id]: !prevLikes[id],
    }));
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRating = (flightId, rating) => {
    setFlightRatings((prevRatings) => ({
      ...prevRatings,
      [flightId]: rating,
    }));
  };

  const openModal = (flight) => {
    setSelectedFlight(flight);
  };

  const closeModal = () => {
    setSelectedFlight(null);
  };

  const filteredFlights = airlineData.filter((flight) =>
    flight.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className="flex flex-col min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Main Content Wrapper */}
      <div className="flex-grow p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Airline Reservation System</h1>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search flights..."
            className="p-2 w-full md:w-1/2 mx-auto block rounded-lg border border-gray-300"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        {/* Flight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredFlights.map((flight) => (
            <div key={flight.id} className="bg-white shadow-lg rounded-lg p-4">
              <img
                src={flight.imgSrc}
                alt={flight.title}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">{flight.title}</h2>
              <p className="text-gray-600 mb-4">{flight.features}</p>

              {/* Flight Rating */}
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`cursor-pointer ${
                      flightRatings[flight.id] > i ? 'text-yellow-500' : 'text-gray-300'
                    }`}
                    onClick={() => handleRating(flight.id, i + 1)}
                  />
                ))}
              </div>

              <div className="flex justify-between items-center">
                <button
                  onClick={() => toggleLike(flight.id)}
                  className={`text-gray-500 transition-transform duration-300 ${
                    likedFlights[flight.id] ? 'text-red-500 scale-150' : 'scale-100'
                  }`}
                >
                  ❤️
                </button>

                {/* More Info Button */}
                <button
                  onClick={() => openModal(flight)}
                  className="text-blue-500 underline"
                >
                  More Info
                </button>

                {/* Book Now Button */}
                <button className="bg-blue-500 text-white py-1 px-4 rounded-lg">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Flight Info Modal */}
      {selectedFlight && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">{selectedFlight.title}</h2>
            <p className="text-gray-600 mb-4">{selectedFlight.additionalInfo}</p>
            <button
              onClick={closeModal}
              className="bg-red-500 text-white py-1 px-4 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>Contact us: contact@airline.com | Follow us on social media!</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="#" className="text-blue-400">
            Facebook
          </a>
          <a href="#" className="text-blue-400">
            Twitter
          </a>
          <a href="#" className="text-blue-400">
            Instagram
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
