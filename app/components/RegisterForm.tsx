"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Phone, MapPin } from "lucide-react";

export default function RegisterForm() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({ phone: "", address: "" });

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    
    let hasError = false;
    const newErrors = { phone: "", address: "" };

    if (!/^\d{10}$/.test(phoneNumber)) {
      newErrors.phone = "Phone number must be exactly 10 digits.";
      hasError = true;
    }

    if (address.trim().length < 5) {
      newErrors.address = "Address must be at least 5 characters.";
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) return;

    // Store temporarily
    sessionStorage.setItem("register_phone", phoneNumber);
    sessionStorage.setItem("register_address", address);
    
    // Navigate to Google auth step
    router.push("/auth/google-login");
  };

  return (
    <form onSubmit={handleNext} className="space-y-6 w-full max-w-md">
      <div>
        <label className="block text-sm font-medium text-[#222222] mb-2">
          Phone Number
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Phone className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="tel"
            required
            className={`pl-10 block w-full border ${errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-[#0D9488]'} rounded-xl py-3 px-4 focus:outline-none focus:ring-2 transition-colors`}
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10)); // Force digits only up to 10
              if (errors.phone) setErrors({ ...errors, phone: "" });
            }}
          />
        </div>
        {errors.phone && <p className="mt-2 text-sm text-red-500">{errors.phone}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-[#222222] mb-2">
          Address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPin className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            required
            className={`pl-10 block w-full border ${errors.address ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-[#0D9488]'} rounded-xl py-3 px-4 focus:outline-none focus:ring-2 transition-colors`}
            placeholder="Enter your current address"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
              if (errors.address) setErrors({ ...errors, address: "" });
            }}
          />
        </div>
        {errors.address && <p className="mt-2 text-sm text-red-500">{errors.address}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-[#0D9488] hover:bg-[#0D9488] text-white font-semibold py-3.5 px-4 rounded-xl shadow-lg transition-transform active:scale-95"
      >
        Next Step
      </button>
    </form>
  );
}
