"use client";

import { MapPin, Phone, Building2, Pencil, Trash2 } from "lucide-react";

interface Address {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
}

interface AddressCardProps {
  address: Address;
  onEdit: (address: Address) => void;
  onDelete: (id: string) => void;
}

export default function AddressCard({ address, onEdit, onDelete }: AddressCardProps) {
  return (
    <div className="relative flex flex-col justify-between rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md">
      
      {/* أزرار التعديل والحذف (أعلى اليمين) */}
      <div className="absolute top-4 right-4 flex gap-2">
        <button
          onClick={() => onEdit(address)}
          className="rounded-md p-2 text-gray-400 transition hover:bg-gray-100 hover:text-green-600"
          title="Edit Address"
        >
          <Pencil size={18} />
        </button>
        <button
          onClick={() => onDelete(address._id)}
          className="rounded-md p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-500"
          title="Delete Address"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* محتوى الكارت */}
      <div className="flex items-start gap-4">
        {/* أيقونة الموقع */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600">
          <MapPin size={20} />
        </div>

        <div className="flex flex-col gap-2">
          {/* اسم العنوان */}
          <h3 className="text-lg font-bold text-gray-800">{address.name}</h3>
          
          {/* التفاصيل */}
          <p className="text-sm text-gray-500">{address.details}</p>
          
          {/* الهاتف والمدينة */}
          <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1.5">
              <Phone size={16} className="text-gray-400" />
              <span>{address.phone}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Building2 size={16} className="text-gray-400" />
              <span>{address.city}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}