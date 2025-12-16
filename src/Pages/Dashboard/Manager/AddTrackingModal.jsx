import React, { useState } from 'react';
import { toast } from 'react-toastify';
import useAxiosHook from '../../../Components/CustomHooks/useAxiosHook';

const AddTrackingModal = ({ trackingRef, selectedProduct }) => {

    const axioshook=useAxiosHook()

  const [formData, setFormData] = useState({
    location: '',
    note: '',
    dateTime: '',
    status: ''
  });

  const statusOptions = [
    'Cutting Completed',
    'Sewing Started',
    'Finishing',
    'QC Checked',
    'Packed',
    'Shipped',
    'Out for Delivery'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
  
    const statusinfo={
        status:formData.status,
        trackingId:selectedProduct.trackingId,
        location:formData.location,
        date:formData.dateTime
    }

    await  axioshook.post(`/parcels/status`,statusinfo)

    // Handle form submission here (API call)
    toast.success('Tracking added successfully!');
    trackingRef.current.close();
    // Reset form
    setFormData({
      location: '',
      note: '',
      dateTime: '',
      status: ''
    });
  };

  return (
    <dialog ref={trackingRef} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box max-w-3xl bg-slate-800 border border-slate-700 p-0 overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-5 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">
              Add <span className="text-orange-500">Tracking Update</span>
            </h2>
            <form method="dialog">
              <button className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-700 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </form>
          </div>
        </div>

        {/* Selected Order Info */}
        {selectedProduct && (
          <div className="px-6 py-4 bg-slate-700/50 border-b border-slate-700">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-slate-400">Order ID:</span>
                <span className="ml-2 text-white font-semibold">{selectedProduct._id}</span>
              </div>
              <div>
                <span className="text-slate-400">Product:</span>
                <span className="ml-2 text-white font-semibold">{selectedProduct.productname}</span>
              </div>
              <div>
                <span className="text-slate-400">Customer:</span>
                <span className="ml-2 text-white font-semibold">{selectedProduct.email}</span>
              </div>
              <div>
                <span className="text-slate-400">Quantity:</span>
                <span className="ml-2 text-white font-semibold">{selectedProduct.quantity}</span>
              </div>
            </div>
          </div>
        )}

        {/* Modal Body - Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Status Dropdown */}
          <div>
            <label className="block text-slate-300 text-sm font-semibold mb-2">
              Status <span className="text-orange-500">*</span>
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            >
              <option value="">Select Status</option>
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Location Input */}
          <div>
            <label className="block text-slate-300 text-sm font-semibold mb-2">
              Location <span className="text-orange-500">*</span>
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="Enter location (e.g., Production Floor A)"
              className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all placeholder-slate-400"
            />
          </div>

          {/* Date & Time Input */}
          <div>
            <label className="block text-slate-300 text-sm font-semibold mb-2">
              Date & Time <span className="text-orange-500">*</span>
            </label>
            <input
              type="datetime-local"
              name="dateTime"
              value={formData.dateTime}
              onChange={handleChange}
              required
              className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Note Textarea */}
          <div>
            <label className="block text-slate-300 text-sm font-semibold mb-2">
              Note
            </label>
            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
              rows="4"
              placeholder="Add any additional notes or comments..."
              className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all placeholder-slate-400 resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 button  text-white font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg "
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Save Tracking
            </button>
            <button
              type="button"
              onClick={() => trackingRef.current.close()}
              className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 rounded-lg transition-all duration-200 border border-slate-600"
            >
              Cancel
            </button>
          </div>
        </form>

      </div>
    </dialog>
  );
};

export default AddTrackingModal;