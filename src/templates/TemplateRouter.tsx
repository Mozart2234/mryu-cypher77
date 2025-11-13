/**
 * TEMPLATE ROUTER
 *
 * Decide qué plantilla renderizar basado en el tema actual
 */

import { useTheme } from '@/contexts/ThemeContext';
import { ReactNode } from 'react';

// Importar todas las plantillas de Landing
import { Landing as NewspaperLanding } from './newspaper/Landing';
import { Landing as FluidLanding } from './fluid/Landing';
import { Landing as RomanticLanding } from './romantic/Landing';
import { Landing as ModernLanding } from './modern/Landing';
import { Landing as VintageLanding } from './vintage/Landing';

// Importar todas las plantillas de InvitationPass
import { InvitationPass as NewspaperPass } from './newspaper/InvitationPass';
import { InvitationPass as FluidPass } from './fluid/InvitationPass';
import { InvitationPass as RomanticPass } from './romantic/InvitationPass';
import { InvitationPass as ModernPass } from './modern/InvitationPass';
import { InvitationPass as VintagePass } from './vintage/InvitationPass';

export function LandingRouter() {
  const { currentTheme } = useTheme();

  switch (currentTheme) {
    case 'newspaper':
      return <NewspaperLanding />;
    case 'fluid':
      return <FluidLanding />;
    case 'romantic':
      return <RomanticLanding />;
    case 'modern':
      return <ModernLanding />;
    case 'vintage':
      return <VintageLanding />;
    default:
      return <NewspaperLanding />;
  }
}

export function InvitationPassRouter() {
  const { currentTheme } = useTheme();

  switch (currentTheme) {
    case 'newspaper':
      return <NewspaperPass />;
    case 'fluid':
      return <FluidPass />;
    case 'romantic':
      return <RomanticPass />;
    case 'modern':
      return <ModernPass />;
    case 'vintage':
      return <VintagePass />;
    default:
      return <NewspaperPass />;
  }
}
