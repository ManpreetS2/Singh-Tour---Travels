/**
 * Feature flags for customer-facing channels.
 * WhatsApp stays OFF until the owner confirms the number is on WhatsApp.
 * Never hide a dead wa.me link with CSS — omit the control entirely.
 */
export const config = {
  /** Set true only after owner confirms WhatsApp on this number. */
  whatsappEnabled: false,
  /** Used only when whatsappEnabled is true. */
  whatsappE164: "919818749172",
} as const;
