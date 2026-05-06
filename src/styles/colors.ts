/**
 * Mashbere Design System - Color Tokens
 * 
 * This file contains the complete color palette used throughout the application.
 * Use these constants to maintain visual consistency across components.
 */

export const MASHBERE_COLORS = {
  // ─── BRAND CORE ───
  brand: {
    primary: '#708238',      // Signature Moss Green
    primaryLight: '#8ba145', // Highlight Green
    primaryDark: '#5a682d',  // Deep Forest Green
    accent: '#C4EB54',       // Lime Burst (used for buttons/highlights)
    black: '#1c2114',        // Deep Charcoal Green (Foreground)
    white: '#FDFCFD',        // Paper White (Background)
  },

  // ─── UI SYSTEM ───
  ui: {
    background: '#FDFCFD',
    foreground: '#1c2114',
    border: '#e2e8d5',
    muted: '#f4f6ef',
    destructive: '#9b2c2c',
    glass: 'rgba(255, 255, 255, 0.7)',
    glassDark: 'rgba(0, 0, 0, 0.5)',
  },

  // ─── FLAVOR PALETTES ───
  // Each flavor has an Accent Color, a Text Color, and a BG Gradient
  flavors: {
    tenderCoconut: { accent: '#F0F7F4', text: '#1E3D3D', gradient: ['#E8F5F0', '#F5FBFF'] },
    chocolate:     { accent: '#F5E6D8', text: '#4A2C10', gradient: ['#F5E6D8', '#FDF0E8'] },
    pistachio:     { accent: '#EAF3DA', text: '#2D4A1E', gradient: ['#EAF3DA', '#F5FAF0'] },
    watermelon:    { accent: '#FDECEA', text: '#6B1A1A', gradient: ['#FDECEA', '#FFF5F4'] },
    chikku:        { accent: '#F3F0DA', text: '#4D461F', gradient: ['#F3F0DA', '#FDFAF0'] },
    strawberry:    { accent: '#FCE8EA', text: '#6B1A28', gradient: ['#FCE8EA', '#FFF5F6'] },
    hazelnut:      { accent: '#F5EDD8', text: '#5C3D1A', gradient: ['#F5EDD8', '#FDF8EE'] },
    mango:         { accent: '#FFF0D0', text: '#6B4A0A', gradient: ['#FFF0D0', '#FFFBF0'] },
    avocado:       { accent: '#E8F5E8', text: '#1E4A2A', gradient: ['#E8F5E8', '#F5FBF5'] },
    papaya:        { accent: '#FFF0E0', text: '#7A3A10', gradient: ['#FFF0E0', '#FFFAF5'] },
    jackfruit:     { accent: '#FFF5D8', text: '#6B4A0A', gradient: ['#FFF5D8', '#FFFCF0'] },
    almond:        { accent: '#FAF0E0', text: '#5C3D1A', gradient: ['#FAF0E0', '#FFFCF5'] },
    custardApple:  { accent: '#F0F5E8', text: '#2D4A1E', gradient: ['#F0F5E8', '#F8FCF0'] },
    datella:       { accent: '#F5EDD8', text: '#5C3A1A', gradient: ['#F5EDD8', '#FFFAEE'] },
    guava:         { accent: '#FCE8F0', text: '#6B1A3A', gradient: ['#FCE8F0', '#FFF5F8'] },
  },

  // ─── SIPUP PALETTES ───
  sipups: {
    sugarcane:     { accent: '#E8F5E9' },
    tenderCoconut: { accent: '#F1F8E9' },
    pomegranate:   { accent: '#FCE4EC' },
    pineapple:     { accent: '#FFFDE7' },
    passionFruit:  { accent: '#F3E5F5' },
    mango:         { accent: '#FFF8E1' },
    lychee:        { accent: '#FDF2F2' },
    grapes:        { accent: '#F3E5F5' },
    guava:         { accent: '#FCE4EC' },
  }
};
