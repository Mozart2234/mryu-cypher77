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
  { id: 'dress-code', label: 'Dress Code' },
  { id: 'faq', label: 'FAQ' },
  { id: 'guest-messages', label: 'Mensajes' },
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
      {/* Barra de navegación sticky - estilo newspaper mejorado */}
      <nav
        className="fixed top-0 left-0 right-0 z-40 bg-white border-b-2 border-newspaper-black shadow-md animate-slide-down"
        role="navigation"
        aria-label="Navegación principal"
      >
        <div className="max-w-7xl mx-auto px-3 md:px-6">
          <div className="flex items-center justify-between h-12 md:h-14">
            {/* Logo/Título con estilo newspaper */}
            <button
              onClick={() => scrollToSection('hero')}
              className="font-headline text-base md:text-lg font-black text-newspaper-black hover:text-newspaper-accent transition-colors focus:outline-none focus:ring-2 focus:ring-newspaper-accent focus:ring-offset-2 rounded px-2 tracking-tight"
              aria-label="Ir al inicio"
            >
              <span className="hidden sm:inline">A & E</span>
              <span className="sm:hidden">A&E</span>
            </button>

            {/* Nav Desktop - estilo tabs de periódico */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`
                    relative px-3 py-2 font-serif text-xs font-semibold uppercase tracking-wide transition-all
                    focus:outline-none focus:ring-2 focus:ring-offset-1
                    ${
                      activeSection === item.id
                        ? 'text-newspaper-black focus:ring-newspaper-black'
                        : 'text-newspaper-gray-600 hover:text-newspaper-black focus:ring-newspaper-gray-400'
                    }
                  `}
                  aria-current={activeSection === item.id ? 'page' : undefined}
                >
                  {item.label}
                  {/* Indicador activo estilo newspaper */}
                  {activeSection === item.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-newspaper-black"></span>
                  )}
                </button>
              ))}
            </div>

            {/* Botón menú móvil */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded hover:bg-newspaper-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-newspaper-black"
              aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Menú móvil - más compacto */}
        {isMobileMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden border-t border-newspaper-gray-300 bg-white shadow-inner"
          >
            <nav className="px-3 py-2 space-y-1" aria-label="Menú móvil">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`
                    w-full text-left px-3 py-2 font-serif text-sm font-semibold uppercase tracking-wide transition-all
                    focus:outline-none focus:ring-2 focus:ring-offset-1 rounded
                    ${
                      activeSection === item.id
                        ? 'bg-newspaper-black text-white focus:ring-white'
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

      {/* Botón Back to Top - estilo newspaper */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-4 md:right-6 z-40 p-2.5 md:p-3 bg-newspaper-black text-white border-2 border-newspaper-black shadow-lg hover:bg-white hover:text-newspaper-black transition-all hover:scale-105 focus:outline-none focus:ring-4 focus:ring-newspaper-gray-400 focus:ring-offset-2"
          aria-label="Volver arriba"
        >
          <ChevronUp className="w-4 h-4 md:w-5 md:h-5" aria-hidden="true" />
        </button>
      )}
    </>
  );
}
