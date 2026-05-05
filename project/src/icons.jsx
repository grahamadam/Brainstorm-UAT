// Stroke icons — drawn inline with SVG so we don't depend on lucide-react

const Icon = ({ children, size = 16, stroke = 'currentColor', fill = 'none', strokeWidth = 1.75, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke}
       strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
       style={{ flexShrink: 0, ...style }}>
    {children}
  </svg>
);

const IconHome      = (p) => <Icon {...p}><path d="M3 10.5L12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/></Icon>;
const IconDash      = (p) => <Icon {...p}><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></Icon>;
const IconBook      = (p) => <Icon {...p}><path d="M4 4.5A2 2 0 0 1 6 3h12a1 1 0 0 1 1 1v15.5"/><path d="M6 21h13"/><path d="M6 21a2 2 0 0 1-2-2V4.5"/><path d="M9 7h7M9 11h7"/></Icon>;
const IconMap       = (p) => <Icon {...p}><path d="M3 6.5l6-2 6 2 6-2v15l-6 2-6-2-6 2z"/><path d="M9 4.5v15M15 6.5v15"/></Icon>;
const IconTrophy    = (p) => <Icon {...p}><path d="M8 21h8M12 17v4M7 4h10v4a5 5 0 0 1-10 0V4z"/><path d="M17 4h3v3a3 3 0 0 1-3 3M7 4H4v3a3 3 0 0 0 3 3"/></Icon>;
const IconChart     = (p) => <Icon {...p}><path d="M3 21h18"/><rect x="6" y="11" width="3" height="8" rx="0.5"/><rect x="11" y="6" width="3" height="13" rx="0.5"/><rect x="16" y="14" width="3" height="5" rx="0.5"/></Icon>;
const IconFile      = (p) => <Icon {...p}><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/></Icon>;
const IconSettings  = (p) => <Icon {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></Icon>;
const IconCheck     = (p) => <Icon {...p}><path d="M20 6L9 17l-5-5"/></Icon>;
const IconCheckCirc = (p) => <Icon {...p}><circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-6"/></Icon>;
const IconLock      = (p) => <Icon {...p}><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></Icon>;
const IconCircle    = (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/></Icon>;
const IconFlame     = (p) => <Icon {...p}><path d="M12 2c1 4 6 5 6 11a6 6 0 0 1-12 0c0-3 1.5-4.5 3-6 1 1 1 3 0 5 2 0 4-2 4-5 0-2-1-3-1-5z"/></Icon>;
const IconChevR     = (p) => <Icon {...p}><path d="M9 18l6-6-6-6"/></Icon>;
const IconChevL     = (p) => <Icon {...p}><path d="M15 18l-6-6 6-6"/></Icon>;
const IconChevD     = (p) => <Icon {...p}><path d="M6 9l6 6 6-6"/></Icon>;
const IconArrowR    = (p) => <Icon {...p}><path d="M5 12h14M13 6l6 6-6 6"/></Icon>;
const IconArrowL    = (p) => <Icon {...p}><path d="M19 12H5M11 6l-6 6 6 6"/></Icon>;
const IconSpark     = (p) => <Icon {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/></Icon>;
const IconBolt      = (p) => <Icon {...p}><path d="M13 2L4 14h6l-1 8 9-12h-6z"/></Icon>;
const IconShare     = (p) => <Icon {...p}><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></Icon>;
const IconClose     = (p) => <Icon {...p}><path d="M18 6L6 18M6 6l12 12"/></Icon>;
const IconPlus      = (p) => <Icon {...p}><path d="M12 5v14M5 12h14"/></Icon>;
const IconMsg       = (p) => <Icon {...p}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></Icon>;
const IconSend      = (p) => <Icon {...p}><path d="M22 2L11 13M22 2l-7 20-4-9-9-4z"/></Icon>;
const IconTarget    = (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/></Icon>;
const IconUsers     = (p) => <Icon {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></Icon>;
const IconAlert     = (p) => <Icon {...p}><path d="M12 9v4M12 17h.01"/><path d="M10.3 3.86l-8.6 14.9A2 2 0 0 0 3.5 22h17a2 2 0 0 0 1.7-3.24l-8.6-14.9a2 2 0 0 0-3.4 0z"/></Icon>;
const IconLightbulb = (p) => <Icon {...p}><path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7 5 5 0 0 1 1 3.3h6a5 5 0 0 1 1-3.3A7 7 0 0 0 12 2z"/></Icon>;
const IconRefresh   = (p) => <Icon {...p}><path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5"/></Icon>;
const IconRotate    = (p) => <Icon {...p}><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></Icon>;
const IconAward     = (p) => <Icon {...p}><circle cx="12" cy="9" r="6"/><path d="M8.21 13.89L7 22l5-3 5 3-1.21-8.11"/></Icon>;
const IconCompass   = (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><path d="M16 8l-2 6-6 2 2-6z"/></Icon>;
const IconLayers    = (p) => <Icon {...p}><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/></Icon>;
const IconBot       = (p) => <Icon {...p}><rect x="4" y="7" width="16" height="13" rx="3"/><path d="M9 13h.01M15 13h.01M12 3v4M9 17h6"/></Icon>;
const IconSearch    = (p) => <Icon {...p}><circle cx="11" cy="11" r="7"/><path d="M21 21l-5-5"/></Icon>;
const IconUser      = (p) => <Icon {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></Icon>;
const IconBell      = (p) => <Icon {...p}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10 21a2 2 0 0 0 4 0"/></Icon>;
const IconStar      = (p) => <Icon {...p}><path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/></Icon>;
const IconHash      = (p) => <Icon {...p}><path d="M4 9h16M4 15h16M10 3L8 21M16 3l-2 18"/></Icon>;
const IconCal       = (p) => <Icon {...p}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></Icon>;
const IconClock     = (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></Icon>;
const IconCpu       = (p) => <Icon {...p}><rect x="6" y="6" width="12" height="12" rx="1"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3"/><rect x="9" y="9" width="6" height="6" rx="1"/></Icon>;
const IconLink      = (p) => <Icon {...p}><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></Icon>;
const IconEdit      = (p) => <Icon {...p}><path d="M11 4H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-6"/><path d="M18.4 2.6a2 2 0 0 1 2.8 2.8L11 15.6 7 17l1.4-4z"/></Icon>;
const IconFilter    = (p) => <Icon {...p}><path d="M3 5h18l-7 9v6l-4-2v-4z"/></Icon>;
const IconDownload  = (p) => <Icon {...p}><path d="M12 3v13M6 12l6 6 6-6M5 21h14"/></Icon>;
const IconEye       = (p) => <Icon {...p}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></Icon>;
const IconTrash     = (p) => <Icon {...p}><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></Icon>;
const IconPlay      = (p) => <Icon {...p}><path d="M5 3l14 9-14 9z"/></Icon>;
const IconShield    = (p) => <Icon {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></Icon>;
const IconArchitect = (p) => <Icon {...p}><path d="M3 21h18M5 21V11l7-5 7 5v10M9 21v-6h6v6"/></Icon>;
const IconBrain     = (p) => <Icon {...p}><path d="M9 5a3 3 0 0 1 3-3 3 3 0 0 1 3 3v0a3 3 0 0 1 3 3 3 3 0 0 1-1 5 3 3 0 0 1-2 4 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1-2-4 3 3 0 0 1-1-5 3 3 0 0 1 3-3z"/><path d="M12 5v15M9 9h6M9 13h6"/></Icon>;
const IconTrend     = (p) => <Icon {...p}><path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7"/></Icon>;
const IconQuote     = (p) => <Icon {...p}><path d="M3 21c0-4 2-7 6-8M14 21c0-4 2-7 6-8"/><path d="M3 13a4 4 0 0 1 4-4h2v6H3zM14 13a4 4 0 0 1 4-4h2v6h-6z"/></Icon>;

window.BrIcons = {
  IconHome, IconDash, IconBook, IconMap, IconTrophy, IconChart, IconFile, IconSettings,
  IconCheck, IconCheckCirc, IconLock, IconCircle, IconFlame, IconChevR, IconChevL, IconChevD,
  IconArrowR, IconArrowL, IconSpark, IconBolt, IconShare, IconClose, IconPlus, IconMsg, IconSend,
  IconTarget, IconUsers, IconAlert, IconLightbulb, IconRefresh, IconRotate, IconAward,
  IconCompass, IconLayers, IconBot, IconSearch, IconUser, IconBell, IconStar, IconHash,
  IconCal, IconClock, IconCpu, IconLink, IconEdit, IconFilter, IconDownload, IconEye,
  IconTrash, IconPlay, IconShield, IconArchitect, IconBrain, IconTrend, IconQuote
};
