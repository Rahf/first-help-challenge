import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EventList from './EventList';
import EventDetail from './EventDetail';
import Checkout from './Checkout';
import NotFound from './NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EventList />} />
        <Route path="/events/:eventId" element={<EventDetail />} />
        <Route path="/events/:eventId/checkout" element={<Checkout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
