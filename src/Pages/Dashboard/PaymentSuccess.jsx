import React from 'react';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router';

import { useState } from 'react';
import useAxiosHook from '../../Components/CustomHooks/useAxiosHook';

const PaymentSuccess = () => {
   
    const [paymentinfo, setpaymentinfo] = useState({})
    const [searchParams] = useSearchParams()
    const sessionId = searchParams.get('session_id')
    const axioshook = useAxiosHook()

    useEffect(() => {
        if (sessionId) {
            axioshook.patch(`/payment-success?session_id=${sessionId}`)
                .then(res => {
                 
                    setpaymentinfo({
                        trackingId: res.data.trackingId,
                transactionId: res.data.transactionId

                    })
                })
        }
    }, [sessionId, axioshook])

    return (
        <div className='p-8 text-white'>
            payment successfull
            <p>Trackig id : {paymentinfo.trackingId}</p>
            <p>Transaction id : {paymentinfo.transactionId}</p>
        </div>
    );
};

export default PaymentSuccess;