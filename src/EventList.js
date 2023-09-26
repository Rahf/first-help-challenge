import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEvents } from './lib/api';

const EventList = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEvents = useCallback(async() => {
    setLoading(true);
    const eventData = await getEvents();
    if (eventData?.length > 0) {
      setEvents(eventData);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const gotoEvent = (eventId) => {
    navigate(`/events/${eventId}`);
  }

  if (loading) {
    return <div>Cool Loading Spinner</div>
  }

  return (
    <div className="border-b border-gray-200 bg-white">
      <h3 className="text-base font-semibold leading-6 text-gray-900  px-4 py-5 sm:px-6">Events</h3>
      
      <ul className="divide-y divide-gray-100">
        {events.map((evt) => (
          <li key={evt.email} className="flex justify-between gap-x-6 px-4 py-5 sm:px-6 hover:bg-gray-100 cursor-pointer" onClick={() => gotoEvent(evt.eventId)}>
            <div className="flex min-w-0 gap-x-4">
              <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={evt.imageUrl} alt="" />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">{evt.eventName}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{evt.localEventDate} {evt.localEventTime}</p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">{evt.role}</p>
              <div className="mt-1 flex items-center gap-x-1.5">
                <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </div>
                <p className="text-xs leading-5 text-gray-500">Tickets Available</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      
    </div>
  )
}

export default EventList;