/**
 * Feature flags. WhatsApp stays OFF until the owner confirms the number.
 * Never CSS-hide a dead wa.me link — omit the control entirely.
 */
export const config = {
  whatsappEnabled: false,
  whatsappE164: "919818749172",
} as const;
