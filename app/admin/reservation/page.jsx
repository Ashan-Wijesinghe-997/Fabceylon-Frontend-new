"use client";

import React, { useState, useEffect } from "react";

const AdminReservations = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    // Fetch reservations from the server or local storage
    const fetchedReservations = [
      {
        id: 1,
        cafe: "Cafe Nuwara",
        date: "2023-10-01",
        time: "18:00",
        people: 4,
        agreeToTerms: true,
      },
      
    ];
    setReservations(fetchedReservations);
  }, []);

  const handleApprove = (id) => {
    alert(`Reservation ${id} approved`);
  };

  const handleReject = (id) => {
    alert(`Reservation ${id} rejected`);
  };

  const handleDelete = (id) => {
    setReservations(reservations.filter((reservation) => reservation.id !== id));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-orange-100">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md">
        <h1 className="flex items-center justify-center mb-4 text-2xl font-bold">
          Admin Reservations
        </h1>
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Cafe</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Time</th>
              <th className="px-4 py-2">People</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation.id}>
                <td className="px-4 py-2 border">{reservation.id}</td>
                <td className="px-4 py-2 border">{reservation.cafe}</td>
                <td className="px-4 py-2 border">{reservation.date}</td>
                <td className="px-4 py-2 border">{reservation.time}</td>
                <td className="px-4 py-2 border">{reservation.people}</td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => handleApprove(reservation.id)}
                    className="px-2 py-1 mr-2 text-white bg-green-500 rounded"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(reservation.id)}
                    className="px-2 py-1 mr-2 text-white bg-yellow-500 rounded"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleDelete(reservation.id)}
                    className="px-2 py-1 text-white bg-red-500 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminReservations;
