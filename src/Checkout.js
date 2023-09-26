import React, { useEffect, useState, useCallback, } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getSingleEvent } from './lib/api';

const EventList = (props) => {
  const { eventId } = useParams();
  const [searchParams] = useSearchParams();
  const quantity = parseInt(searchParams.get('quantity'))

  const [eventData, setEventData] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchEvent = useCallback(async() => {
    setLoading(true);
    const data = await getSingleEvent(parseInt(eventId));
    setEventData(data);
    setLoading(false);
  }, [eventId]);

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  const dollarDisplay = (value) => {
    return `$${value.toFixed(2)}`
  }
  const serviceFee = 44.08 * quantity;
  const total = (100 * quantity) + serviceFee;

  if (loading) {
    return <div>Cool Loading Spinner</div>
  }

  return (
    <div className="md:flex md:space-x-2">
      <div className="border-b border-gray-200 bg-white w-full sm:w-2/3 mx-auto mb-4 md:mb-0">
        <h3 className="text-base font-semibold leading-6 text-gray-900 px-4 py-5 sm:px-6">Purchasing Tickets For: {eventData.eventName}</h3>
        <div className="px-4 py-5 sm:px-6">
          <h1 className="text-3xl mb-3">Billing Information</h1>
          <fieldset>
            <legend className="block text-sm font-medium leading-6 text-gray-900 my-3">Name</legend>
              <div class="flex w-full space-x-2">
                <input
                  type="text"
                  name="first_name"
                  className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="John"
                />

                <input
                  type="text"
                  name="last_name"
                  className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Smith"
                />
              </div>
            <legend className="block text-sm font-medium leading-6 text-gray-900 my-3">Card Details</legend>
            <div className="mt-2 -space-y-px rounded-md bg-white shadow-sm">
              <div>
                <input
                  type="text"
                  name="card_number"
                  className="relative block w-full rounded-none rounded-t-md border-0 bg-transparent py-2 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Card number"
                />
              </div>
              <div className="flex -space-x-px">
                <div className="w-1/2 min-w-0 flex-1">
                  <input
                    type="text"
                    name="card_expiration_date"
                    className="relative block w-full rounded-none rounded-bl-md border-0 bg-transparent py-2 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="MM / YY"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <input
                    type="text"
                    name="card_cvc"
                    className="relative block w-full rounded-none rounded-br-md border-0 bg-transparent py-2 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="CVC"
                  />
                </div>
              </div>
            </div>
          </fieldset>
          <fieldset className="mt-6 bg-white">
            <legend className="block text-sm font-medium leading-6 text-gray-900 my-3">Billing address</legend>
            <div className="mt-2 -space-y-px rounded-md shadow-sm">
              <div>
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  className="relative block w-full rounded-none rounded-t-md border-0 bg-transparent py-2 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
              </div>
              <div className="flex -space-x-px">
                <div className="w-1/2 min-w-0 flex-1">
                  <input
                    type="text"
                    name="address"
                    className="relative block w-full rounded-none border-0 bg-transparent py-2 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Address"
                  />
                </div>
              </div>
              <div className="flex -space-x-px">
                <div className="w-1/2 min-w-0 flex-1">
                  <input
                    type="text"
                    name="city"
                    className="relative block w-full rounded-none rounded-bl-md border-0 bg-transparent py-2 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="City"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <input
                    type="text"
                    name="state"
                    className="relative block w-full rounded-none border-0 bg-transparent py-2 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="State"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <input
                    type="text"
                    name="zip_code"
                    className="relative block w-full rounded-none rounded-br-md border-0 bg-transparent py-2 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Zip/Postal Code"
                  />
                </div>
              </div>
            </div>
          </fieldset>
          <button
            type="button"
            className="w-full rounded bg-indigo-600 px-4 py-3 mt-4 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >Checkout
          </button>
        </div>
      </div>
      <div className="border-b border-gray-200 bg-white w-full sm:w-1/3 mx-auto">
        <h3 className="text-base font-semibold leading-6 text-gray-900 px-4 py-5 sm:px-6">Summary:</h3>
        <div className="px-4 py-5 sm:px-6">
          <h3 class="font-semibold flex justify-between text-lg mb-4">
            <span>Total</span>
            <span>{dollarDisplay(total)}</span>
          </h3>

          <h3 class="text-base font-semibold mb-1">Tickets</h3>
          <p class="text-xs text-gray-700 flex justify-between mb-4">
            <span>Resale Tickets: $100.00 x {quantity}</span>
            <span>{dollarDisplay(quantity * 100)}</span>
          </p>

          <h3 class="text-base font-semibold mb-1">Fees</h3>
          <p class="text-xs text-gray-700 flex justify-between">
            <span>Service Fee: $44.08 x {quantity}</span>
            <span>{dollarDisplay(serviceFee)}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default EventList;