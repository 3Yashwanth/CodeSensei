// components/PhoneCall.tsx - FIXED
import { useState } from "react";
import { X, Phone } from "lucide-react";

export default function PhoneCall({ isOpen, onClose }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isCalling, setIsCalling] = useState(false);
  const [callStatus, setCallStatus] = useState("");

  const handleCall = async () => {
    if (!phoneNumber) return;
    
    setIsCalling(true);
    setCallStatus("Initiating call...");
    
    try {
      // This will call your backend which should integrate with Inyya.ai
      const response = await fetch('/api/make-call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone_number: phoneNumber,
          context: "CodeSensei AI tutoring session",
        }),
      });
      
      if (response.ok) {
        setCallStatus("Call initiated successfully!");
      } else {
        setCallStatus("Failed to initiate call. Please try again.");
      }
    } catch (error) {
      setCallStatus("Failed to initiate call. Please try again.");
      console.error("Call error:", error);
    } finally {
      setIsCalling(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-96">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">AI Phone Call</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700">
            <X size={20} />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+1234567890"
              className="w-full p-2 border border-slate-300 rounded-md"
              disabled={isCalling}
            />
          </div>
          
          <button
            onClick={handleCall}
            disabled={isCalling || !phoneNumber}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <Phone size={16} className="mr-2" />
            {isCalling ? "Calling..." : "Start AI Call"}
          </button>
          
          {callStatus && (
            <div className="text-sm text-slate-600 text-center">
              {callStatus}
            </div>
          )}
          
          <p className="text-xs text-slate-500 text-center">
            Our AI tutor will call you to discuss your code and provide personalized guidance.
          </p>
        </div>
      </div>
    </div>
  );
}