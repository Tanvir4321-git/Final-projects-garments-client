import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router';
import Loading from '../../../Components/Loading';

const TrackYourOrder = () => {
  const { trackingId } = useParams();

  // fetch tracking logs
  const { data: trackings = [], isLoading } = useQuery({
    queryKey: ['tracking', trackingId],
    queryFn: async () => {
      const res = await axios.get(`https://assignment-11-final-project-server.vercel.app/trackings/${trackingId}/logs`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  const lastIndex = trackings.length - 1; // latest tracking

  return (
    <div className='text-black dark:text-white  p-8'>

            <title>Haque Garments- Track Order Page</title><h2 className="text-2xl font-bold mb-4">Track  Order</h2>
      <p className="mb-8"> Tracking Number: <span className="font-bold">{trackingId}</span></p>

      <ul className="timeline timeline-vertical">
        {trackings.map((track, index) => {
          const isLatest = index === lastIndex;
          return (
            <li key={track._id}>
              {/* Date + Location */}
              <div className={`timeline-start ${isLatest ? 'font-bold text-green-400' : ''}`}>
                {new Date(track.date).toLocaleString()}
                {track.location && (<p>  <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(track.location)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 underline cursor-pointer"
                >
                  {track.location}
                </a>
                </p>
                )}

              </div>

              {/* Timeline icon */}
              <div className="timeline-middle">
                <svg
                  className={`h-5 w-5 ${isLatest ? 'text-green-500' : ''}`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                    
                  />
                </svg>
              </div>

              {/* Details */}
              <div
                className={`timeline-end timeline-box ${isLatest ? 'bg-green-500 text-white' : 'bg-white text-black'}`}
              >
                {track.details}
                {isLatest && <p className="text-sm">(Latest)</p>}
              </div>

              <hr />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TrackYourOrder;
