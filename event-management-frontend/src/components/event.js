import { useEffect, useState } from "react";
import socket from "../socket"; // Import WebSocket connection
import { getEvents } from "../api"; // API call function

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events from backend
    getEvents().then(({ data }) => setEvents(data));

    // Listen for real-time event updates
    socket.on("attendeesUpdated", (eventId) => {
      console.log("Attendees updated for event:", eventId);
      getEvents().then(({ data }) => setEvents(data)); // Refresh event list
    });

    return () => socket.off("attendeesUpdated"); // Cleanup
  }, []);

  return (
    <div>
      <h2>Upcoming Events</h2>
      <ul>
        {events.map((event) => (
          <li key={event._id}>{event.title}</li>
        ))}
      </ul>
    </div>
  );
}
