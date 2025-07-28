import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid } from '@mui/material';

export const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await axios.get('/api/events');
      setEvents(res.data);
    };
    fetchEvents();
  }, []);

  return (
    <Grid container spacing={3}>
      {events.map(event => (
        <Grid item xs={12} md={6} lg={4} key={event._id}>
          <Card>
            <CardContent>
              <Typography variant="h5">{event.title}</Typography>
              <Typography>{new Date(event.date).toLocaleDateString()}</Typography>
              <Typography>Attendees: {event.attendees.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};