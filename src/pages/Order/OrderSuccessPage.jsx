import React, { useEffect, useState } from "react";
import { useSearchParams, useOutletContext } from "react-router-dom";

export default function OrderSuccessPage() {
  
  const [status, setStatus] = useState("loading");
  const [order, setOrder] = useState(null);
  
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");

  const { appContext,setAppContext } = useOutletContext();


  // console.log(status);

  const clearCart = () => setAppContext({
    ...appContext,
    cart: []
  });

  useEffect(() => {
    let interval;

    async function fetchStatus() {
      try {
        const res = await fetch(`/api/order-status?orderId=${orderId}`);
        const data = await res.json();

        if (data.status === "COMPLETED") {
          clearCart();
          setOrder(data.order);
          setStatus("success");
          clearInterval(interval);
        } else if (data.status === "FAILED") {
          setStatus("failed");
          clearInterval(interval);
        } else {
          setStatus("pending");
        }
      } catch (err) {
        setStatus("error");
        clearInterval(interval);
      }
    }

    if (orderId) {
      fetchStatus();
      interval = setInterval(fetchStatus, 2000); // polling every 2s
    } else {
      setStatus("error");
    }

    return () => clearInterval(interval);
  }, [orderId]);

  return (
    <div className="flex items-center justify-center bg-gray-50 p-20">
      <div className="max-w-lg  w-full bg-white shadow-xl rounded-2xl p-8 text-center">
        {status === "loading" && (
          <>
            <div className='flex justify-center'>
              <svg className="animate-spin h-8 w-8 mb-6 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>

            </div>
            <h2 className="text-xl font-semibold">Confirming your order...</h2>
            <p className="text-gray-500 mt-2">Hang tight, we're verifying your payment.</p>
          </>
        )}

        {status === "pending" && (
          <>
            <div className="animate-pulse h-8 w-8 bg-gray-300 rounded-full mx-auto mb-4" />
            <h2 className="text-xl font-semibold">Processing payment</h2>
            <p className="text-gray-500 mt-2">This usually takes a few seconds.</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="text-green-500 text-4xl mb-4">✓</div>
            <h2 className="text-2xl font-bold">Payment successful</h2>
            <p className="text-gray-600 mt-2">
              Thank you for your purchase! Your order has been confirmed.
            </p>

            {order && (
              <div className="mt-6 text-left bg-gray-50 p-4 rounded-xl">
                <p className="text-sm text-gray-500">Order ID</p>
                <p className="font-mono text-sm mb-2">{order.id}</p>

                <p className="text-sm text-gray-500">Total</p>
                <p className="font-semibold mb-2">
                  ${(order.totalMoney.amount / 100).toFixed(2)} {order.totalMoney.currency}
                </p>

                {order.lineItems && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-500 mb-1">Items</p>
                    <ul className="text-sm space-y-1">
                      {order.lineItems.map((item) => (
                        <li key={item.uid} className="flex justify-between">
                          <span>{item.name} x{item.quantity}</span>
                          <span>
                            ${(item.totalMoney.amount / 100).toFixed(2)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            <div className="mt-6 flex gap-3 justify-center">
              <a
                href="/"
                className="px-5 py-2 border rounded-xl hover:bg-gray-100"
              >
                Continue shopping
              </a>
             
            </div>
          </>
        )}

        {status === "failed" && (
          <>
            <div className="text-red-500 text-5xl mb-4">✕</div>
            <h2 className="text-2xl font-bold">Payment failed</h2>
            <p className="text-gray-600 mt-2">
              Something went wrong. If you were charged, it will be refunded automatically.
            </p>
            {/* <a
              href="/"
              className="mt-6 inline-block px-5 py-2 bg-black text-white rounded-xl hover:bg-gray-800"
            >
              Try again
            </a> */}
          </>
        )}

        {status === "error" && (
          <>
            <div className="text-yellow-500 text-5xl mb-4">!</div>
            <h2 className="text-2xl font-bold">Unable to verify your order</h2>
            <p className="text-gray-600 mt-2">
              Please check your email for confirmation or contact us.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
