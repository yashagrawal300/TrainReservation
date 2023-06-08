import React, { useState } from 'react';

const TrainReservation = () => {
  const [seats, setSeats] = useState(Array(80).fill(false));

  const handleSeatClick = (index) => {
    const updatedSeats = [...seats];
    updatedSeats[index] = !updatedSeats[index];
    setSeats(updatedSeats);
  };

  const renderSeats = () => {
    const rows = [];
    let seatIndex = 0;

    for (let i = 0; i < 7; i++) {
      const rowSeats = [];

      for (let j = 0; j < (i === 6 ? 3 : 12); j++) {
        const isReserved = seats[seatIndex];
        const seatNumber = seatIndex + 1;

        rowSeats.push(
          <div
            key={seatNumber}
            className={`seat ${isReserved ? 'reserved' : 'available'}`}
            onClick={() => handleSeatClick(seatIndex)}
          >
            {seatNumber}
          </div>
        );

        seatIndex++;
      }

      rows.push(
        <div key={i} className="row">
          {rowSeats}
        </div>
      );
    }

    return rows;
  };

  return (
    <div className="train-reservation">
      <h2>Train Reservation</h2>
      <div className="seats">{renderSeats()}</div>
    </div>
  );
};

export default TrainReservation;
