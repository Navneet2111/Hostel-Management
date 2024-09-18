import React from "react";

const HostelCard = ({ hostel, toggleDetails }) => {
 
  return (
    <div className="bg-slate-200 rounded-lg shadow-xl p-2 hover:shadow-2xl transition duration-300 ease-in-out transform ">
      <div className="text-center text-2xl font-bold text-gray-800 mb-4">
        {hostel.name}
      </div>
      <div className="text-center text-gray-600 mb-12 flex justify-center">
       <p className=" font-semibold  mr-2"> Address: </p> {hostel.fullAddress}
      </div>
      <div className="flex justify-between text-gray-600 mb-2">
        <div className="flex flex-col items-center">
          <div className="text-2xl font-bold">{hostel.totalBeds}</div>
          <div className="text-sm font-semibold">Total Beds</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-2xl font-bold">{hostel.occupiedBeds}</div>
          <div className="text-sm font-semibold">Occupied Beds</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-2xl font-bold">{hostel.remainingBeds}</div>
          <div className="text-sm font-semibold">Empty Beds</div>
        </div>
      </div>
      <button
        onClick={() => toggleDetails(hostel)}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded mx-auto block"
      >
        Show More
      </button>
    </div>
  );
};

export default HostelCard;
