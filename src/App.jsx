import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './views/Home';
import Dashboard from './views/Dashboard';
import PrivateRoute from './auth/PrivateRoute';
import VisitingCards from "./category/visitingCards";
import ReadyMadeCards from './category/ReadyMadeCards';
import WeddingCards from "./category/WeddingCards";
import CardDetails from "./pages/cardDetails";
import MyCart from "./views/MyCart";
import AboutUs from "./details/AboutUs";
import ContactUs from "./details/ContactUs";
import FaqPage from './details/FaqPage';
import ProfilePage from './views/ProfilePage';
import WeddingCardDetails from "./pages/WeddingCardDetails";
import InvitationCards from "./category/InvitationCards";
import InvitationCardDetails from "./pages/InvitationCardDetails";
import NewArrivals from './pages/NewArrivals';
import ProductDetail from "./pages/ProductDetail";



function App() {


  return (
    <>
      <Router>
        <Routes>
          {/* Public Route */}
          <Route path='/' element={<Home />} />
          <Route path="/dashboard/aboutus" element={<AboutUs />} />
          <Route path="/dashboard/contactus" element={<ContactUs />} />
          <Route path="/dashboard/faqpage" element={<FaqPage />} />

          {/* Private Routes - Requires Authentication */}
          <Route element={<PrivateRoute />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/dashboard/category/visiting-cards' element={<VisitingCards />} />
            <Route path="/dashboard/category/readymadecards" element={<ReadyMadeCards />} />
            <Route path="/dashboard/category/weddingcards" element={<WeddingCards />} />
            <Route path="/dashboard/category/invitation-cards" element={<InvitationCards />} />
            <Route path="/dashboard/category/weddingcarddetails/:category/:cardId" element={<WeddingCardDetails />} />
            <Route path="/dashboard/card-details" element={<CardDetails />} />
            <Route path="/dashboard/category/invitation-cards/:id" element={<InvitationCardDetails />} />
            <Route path="/dashboard/new-arrivals" element={<NewArrivals />} />
            <Route path="/dashboard/new-arrivals/:id" element={<ProductDetail />} />
            <Route path="/dashboard/mycart" element={<MyCart />} />
            <Route path="/dashboard/profile" element={<ProfilePage />} />

          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
