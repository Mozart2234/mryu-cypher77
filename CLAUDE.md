# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Wedding Reservation System with QR codes - A React + TypeScript + Tailwind CSS application for managing wedding reservations, guest check-ins, and digital invitations. The system features a public landing page, an admin dashboard, QR-based check-in, and multiple theme templates (newspaper, fluid, romantic, modern, vintage).

**Current Status (Sprint 6 Complete):** The newspaper theme has achieved 9.5/10 authenticity with professional editorial elements including kickers, decks, bylines, folios, pull quotes, multi-column layout, and column rules.

## Common Commands

```bash
# Development
pnpm dev             # Start development server (http://localhost:5173)
npm run dev          # Alternative (but prefer pnpm)

# Building
pnpm build           # TypeScript compile + Vite build (output: dist/)
npm run build        # Alternative
npm run preview      # Preview production build locally

# Code Quality
npm run lint         # Run ESLint on TypeScript/TSX files
```

**Note:** This project uses **pnpm** as the preferred package manager with **Tailwind CSS v4.1.17**.

## Architecture

### Theme System
The application uses a **template-based multi-theme architecture**:
- Themes are defined in `src/types/theme.ts` with configurations (colors, fonts, styles)
- `ThemeContext` (`src/contexts/ThemeContext.tsx`) manages active theme state via localStorage and URL params
- `TemplateRouter` (`src/templates/TemplateRouter.tsx`) dynamically renders theme-specific components
- Each theme has its own directory: `src/templates/{theme-name}/`
- Theme can be changed via URL parameter `?theme=newspaper` or ThemeSelector component

**Adding a new theme:**
1. Define theme config in `src/types/theme.ts`
2. Create `src/templates/{theme-name}/Landing.tsx` and `InvitationPass.tsx`
3. Add routes in `TemplateRouter.tsx`

### Data Persistence
Currently uses **Supabase** for data persistence:
- `reservationService.ts` provides complete CRUD abstraction
- Database schema: `reservations` table with snake_case columns (mapped to camelCase in TypeScript)
- Database mapping functions: `mapFromDatabase()` and `mapToDatabase()`
- Connection configured in `src/lib/supabase.ts`

### Application Structure
```
src/
├── config/eventConfig.ts       # ⭐ CENTRAL CONFIG - all event customization
├── types/                      # TypeScript interfaces
│   ├── reservation.ts          # Reservation data structures
│   └── theme.ts                # Theme configurations
├── services/reservationService.ts  # Business logic + Supabase integration
├── contexts/                   # React Context providers
│   ├── AuthContext.tsx         # Simple auth (admin login)
│   └── ThemeContext.tsx        # Theme state management
├── templates/                  # Theme-specific implementations
│   ├── TemplateRouter.tsx      # Dynamic theme routing
│   └── {theme-name}/           # Each theme's components
├── components/                 # Shared components
│   ├── admin/                  # Admin dashboard components
│   ├── checkin/               # QR scanner for check-in
│   └── landing/               # Legacy landing components (pre-theme system)
└── pages/                     # Main route pages
    ├── Landing.tsx            # Uses LandingRouter for themed rendering
    ├── InvitationPass.tsx     # Digital invitation pass per guest
    ├── AdminDashboard.tsx     # Admin panel (theme-agnostic)
    ├── CheckIn.tsx            # QR check-in page
    └── GuestList.tsx          # Guest list for venue staff
```

### Routing
Main routes (defined in `App.tsx`):
- `/` - Public landing page (theme-aware)
- `/invitacion/:code` - Individual digital invitation pass (theme-aware)
- `/lista-invitados` - Guest list for venue staff (public, no auth)
- `/check-in` - QR scanner check-in page (public, for event staff)
- `/admin/login` - Admin login page
- `/admin` - Admin dashboard (protected route)

### Configuration System
**All event customization happens in `src/config/eventConfig.ts`:**
- Bride/groom names, event dates, locations (ceremony & reception)
- Parents, godparents, love story timeline
- Newspaper-specific content (headlines, articles, quotes)
- Dress code, messages, max capacity
- Admin credentials
- App URL for QR code generation

**When customizing for a new wedding:**
1. Edit `eventConfig.ts` only
2. Update Supabase credentials in `src/lib/supabase.ts`
3. Change app URL in config after deployment

## Important Implementation Details

### QR Code System
- Each reservation gets a unique code (format: `WED-XXXX`)
- QR codes link to `/invitacion/{code}` for digital invitation pass
- Check-in flow: scan QR → extract code → look up reservation → confirm
- QR generation: `qrcode.react` library
- QR scanning: `html5-qrcode` library (requires camera permissions)

### Capacity Management
- Max capacity defined in `eventConfig.maxCapacity`
- `numberOfGuests` field tracks total people per reservation
- `accompanistNames` array stores names of accompanying guests
- Stats calculated in real-time via `reservationService.getStats()`
- Prevents overbooking during reservation creation/updates

### Reservation States
- `pendiente` - Created, awaiting confirmation
- `confirmada` - Confirmed by admin
- `ingreso-registrado` - Guest has checked in (includes `checkedInAt` timestamp)

