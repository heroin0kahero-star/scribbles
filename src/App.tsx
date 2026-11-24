import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { useLenisGsap } from './hooks/useLenisGsap';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageTransition from './components/PageTransition';
import CustomCursor from './components/CustomCursor';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProgrammesPage from './pages/ProgrammesPage';
import PhonicsPage from './pages/PhonicsPage';
import CommunicationPage from './pages/CommunicationPage';
import GrammarPage from './pages/GrammarPage';
import EarlyLearningPage from './pages/EarlyLearningPage';
import TuitionPage from './pages/TuitionPage';
import ReadingLabPage from './pages/ReadingLabPage';
import ParentStoriesPage from './pages/ParentStoriesPage';
import LearningJournalPage from './pages/LearningJournalPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

function AppShell() {
  const location = useLocation();
  useLenisGsap(location.pathname);

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8ED] text-[#26352F]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-[#466B56] focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-[#FFF8ED]"
      >
        Skip to main content
      </a>

      <CustomCursor />
      <Navbar />

      <main id="main-content" className="flex-1">
        <PageTransition>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/programmes" element={<ProgrammesPage />} />
            <Route path="/programmes/phonics" element={<PhonicsPage />} />
            <Route path="/programmes/communication" element={<CommunicationPage />} />
            <Route path="/programmes/grammar" element={<GrammarPage />} />
            <Route path="/programmes/early-learning" element={<EarlyLearningPage />} />
            <Route path="/programmes/tuition" element={<TuitionPage />} />
            <Route path="/reading-lab" element={<ReadingLabPage />} />
            <Route path="/parent-stories" element={<ParentStoriesPage />} />
            <Route path="/learning-journal" element={<LearningJournalPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </PageTransition>
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
