import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import WhatsAppFloat from "./components/WhatsAppFloat";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Shop from "./pages/Shop";
import Locations from "./pages/Locations";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminInbox from "./pages/AdminInbox";
import AdminSettings from "./pages/AdminSettings";
import AdminGallery from "./pages/AdminGallery";

import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gallery" element={<Gallery />} />

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/inbox" element={<AdminInbox />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
        <Route path="/admin/gallery" element={<AdminGallery />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <WhatsAppFloat />
    </>
  );
}