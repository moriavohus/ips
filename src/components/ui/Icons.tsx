import { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

// ─── Chevrons & Arrows ─────────────────────────────────────────────

export function ChevronDown(props: IconProps) {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export function ChevronRight(props: IconProps) {
  return (
    <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M1 1L5 5L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronRightSmall(props: IconProps) {
  return (
    <svg width="4" height="8" viewBox="0 0 4 8" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M0.5 0.5L3.5 4L0.5 7.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronRight16(props: IconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
      <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowRight(props: IconProps) {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  );
}

export function ArrowLeft(props: IconProps) {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
  );
}

export function DownloadIcon(props: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 4V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 10L12 14L16 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 17V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Navigation ─────────────────────────────────────────────────────

export function MenuIcon(props: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M3 12h18M3 6h18M3 18h18" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

// ─── Decorative ─────────────────────────────────────────────────────

export function CornerBracket(props: IconProps) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M1 1L6 1C8.76142 1 11 3.23858 11 6L11 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function CornerCurve(props: IconProps) {
  return (
    <svg viewBox="0 16 31 31" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M5 32.6719L10 32.6719C12.7614 32.6719 15 30.4333 15 27.6719L15 22.6719" stroke="currentColor" strokeLinecap="round" />
      <path d="M26 30.6719L21 30.6719C18.2386 30.6719 16 32.9105 16 35.6719L16 40.6719" stroke="currentColor" strokeLinecap="round" />
    </svg>
  );
}

// ─── Contact ────────────────────────────────────────────────────────

export function MessageIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 17" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M11.7773 9.51172C12.0996 9.51172 12.4121 9.38477 12.7148 9.11133L22.4707 0.517578C21.9434 0.166016 21.3379 0.00976562 20.498 0.00976562H3.06641C2.22656 0.00976562 1.62109 0.166016 1.08398 0.517578L10.8398 9.11133C11.1523 9.38477 11.4648 9.51172 11.7773 9.51172ZM0.253906 15.2637L7.48047 8.04688L0.234375 1.66016C0.126953 1.86523 0 2.36328 0 3.03711V13.8184C0 14.4434 0.0976562 14.8926 0.253906 15.2637ZM2.77344 16.8457H20.791C21.5039 16.8457 22.0605 16.6699 22.4316 16.416L15 8.98438L13.5742 10.2539C13.0078 10.752 12.3926 11.0059 11.7773 11.0059C11.1719 11.0059 10.5566 10.752 9.99023 10.2539L8.56445 8.98438L1.13281 16.416C1.50391 16.6699 2.05078 16.8457 2.77344 16.8457ZM23.3105 15.2637C23.457 14.8926 23.5645 14.4434 23.5645 13.8184V3.03711C23.5645 2.36328 23.4375 1.86523 23.3301 1.66016L16.084 8.04688L23.3105 15.2637Z" />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 19 19" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M5 13.1543C7.87109 16.0352 11.3086 18.2227 14.0723 18.2227C15.3711 18.2227 16.5039 17.7051 17.2461 16.875C17.959 16.0742 18.2031 15.4785 18.2031 14.9512C18.2031 14.541 17.9492 14.1602 17.3047 13.7109L14.9219 12.002C14.3262 11.582 14.0625 11.5039 13.7109 11.5039C13.4082 11.5039 13.1543 11.5625 12.6465 11.8359L11.084 12.6953C10.8984 12.8027 10.8203 12.8223 10.6836 12.8223C10.498 12.8223 10.3711 12.7734 10.1855 12.6953C9.44336 12.3535 8.39844 11.5332 7.4707 10.6055C6.54297 9.67773 5.82031 8.73047 5.44922 7.99805C5.40039 7.90039 5.3418 7.74414 5.3418 7.58789C5.3418 7.46094 5.41016 7.35352 5.48828 7.2168L6.40625 5.64453C6.66016 5.21484 6.72852 4.98047 6.72852 4.64844C6.72852 4.26758 6.60156 3.85742 6.24023 3.33984L4.59961 1.05469C4.13086 0.400391 3.7793 0 3.25195 0C2.59766 0 1.80664 0.498047 1.24023 1.04492C0.429688 1.82617 0 2.91992 0 4.15039C0 6.93359 2.13867 10.3027 5 13.1543Z" />
    </svg>
  );
}

export function PlaceIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 8 22" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M7.33398 3.68164C7.33398 5.40039 6.16211 6.8457 4.57031 7.23633V16.2988C4.57031 19.1895 4.0625 20.752 3.66211 20.752C3.27148 20.752 2.75391 19.1797 2.75391 16.2988V7.23633C1.16211 6.83594 0 5.40039 0 3.68164C0 1.66016 1.63086 0 3.66211 0C5.70312 0 7.33398 1.66016 7.33398 3.68164ZM1.35742 2.61719C1.35742 3.30078 1.94336 3.88672 2.61719 3.88672C3.30078 3.88672 3.86719 3.30078 3.86719 2.61719C3.86719 1.94336 3.30078 1.36719 2.61719 1.36719C1.94336 1.36719 1.35742 1.94336 1.35742 2.61719Z" />
    </svg>
  );
}

// ─── Metrics ────────────────────────────────────────────────────────

export function LightningIcon(props: IconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

export function UserStarIcon(props: IconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <polygon points="18 7 19 9 21 9.5 19.5 11 20 13 18 12 16 13 16.5 11 15 9.5 17 9" />
    </svg>
  );
}

export function PinIcon(props: IconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <path d="M9 10l2 2 4-4" />
    </svg>
  );
}

export function ThermoIcon(props: IconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
    </svg>
  );
}

// ─── Service / Feature ──────────────────────────────────────────────

export function StarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export function CalcIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M8 12h8M12 8v8" />
    </svg>
  );
}

