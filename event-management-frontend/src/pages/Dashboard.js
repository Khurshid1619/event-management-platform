import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form, Spinner, Pagination } from "react-bootstrap";
import "./Dashboard.css";

const Dashboard = () => {
  // State Variables
  const [events, setEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [totalEvents, setTotalEvents] = useState(0);
  const [joiningEventId, setJoiningEventId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6;

  // Fetch Events from Backend API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch All Events
        const eventsResponse = await fetch("http://localhost:5000/api/events");
        if (!eventsResponse.ok) throw new Error("Failed to fetch events");
        const eventsData = await eventsResponse.json();
        setEvents(eventsData);

        // Fetch Upcoming Events
        const upcomingResponse = await fetch("http://localhost:5000/api/events/upcoming");
        if (!upcomingResponse.ok) throw new Error("Failed to fetch upcoming events");
        const upcomingData = await upcomingResponse.json();
        setUpcomingEvents(upcomingData);

        // Fetch Total Events Count
        const totalResponse = await fetch("http://localhost:5000/api/stats/total-events");
        if (!totalResponse.ok) throw new Error("Failed to fetch total events");
        const totalData = await totalResponse.json();
        setTotalEvents(totalData.totalEvents);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter and Sort Events
  const filteredEvents = events
    .filter((event) =>
      (selectedCategory ? event.category === selectedCategory : true) &&
      (searchTerm ? event.name.toLowerCase().includes(searchTerm.toLowerCase()) : true)
    )
    .sort((a, b) => {
      if (sortOption === "date") return new Date(a.date) - new Date(b.date);
      if (sortOption === "popularity") return b.popularity - a.popularity;
      if (sortOption === "attendees") return (b.attendees?.length || 0) - (a.attendees?.length || 0);
      return 0;
    });

  // Pagination Logic
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4 text-primary">🎉 Event Dashboard</h2>
      <h4 className="text-center text-info">📌 Total Events: {totalEvents}</h4>

      {/* Filters */}
      <div className="mb-4 d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
        <Form.Control
          type="text"
          placeholder="🔍 Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-100"
        />
        <Form.Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-auto"
        >
          <option value="">All Categories</option>
          <option value="Technology">Technology</option>
          <option value="Business">Business</option>
          <option value="Education">Education</option>
          <option value="Health">Health</option>
        </Form.Select>
        <Form.Select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="w-auto"
        >
          <option value="">Sort By</option>
          <option value="date">📅 Date</option>
          <option value="popularity">🔥 Popularity</option>
          <option value="attendees">👥 Attendees</option>
        </Form.Select>
      </div>

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <>
          {/* Upcoming Events */}
          <section className="mb-5">
            <h3 className="text-center text-success mb-4">🚀 Upcoming Events</h3>
            <Row className="g-4">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map((event) => (
                  <Col key={event._id} xs={12} md={6} lg={4}>
                    <Card className="h-100 shadow-sm">
                      <Card.Body>
                        <Card.Title>{event.name}</Card.Title>
                        <Card.Text className="text-muted">{event.description}</Card.Text>
                        <small className="text-muted">{new Date(event.date).toLocaleDateString()}</small>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              ) : (
                <div className="text-center text-secondary py-4">No upcoming events found</div>
              )}
            </Row>
          </section>
        </>
      )}
    </Container>
  );
};

export default Dashboard;
