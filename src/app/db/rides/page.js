'use client'

import React from "react";
import RideRow from "@/app/db/rides/components/RideRow" 

export default function Rides() {

    const [rides, setRides] = React.useState([]);

    async function fetchRides() {
        const response = await fetch(`/api/ride`, {
          method: "GET",
        });
        const data = await response.json();
        setRides(data.body.data);
      }

      React.useEffect(() => {
        fetchRides();
      }, []);

    const titles = [
        "Id",
        "Date",
        "Itinerary",
        "Driver",
        "Client",
        "Price",
        "Invoice",
        "Notes",
        "Actions",
      ];
  return (
      <table className="table-auto w-full min-w-fit">
        <thead>
          <tr>
            {titles.map((title, i) => (
              <th key={i} className="text-left px-3">
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rides.map((ride) => (
            <RideRow
              key={ride._id}
              _id={ride._id}
              id={ride.count}
              date={ride.date}
              from={ride.from}
              to={ride.to}
              client_id={ride.client}
              driver_id={ride.driver}
              cash={ride.cash}
              credit={ride.credit}
              invoice_id={ride.invoice}
              invoice={ride.invoice_code}
              notes={ride.notes}
            />
          ))}
        </tbody>
      </table>
  );
}
