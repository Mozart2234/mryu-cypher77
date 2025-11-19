/**
 * NAVEGACIÓN STICKY
 *
 * Barra de navegación que permanece fija en la parte superior
 * con links a las diferentes secciones de la página
 */

import { useState, useEffect } from 'react';
import { Menu, X, ChevronUp } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
}

const navItems: NavItem[] = [
  { id: 'hero', label: 'Inicio' },
  { id: 'event-details', label: 'Detalles' },
  { id: 'love-story', label: 'Historia' },
  { id: 'photo-gallery', label: 'Fotos' },
  { id: 'dress-code', label: 'Dress Code' },
  { id: 'faq', label: 'FAQ' },
];

export function StickyNav() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      // Mostrar navegación después de 100px de scroll
      setIsVisible(window.scrollY > 100);

      // Mostrar botón "back to top" después de 400px
      setShowBackToTop(window.scrollY > 400);

      // Detectar sección activa
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Offset para el sticky header
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      setIsMobileMenuOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Barra de navegación sticky */}
      <nav
        className="fixed top-0 left-0 right-0 z-40 bg-white border-b-2 border-newspaper-black shadow-lg animate-slide-down"
        role="navigation"
        aria-label="Navegación principal"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Título */}
            <button
              onClick={() => scrollToSection('hero')}
              className="font-headline text-lg md:text-xl font-bold text-newspaper-black hover:text-newspaper-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-newspaper-black focus:ring-offset-2 rounded-lg px-2"
              aria-label="Ir al inicio"
            >
              A & E
            </button>

            {/* Nav Desktop */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`
                    px-4 py-2 rounded-lg font-sans text-sm font-medium transition-all
                    focus:outline-none focus:ring-2 focus:ring-offset-1
                    ${
                      activeSection === item.id
                        ? 'bg-newspaper-accent text-white focus:ring-white'
                        : 'text-newspaper-gray-700 hover:bg-newspaper-gray-100 focus:ring-newspaper-black'
                    }
                  `}
                  aria-current={activeSection === item.id ? 'page' : undefined}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Botón menú móvil */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-newspaper-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-newspaper-black focus:ring-offset-2"
              aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        {isMobileMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden border-t border-newspaper-gray-200 bg-white"
          >
            <nav className="px-4 py-2 space-y-1" aria-label="Menú móvil">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`
                    w-full text-left px-4 py-3 rounded-lg font-sans text-sm font-medium transition-all
                    focus:outline-none focus:ring-2 focus:ring-offset-1
                    ${
                      activeSection === item.id
                        ? 'bg-newspaper-accent text-white focus:ring-white'
                        : 'text-newspaper-gray-700 hover:bg-newspaper-gray-100 focus:ring-newspaper-black'
                    }
                  `}
                  aria-current={activeSection === item.id ? 'page' : undefined}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </nav>

      {/* Botón Back to Top */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 z-40 p-3 bg-newspaper-gray-800 text-white rounded-full shadow-xl hover:bg-newspaper-black transition-all hover:scale-110 animate-fade-in focus:outline-none focus:ring-4 focus:ring-newspaper-gray-600 focus:ring-offset-2"
          aria-label="Volver arriba"
        >
          <ChevronUp className="w-5 h-5" aria-hidden="true" />
        </button>
      )}
    </>
  );
}
