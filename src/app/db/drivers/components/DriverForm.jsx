"use client";

import { useRouter, usePathname } from "next/navigation";
import React from "react";
import { changeSingleStateValue } from "../../../../../utils/utils";

export default function DriverForm() {
  const router = useRouter();

  const [data, setData] = React.useState({});
  const [editMode, setEditMode] = React.useState(false);
  const pathname = usePathname();
  const id = pathname.split("id=")[1];

  React.useEffect(() => {
    if (id) {
      fetchDriver();
      setEditMode(true);
    }
  }, []);

  async function fetchDriver() {
    const response = await fetch(`/api/driver?id=${id}`, {
      method: "GET",
    });

    const data = await response.json();
    setData(data.body);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (editMode) {
      await fetch(`/api/driver?id=${id}`, {
        method: "PUT",
        body: JSON.stringify({ ...data }),
      });
    } else {
      await fetch("/api/driver", {
        method: "POST",
        body: JSON.stringify({ ...data }),
      });
    }

    router.push("/db/drivers");
  }

  async function handleDelete() {
    await fetch(`/api/driver?id=${id}`, {
      method: "DELETE",
    });
    router.push("/db/drivers");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
        <div>
          <label className="text-gray-700 dark:text-gray-200" for="Name">
            Name*
          </label>
          <input
            required
            id="Name"
            type="text"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
            value={data.name}
            onChange={(newVal) =>
              changeSingleStateValue(setData, "name", newVal.target.value)
            }
          />
        </div>

        <div>
          <label className="text-gray-700 dark:text-gray-200" for="tel">
            Tel
          </label>
          <input
            id="tel"
            type="text"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
            value={data.tel}
            onChange={(newVal) =>
              changeSingleStateValue(setData, "tel", newVal.target.value)
            }
          />
        </div>

        <div>
          <label
            className="text-gray-700 dark:text-gray-200"
            for="emailAddress"
          >
            Email Address
          </label>
          <input
            id="emailAddress"
            type="email"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
            value={data.email}
            onChange={(newVal) =>
              changeSingleStateValue(setData, "email", newVal.target.value)
            }
          />
        </div>
        
        <div className="">
          <label className="text-gray-700 dark:text-gray-200" for="color">
            Color
          </label>
          <input
            id="color"
            type="color"
            className="block w-full h-[42px] px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
            value={data.color}
            onChange={(newVal) => {
              changeSingleStateValue(setData, "color", newVal.target.value)
            }
            }
          />
        </div>
        

        <div className="col-span-2">
          <label className="text-gray-700 dark:text-gray-200" for="notes">
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
        >Back</button>
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
          {editMode ? "Update" : "Add new Driver"}
        </button>
      </div>
    </form>
  );
}