### Authentication
Simple admin authentication via `AuthContext`:
- Credentials stored in `eventConfig.admin.credentials`
- No JWT/session backend (suitable for single-admin use)
- Protected routes use `ProtectedRoute` HOC

### CSV Export
The admin dashboard includes CSV export functionality (`src/utils/csvExport.ts`):
- Exports all reservations with guest details and accompanists
- Includes BOM for proper Excel UTF-8 encoding

## Database Schema

**Supabase table: `reservations`**
```sql
- id: uuid (primary key)
- code: text (unique)
- guest_name: text
- number_of_guests: int
- accompanist_names: text[] (array)
- status: text ('pendiente' | 'confirmada' | 'ingreso-registrado')
- table: text (optional)
- group: text (optional)
- notes: text (optional)
- created_at: timestamptz
- updated_at: timestamptz
- checked_in_at: timestamptz (optional)
```

## Environment Configuration

Create `.env` with:
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Security Notes

**Current implementation is suitable for trusted single-admin use:**
- Admin credentials in config file (change before production!)
- Simple context-based auth (no backend validation)
- Supabase Row Level Security (RLS) should be configured for production
- HTTPS required for QR scanner (camera access)

**For production with multiple admins:** implement proper backend authentication.

## Development Guidelines

### Working with Themes
- Keep shared logic in base `pages/` components
- Theme-specific UI goes in `templates/{theme}/`
- Use `useTheme()` hook to access current theme config
- CSS variables (`--color-primary`, etc.) automatically update per theme

### Modifying Reservation Service
- All data operations MUST go through `reservationService`
- Never access Supabase directly from components
- Maintain field name mapping (camelCase ↔ snake_case)
- Handle Supabase errors gracefully (code `PGRST116` = no rows)

### Adding New Fields to Reservations
1. Update `src/types/reservation.ts` interfaces
2. Update database schema in Supabase
3. Update `mapFromDatabase()` and `mapToDatabase()` in `reservationService.ts`
4. Update admin form and display components

### Tailwind Configuration
**Using Tailwind CSS v4.1.17** with modern syntax:
- Theme colors defined in `src/index.css` using `@theme` directive
- Custom utilities use `@utility` syntax with `@apply`
- CSS variables (`var(--color-*)`) for dynamic theming
- Font families: Custom fonts per theme (loaded via Google Fonts in `index.html`)

**Important for Tailwind v4:**
- Use `@utility` instead of `@layer utilities`
- Cannot use custom color classes inside `@apply` (use CSS variables instead)
- `theme()` function not available (use CSS variables: `var(--color-newspaper-gray-300)`)
- Example:
```css
@utility newspaper-box {
  @apply border-2 border-newspaper-black p-3;
  background-color: var(--color-newspaper-gray-100); /* Use CSS var, not @apply */
}
```

## Key Files for Common Tasks

**Customizing event details:** `src/config/eventConfig.ts`
**Changing data source:** `src/services/reservationService.ts`
**Adding/modifying themes:** `src/types/theme.ts`, `src/templates/`
**Admin dashboard features:** `src/pages/AdminDashboard.tsx`, `src/components/admin/`
**QR scanning logic:** `src/components/checkin/QRScanner.tsx`, `src/pages/CheckIn.tsx`
**Styling/colors:** `src/index.css` (using Tailwind v4 `@theme` and `@utility`)

## Newspaper Theme Implementation (Sprint 6)

The newspaper theme includes professional editorial elements:

### CSS Utilities (`src/index.css`)
- `newspaper-kicker` - Small text above headlines (e.g., "Edición Especial Matrimonio")
- `newspaper-deck` - Descriptive subtitle below headlines
- `newspaper-byline` - Article author attribution (e.g., "Por Redacción Especial")
- `newspaper-columns-2/3` - Multi-column text layout with vertical separators
- `newspaper-folio` - Page footer with page numbers and section info
- `newspaper-pull-quote` - Highlighted quotes that float within articles

### Components with Editorial Elements
**Hero.tsx:** Front page with kicker, deck, byline, multi-column articles, and folio
**EventDetails.tsx:** Event information with folio numbering (Page 2)
**LoveStory.tsx:** Timeline with pull quotes and multi-column editorial (Pages 3-4)

### Design Score: 9.5/10
Achieved through:
- Authentic editorial typography hierarchy
- Multi-column layout with column rules
- Pull quotes with float positioning
- Page numbering (folios) with section labels
- Professional bylines for article attribution
- Dense, newspaper-style information architecture

## Testing Workflow

1. Create reservation in `/admin`
2. View generated QR code
3. Open `/invitacion/{code}` to see digital pass
4. Test check-in via `/check-in` (scan QR or manual code entry)
5. Verify status updates in admin dashboard
6. Test guest list view at `/lista-invitados`

## Deployment Checklist

1. Update `eventConfig.appUrl` with production URL
2. Change admin credentials in `eventConfig.admin.credentials`
3. Configure Supabase RLS policies
4. Set environment variables for Supabase
5. Run `npm run build`
6. Deploy `dist/` folder (Vercel, Netlify, etc.)
7. Ensure HTTPS for camera access (QR scanner)
