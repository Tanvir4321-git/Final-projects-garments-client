import React from 'react';
import { IoClose, IoCalendarOutline } from 'react-icons/io5';
import { FaBox, FaUser, FaMapMarkerAlt, FaPhone, FaCreditCard, FaHashtag, FaFileAlt } from 'react-icons/fa';
import { Link } from 'react-router';

const AdModal = ({ order, detailsRef }) => {
  if (!order) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { 
      day: '2-digit',
      month: 'short', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'approved': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'reject': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <dialog ref={detailsRef} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box max-w-3xl bg-linear-to-br from-slate-900 to-slate-800 border border-slate-700 p-0 overflow-hidden">
        
        {/* Header with Gradient */}
        <div className="relative p-6">
          <form method="dialog">
            <button className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all">
              <IoClose className="w-5 h-5 text-white" />
            </button>
          </form>
          
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <FaBox className="w-8 h-8 text-white" />
            </div>
            <div>
                 <div className="px-4 text-3xl text-white">Order <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500" >Details</span></div>
              <p className="text-orange-100 text-sm mt-1">Complete order information</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          
          {/* Status & Tracking */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-sm">Status</span>
                <span className={`${getStatusColor(order.status)} text-white px-3 py-1 rounded-full text-xs font-semibold uppercase`}>
                  {order.status}
                </span>
              </div>
            </div>
            
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
              <div className="flex items-center gap-2">
                <FaHashtag className="w-4 h-4 text-orange-500" />
                <div className="flex-1">
                  <p className="text-slate-400 text-xs">Tracking ID</p>
                 <Link to={`/dashboard/order/${order.trackingId}`}> <p className="text-white font-mono text-sm mt-1">{order.trackingId}</p></Link> 
                </div>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 rounded-xl p-5 mb-6 border border-orange-500/20">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-orange-500/20 rounded-lg">
                <FaBox className="w-6 h-6 text-orange-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold text-lg">{order.productname}</h3>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div>
                    <p className="text-slate-400 text-xs">Quantity</p>
                    <p className="text-white font-semibold">{order.quantity} pcs</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs">Total Price</p>
                    <p className="text-orange-500 font-bold text-lg">৳{order.price?.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Details */}
          <div className="bg-slate-800/50 rounded-xl p-5 mb-6 border border-slate-700">
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <FaUser className="w-5 h-5 text-orange-500" />
              Customer Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-slate-400 text-sm">Name</p>
                <p className="text-white mt-1">{order.firstname} {order.lastname}</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Email</p>
                <p className="text-white mt-1 text-sm">{order.email}</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm flex items-center gap-1">
                  <FaPhone className="w-3 h-3" /> Contact
                </p>
                <p className="text-white mt-1">{order.contactnumber}</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm flex items-center gap-1">
                  <FaCreditCard className="w-3 h-3" /> Payment
                </p>
                <p className="text-white mt-1">{order.paymentStatus}</p>
              </div>
            </div>
          </div>

          {/* Address & Notes */}
          <div className="space-y-4">
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="w-5 h-5 text-orange-500 mt-1" />
                <div className="flex-1">
                  <p className="text-slate-400 text-sm mb-1">Delivery Address</p>
                  <p className="text-white">{order.address}</p>
                </div>
              </div>
            </div>

            {order.notes && (
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                <div className="flex items-start gap-3">
                  <FaFileAlt className="w-5 h-5 text-orange-500 mt-1" />
                  <div className="flex-1">
                    <p className="text-slate-400 text-sm mb-1">Additional Notes</p>
                    <p className="text-white">{order.notes}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Info */}
          <div className="mt-6 pt-4 border-t border-slate-700 flex items-center justify-between text-xs flex-wrap gap-2">
            <div className="flex items-center gap-2 text-slate-400">
              <IoCalendarOutline className="w-4 h-4" />
              <span>Created: {formatDate(order.createdAt)}</span>
            </div>
            <div className="text-slate-500">
              By: {order.createdBy}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="bg-slate-800 p-4 border-t border-slate-700">
          <form method="dialog" className="flex justify-end gap-3">
            <button className="px-6 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all font-medium">
              Close
            </button>
          </form>
        </div>

      </div>
    </dialog>
  );
};

export default AdModal;