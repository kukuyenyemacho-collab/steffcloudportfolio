import { Toaster } from '@/components/ui/sonner';
import { Navigation } from './sections/Navigation';
import { Hero } from './sections/Hero';
import { Services } from './sections/Services';
import { Electronics } from './sections/Electronics';
import { About } from './sections/About';
import { Portfolio } from './sections/Portfolio';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';

function App() {
  return (
    <div className="min-h-screen bg-steff-cream">
      <Toaster 
        position="top-right" 
        richColors 
        closeButton
        toastOptions={{
          style: {
            background: 'white',
            border: '1px solid rgba(249, 115, 22, 0.2)',
          },
        }}
      />
      <Navigation />
      <main>
        <Hero />
        <Services />
        <Electronics />
        <About />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
