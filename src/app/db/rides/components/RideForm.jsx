"use client";

import { useRouter, usePathname } from "next/navigation";
import React from "react";
import { changeSingleStateValue } from "../../../../../utils/utils";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/dark.css";

export default function RideForm() {
  const router = useRouter();

  const [data, setData] = React.useState({
    date: Date.now(),
  });
  const [editMode, setEditMode] = React.useState(false);
  const pathname = usePathname();
  const id = pathname.split("id=")[1];
  const [drivers, setDrivers] = React.useState([]);
  const [clients, setClients] = React.useState([]);

  React.useEffect(() => {
    fetchClients();
    fetchDrivers();

    if (id) {
      fetchRide();
      setEditMode(true);
    }
  }, []);

  async function fetchRide() {
    const response = await fetch(`/api/ride?id=${id}`, {
      method: "GET",
    });

    const data = await response.json();
    setData(data.body);
    console.log(data.body.date);
  }

  async function fetchClients() {
    const response = await fetch(`/api/client`, {
      method: "GET",
    });

    const data = await response.json();
    setClients(data.body.data);
  }

  async function fetchDrivers() {
    const response = await fetch(`/api/driver`, {
      method: "GET",
    });

    const data = await response.json();
    setDrivers(data.body.data);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (editMode) {
      await fetch(`/api/ride?id=${id}`, {
        method: "PUT",
        body: JSON.stringify({ ...data }),
      });
    } else {
      await fetch("/api/ride", {
        method: "POST",
        body: JSON.stringify({ ...data }),
      });
    }

    router.back();
  }

  async function handleDelete() {
    await fetch(`/api/ride?id=${id}`, {
      method: "DELETE",
    });
    router.push("/db/rides");
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          <div>
            <label className="text-gray-700 dark:text-gray-200" htmlFor="Name">
              Date*
            </label>
            <Flatpickr
              options={{
                altInput: true,
                altFormat: "d-m-y -- H:i",
              }}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              data-enable-time
              value={data.date}
              onChange={(newVal) =>
                changeSingleStateValue(setData, "date", newVal.target.value)
              }
            />
          </div>

          <div>
            <label
              className="text-gray-700 dark:text-gray-200"
              htmlFor="driver"
            >
              Driver*
            </label>
            <select
              required
              id="driver"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              value={data.driver}
              onChange={(newVal) =>
                changeSingleStateValue(setData, "driver", newVal.target.value)
              }
            >
              {drivers.map((driver) => (
                <option value={driver._id}>{driver.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label
              className="text-gray-700 dark:text-gray-200"
              htmlFor="client"
            >
              Client
            </label>
            <select
              id="client"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              value={data.client}
              onChange={(newVal) =>
                changeSingleStateValue(setData, "client", newVal.target.value)
              }
            >
              <option value={null}></option>
              {clients.map((client) => (
                <option value={client._id}>{client.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-gray-700 dark:text-gray-200" htmlFor="from">
              From
            </label>
            <input
              id="from"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              value={data.from}
              onChange={(newVal) =>
                changeSingleStateValue(setData, "from", newVal.target.value)
              }
            />
          </div>

          <div>
            <label className="text-gray-700 dark:text-gray-200" htmlFor="to">
              To
            </label>
            <input
              id="to"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              value={data.to}
              onChange={(newVal) =>
                changeSingleStateValue(setData, "to", newVal.target.value)
              }
            />
          </div>

          <div>
            <label className="text-gray-700 dark:text-gray-200" htmlFor="cash">
              Cash
            </label>
            <input
              id="cash"
              type="number"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              value={data.cash}
              onChange={(newVal) =>
                changeSingleStateValue(setData, "cash", newVal.target.value)
              }
            />
          </div>

          <div>
            <label
              className="text-gray-700 dark:text-gray-200"
              htmlFor="credit"
            >
              Credit
            </label>
            <input
              id="credit"
              type="number"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              value={data.credit}
              onChange={(newVal) =>
                changeSingleStateValue(setData, "credit", newVal.target.value)
              }
            />
          </div>

          <div className="col-span-2">
            <label className="text-gray-700 dark:text-gray-200" htmlFor="notes">
              Notes
            </label>
            <textarea
              id="notes"
              type="email"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              value={data.notes}
              onChange={(newVal) =>
                changeSingleStateValue(setData, "notes", newVal.target.value)
              }
            />
          </div>
        </div>

        <div className="flex justify-end mt-6 gap-4">
          <button
            type="submit"
            className=" px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            onClick={() => router.back()}
          >
            Back
          </button>
          {editMode && (
            <button
              type="button"
              className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-red-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
              onClick={handleDelete}
            >
              DELETE
            </button>
          )}
          <button
            type="submit"
            className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
          >
            {editMode ? "Update" : "Add new Ride"}
          </button>
        </div>
      </form>
    </div>
  );
}