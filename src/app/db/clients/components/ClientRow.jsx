'use client'

import { MdModeEditOutline } from "react-icons/md";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { useRouter } from "next/navigation";

export default function ClientRow({
  entry: {
    code,
    _id,
    name,
    address,
    tel,
    email,
    invoice,
    total,
    notes,
  },
  tdClass,
  trClass,
  tdId,
}) {

  console.log(invoice);
  const router = useRouter();

  function handleEdit() {
    router.push(`/db/clients/id=${_id}`)
  }

  return (
    <tr className={trClass}>
      <td className={tdClass}>
        <span onClick={handleEdit} className={tdId}>{code}</span>
      </td>

      <td className={tdClass}>
        <span className="font-bold">{name}</span>
      </td>

      <td className={tdClass}>
        <span>{address}</span>
      </td>

      <td className={tdClass}>
        <div className="flex flex-col">
          <small className="text-xs">Tel</small>
          <span>{tel}</span>
        </div>
        <div className="flex flex-col">
          <small className="text-xs">Email</small>
          <span>{email}</span>
        </div>
      </td>

      {/* <td className={tdClass}>
        <div className="flex flex-col">
          <small className="text-xs w-24">Open Invoice</small>
          <span className=" bg-green-400 bg-opacity-50 rounded-md text-center text-black font-bold">
            {invoice}
          </span>
        </div>
        <div className="flex flex-col">
          <small className="text-xs w-24">Total</small>
          <span className=" bg-emerald-800 bg-opacity-50 rounded-md text-center text-black font-bold">
            {total}
          </span>
        </div>
      </td> */}

      <td className={tdClass}>
          {notes}
      </td>

      <td className={tdClass}>
        <button 
        onClick={handleEdit}
        className="flex gap-2">
          <MdModeEditOutline />
          Edit
        </button>
        <button className="flex gap-2">
          <BsFillPlusCircleFill />
          Ride
        </button>
      </td>
    </tr>
  );
}
