import React, { useEffect, useState, useCallback, } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSingleEvent } from './lib/api';

const EventList = (props) => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [eventData, setEventData] = useState({});
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const fetchEvent = useCallback(async() => {
    setLoading(true);
    const data = await getSingleEvent(parseInt(eventId));
    setEventData(data);
    setLoading(false);
  }, [eventId]);

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  const gotoCheckout = () => {
    navigate(`/events/${eventId}/checkout?quantity=${quantity}`);
  }

  if (loading) {
    return <div>Cool Loading Spinner</div>
  }

  return (
    <div className="border-b border-gray-200 bg-white w-full sm:w-2/3 mx-auto">
      <h3 className="text-base font-semibold leading-6 text-gray-900 px-4 py-5 sm:px-6">{eventData.eventName}</h3>
      <div className="flex px-5 py-5">
        <div className="sm:w-1/3 mr-4"><img alt={eventData.eventName} src={eventData.imageUrl} /></div>
        <div className="sm:w-2/3">
          <div className="flex justify-between">
            <div>
              <p className="text-2xl">{eventData.formattedCityStateProvince}</p>
              <p className="text-lg">{eventData.localEventDate} {eventData.localEventTime}</p>
            </div>
            <div className="text-4xl text-green-600">$100</div>
          </div>
          <div className="my-4">
            <label htmlFor="quantity" className="block text-sm font-medium leading-6 text-gray-900">
              Quantity
            </label>
            <select
              name="quantity"
              className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
            </select>
          </div>

          <button
            type="button"
            className="w-full rounded bg-indigo-600 px-4 py-3 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => gotoCheckout() }
          >Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

export default EventList;