export function TempIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M14 4v10.5a4.5 4.5 0 1 1-4 0V4a2 2 0 1 1 4 0z" />
    </svg>
  );
}

export function MoistureIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  );
}

export function StructIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
    </svg>
  );
}

export function DocIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

// ─── Deliverable Icons ──────────────────────────────────────────────

export function TargetIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="6"/>
      <circle cx="12" cy="12" r="2"/>
    </svg>
  );
}

export function NetworkIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="18" cy="5" r="3"/>
      <circle cx="6" cy="12" r="3"/>
      <circle cx="18" cy="19" r="3"/>
      <path d="M8.59 13.51 15.42 17.49M15.41 6.51 8.59 10.49"/>
    </svg>
  );
}

export function PersonIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  );
}

export function SnowflakeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="12" y1="2" x2="12" y2="22"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="m20 16-4-4 4-4"/>
      <path d="m4 8 4 4-4 4"/>
      <path d="m16 4-4 4-4-4"/>
      <path d="m8 20 4-4 4 4"/>
    </svg>
  );
}

export function GearIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  );
}

export function CaretIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="18 15 12 9 6 15"/>
    </svg>
  );
}

export function GridIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="3" width="7" height="7"/>
      <rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/>
      <rect x="3" y="14" width="7" height="7"/>
    </svg>
  );
}

export function WrenchIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>
  );
}

export function ArrowDiagIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M7 17 17 7"/>
      <path d="M7 7h10v10"/>
    </svg>
  );
}

export function MonitorIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="3" width="20" height="14" rx="2"/>
      <line x1="8" y1="21" x2="16" y2="21"/>
      <line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  );
}

export function ToolsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m15 12-8.5 8.5c-.83.83-2.17.83-3 0a2.12 2.12 0 0 1 0-3L12 9"/>
      <path d="M17.64 15 22 10.64"/>
      <path d="m20.91 11.7-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 5.6a5.009 5.009 0 0 0-6.22 3.78L8.83 12 12 15.17l4.38-1c.93-.26 1.82.04 2.42.64l1.11 1.11z"/>
    </svg>
  );
}

export function ClipboardIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
      <rect x="8" y="2" width="8" height="4" rx="1"/>
      <line x1="9" y1="12" x2="15" y2="12"/>
      <line x1="9" y1="16" x2="15" y2="16"/>
    </svg>
  );
}

export function ChartIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  );
}

export function PipesIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="4" y1="21" x2="4" y2="14"/>
      <line x1="4" y1="10" x2="4" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="12"/>
      <line x1="12" y1="8" x2="12" y2="3"/>
      <line x1="20" y1="21" x2="20" y2="16"/>
      <line x1="20" y1="12" x2="20" y2="3"/>
      <line x1="1" y1="14" x2="7" y2="14"/>
      <line x1="9" y1="8" x2="15" y2="8"/>
      <line x1="17" y1="16" x2="23" y2="16"/>
    </svg>
  );
}

export function BlogIcon(props: IconProps) {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
    </svg>
  );
}

// ─── Country Flags ──────────────────────────────────────────────────

export function FlagUAE(props: IconProps) {
  return (
    <svg viewBox="0 0 45 28" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="45" height="28" fill="white"/>
      <rect width="45" height="9.33" fill="#009E49"/>
      <rect y="18.67" width="45" height="9.33" fill="#000"/>
      <rect width="12" height="28" fill="#CE1126"/>
    </svg>
  );
}

export function FlagSaudiArabia(props: IconProps) {
  return (
    <svg viewBox="0 0 45 28" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="45" height="28" fill="#006C35"/>
      <rect y="0" width="45" height="4" fill="#006C35"/>
      <rect y="24" width="45" height="4" fill="#006C35"/>
      <rect x="8" y="11" width="29" height="1.5" fill="white"/>
      <rect x="14" y="7" width="4" height="7" rx="0.5" fill="white"/>
      <rect x="22" y="7" width="4" height="7" rx="0.5" fill="white"/>
      <rect x="30" y="7" width="4" height="7" rx="0.5" fill="white"/>
    </svg>
  );
}

export function FlagQatar(props: IconProps) {
  return (
    <svg viewBox="0 0 45 28" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="45" height="28" fill="#8D1B3D"/>
      <rect width="13" height="28" fill="white"/>
      <polygon points="13,0 19,2.33 13,4.67 19,7 13,9.33 19,11.67 13,14 19,16.33 13,18.67 19,21 13,23.33 19,25.67 13,28" fill="#8D1B3D"/>
    </svg>
  );
}

export function FlagKuwait(props: IconProps) {
  return (
    <svg viewBox="0 0 45 28" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="45" height="28" fill="white"/>
      <rect width="45" height="9.33" fill="#007A3D"/>
      <rect y="18.67" width="45" height="9.33" fill="#CE1126"/>
      <polygon points="0,0 11,14 0,28" fill="#000"/>
    </svg>
  );
}

export function FlagOman(props: IconProps) {
  return (
    <svg viewBox="0 0 45 28" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="45" height="28" fill="white"/>
      <rect width="45" height="9.33" fill="#DB161B"/>
      <rect y="18.67" width="45" height="9.33" fill="#008000"/>
      <rect width="11" height="28" fill="#DB161B"/>
    </svg>
  );
}

export function FlagBahrain(props: IconProps) {
  return (
    <svg viewBox="0 0 45 28" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="45" height="28" fill="#CE1126"/>
      <rect width="14" height="28" fill="white"/>
      <polygon points="14,0 20,2.8 14,5.6 20,8.4 14,11.2 20,14 14,16.8 20,19.6 14,22.4 20,25.2 14,28" fill="#CE1126"/>
    </svg>
  );
}
