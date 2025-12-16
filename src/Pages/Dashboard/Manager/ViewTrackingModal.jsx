import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

const ViewTrackingModal = ({ viewTrackingRef, selectedProduct }) => {

  const trackingId = selectedProduct.trackingId

  const { data: trackings = [] } = useQuery({
    queryKey: ['tracking', trackingId],

    queryFn: async () => {
      const res = await axios.get(`https://assignment-11-final-project-server.vercel.app/trackings/${trackingId}/logs`);

      return res.data;
    }
  });







  return (
    <div>


      <dialog ref={viewTrackingRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box text-black">
          <h1 className='text-2xl font-bold'>Track your parcel:{selectedProduct.
            trackingId}</h1>
          <p>total logs:{trackings.length}</p>


          <ul className="timeline timeline-vertical">
            {
              trackings.map(track => <li key={track._id}>
                <div className="timeline-start">{new Date(track.date).toLocaleDateString('en-GB')}.
                  <p> {track.location}</p>
                </div>
                <div className="timeline-middle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="timeline-end timeline-box">{track.details}</div>
                <hr />
              </li>
              )
            }

          </ul>



          <div className="modal-action">





            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ViewTrackingModal;