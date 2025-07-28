import { useState } from "react";
import axios from "axios";

export default function EventForm() {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/events/create", { title });
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Event Title" required />
      <button type="submit">Add Event</button>
    </form>
  );
}
