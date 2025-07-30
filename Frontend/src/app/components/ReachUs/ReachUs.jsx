'use client';

import { useState, memo } from 'react';
import dynamic from 'next/dynamic';

// Dynamically load only icons needed
const FaMapMarkerAlt = dynamic(() => import('react-icons/fa').then(mod => mod.FaMapMarkerAlt));
const FaPhone = dynamic(() => import('react-icons/fa').then(mod => mod.FaPhone));
const FaCopy = dynamic(() => import('react-icons/fa').then(mod => mod.FaCopy));

const phoneNumbers = ['0776232181', '0773051933', '0774734880'];

function ReachUs() {
  const [copiedPhone, setCopiedPhone] = useState('');

  const handleCopyPhone = (phoneNumber) => {
    navigator.clipboard.writeText(phoneNumber);
    setCopiedPhone(phoneNumber);
    setTimeout(() => setCopiedPhone(''), 2000);
  };

  const handleCallPhone = (phoneNumber) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <>
        <h2 className="subheading">Reach Us</h2>
        <section className="max-w-6xl mx-auto px-4 py-12">
        {/* <h1 className="subheading">Reach Us</h1> */}
      

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Address Section */}
        <div className="bg-white shadow-md p-6 rounded-xl text-center">
          <FaMapMarkerAlt className="text-indigo-600 text-4xl mb-4 mx-auto" />
          <h3 className="text-xl font-semibold mb-6 text-blue-500">Our Locations</h3>
          <div className="space-y-6">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h5 className="font-medium mb-1 text-blue-500">Main Branch</h5>
              <p className="text-gray-600 text-sm font-medium">
                251/A, Cassim Road,<br />
                Kalmunai-11
              </p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h5 className="font-medium mb-1 text-blue-500">Super Market</h5>
              <p className="text-gray-600 text-sm font-medium">
                109, Super Market,<br />
                Kalmunai
              </p>
            </div>
          </div>
        </div>

        {/* Phone Section */}
        <div className="bg-white shadow-md p-6 rounded-xl text-center">
          <FaPhone className="text-indigo-600 text-4xl mb-4 mx-auto" />
          <h3 className="text-xl font-semibold mb-6 text-blue-500">Contact Numbers</h3>
          <div className="space-y-4">
            {phoneNumbers.map((phone) => (
              <div
                key={phone}
                className="bg-gray-100 p-4 rounded-lg flex justify-between items-center"
              >
                <p className="text-gray-800 font-semibold">{phone}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleCallPhone(phone)}
                    className="text-white bg-green-500 hover:bg-green-600 p-2 rounded"
                    title="Call now"
                  >
                    <FaPhone size={14} />
                  </button>
                  <button
                    onClick={() => handleCopyPhone(phone)}
                    className="text-white bg-blue-500 hover:bg-blue-600 p-2 rounded"
                    title="Copy number"
                  >
                    <FaCopy size={14} />
                  </button>
                </div>
                {copiedPhone === phone && (
                  <span className="ml-2 text-sm text-green-600 font-medium">Copied!</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    </>
    
  );
}

// Prevent unnecessary re-renders
export default memo(ReachUs);
