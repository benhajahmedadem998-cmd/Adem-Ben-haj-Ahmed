/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SearchBookingBar } from './components/SearchBookingBar';
import { CategoryFleetSection } from './components/CategoryFleetSection';
import { WhyChooseSection } from './components/WhyChooseSection';
import { ProcessBookingSection } from './components/ProcessBookingSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactFooter } from './components/ContactFooter';
import { VehicleDetailPage } from './components/VehicleDetailPage';
import { BookingModal, VideoModal, ServicesModal } from './components/Modals';
import { AdminModal } from './components/AdminModal';
import { useFleet } from './context/FleetContext';
import {
  type CategoryId,
  type FleetVehicle,
  type SearchBookingCriteria,
} from './data/fleetData';

export default function App() {
  const { availableVehicles } = useFleet();
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('luxe');
  const [detailVehicle, setDetailVehicle] = useState<FleetVehicle | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingVehicle, setBookingVehicle] = useState<FleetVehicle | null>(null);
  const [searchCriteria, setSearchCriteria] = useState<SearchBookingCriteria | null>(null);
  const [videoOpen, setVideoOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  // Sync browser hash (#vehicle/<id>) and hide detail if vehicle becomes unavailable
  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#vehicle/')) {
        const id = hash.replace('#vehicle/', '');
        const found = availableVehicles.find((v) => v.id === id) ?? null;
        setDetailVehicle(found);
      } else {
        setDetailVehicle(null);
      }
    };
    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, [availableVehicles]);

  const scrollToSection = (href: string) => {
    setDetailVehicle(null);
    const id = href.replace('#', '');
    setTimeout(() => {
      if (id === 'home' || !id) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 40);
  };

  const scrollToFleet = () => {
    scrollToSection('#fleet');
  };

  const openVehicleDetail = (vehicle: FleetVehicle) => {
    const alreadyInDetail = detailVehicle !== null;
    setSelectedCategory(vehicle.categoryId);
    setDetailVehicle(vehicle);
    window.history.pushState(null, '', `#vehicle/${vehicle.id}`);
    if (!alreadyInDetail) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const closeVehicleDetailToFleet = () => {
    setDetailVehicle(null);
    window.history.pushState(null, '', '#fleet');
    setTimeout(() => {
      const el = document.getElementById('fleet');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 40);
  };

  const openBookingWithVehicle = (vehicle: FleetVehicle | null) => {
    setBookingVehicle(vehicle);
    setBookingOpen(true);
  };

  const handleSearchBooking = (criteria: SearchBookingCriteria) => {
    setSearchCriteria(criteria);
    setBookingVehicle(detailVehicle ?? null);
    setBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-stone-100 flex flex-col">
      <Navbar
        onOpenBooking={() => openBookingWithVehicle(detailVehicle)}
        onOpenAdmin={() => setAdminOpen(true)}
        onNavigateSection={scrollToSection}
      />

      <main className="flex-1">
        {detailVehicle ? (
          <>
            <VehicleDetailPage
              vehicle={detailVehicle}
              onSelectVehicle={openVehicleDetail}
              onBackHome={closeVehicleDetailToFleet}
              onReserve={(vehicle) => openBookingWithVehicle(vehicle)}
            />
            <SearchBookingBar onSearch={handleSearchBooking} />
          </>
        ) : (
          <>
            <Hero
              onExploreFleet={scrollToFleet}
              onWatchVideo={() => setVideoOpen(true)}
            />

            <SearchBookingBar onSearch={handleSearchBooking} />

            <CategoryFleetSection
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              onReserveVehicle={(vehicle) => openBookingWithVehicle(vehicle)}
              onSelectVehicleDetail={openVehicleDetail}
            />

            <WhyChooseSection onLearnMore={() => setServicesOpen(true)} />

            <ProcessBookingSection
              onOpenBooking={() => openBookingWithVehicle(null)}
              onScrollToFleet={scrollToFleet}
            />

            <TestimonialsSection />
          </>
        )}
      </main>

      <ContactFooter
        onNavigateSection={scrollToSection}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      <BookingModal
        isOpen={bookingOpen}
        initialVehicle={bookingVehicle}
        initialSearch={searchCriteria}
        onClose={() => setBookingOpen(false)}
      />

      <VideoModal
        isOpen={videoOpen}
        onClose={() => setVideoOpen(false)}
        onBookNow={() => openBookingWithVehicle(detailVehicle)}
      />

      <ServicesModal
        isOpen={servicesOpen}
        onClose={() => setServicesOpen(false)}
        onBookNow={() => openBookingWithVehicle(detailVehicle)}
      />

      <AdminModal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        onVehicleDeleted={(deletedId) => {
          if (detailVehicle?.id === deletedId) {
            setDetailVehicle(null);
            window.history.pushState(null, '', '#fleet');
          }
        }}
      />
    </div>
  );
}
