import React, { useState } from 'react';
import { toast } from 'react-toastify';

const SuspendFeedbackModal = ({ suspendRef, selectedUser, axioshook, refetch }) => {
  const [feedback, setFeedback] = useState('');
  const [reason, setReason] = useState('');

  const suspendReasons = [
    'Violation of terms and conditions',
    'Fraudulent activity detected',
    'Multiple payment failures',
    'Inappropriate behavior',
    'Spam or abuse',
    'Security concerns',
    'Other'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!reason) {
      return toast.error('Please select a reason');
    }

    if (!feedback.trim()) {
      return toast.error('Please provide feedback details');
    }

    try {
      const updateinfo = {
        status: 'suspend',
        email: selectedUser.email,
        suspendReason: reason,
        suspendFeedback: feedback,
        suspendDate: new Date().toISOString()
      };

      await axioshook.patch(`/users/${selectedUser._id}`, updateinfo);
      
      toast.success('User suspended successfully');
      refetch();
      suspendRef.current.close();
      
      // Reset form
      setFeedback('');
      setReason('');
    } catch (error) {
      toast.error('Failed to suspend user');
      console.error(error);
    }
  };

  const handleCancel = () => {
    suspendRef.current.close();
    setFeedback('');
    setReason('');
  };

  return (
    <dialog ref={suspendRef} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box max-w-2xl bg-slate-800 border border-slate-700 p-0 overflow-hidden">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-5 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">
              Suspend <span className="text-red-500">User</span>
            </h2>
            <button
              onClick={handleCancel}
              className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-700 rounded-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* User Info */}
        {selectedUser && (
          <div className="px-6 py-4 bg-slate-700/50 border-b border-slate-700">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-slate-400">Name:</span>
                <span className="ml-2 text-white font-semibold">{selectedUser.name}</span>
              </div>
              <div>
                <span className="text-slate-400">Email:</span>
                <span className="ml-2 text-white font-semibold">{selectedUser.email}</span>
              </div>
              <div>
                <span className="text-slate-400">Role:</span>
                <span className="ml-2 text-white font-semibold">{selectedUser.role}</span>
              </div>
              <div>
                <span className="text-slate-400">Current Status:</span>
                <span className="ml-2 text-white font-semibold">{selectedUser.status}</span>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Warning Message */}
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start gap-3">
            <svg className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <h4 className="text-red-400 font-semibold mb-1">Warning: User Suspension</h4>
              <p className="text-slate-300 text-sm">
                Suspending this user will restrict their access to the platform. Please provide a clear reason and detailed feedback.
              </p>
            </div>
          </div>

          {/* Reason Dropdown */}
          <div>
            <label className="block text-slate-300 text-sm font-semibold mb-2">
              Suspend Reason <span className="text-red-500">*</span>
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            >
              <option value="">Select a reason</option>
              {suspendReasons.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* Feedback Textarea */}
          <div>
            <label className="block text-slate-300 text-sm font-semibold mb-2">
              Detailed Feedback <span className="text-red-500">*</span>
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
              rows="5"
              placeholder="Provide detailed explanation for suspension. This will be visible to the user..."
              className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all placeholder-slate-400 resize-none"
            />
            <p className="text-xs text-slate-400 mt-1">
              Minimum 20 characters required ({feedback.length}/20)
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={feedback.length < 20}
              className="flex-1 bg-red-500 hover:bg-red-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-red-500/50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
              Suspend User
            </button>
            <button
              type="button"
              onClick={handleCancel}
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

export default SuspendFeedbackModal;