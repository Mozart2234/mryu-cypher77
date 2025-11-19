/**
 * TEMPLATE ROUTER
 *
 * Solo tema newspaper disponible
 */

// Solo importar plantilla de newspaper
import { Landing as NewspaperLanding } from './newspaper/Landing';
import { InvitationPass as NewspaperPass } from './newspaper/InvitationPass';

export function LandingRouter() {
  return <NewspaperLanding />;
}

export function InvitationPassRouter() {
  return <NewspaperPass />;
}
