// =============================================================================
// Midea AC Control Card  v2.0.0
// Inspired by the official Midea app UI.
//
// Place this file in:  /config/www/custom_card_gil_ac/custom_card_gil_ac.js
// Register as a Lovelace resource (type: module).
//
// Usage:
//   type: custom:custom-card-gil-ac
//   entity: climate.living_room_ac
//
// All companion entity IDs are auto-derived from the climate entity name using
// the Midea AC LAN integration's standard naming convention, so the minimal
// config above is usually sufficient.
//
// Override any individual entity if its name differs (or set to null to disable):
//   indoor_temp:   sensor.living_room_ac_indoor_temperature   # auto-derived
//   outdoor_temp:  sensor.living_room_ac_outdoor_temperature  # auto-derived
//   fan_speed:     number.living_room_ac_fan_speed            # auto-derived
//   display:       switch.living_room_ac_display              # auto-derived
//   breeze_away:   switch.living_room_ac_breeze_away          # auto-derived
//   breezeless:    switch.living_room_ac_breezeless           # auto-derived
//   purifier:      switch.living_room_ac_purifier             # auto-derived
//   swing_h_angle: select.living_room_ac_horizontal_swing_angle  # auto-derived
//   swing_v_angle: select.living_room_ac_vertical_swing_angle    # auto-derived
//   rate_select:   select.living_room_ac_rate_select          # auto-derived
// =============================================================================

const CARD_TAG = 'custom-card-gil-ac';

// ── Mode accent colours ───────────────────────────────────────────────────────
const MODE_COLORS = {
  cool:     '#00a0e9',
  heat:     '#ff8c00',
  dry:      '#00bcd4',
  fan_only: '#43a047',
  auto:     '#7b1fa2',
  off:      '#757575',
};

const MODE_ICONS = {
  cool: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M12 2a1 1 0 0 1 1 1v.962l.654-.346a1 1 0 0 1 .935 1.768L13 6.224v1.902c.715.184 1.352.56 1.854 1.071l1.648-.951l-.067-1.796a1 1 0 0 1 1.999-.075l.027.74l.833-.481a1 1 0 1 1 1 1.732l-.833.48l.627.394a1 1 0 1 1-1.064 1.694l-1.522-.956l-1.647.95a4 4 0 0 1 0 2.143l1.647.951l1.522-.956a1 1 0 0 1 1.064 1.694l-.626.393l.832.481a1 1 0 1 1-1 1.732l-.832-.48l-.028.739a1 1 0 0 1-1.999-.075l.067-1.796l-1.648-.951c-.502.51-1.14.887-1.854 1.071v1.902l1.589.84a1 1 0 0 1-.935 1.768L13 20.038V21a1 1 0 1 1-2 0v-.962l-.654.346a1 1 0 1 1-.935-1.768l1.589-.84v-1.902a4 4 0 0 1-1.854-1.072l-1.648.952l.067 1.796a1 1 0 0 1-1.999.074l-.027-.739l-.833.48a1 1 0 1 1-1-1.731l.833-.481l-.627-.394a1 1 0 0 1 1.064-1.693l1.522.956l1.647-.951a4 4 0 0 1 0-2.142l-1.647-.95l-1.522.955a1 1 0 0 1-1.064-1.693l.627-.394l-.833-.48a1 1 0 0 1 1-1.733l.833.481l.027-.74a1 1 0 0 1 1.999.075l-.067 1.796l1.648.952A4 4 0 0 1 11 8.126V6.224l-1.589-.84a1 1 0 0 1 .935-1.768l.654.346V3a1 1 0 0 1 1-1m0 12a2 2 0 1 0 0-4a2 2 0 0 0 0 4"/></g></svg>`,
  heat: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M17.66 11.2c-.23-.3-.51-.56-.77-.82c-.67-.6-1.43-1.03-2.07-1.66C13.33 7.26 13 4.85 13.95 3c-.95.23-1.78.75-2.49 1.32c-2.59 2.08-3.61 5.75-2.39 8.9c.04.1.08.2.08.33c0 .22-.15.42-.35.5c-.23.1-.47.04-.66-.12a.6.6 0 0 1-.14-.17c-1.13-1.43-1.31-3.48-.55-5.12C5.78 10 4.87 12.3 5 14.47c.06.5.12 1 .29 1.5c.14.6.41 1.2.71 1.73c1.08 1.73 2.95 2.97 4.96 3.22c2.14.27 4.43-.12 6.07-1.6c1.83-1.66 2.47-4.32 1.53-6.6l-.13-.26c-.21-.46-.77-1.26-.77-1.26m-3.16 6.3c-.28.24-.74.5-1.1.6c-1.12.4-2.24-.16-2.9-.82c1.19-.28 1.9-1.16 2.11-2.05c.17-.8-.15-1.46-.28-2.23c-.12-.74-.1-1.37.17-2.06c.19.38.39.76.63 1.06c.77 1 1.98 1.44 2.24 2.8c.04.14.06.28.06.43c.03.82-.33 1.72-.93 2.27"/></svg>`,
  dry:  `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="currentColor"><path d="M12.65 2.24a1 1 0 0 0-1.301.001l-.089.077a32 32 0 0 0-1.053.982a34 34 0 0 0-2.479 2.69c-.902 1.094-1.823 2.373-2.522 3.722C4.511 11.052 4 12.528 4 14a8 8 0 1 0 16 0c0-1.472-.511-2.948-1.206-4.288c-.7-1.35-1.62-2.628-2.522-3.723a34 34 0 0 0-3.299-3.462l-.322-.286zM6 14c0-1.028.364-2.177.981-3.368c.614-1.182 1.443-2.341 2.29-3.371A32 32 0 0 1 12 4.35a32 32 0 0 1 2.728 2.909c.848 1.03 1.677 2.19 2.29 3.372c.618 1.191.982 2.34.982 3.368a6 6 0 0 1-12 0z"/><path d="M8.36 14.042a1 1 0 0 0-.674 1.243a4.51 4.51 0 0 0 3.029 3.029a1 1 0 1 0 .57-1.917a2.51 2.51 0 0 1-1.682-1.682a1 1 0 0 0-1.243-.673"/></g></svg>`,
  fan_only: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 11a1 1 0 0 0-1 1a1 1 0 0 0 1 1a1 1 0 0 0 1-1a1 1 0 0 0-1-1m.5-9c4.5 0 4.61 3.57 2.25 4.75c-.99.49-1.43 1.54-1.62 2.47c.48.2.9.51 1.22.91c3.7-2 7.68-1.21 7.68 2.37c0 4.5-3.57 4.6-4.75 2.23c-.5-.99-1.56-1.43-2.49-1.62c-.2.48-.51.89-.91 1.23c1.99 3.69 1.2 7.66-2.38 7.66c-4.5 0-4.59-3.58-2.23-4.76c.98-.49 1.42-1.53 1.62-2.45c-.49-.2-.92-.52-1.24-.92C5.96 15.85 2 15.07 2 11.5C2 7 5.56 6.89 6.74 9.26c.5.99 1.55 1.42 2.48 1.61c.19-.48.51-.9.92-1.22C8.15 5.96 8.94 2 12.5 2"/></svg>`,
  auto: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M8.877 15.154h.889l.75-2.05h2.969l.75 2.05h.938l-2.742-7.27h-.862zm1.884-2.854L11.95 9h.1l1.189 3.3zm-2.267 7.999q-1.642-.701-2.858-1.916q-1.215-1.216-1.926-2.849Q3 13.902 3 12.04q0-.902.167-1.776t.497-1.715l.78.78q-.219.65-.331 1.317T4 12q0 3.35 2.325 5.675T12 20t5.675-2.325T20 12t-2.325-5.675T12 4q-.675 0-1.332.112t-1.3.332l-.776-.775q.789-.315 1.606-.492T11.885 3q1.882 0 3.544.701t2.896 1.926t1.955 2.867T21 12t-.71 3.506q-.711 1.642-1.926 2.857q-1.216 1.216-2.858 1.926Q13.864 21 12 21t-3.506-.701M5.303 6.543q-.264-.264-.264-.62t.264-.62t.62-.264t.62.264t.265.62t-.265.62t-.62.265t-.62-.265M7.75 7.75Q9.5 6 12 6t4.25 1.75T18 12t-1.75 4.25T12 18t-4.25-1.75T6 12t1.75-4.25"/></svg>`,
  off:  `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M12 3v9"/><path d="M7.2 6.1A8 8 0 1 0 16.8 6.1"/></svg>`,
};

const MODE_LABELS = {
  cool:     'Cool',
  heat:     'Heat',
  dry:      'Dry',
  fan_only: 'Fan',
  auto:     'Auto',
  off:      'Off',
};

const FAN_LABELS = {
  auto:   'Auto',
  silent: 'Silent',
  low:    'Low',
  medium: 'Medium',
  high:   'High',
  max:    'Max',
  custom: 'Custom',
};

// ── Preset & breeze-mode icon definitions ────────────────────────────────────
// Each entry: { vb: viewBox string, inner: inner SVG markup (no outer <svg> tag) }
const ICON_DEFS = {
  preset_sleep:  { vb: '0 0 48 48', inner: `<g fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="4"><path d="M16.866 7.47A18 18 0 0 0 16 13c0 9.941 8.059 18 18 18a17.9 17.9 0 0 0 7.134-1.47C38.801 36.767 32.012 42 24 42c-9.941 0-18-8.059-18-18c0-7.407 4.473-13.768 10.866-16.53Z"/><path stroke-linecap="round" d="M31.66 10H41l-10 8h10"/></g>` },
  preset_boost:  { vb: '0 0 24 24', inner: `<path fill="currentColor" d="M6.788 21.113Q5 20.225 5 18.5q0-.725.325-1.325T6.3 16.15q-.15.2-.237.488t-.088.637q0 .95.688 1.5t1.65.825t1.987.338T12 20t1.7-.062t1.988-.338t1.65-.825t.687-1.5q0-.35-.088-.637t-.237-.488q.65.425.975 1.025T19 18.5q0 1.725-1.787 2.613T12 22t-5.212-.888m1.562-2.65Q7 17.926 7 17q0-.875 1.388-1.437T12 15q2.3 0 3.65.538T17 17t-1.35 1.463T12 19t-3.65-.537M11 14V9H9l4-7v5h2z"/>` },
  preset_away:   { vb: '0 0 24 24', inner: `<path fill="currentColor" d="M10 21v-1.9q0-.525.263-.987t.712-.738q1.15-.675 2.413-1.025T16 16t2.613.35t2.412 1.025q.45.275.713.738T22 19.1V21zm-8 0V9l8-6l5.375 4.05q-1.875.225-3.125 1.638T11 12q0 .775.213 1.463t.612 1.287q-.5.2-.962.413t-.913.487q-.9.525-1.425 1.463T8 19.1V21zm11.875-6.875Q13 13.25 13 12t.875-2.125T16 9t2.125.875T19 12t-.875 2.125T16 15t-2.125-.875"/>` },
  breeze_normal: { vb: '0 0 24 24', inner: `<path fill="currentColor" fill-rule="evenodd" d="M6.25 5.5A3.25 3.25 0 1 1 9.5 8.75H3a.75.75 0 0 1 0-1.5h6.5A1.75 1.75 0 1 0 7.75 5.5v.357a.75.75 0 1 1-1.5 0zm8 2a4.25 4.25 0 1 1 4.25 4.25H2a.75.75 0 0 1 0-1.5h16.5a2.75 2.75 0 1 0-2.75-2.75V8a.75.75 0 0 1-1.5 0zm-11 6.5a.75.75 0 0 1 .75-.75h14.5a4.25 4.25 0 1 1-4.25 4.25V17a.75.75 0 0 1 1.5 0v.5a2.75 2.75 0 1 0 2.75-2.75H4a.75.75 0 0 1-.75-.75" clip-rule="evenodd"/>` },
  breeze_away:   { vb: '0 0 56 56', inner: `<g fill="currentColor"><path d="m28 33.126c3.194 0 5.941-2.852 5.941-6.566 0-3.669-2.762-6.387-5.941-6.387s-5.942 2.778-5.942 6.417c0 3.684 2.748 6.536 5.942 6.536m-17.097 0.341c2.763 0 5.17-2.495 5.17-5.718 0-3.194-2.422-5.556-5.17-5.556-2.763 0-5.199 2.421-5.184 5.585 0 3.194 2.406 5.69 5.184 5.69m34.194 0c2.778 0 5.184-2.495 5.184-5.689 0-3.164-2.421-5.585-5.184-5.585-2.748 0-5.17 2.362-5.17 5.555 0 3.224 2.407 5.72 5.17 5.72m-42.483 13.412h11.29c-1.545-2.243 0.341-6.759 3.535-9.225-1.65-1.099-3.773-1.916-6.55-1.916-6.701 0-10.889 4.946-10.889 9.061 0 1.337 0.743 2.08 2.614 2.08m50.772 0c1.886 0 2.614-0.743 2.614-2.08 0-4.115-4.189-9.061-10.888-9.061-2.778 0-4.902 0.817-6.55 1.916 3.193 2.466 5.08 6.982 3.535 9.225zm-34.73 0h18.672c2.332 0 3.164-0.669 3.164-1.976 0-3.832-4.798-9.12-12.507-9.12-7.694 0-12.492 5.288-12.492 9.12 0 1.307 0.832 1.976 3.164 1.976"/><path d="m5.8914 12.695c0 0.24 0.09 0.45 0.28 0.62 0.16 0.19 0.37 0.28 0.63 0.28h14.69c0.29 0 0.53 0.1 0.73 0.3s0.3 0.45 0.3 0.74q0 0.435-0.3 0.72c-0.2 0.19-0.44 0.29-0.74 0.29-0.29 0-0.54-0.1-0.73-0.29a0.76 0.76 0 0 0-0.6-0.26c-0.25 0-0.46 0.09-0.64 0.26s-0.27 0.38-0.27 0.61c0 0.25 0.09 0.46 0.28 0.63 0.56 0.55 1.22 0.83 1.96 0.83q1.17 0 2.01-0.81c0.56-0.54 0.83-1.19 0.83-1.97s-0.28-1.44-0.84-2-1.23-0.84-2-0.84h-14.68a0.9 0.9 0 0 0-0.64 0.26q-0.27 0.255-0.27 0.63m0-3.28c0 0.23 0.09 0.43 0.28 0.61 0.17 0.18 0.38 0.26 0.63 0.26h20.04c0.78 0 1.45-0.27 2.01-0.82 0.56-0.54 0.84-1.2 0.84-1.97s-0.28-1.44-0.84-1.99-1.23-0.83-2.01-0.83c-0.77 0-1.42 0.27-1.95 0.8-0.18 0.16-0.27 0.38-0.27 0.67 0 0.26 0.09 0.47 0.26 0.63q0.255 0.24 0.63 0.24 0.36 0 0.63-0.24c0.19-0.21 0.42-0.31 0.7-0.31 0.29 0 0.53 0.1 0.73 0.3s0.3 0.44 0.3 0.73q0 0.435-0.3 0.72c-0.2 0.19-0.44 0.29-0.73 0.29h-20.04a0.91 0.91 0 0 0-0.91 0.91"/><path d="m26.169 12.338c0-0.24 0.09-0.45 0.28-0.62 0.16-0.19 0.37-0.28 0.63-0.28h14.69c0.29 0 0.53-0.1 0.73-0.3s0.3-0.45 0.3-0.74q0-0.435-0.3-0.72c-0.2-0.19-0.44-0.29-0.74-0.29-0.29 0-0.54 0.1-0.73 0.29a0.76 0.76 0 0 1-0.6 0.26c-0.25 0-0.46-0.09-0.64-0.26s-0.27-0.38-0.27-0.61c0-0.25 0.09-0.46 0.28-0.63 0.56-0.55 1.22-0.83 1.96-0.83q1.17 0 2.01 0.81c0.56 0.54 0.83 1.19 0.83 1.97 0 0.78-0.28 1.44-0.84 2s-1.23 0.84-2 0.84h-14.68a0.9 0.9 0 0 1-0.64-0.26q-0.27-0.255-0.27-0.63m0 3.28c0-0.23 0.09-0.43 0.28-0.61 0.17-0.18 0.38-0.26 0.63-0.26h20.04c0.78 0 1.45 0.27 2.01 0.82 0.56 0.54 0.84 1.2 0.84 1.97s-0.28 1.44-0.84 1.99-1.23 0.83-2.01 0.83c-0.77 0-1.42-0.27-1.95-0.8-0.18-0.16-0.27-0.38-0.27-0.67 0-0.26 0.09-0.47 0.26-0.63q0.255-0.24 0.63-0.24 0.36 0 0.63 0.24c0.19 0.21 0.42 0.31 0.7 0.31 0.29 0 0.53-0.1 0.73-0.3s0.3-0.44 0.3-0.73q0-0.435-0.3-0.72c-0.2-0.19-0.44-0.29-0.73-0.29h-20.04a0.91 0.91 0 0 1-0.91-0.91"/></g>` },
  breeze_less:   { vb: '0 0 24 24', inner: `<path fill="currentColor" d="M3.5 9a1 1 0 1 0-1-1a1 1 0 0 0 1 1m4 0h7a3 3 0 0 0 0-6a3.06 3.06 0 0 0-1.5.4a1 1 0 0 0-.37 1.37a1 1 0 0 0 1.37.36a1.1 1.1 0 0 1 .5-.13a1 1 0 0 1 0 2h-7a1 1 0 0 0 0 2m-4 4h7a1 1 0 0 0 0-2h-7a1 1 0 0 0 0 2m17-4a1 1 0 1 0-1-1a1 1 0 0 0 1 1m-2 2h-4a1 1 0 0 0 0 2h4a1 1 0 0 1 0 2a1 1 0 0 0 0 2a3 3 0 0 0 0-6m-6 4h-4a1 1 0 0 0 0 2h4a1 1 0 0 1 0 2a1.1 1.1 0 0 1-.5-.13a1 1 0 1 0-1 1.73a3.06 3.06 0 0 0 1.5.4a3 3 0 0 0 0-6m-8 0h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 0-2"/>` },
};

/** Render an icon from ICON_DEFS at a given pixel size. Returns '' if key not found. */
function iconSvg(key, size = 20) {
  const d = ICON_DEFS[key];
  if (!d) return '';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="${d.vb}" style="flex-shrink:0">${d.inner}</svg>`;
}
// pos_1 … pos_5 left-to-right (H) or top-to-bottom (V)
const LOUVER_H = {
  circleAttrs: `transform="rotate(-90)" cx="-15" cy="15" r="14"`,
  rectAttrs:   `transform="rotate(-90)" x="-13.115" y="5.6003" width="6.6034" height="18.514"`,
  paths: [
    'm9.0782 15.367-5.0535 5.0535',   // pos_1  far left
    'm11.775 17.156-2.7349 6.6027',   // pos_2
    'm15 17.775v7.1467',              // pos_3  centre
    'm18.019 17.119 2.7349 6.6027',   // pos_4
    'm20.647 15.362 5.0535 5.0535',   // pos_5  far right
  ],
};

const LOUVER_V = {
  circleAttrs: `cx="15" cy="15" r="14"`,
  rectAttrs:   `x="16.885" y="5.6003" width="6.6034" height="18.514"`,
  paths: [
    'm14.633 9.0782-5.0535-5.0535',  // pos_1  most upward
    'm12.844 11.775-6.6027-2.7349',  // pos_2
    'm12.225 15h-7.1467',            // pos_3  horizontal
    'm12.881 18.019-6.6027 2.7349',  // pos_4
    'm14.638 20.647-5.0535 5.0535',  // pos_5  most downward
  ],
};

// ── SVG helpers ───────────────────────────────────────────────────────────────

/**
 * Convert a clock-angle (0° = 12 o'clock, clockwise) to SVG x,y.
 * @param {number} cx  circle centre x
 * @param {number} cy  circle centre y
 * @param {number} r   radius
 * @param {number} deg clock-angle degrees
 */
function pt(cx, cy, r, deg) {
  const rad = deg * Math.PI / 180;
  return [
    +(cx + r * Math.sin(rad)).toFixed(2),
    +(cy - r * Math.cos(rad)).toFixed(2),
  ];
}

/**
 * Clockwise SVG arc path string.
 * @param {number} cx        circle centre x
 * @param {number} cy        circle centre y
 * @param {number} r         radius
 * @param {number} startDeg  start clock-angle
 * @param {number} sweepDeg  clockwise sweep (degrees)
 */
function arcD(cx, cy, r, startDeg, sweepDeg) {
  if (sweepDeg < 0.5) return '';
  const s = Math.min(sweepDeg, 359.9);
  const [x1, y1] = pt(cx, cy, r, startDeg);
  const [x2, y2] = pt(cx, cy, r, startDeg + s);
  const lg = s > 180 ? 1 : 0;
  return `M${x1},${y1} A${r},${r},0,${lg},1,${x2},${y2}`;
}

/**
 * Generate an inline SVG string for one louver position indicator.
 * @param {object} data       LOUVER_H or LOUVER_V
 * @param {number} activeIdx  0-based index of active position (-1 = none)
 * @param {string} color      accent colour for active path
 * @param {number} size       pixel size of the square SVG
 */
function louverSvg(data, activeIdx, color, size = 44) {
  const paths = data.paths.map((d, i) => {
    const stroke = i === activeIdx ? color : '#888';
    const sw     = i === activeIdx ? '2'   : '1.5';
    return `<path d="${d}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round" fill="none"/>`;
  }).join('');
  return `<svg viewBox="0 0 30 30" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <circle ${data.circleAttrs} fill="#252525" stroke="#252525" stroke-width="2"/>
  <rect ${data.rectAttrs} fill="none" stroke="#888" stroke-width="1" stroke-linecap="square"/>
  ${paths}
</svg>`;
}

/**
 * Inline SVG for the horizontal auto-swing (left ↔ right) pill icon.
 * Paths extracted from horizontal_auto_swinger.svg.
 * Unique marker ID "h-osc-mk" avoids collision with the vertical variant.
 */
function autoSwingHSvg(color, size = 26) {
  return `<svg viewBox="0 0 30 30" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg" style="flex-shrink:0">
  <defs>
    <marker id="h-osc-mk" overflow="visible" markerHeight="1" markerWidth="1"
            orient="auto-start-reverse" preserveAspectRatio="xMidYMid" viewBox="0 0 1 1">
      <path transform="rotate(180 .125 0)" d="m3-3-3 3 3 3" fill="none"
            stroke="context-stroke" stroke-linecap="round"/>
    </marker>
  </defs>
  <g fill="none" stroke="${color}" stroke-linecap="round" stroke-linejoin="round">
    <path d="m5.5625 19.844c5.4296 3.8131 11.297 5.6902 18.875 0"
          marker-start="url(#h-osc-mk)" marker-end="url(#h-osc-mk)"/>
    <path d="m15.977 4.6807 7.2969 12.639"/>
    <path d="m14.023 4.6807-7.2969 12.639"/>
  </g>
</svg>`;
}

/**
 * Inline SVG for the vertical auto-swing (up ↕ down) pill icon.
 * Paths extracted from vertical_auto_swinger.svg.
 * Unique marker ID "v-osc-mk" avoids collision with the horizontal variant.
 */
function autoSwingVSvg(color, size = 26) {
  return `<svg viewBox="0 0 30 30" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg" style="flex-shrink:0">
  <defs>
    <marker id="v-osc-mk" overflow="visible" markerHeight="1" markerWidth="1"
            orient="auto-start-reverse" preserveAspectRatio="xMidYMid" viewBox="0 0 1 1">
      <path transform="rotate(180 .125 0)" d="m3-3-3 3 3 3" fill="none"
            stroke="context-stroke" stroke-linecap="round"/>
    </marker>
  </defs>
  <g fill="none" stroke="${color}" stroke-linecap="round" stroke-linejoin="round">
    <path d="m10.156 5.5625c-3.8131 5.4296-5.6902 11.297 0 18.875"
          marker-start="url(#v-osc-mk)" marker-end="url(#v-osc-mk)"/>
    <path d="m25.319 15.977-12.639 7.2969"/>
    <path d="m25.319 14.023-12.639-7.2969"/>
  </g>
</svg>`;
}

// Position string → 0-based index for louverSvg() (-1 = none / off)
const POS_IDX = { off: -1, pos_1: 0, pos_2: 1, pos_3: 2, pos_4: 3, pos_5: 4 };

/**
 * Returns the <span class="tile-val"> HTML for the Airflow tile.
 * Shows auto-swing SVG icons when oscillating, louver-position SVGs when a
 * fixed angle is selected, and plain '—' when nothing is active.
 */
function airTileIcon(swingMode, hPos, vPos, mc) {
  const hOsc = swingMode === 'horizontal' || swingMode === 'both';
  const vOsc = swingMode === 'vertical'   || swingMode === 'both';

  let inner;
  if (hOsc && vOsc) {
    inner = autoSwingHSvg(mc, 28) + autoSwingVSvg(mc, 28);
  } else if (hOsc) {
    inner = autoSwingHSvg(mc, 34);
  } else if (vOsc) {
    inner = autoSwingVSvg(mc, 34);
  } else if (hPos !== 'off' && vPos !== 'off') {
    inner = louverSvg(LOUVER_H, POS_IDX[hPos] ?? -1, mc, 30) +
            louverSvg(LOUVER_V, POS_IDX[vPos] ?? -1, mc, 30);
  } else if (hPos !== 'off') {
    inner = louverSvg(LOUVER_H, POS_IDX[hPos] ?? -1, mc, 34);
  } else if (vPos !== 'off') {
    inner = louverSvg(LOUVER_V, POS_IDX[vPos] ?? -1, mc, 34);
  } else {
    return `<span class="tile-val">—</span>`;
  }
  return `<span class="tile-val" style="display:flex;align-items:center;gap:3px">${inner}</span>`;
}

/**
 * Returns the <span class="tile-val"> HTML for the Breeze & Presets tile.
 * Shows the active breeze-mode icon (always in cool mode) and the active
 * preset icon side by side.
 */
function breezeTileIcons(isCool, breezeAwayOn, breezelessOn, preset, hasBreeze) {
  const parts = [];

  // Always show the current breeze state when entities are configured.
  // Falls back to "normal" when not in cool mode or no special mode is active.
  if (hasBreeze) {
    if (isCool && breezeAwayOn)      parts.push(iconSvg('breeze_away',   22));
    else if (isCool && breezelessOn) parts.push(iconSvg('breeze_less',   22));
    else                             parts.push(iconSvg('breeze_normal', 22));
  }

  // Active preset icon (sleep / boost / away — eco has no icon, skip)
  const presetKey = `preset_${preset}`;
  if (preset && preset !== 'none' && ICON_DEFS[presetKey]) {
    parts.push(iconSvg(presetKey, 20));
  }

  if (parts.length === 0) return `<span class="tile-val">—</span>`;
  return `<span class="tile-val" style="display:flex;align-items:center;gap:4px">${parts.join('')}</span>`;
}
function hexA(hex, a) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n>>16)&255},${(n>>8)&255},${n&255},${a})`;
}

/** True when an entity state means it cannot be interacted with */
function isUnavail(entityState) {
  return !entityState || entityState.state === 'unavailable' || entityState.state === 'unknown';
}

/**
 * Given a user config object, fills in any missing optional entity IDs by
 * deriving them from the climate entity name using the Midea AC LAN
 * integration's standard naming convention.
 *
 * e.g. entity: climate.living_room_ac  →  name = "living_room_ac"
 *      swing_h_angle (not set by user)  →  select.living_room_ac_horizontal_swing_angle
 *
 * A key present in the user config (even if set to null/false) is never
 * overridden, so the user can disable a specific entity by setting it
 * explicitly to null.
 */
function deriveEntities(cfg) {
  const match = (cfg.entity || '').match(/^climate\.(.+)$/);
  if (!match) return cfg;
  const n = match[1];

  const defaults = {
    indoor_temp:       `sensor.${n}_indoor_temperature`,
    outdoor_temp:      `sensor.${n}_outdoor_temperature`,
    fan_speed:         `number.${n}_fan_speed`,
    display:           `switch.${n}_display`,
    breeze_away:       `switch.${n}_breeze_away`,
    breezeless:        `switch.${n}_breezeless`,
    purifier:          `switch.${n}_purifier`,
    swing_h_angle:     `select.${n}_horizontal_swing_angle`,
    swing_v_angle:     `select.${n}_vertical_swing_angle`,
    rate_select:       `select.${n}_rate_select`,
    self_clean_sensor: `binary_sensor.${n}_self_clean`,
    self_clean_btn:    `button.${n}_start_self_clean`,
  };

  const resolved = { ...cfg };
  for (const [key, val] of Object.entries(defaults)) {
    if (!(key in resolved)) resolved[key] = val;
  }
  return resolved;
}

// ── Card class ────────────────────────────────────────────────────────────────
class AcCard extends HTMLElement {
  constructor() {
    super();
    this._hass      = null;
    this._config    = null;
    this._sheet     = null;   // currently-open sheet name
    this._built     = false;  // shadow DOM initialised
    this._fanTimer  = null;   // debounce timer for fan slider
    this._dragging  = false;  // true while user is dragging the arc
    this._dragTemp  = null;   // live temperature value during drag
    this._lastMode  = null;   // last non-off hvac_mode — restored on power-on
  }

  static getStubConfig() {
    return { entity: 'climate.living_room_ac' };
  }

  getCardSize() { return 8; }

  setConfig(cfg) {
    if (!cfg.entity) throw new Error('custom-card-gil-ac: entity is required');
    this._config = deriveEntities(cfg);
  }

  set hass(hass) {
    if (!this._config) return;
    const prev = this._hass;
    this._hass = hass;

    // Collect all entity IDs this card cares about
    const cfg = this._config;
    const ids = [
      cfg.entity, cfg.indoor_temp, cfg.outdoor_temp, cfg.fan_speed,
      cfg.display, cfg.breeze_away, cfg.breezeless, cfg.purifier,
      cfg.swing_h_angle, cfg.swing_v_angle, cfg.rate_select,
      cfg.self_clean_sensor,
    ].filter(Boolean);

    // Remember the last non-off mode so we can restore it on power-on
    const climateState = hass.states[cfg.entity];
    if (climateState && climateState.state !== 'off' && climateState.state !== 'unavailable' && climateState.state !== 'unknown') {
      this._lastMode = climateState.state;
    }

    // Skip re-render if nothing relevant changed, or while user is dragging the arc
    if (this._dragging) return;
    if (prev && ids.every(id => prev.states[id] === hass.states[id])) return;

    if (!this._built) this._initShadow();
    this._render();
  }

  connectedCallback() {
    if (this._hass && !this._built) {
      this._initShadow();
      this._render();
    }
  }

  _initShadow() {
    this.attachShadow({ mode: 'open' });
    // Attach these once — shadowRoot persists across re-renders so adding
    // them inside _render() would stack up a new listener on every hass update.
    this.shadowRoot.addEventListener('click', e => this._onClick(e));
    this.shadowRoot.addEventListener('input', e => this._onInput(e));
    this._built = true;
  }

  // ── Full re-render ──────────────────────────────────────────────────────────
  _render() {
    if (!this._hass || !this._built) return;
    const activeSheet = this._sheet;
    this.shadowRoot.innerHTML = `<style>${this._css()}</style>${this._html()}`;
    // Dial SVG is recreated by innerHTML each time, so bind its events here.
    const dialSvg = this.shadowRoot.querySelector('.dial-svg');
    if (dialSvg) this._bindDialEvents(dialSvg);
    if (activeSheet) this._openSheet(activeSheet);
  }

  // ── CSS ─────────────────────────────────────────────────────────────────────
  _css() {
    return `
:host { display: block; }
:host::before, :host::after { display: none !important; }
* { box-sizing: border-box; margin: 0; padding: 0; }

.card {
  /* background-color (not shorthand) prevents --ha-card-background gradients from themes */
  background-color: var(--card-background-color, var(--ha-card-background-color, var(--ha-card-background, white)));
  border-radius: var(--ha-card-border-radius, 12px);
  box-shadow: var(--ha-card-box-shadow, 0 2px 8px rgba(0,0,0,.12));
  overflow: hidden;
  position: relative;
  color: var(--primary-text-color);
  font-family: var(--primary-font-family, Roboto, sans-serif);
  user-select: none;
  -webkit-user-select: none;
}

/* ── Header ── */
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px 6px;
}
.header-right {
  display: flex;
  align-items: center;
  gap: 8px;
}
.name {
  font-size: 14px;
  font-weight: 500;
  color: var(--secondary-text-color);
}
/* ── Self-clean button ── */
.self-clean-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px; height: 30px;
  border-radius: 50%;
  border: 1.5px solid var(--divider-color, #ddd);
  background: none;
  cursor: pointer;
  color: var(--secondary-text-color);
  transition: all .2s;
  padding: 0;
  flex-shrink: 0;
}
.self-clean-btn:hover {
  border-color: var(--mode-color);
  color: var(--mode-color);
}
.self-clean-btn.running {
  border-color: #00bcd4;
  color: #00bcd4;
  animation: sc-pulse 1.6s ease-in-out infinite;
}
@keyframes sc-pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: .4; }
}
.chip {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 3px 10px;
  border-radius: 12px;
  background: var(--chip-bg);
  color: var(--mode-color);
  font-size: 12px;
  font-weight: 600;
}
.chip-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--mode-color);
}

/* ── Thermostat dial ── */
.thermo {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4px 0 0;
}
.dial-wrap {
  position: relative;
  width: 100%;
  max-width: 360px;
  padding-bottom: 77.5%; /* 155/200 aspect ratio */
}
.dial-svg {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  overflow: visible;
  touch-action: none;
  cursor: grab;
}
.dial-svg.dragging { cursor: grabbing; }
.dial-center {
  position: absolute;
  left: 0; right: 0;
  /* 62% places the row below the arc equator, in the wider bottom bowl */
  top: 62%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  pointer-events: none;
}
.dial-btn {
  pointer-events: all;
  width: 34px; height: 34px;
  border-radius: 50%;
  border: 2px solid var(--divider-color, #ddd);
  /* opaque background so the button visually sits on top of the arc track */
  background: var(--ha-card-background, var(--card-background-color, white));
  cursor: pointer;
  font-size: 22px;
  font-weight: 300;
  line-height: 1;
  color: var(--primary-text-color);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color .15s;
  flex-shrink: 0;
}
.dial-btn:hover { border-color: var(--mode-color); }
.dial-btn:disabled { opacity: .35; cursor: default; pointer-events: none; }
.dial-temp { text-align: center; pointer-events: none; flex-shrink: 0; }
.dial-val {
  font-size: 46px;
  font-weight: 300;
  line-height: 1;
  color: var(--primary-text-color);
}
.dial-unit {
  font-size: 18px;
  vertical-align: super;
  opacity: .65;
}

/* ── Stats row ── */
.stats {
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 8px 16px 16px;
}
.stat {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: var(--secondary-text-color);
}
.stat-icon { font-size: 14px; opacity: .75; }

/* ── Divider ── */
.sep {
  height: 1px;
  background: var(--divider-color, rgba(0,0,0,.08));
  margin: 0 16px;
}

/* ── Tiles 2×2 ── */
.tiles {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  padding: 12px 16px;
}
.tile {
  background: var(--secondary-background-color, rgba(0,0,0,.04));
  border-radius: 12px;
  padding: 12px 14px;
  cursor: pointer;
  border-left: 3px solid transparent;
  transition: filter .15s;
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-height: 66px;
}
.tile:hover { filter: brightness(.95); }
.tile:active { filter: brightness(.9); }
.tile.active { border-left-color: var(--mode-color); }
.tile-lbl { font-size: 12px; color: var(--secondary-text-color); font-weight: 500; }
.tile-row { display: flex; align-items: center; justify-content: space-between; }
.tile-val { font-size: 15px; font-weight: 600; }
.tile-icon { font-size: 22px; opacity: .65; display: flex; align-items: center; }

/* ── Feature rows ── */
.features { padding: 4px 16px 8px; }
.feature {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid var(--divider-color, rgba(0,0,0,.05));
}
.feature:last-child { border-bottom: none; }
.feature-ico {
  width: 36px; height: 36px;
  border-radius: 50%;
  background: var(--secondary-background-color);
  display: flex; align-items: center; justify-content: center;
  font-size: 16px;
  flex-shrink: 0;
}
.feature-info { flex: 1; }
.feature-name { font-size: 14px; font-weight: 500; }
.feature-desc {
  font-size: 12px;
  color: var(--secondary-text-color);
  line-height: 1.3;
  margin-top: 2px;
}

/* ── Toggle switch ── */
.tog {
  width: 44px; height: 26px;
  border-radius: 13px;
  background: var(--divider-color, #ccc);
  position: relative;
  cursor: pointer;
  border: none;
  transition: background .2s;
  flex-shrink: 0;
}
.tog::after {
  content: '';
  position: absolute;
  top: 3px; left: 3px;
  width: 20px; height: 20px;
  border-radius: 50%;
  background: white;
  transition: transform .2s;
  box-shadow: 0 1px 3px rgba(0,0,0,.3);
}
.tog.on { background: var(--mode-color); }
.tog.on::after { transform: translateX(18px); }
.tog:disabled { opacity: .4; cursor: default; }

/* Feature row unavailable state */
.feature.unavail { opacity: .45; }
.feature.unavail .tog { cursor: default; }

/* ── Power button ── */
.power-wrap {
  display: flex;
  justify-content: center;
  padding: 10px 0 20px;
}
.power-btn {
  width: 56px; height: 56px;
  border-radius: 50%;
  border: 3px solid var(--mode-color);
  background: none;
  cursor: pointer;
  color: var(--mode-color);
  display: flex; align-items: center; justify-content: center;
  transition: all .2s;
  padding: 0;
}
.power-btn svg { display: block; pointer-events: none; }
.power-btn.on {
  background: var(--mode-color);
  color: white;
}
.power-btn:hover { opacity: .85; }

/* ── Overlay ── */
.overlay {
  position: absolute; inset: 0;
  background: rgba(0,0,0,.4);
  opacity: 0;
  pointer-events: none;
  transition: opacity .3s;
  z-index: 10;
  border-radius: inherit;
}
.overlay.open { opacity: 1; pointer-events: all; }

/* ── Bottom sheet ── */
.sheet {
  position: absolute; bottom: 0; left: 0; right: 0;
  background: var(--ha-card-background, var(--card-background-color, white));
  border-radius: 16px 16px 0 0;
  transform: translateY(100%);
  transition: transform .3s ease;
  z-index: 11;
  padding: 8px 20px 28px;
  box-shadow: 0 -4px 24px rgba(0,0,0,.15);
  max-height: 88%;
  overflow-y: auto;
}
.sheet.open { transform: translateY(0); }
.sheet-handle {
  width: 36px; height: 4px;
  border-radius: 2px;
  background: var(--divider-color, #ddd);
  margin: 6px auto 16px;
}
.sheet-title {
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 20px;
}
.sheet-sec {
  font-size: 11px;
  font-weight: 600;
  color: var(--secondary-text-color);
  text-transform: uppercase;
  letter-spacing: .6px;
  margin: 0 0 10px;
}

/* ── Mode sheet ── */
.mode-list {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 6px;
  padding-bottom: 4px;
}
.mode-btn {
  display: flex; flex-direction: column; align-items: center; gap: 6px;
  padding: 10px 10px;
  border-radius: 12px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 12px;
  color: var(--primary-text-color);
  transition: background .15s;
  min-width: 54px;
}
.mode-btn:hover { background: var(--secondary-background-color); }
.mode-btn.active { color: var(--mode-color); font-weight: 600; }
.mode-ico {
  width: 44px; height: 44px;
  border-radius: 50%;
  background: var(--secondary-background-color);
  display: flex; align-items: center; justify-content: center;
  font-size: 22px;
  transition: background .15s;
}
.mode-btn.active .mode-ico {
  background: var(--mode-color);
  color: white;
}

/* ── Fan sheet ── */
.fan-auto-row {
  display: flex; align-items: center; justify-content: space-between;
  padding: 4px 0 16px;
  border-bottom: 1px solid var(--divider-color, #eee);
  margin-bottom: 16px;
}
.fan-auto-lbl { font-size: 16px; font-weight: 500; }
.slider-head {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 10px;
}
.slider-lbl { font-size: 14px; color: var(--secondary-text-color); }
.slider-val { font-size: 14px; font-weight: 600; color: var(--mode-color); }
input[type=range] {
  width: 100%;
  -webkit-appearance: none;
  height: 4px;
  border-radius: 2px;
  background: var(--divider-color, #ddd);
  outline: none;
  cursor: pointer;
}
input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 22px; height: 22px;
  border-radius: 50%;
  background: var(--mode-color);
  box-shadow: 0 1px 4px rgba(0,0,0,.3);
  cursor: pointer;
}
input[type=range]:disabled { opacity: .4; cursor: default; }
.slider-ticks {
  display: flex; justify-content: space-between;
  font-size: 11px; color: var(--secondary-text-color);
  margin-top: 5px;
}
.dim { opacity: .4; pointer-events: none; }

/* ── Airflow sheet ── */
.osc-row { display: flex; gap: 10px; margin-bottom: 22px; }
.osc-pill {
  flex: 1; padding: 11px 8px;
  border-radius: 12px;
  border: 2px solid var(--divider-color, #ddd);
  background: none;
  cursor: pointer;
  font-size: 14px; font-weight: 500;
  display: flex; align-items: center; justify-content: center; gap: 6px;
  transition: all .15s;
  color: var(--primary-text-color);
}
.osc-pill.active {
  border-color: var(--mode-color);
  background: var(--chip-bg);
  color: var(--mode-color);
}
.louver-axis-lbl {
  font-size: 12px;
  color: var(--secondary-text-color);
  text-align: center;
  margin: 8px 0 6px;
}
.louver-row {
  display: flex;
  justify-content: space-around;
  padding: 4px 0;
}
.louver-row.osc-active { opacity: .3; pointer-events: none; }
.louver-btn {
  padding: 4px;
  border-radius: 8px;
  border: 2px solid transparent;
  background: none;
  cursor: pointer;
  transition: all .15s;
}
.louver-btn.active {
  border-color: var(--mode-color);
  background: var(--chip-bg);
}
.louver-off-btn {
  display: flex; align-items: center; justify-content: center;
  width: 44px; height: 44px;
  border-radius: 22px;
  border: 2px solid var(--divider-color, #ddd);
  background: none;
  cursor: pointer;
  font-size: 18px;
  font-weight: 700;
  color: var(--secondary-text-color);
  transition: all .15s;
}
.louver-off-btn.active {
  border-color: var(--mode-color);
  background: var(--chip-bg);
  color: var(--mode-color);
}

/* ── Breeze/presets sheet ── */
.pill-row {
  display: flex; gap: 8px; flex-wrap: wrap;
  margin-bottom: 18px;
}
.pill {
  flex: 1; min-width: 80px;
  padding: 10px 8px;
  border-radius: 12px;
  border: 2px solid var(--divider-color, #ddd);
  background: none;
  cursor: pointer;
  font-size: 13px; font-weight: 500;
  text-align: center;
  transition: all .15s;
  color: var(--primary-text-color);
}
.pill.active {
  border-color: var(--mode-color);
  background: var(--chip-bg);
  color: var(--mode-color);
}
.pill.unavail { opacity: .35; cursor: default; pointer-events: none; }
.no-items {
  color: var(--secondary-text-color);
  font-size: 13px;
  padding: 4px 0;
}
`;
  }

  // ── Full HTML ──────────────────────────────────────────────────────────────
  _html() {
    const { _hass: hass, _config: cfg } = this;
    const entity = hass.states[cfg.entity];
    if (!entity) {
      return `<div class="card" style="padding:16px;color:var(--error-color,red)">
        Entity not found: ${cfg.entity}
      </div>`;
    }

    const mode  = entity.state;
    const attrs = entity.attributes;
    const mc    = MODE_COLORS[mode] || '#757575';
    const chipBg = hexA(mc, 0.13);
    const acOff  = mode === 'off';

    // ── Thermostat arc ─────────────────────────────────────────────────────
    const target = attrs.temperature != null ? +attrs.temperature : 22;
    const minT   = attrs.min_temp || 16;
    const maxT   = attrs.max_temp || 30;
    const frac   = Math.max(0, Math.min(1, (target - minT) / (maxT - minT)));
    const CX = 100, CY = 90, R = 76;
    const ARC_START = 240, ARC_SWEEP = 240;
    const trackPath = arcD(CX, CY, R, ARC_START, ARC_SWEEP);
    const fillSweep = frac * ARC_SWEEP;
    const fillPath  = arcD(CX, CY, R, ARC_START, fillSweep);
    const [hx, hy]  = pt(CX, CY, R, ARC_START + (fillSweep < 0.5 ? 0 : fillSweep));

    // ── Stats ──────────────────────────────────────────────────────────────
    const curTemp    = attrs.current_temperature != null ? (+attrs.current_temperature).toFixed(1) : '—';
    const humidity   = attrs.current_humidity   != null ? Math.round(attrs.current_humidity)  : null;
    const outdoorEid = cfg.outdoor_temp;
    const outdoorRaw = outdoorEid && hass.states[outdoorEid]?.state;
    const outdoorT   = outdoorRaw && !isNaN(+outdoorRaw) ? (+outdoorRaw).toFixed(1) : null;

    // ── Tile data ──────────────────────────────────────────────────────────
    const fanLabel   = FAN_LABELS[attrs.fan_mode] || attrs.fan_mode || '—';
    const swingMode  = attrs.swing_mode || 'off';
    const hOsc = swingMode === 'horizontal' || swingMode === 'both';
    const vOsc = swingMode === 'vertical'   || swingMode === 'both';
    // Treat unavailable select state as 'off' so tiles don't show stale positions
    const hAngEnt = cfg.swing_h_angle ? hass.states[cfg.swing_h_angle] : null;
    const vAngEnt = cfg.swing_v_angle ? hass.states[cfg.swing_v_angle] : null;
    const hPos = (!hAngEnt || isUnavail(hAngEnt)) ? 'off' : hAngEnt.state;
    const vPos = (!vAngEnt || isUnavail(vAngEnt)) ? 'off' : vAngEnt.state;
    const airActive   = swingMode !== 'off' || hPos !== 'off' || vPos !== 'off';
    const airIcon     = airTileIcon(swingMode, hPos, vPos, mc);
    const isCool        = mode === 'cool';
    const breezeAwayEnt = cfg.breeze_away ? hass.states[cfg.breeze_away] : null;
    const breezelessEnt = cfg.breezeless  ? hass.states[cfg.breezeless]  : null;
    const breezeAwayOn  = isCool && !isUnavail(breezeAwayEnt) && breezeAwayEnt?.state === 'on';
    const breezelessOn  = isCool && !isUnavail(breezelessEnt) && breezelessEnt?.state === 'on';
    const breezeLabel   = !isCool ? '—' : breezeAwayOn ? 'Away' : breezelessOn ? 'Less' : '—';

    // ── Features (preset needed for breezeActive / breezeTileHtml below) ───────
    const presets  = attrs.preset_modes || [];
    const preset   = attrs.preset_mode  || 'none';
    const ecoAvail = presets.includes('eco');
    const ecoOn    = preset === 'eco';

    const breezeActive   = (isCool && (breezeAwayOn || breezelessOn)) || (preset && preset !== 'none');
    const hasBreeze      = !!(cfg.breeze_away || cfg.breezeless);
    const breezeTileHtml = breezeTileIcons(isCool, breezeAwayOn, breezelessOn, preset, hasBreeze);
    const displayEnt  = cfg.display   ? hass.states[cfg.display]   : null;
    const purifierEnt = cfg.purifier  ? hass.states[cfg.purifier]  : null;
    const displayUnavail  = isUnavail(displayEnt);
    const purifierUnavail = isUnavail(purifierEnt);
    const displayOn  = !displayUnavail  && displayEnt?.state  === 'on';
    const purifierOn = !purifierUnavail && purifierEnt?.state === 'on';

    // ── Self-clean ────────────────────────────────────────────────────────────
    const selfCleanEnt  = cfg.self_clean_sensor ? hass.states[cfg.self_clean_sensor] : null;
    const selfCleanOn   = selfCleanEnt?.state === 'on';
    const selfCleanHide = !cfg.self_clean_btn && !cfg.self_clean_sensor;

    return `
<div class="card" style="--mode-color:${mc};--chip-bg:${chipBg}">

  <!-- Header -->
  <div class="header">
    <span class="name">${attrs.friendly_name || cfg.entity}</span>
    <div class="header-right">
      ${!selfCleanHide ? `
      <button class="self-clean-btn${selfCleanOn ? ' running' : ''}"
              data-action="start-self-clean"
              title="${selfCleanOn ? 'Self-clean running…' : 'Start self-clean'}">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48">
          <path fill="currentColor" d="m34.5 6l-2.167 7.69L28 15.953l4.333 2.262L34.5 25l2.167-6.786L41 15.952l-4.333-2.261zM20 12l-1 4l-3 1l3 1l1 4l1-4l3-1l-3-1zM6 30a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v10.996a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm11.705-.811c.932-.425 3.21 0 3.21 0l6.626 1.486s1.657.531 3.21.531s.624 2.126-.415 2.868s-1.794.702-1.794.702l-5.35-.065s4.66.85 6.42.956c.891.054 2.42-.574 4.13-1.275c1.665-.684 3.5-1.437 5.084-1.699c3.21-.53 3.728 2.337 2.692 3.399c-1.035 1.062-9.318 5.097-10.767 5.628c-1.136.416-2.509.278-4.058.122c-.429-.043-.872-.088-1.326-.122c-1.81-.137-3.192-.577-4.56-1.012c-1.468-.466-2.919-.927-4.862-1.006c-.652-.026-2.178.055-2.945.1V30.94c1.326-.472 4.011-1.436 4.705-1.752"/>
        </svg>
      </button>` : ''}
      <span class="chip"><span class="chip-dot"></span>${MODE_LABELS[mode] || mode}</span>
    </div>
  </div>

  <!-- Thermostat -->
  <div class="thermo">
    <div class="dial-wrap">
      <svg class="dial-svg" viewBox="0 0 200 155" xmlns="http://www.w3.org/2000/svg">
        <path d="${trackPath}" fill="none"
              stroke="${hexA('#888888', 0.22)}" stroke-width="10" stroke-linecap="round"/>
        <path id="arc-fill" d="${fillPath || ''}" fill="none"
              stroke="${mc}" stroke-width="10" stroke-linecap="round"
              ${fillPath ? '' : 'style="display:none"'}/>
        <circle id="arc-handle" cx="${hx}" cy="${hy}" r="8"
                fill="white" stroke="${mc}" stroke-width="2.5"/>
      </svg>
      <div class="dial-center">
        <button class="dial-btn" data-action="temp-down" ${acOff ? 'disabled' : ''}>−</button>
        <div class="dial-temp">
          <span class="dial-val" id="arc-temp-val">${target}</span><span class="dial-unit">°C</span>
        </div>
        <button class="dial-btn" data-action="temp-up" ${acOff ? 'disabled' : ''}>+</button>
      </div>
    </div>
  </div>

  <!-- Stats -->
  <div class="stats">
    ${outdoorT ? `<span class="stat"><span class="stat-icon">☁</span>${outdoorT}°</span>` : ''}
    <span class="stat"><span class="stat-icon">🏠</span>${curTemp}°</span>
    ${humidity != null ? `<span class="stat"><span class="stat-icon">💧</span>${humidity}%</span>` : ''}
  </div>

  <div class="sep"></div>

  <!-- Tiles 2×2 -->
  <div class="tiles">
    <div class="tile${!acOff ? ' active' : ''}" data-action="open-mode">
      <span class="tile-lbl">Mode</span>
      <div class="tile-row">
        <span class="tile-val">${MODE_LABELS[mode] || mode}</span>
        <span class="tile-icon">${MODE_ICONS[mode] || ''}</span>
      </div>
    </div>
    <div class="tile${attrs.fan_mode && attrs.fan_mode !== 'auto' ? ' active' : ''}" data-action="open-fan">
      <span class="tile-lbl">Fan Speed</span>
      <div class="tile-row">
        <span class="tile-val">${fanLabel}</span>
        <span class="tile-icon">⟳</span>
      </div>
    </div>
    <div class="tile${airActive ? ' active' : ''}" data-action="open-airflow">
      <span class="tile-lbl">Airflow</span>
      <div class="tile-row">
        ${airIcon}
        <span class="tile-icon">↗</span>
      </div>
    </div>
    <div class="tile${breezeActive ? ' active' : ''}" data-action="open-breeze">
      <span class="tile-lbl">Breeze & Presets</span>
      <div class="tile-row">
        ${breezeTileHtml}
        <span class="tile-icon">〰</span>
      </div>
    </div>
  </div>

  <div class="sep"></div>

  <!-- Feature rows -->
  <div class="features">
    ${ecoAvail ? `
    <div class="feature">
      <div class="feature-ico">♻</div>
      <div class="feature-info">
        <div class="feature-name">iECO</div>
        <div class="feature-desc">Improves efficiency while maintaining comfort</div>
      </div>
      <button class="tog${ecoOn ? ' on' : ''}"
              data-action="toggle-preset" data-val="eco"></button>
    </div>` : ''}
    ${cfg.display ? `
    <div class="feature${displayUnavail ? ' unavail' : ''}">
      <div class="feature-ico">🖥</div>
      <div class="feature-info">
        <div class="feature-name">LED Display</div>
        ${displayUnavail ? '<div class="feature-desc">Unavailable — turn on AC first</div>' : ''}
      </div>
      <button class="tog${displayOn ? ' on' : ''}"
              data-action="toggle-switch" data-entity="${cfg.display}"
              ${displayUnavail ? 'disabled' : ''}></button>
    </div>` : ''}
    ${cfg.purifier ? `
    <div class="feature${purifierUnavail ? ' unavail' : ''}">
      <div class="feature-ico">🌿</div>
      <div class="feature-info">
        <div class="feature-name">Purifier</div>
        ${purifierUnavail ? '<div class="feature-desc">Unavailable — turn on AC first</div>' : ''}
      </div>
      <button class="tog${purifierOn ? ' on' : ''}"
              data-action="toggle-switch" data-entity="${cfg.purifier}"
              ${purifierUnavail ? 'disabled' : ''}></button>
    </div>` : ''}
  </div>

  <!-- Power button -->
  <div class="power-wrap">
    <button class="power-btn${!acOff ? ' on' : ''}" data-action="toggle-power">
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none"
           stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
        <path d="M12 3v9"/>
        <path d="M7.2 6.1A8 8 0 1 0 16.8 6.1"/>
      </svg>
    </button>
  </div>

  <!-- Overlay (closes any open sheet) -->
  <div class="overlay" id="overlay"></div>

  <!-- ── Mode sheet ── -->
  <div class="sheet" data-sheet="mode">
    <div class="sheet-handle"></div>
    <div class="sheet-title">Mode</div>
    ${this._modeSheetHtml(mode, attrs, mc)}
  </div>

  <!-- ── Fan Speed sheet ── -->
  <div class="sheet" data-sheet="fan">
    <div class="sheet-handle"></div>
    <div class="sheet-title">Fan Speed</div>
    ${this._fanSheetHtml(attrs)}
  </div>

  <!-- ── Airflow sheet ── -->
  <div class="sheet" data-sheet="airflow">
    <div class="sheet-handle"></div>
    <div class="sheet-title">Airflow</div>
    ${this._airflowSheetHtml(attrs, mc)}
  </div>

  <!-- ── Breeze & Presets sheet ── -->
  <div class="sheet" data-sheet="breeze">
    <div class="sheet-handle"></div>
    <div class="sheet-title">Breeze & Presets</div>
    ${this._breezeSheetHtml(attrs, mc, mode)}
  </div>

</div>`;
  }

  // ── Sheet HTML generators ────────────────────────────────────────────────

  _modeSheetHtml(currentMode, attrs, mc) {
    const available = (attrs.hvac_modes || ['cool','heat','dry','fan_only','auto'])
      .filter(m => m !== 'off');
    const btns = available.map(m => `
      <button class="mode-btn${m === currentMode ? ' active' : ''}"
              data-action="set-hvac-mode" data-val="${m}">
        <div class="mode-ico">${MODE_ICONS[m] || m}</div>
        ${MODE_LABELS[m] || m}
      </button>`).join('');
    return `<div class="mode-list">${btns}</div>`;
  }

  _fanSheetHtml(attrs) {
    const { _hass: hass, _config: cfg } = this;
    const isAuto      = attrs.fan_mode === 'auto';
    const fanSpeedEid = cfg.fan_speed;
    const fsEntity    = fanSpeedEid ? hass.states[fanSpeedEid] : null;
    const fsUnavail   = isUnavail(fsEntity);
    // Guard against 'unavailable' state value being coerced to NaN
    const fsRaw  = fsEntity && !fsUnavail ? +fsEntity.state : NaN;
    const fsVal  = isNaN(fsRaw) ? 50 : Math.min(Math.round(fsRaw), 100);
    const fsMin  = fsEntity?.attributes?.min ?? 1;
    const fsMax  = fsEntity?.attributes?.max ?? 100;
    // Slider is disabled when auto mode is active OR entity is unavailable
    const sliderDisabled = isAuto || fsUnavail;
    return `
    <div class="fan-auto-row">
      <span class="fan-auto-lbl">Auto</span>
      <button class="tog${isAuto ? ' on' : ''}" data-action="toggle-fan-auto"></button>
    </div>
    ${fanSpeedEid ? `
    <div class="${sliderDisabled ? 'dim' : ''}">
      <div class="slider-head">
        <span class="slider-lbl">Fan Speed</span>
        <span class="slider-val" id="fan-val">${fsUnavail ? 'Unavailable' : fsVal + '%'}</span>
      </div>
      <input type="range" id="fan-slider" data-action="fan-slider"
             min="${fsMin}" max="${fsMax}" value="${fsVal}"
             ${sliderDisabled ? 'disabled' : ''}>
      <div class="slider-ticks">
        <span>${fsMin}%</span><span>20%</span><span>40%</span>
        <span>60%</span><span>80%</span><span>${fsMax}%</span>
      </div>
    </div>` : `
    <p style="color:var(--secondary-text-color);font-size:13px;padding:4px 0">
      Set <code>fan_speed:</code> in the card config to enable the speed slider.
    </p>`}`;
  }

  _airflowSheetHtml(attrs, mc) {
    const { _hass: hass, _config: cfg } = this;
    const swingModes = attrs.swing_modes || [];
    const swingMode  = attrs.swing_mode  || 'off';
    const hOsc = swingMode === 'horizontal' || swingMode === 'both';
    const vOsc = swingMode === 'vertical'   || swingMode === 'both';
    // Only show oscillation pills for axes the device actually supports
    const canSwingH = swingModes.includes('horizontal') || swingModes.includes('both');
    const canSwingV = swingModes.includes('vertical')   || swingModes.includes('both');

    // Map select entity state → 0-based index  (pos_1→0 … pos_5→4, off→-1)
    const posIdx = s => s?.startsWith('pos_') ? parseInt(s.slice(4), 10) - 1 : -1;
    const hEid  = cfg.swing_h_angle;
    const vEid  = cfg.swing_v_angle;
    const hEnt  = hEid ? hass.states[hEid] : null;
    const vEnt  = vEid ? hass.states[vEid] : null;
    const hUnavail = isUnavail(hEnt);
    const vUnavail = isUnavail(vEnt);
    const hState = (!hEnt || hUnavail) ? 'off' : hEnt.state;
    const vState = (!vEnt || vUnavail) ? 'off' : vEnt.state;
    const hIdx  = posIdx(hState);
    const vIdx  = posIdx(vState);

    const makeRow = (louver, activeIdx, isOsc, isEntUnavail, action, offAction) => {
      // Dim the row if oscillating (positions meaningless) OR if the select entity is unavailable
      const dimmed = isOsc || isEntUnavail;
      const note   = isEntUnavail ? '<p class="no-items" style="font-size:11px;margin-top:4px">Unavailable — turn on AC first</p>' : '';
      const offBtn = `
        <button class="louver-off-btn${activeIdx === -1 && !isOsc ? ' active' : ''}"
                data-action="${offAction}">−</button>`;
      const posBtns = [0,1,2,3,4].map(i => `
        <button class="louver-btn${i === activeIdx ? ' active' : ''}"
                data-action="${action}" data-val="pos_${i+1}">
          ${louverSvg(louver, i, mc, 42)}
        </button>`).join('');
      return `<div class="louver-row${dimmed ? ' osc-active' : ''}">
        ${offBtn}${posBtns}
      </div>${note}`;
    };

    const oscPills = (canSwingH || canSwingV) ? `
    <div class="sheet-sec">Fan Direction</div>
    <div class="osc-row">
      ${canSwingV ? `<button class="osc-pill${vOsc ? ' active' : ''}" data-action="toggle-osc-v">${autoSwingVSvg(vOsc ? mc : '#888')} Up and Down</button>` : ''}
      ${canSwingH ? `<button class="osc-pill${hOsc ? ' active' : ''}" data-action="toggle-osc-h">${autoSwingHSvg(hOsc ? mc : '#888')} Left and Right</button>` : ''}
    </div>` : '';

    return `${oscPills}
    <div class="sheet-sec">Custom Direction</div>
    <div class="louver-axis-lbl">Horizontal ↔</div>
    ${hEid
      ? makeRow(LOUVER_H, hIdx, hOsc, hUnavail, 'set-h-angle', 'set-h-off')
      : '<p class="no-items">Configure <code>swing_h_angle</code> to enable.</p>'}
    <div class="louver-axis-lbl" style="margin-top:14px">Vertical ↕</div>
    ${vEid
      ? makeRow(LOUVER_V, vIdx, vOsc, vUnavail, 'set-v-angle', 'set-v-off')
      : '<p class="no-items">Configure <code>swing_v_angle</code> to enable.</p>'}`;
  }

  _breezeSheetHtml(attrs, mc, mode) {
    const { _hass: hass, _config: cfg } = this;
    const isCool = mode === 'cool';

    const breezeAwayEnt = cfg.breeze_away ? hass.states[cfg.breeze_away] : null;
    const breezelessEnt = cfg.breezeless  ? hass.states[cfg.breezeless]  : null;
    const breezeAwayUnavail = !isCool || isUnavail(breezeAwayEnt);
    const breezelessUnavail = !isCool || isUnavail(breezelessEnt);
    const breezeAwayOn = isCool && !isUnavail(breezeAwayEnt) && breezeAwayEnt?.state === 'on';
    const breezelessOn = isCool && !isUnavail(breezelessEnt) && breezelessEnt?.state === 'on';
    // "Normal" is active when neither breeze mode is on
    const normalOn     = !breezeAwayOn && !breezelessOn;

    const rateEid    = cfg.rate_select;
    const rateEnt    = rateEid ? hass.states[rateEid] : null;
    const rateUnavail = !isCool || isUnavail(rateEnt);
    // Only use rateState if the entity is available; default to 'off' otherwise
    const rateState  = (!rateUnavail && rateEnt) ? rateEnt.state : null;

    const presets   = attrs.preset_modes || [];
    const preset    = attrs.preset_mode  || 'none';

    const presetDefs = [
      { id: 'sleep', label: `${iconSvg('preset_sleep', 16)} Sleep` },
      { id: 'boost', label: `${iconSvg('preset_boost', 16)} Boost` },
      { id: 'away',  label: `${iconSvg('preset_away',  16)} Away`  },
    ];

    const presetPills = presetDefs.map(p => {
      const avail  = presets.includes(p.id);
      const active = preset === p.id;
      return `<button class="pill${active ? ' active' : ''}${!avail ? ' unavail' : ''}"
                      data-action="toggle-preset" data-val="${p.id}">${p.label}</button>`;
    }).join('');

    const hasBreeze = cfg.breeze_away || cfg.breezeless;
    return `
    ${hasBreeze ? `
    <div class="sheet-sec">Breeze Mode</div>
    <div class="pill-row">
      <button class="pill${normalOn ? ' active' : ''}" data-action="set-breeze-normal">${iconSvg('breeze_normal', 16)} Normal</button>
      ${cfg.breeze_away
        ? `<button class="pill${breezeAwayOn ? ' active' : ''}${breezeAwayUnavail ? ' unavail' : ''}"
                  data-action="set-breeze-away">${iconSvg('breeze_away', 16)} Breeze Away</button>` : ''}
      ${cfg.breezeless
        ? `<button class="pill${breezelessOn ? ' active' : ''}${breezelessUnavail ? ' unavail' : ''}"
                  data-action="set-breezeless">${iconSvg('breeze_less', 16)} Breezeless</button>` : ''}
    </div>
    ${!isCool
      ? '<p class="no-items" style="margin-top:-10px;margin-bottom:12px">Available in Cool mode only</p>'
      : (breezeAwayUnavail || breezelessUnavail)
        ? '<p class="no-items" style="margin-top:-10px;margin-bottom:12px">Breeze options unavailable — turn on AC first</p>'
        : ''}
    ` : ''}

    ${rateEid ? `
    <div class="sheet-sec">Output Rate</div>
    ${rateUnavail
      ? `<p class="no-items">${!isCool ? 'Available in Cool mode only' : 'Unavailable — turn on AC first'}</p>`
      : `<div class="pill-row">
          <button class="pill${rateState === 'off' ? ' active' : ''}"
                  data-action="set-rate" data-val="off">⊙ Full</button>
          <button class="pill${rateState === 'gear_75' ? ' active' : ''}"
                  data-action="set-rate" data-val="gear_75">75%</button>
          <button class="pill${rateState === 'gear_50' ? ' active' : ''}"
                  data-action="set-rate" data-val="gear_50">50%</button>
        </div>`}
    ` : ''}

    <div class="sheet-sec">Presets</div>
    <div class="pill-row">
      ${presetPills || '<span class="no-items">No presets in current mode</span>'}
    </div>`;
  }

  // ── Dial drag ────────────────────────────────────────────────────────────

  _bindDialEvents(svg) {
    svg.addEventListener('pointerdown', e => {
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      const climate = this._hass?.states[this._config?.entity];
      if (!climate || climate.state === 'off') return;
      e.preventDefault();
      svg.setPointerCapture(e.pointerId);
      svg.classList.add('dragging');
      this._dragging = true;
      this._applyDialPoint(e, svg);
    });

    svg.addEventListener('pointermove', e => {
      if (!this._dragging) return;
      this._applyDialPoint(e, svg);
    });

    const endDrag = e => {
      if (!this._dragging) return;
      this._dragging = false;
      svg.classList.remove('dragging');
      if (this._dragTemp != null) {
        const climate = this._hass.states[this._config.entity];
        this._call('climate', 'set_temperature', {
          entity_id: climate.entity_id,
          temperature: this._dragTemp,
        });
        this._dragTemp = null;
      }
    };
    svg.addEventListener('pointerup',     endDrag);
    svg.addEventListener('pointercancel', endDrag);
  }

  _applyDialPoint(e, svg) {
    const rect  = svg.getBoundingClientRect();
    const CX = 100, CY = 90;
    // Convert screen → SVG viewBox coordinates
    const px = (e.clientX - rect.left) * (200 / rect.width);
    const py = (e.clientY - rect.top)  * (155 / rect.height);
    // Angle 0° = top, increases clockwise
    let deg = Math.atan2(px - CX, -(py - CY)) * 180 / Math.PI;
    if (deg < 0) deg += 360;

    // Arc runs 240° → 480° (through 0°). Gap zone: [120°, 240°].
    if (deg >= 120 && deg < 240) return;
    const norm = deg < 120 ? deg + 360 : deg;  // [240, 480]
    const frac = Math.max(0, Math.min(1, (norm - 240) / 240));

    const attrs = this._hass.states[this._config.entity].attributes;
    const minT  = attrs.min_temp || 16;
    const maxT  = attrs.max_temp || 30;
    const temp  = Math.round((minT + frac * (maxT - minT)) * 2) / 2;

    if (temp === this._dragTemp) return;
    this._dragTemp = temp;
    this._updateDialArc(temp);
  }

  _updateDialArc(temp) {
    const s      = this.shadowRoot;
    const fillEl   = s.getElementById('arc-fill');
    const handleEl = s.getElementById('arc-handle');
    const valEl    = s.getElementById('arc-temp-val');
    if (!fillEl || !handleEl) return;

    const attrs  = this._hass.states[this._config.entity].attributes;
    const minT   = attrs.min_temp || 16;
    const maxT   = attrs.max_temp || 30;
    const frac   = Math.max(0, Math.min(1, (temp - minT) / (maxT - minT)));
    const CX = 100, CY = 90, R = 76;
    const ARC_START = 240, ARC_SWEEP = 240;
    const fillSweep = frac * ARC_SWEEP;
    const fp = fillSweep > 0.5 ? arcD(CX, CY, R, ARC_START, fillSweep) : '';

    if (fp) {
      fillEl.setAttribute('d', fp);
      fillEl.style.display = '';
    } else {
      fillEl.style.display = 'none';
    }
    const [hx, hy] = pt(CX, CY, R, ARC_START + (fillSweep < 0.5 ? 0 : fillSweep));
    handleEl.setAttribute('cx', String(hx));
    handleEl.setAttribute('cy', String(hy));

    if (valEl) {
      valEl.textContent = Number.isInteger(temp * 10)
        ? temp.toFixed(1)
        : temp.toFixed(1);
    }
  }

  // ── Sheet management ──────────────────────────────────────────────────────

  _openSheet(name) {
    this._sheet = name;
    const s = this.shadowRoot;
    const sheet   = s.querySelector(`.sheet[data-sheet="${name}"]`);
    const overlay = s.getElementById('overlay');
    sheet?.classList.add('open');
    overlay?.classList.add('open');

    // After the sheet animates in, scroll the page so the sheet bottom sits at
    // the bottom of the viewport — but only when the sheet isn't fully visible.
    if (sheet) {
      // Wait for the CSS transition to finish (sheet slides up in ~300 ms).
      // Use a one-shot flag so we never scroll on the close transition.
      const onTransitionEnd = (ev) => {
        // Only act on the transform transition of the opening animation
        if (ev.propertyName !== 'transform') return;
        sheet.removeEventListener('transitionend', onTransitionEnd);

        // Guard: if the sheet is no longer open by the time this fires, bail
        if (!sheet.classList.contains('open')) return;

        const rect     = sheet.getBoundingClientRect();
        const vpBottom = window.innerHeight;
        if (rect.top >= 0 && rect.bottom <= vpBottom) return; // fully visible

        const scrollBy = rect.bottom - vpBottom;
        if (scrollBy > 0) {
          window.scrollBy({ top: scrollBy, behavior: 'smooth' });
        }
      };
      sheet.addEventListener('transitionend', onTransitionEnd);
    }
  }

  _closeSheet() {
    this._sheet = null;
    const s = this.shadowRoot;
    s.querySelectorAll('.sheet.open').forEach(el => el.classList.remove('open'));
    s.getElementById('overlay')?.classList.remove('open');
  }

  // ── Click handling ────────────────────────────────────────────────────────

  _onClick(e) {
    // Find the closest ancestor in the composed path that has a data-action
    const actionEl = e.composedPath().find(
      el => el instanceof Element && el.dataset?.action
    );
    if (!actionEl) {
      // Tapping the overlay closes the sheet
      if (e.composedPath().includes(this.shadowRoot.getElementById('overlay'))) {
        this._closeSheet();
      }
      return;
    }

    const action = actionEl.dataset.action;
    const val    = actionEl.dataset.val;
    const eid    = actionEl.dataset.entity;

    const { _hass: hass, _config: cfg } = this;
    const climate = hass.states[cfg.entity];
    const cid     = climate.entity_id;
    const attrs   = climate.attributes;

    switch (action) {
      // ── Navigation ──────────────────────────────────────────────────────
      case 'open-mode':    this._openSheet('mode');    return;
      case 'open-fan':     this._openSheet('fan');     return;
      case 'open-airflow': this._openSheet('airflow'); return;
      case 'open-breeze':  this._openSheet('breeze');  return;

      // ── Temperature ──────────────────────────────────────────────────────
      case 'temp-up':
        this._call('climate', 'set_temperature', {
          entity_id: cid,
          temperature: +((attrs.temperature || 22) + 0.5).toFixed(1),
        }); break;
      case 'temp-down':
        this._call('climate', 'set_temperature', {
          entity_id: cid,
          temperature: +((attrs.temperature || 22) - 0.5).toFixed(1),
        }); break;

      // ── Self-clean ───────────────────────────────────────────────────────
      case 'start-self-clean':
        if (cfg.self_clean_btn) {
          this._call('button', 'press', { entity_id: cfg.self_clean_btn });
        }
        break;

      // ── Power ────────────────────────────────────────────────────────────
      case 'toggle-power':
        if (climate.state === 'off') {
          // Restore the last active mode; fall back to 'cool' if never seen one
          const restoreMode = this._lastMode || 'cool';
          this._call('climate', 'set_hvac_mode', { entity_id: cid, hvac_mode: restoreMode });
        } else {
          this._call('climate', 'set_hvac_mode', { entity_id: cid, hvac_mode: 'off' });
        }
        break;

      // ── Mode sheet ────────────────────────────────────────────────────────
      case 'set-hvac-mode':
        this._call('climate', 'set_hvac_mode', { entity_id: cid, hvac_mode: val });
        this._closeSheet();
        break;

      // ── Fan sheet ─────────────────────────────────────────────────────────
      case 'toggle-fan-auto': {
        let newFan;
        if (attrs.fan_mode === 'auto') {
          // Pick the first non-auto, non-custom mode available; fall back to 'medium'
          const fanModes = attrs.fan_modes || [];
          newFan = fanModes.find(m => m !== 'auto' && m !== 'custom') || 'medium';
        } else {
          newFan = 'auto';
        }
        this._call('climate', 'set_fan_mode', { entity_id: cid, fan_mode: newFan });
        break;
      }

      // ── Airflow sheet ─────────────────────────────────────────────────────
      case 'toggle-osc-h': {
        const sm = attrs.swing_mode || 'off';
        const swingModes = attrs.swing_modes || [];
        const canBoth = swingModes.includes('both');
        // Toggle H axis; combine with current V state if device supports 'both'
        let next;
        if (sm === 'horizontal')      next = 'off';
        else if (sm === 'both')       next = swingModes.includes('vertical') ? 'vertical' : 'off';
        else if (sm === 'vertical')   next = canBoth ? 'both' : 'horizontal';
        else                          next = 'horizontal';
        this._call('climate', 'set_swing_mode', { entity_id: cid, swing_mode: next });
        break;
      }
      case 'toggle-osc-v': {
        const sm = attrs.swing_mode || 'off';
        const swingModes = attrs.swing_modes || [];
        const canBoth = swingModes.includes('both');
        let next;
        if (sm === 'vertical')        next = 'off';
        else if (sm === 'both')       next = swingModes.includes('horizontal') ? 'horizontal' : 'off';
        else if (sm === 'horizontal') next = canBoth ? 'both' : 'vertical';
        else                          next = 'vertical';
        this._call('climate', 'set_swing_mode', { entity_id: cid, swing_mode: next });
        break;
      }
      case 'set-h-angle':
        if (cfg.swing_h_angle)
          this._call('select', 'select_option', { entity_id: cfg.swing_h_angle, option: val });
        break;
      case 'set-h-off':
        if (cfg.swing_h_angle)
          this._call('select', 'select_option', { entity_id: cfg.swing_h_angle, option: 'off' });
        break;
      case 'set-v-angle':
        if (cfg.swing_v_angle)
          this._call('select', 'select_option', { entity_id: cfg.swing_v_angle, option: val });
        break;
      case 'set-v-off':
        if (cfg.swing_v_angle)
          this._call('select', 'select_option', { entity_id: cfg.swing_v_angle, option: 'off' });
        break;

      // ── Breeze sheet ──────────────────────────────────────────────────────
      case 'set-breeze-normal':
        if (cfg.breeze_away) this._call('switch', 'turn_off', { entity_id: cfg.breeze_away });
        if (cfg.breezeless)  this._call('switch', 'turn_off', { entity_id: cfg.breezeless });
        break;
      case 'set-breeze-away':
        if (cfg.breeze_away) this._call('switch', 'turn_on',  { entity_id: cfg.breeze_away });
        if (cfg.breezeless)  this._call('switch', 'turn_off', { entity_id: cfg.breezeless });
        break;
      case 'set-breezeless':
        if (cfg.breezeless)  this._call('switch', 'turn_on',  { entity_id: cfg.breezeless });
        if (cfg.breeze_away) this._call('switch', 'turn_off', { entity_id: cfg.breeze_away });
        break;
      case 'set-rate':
        if (cfg.rate_select)
          this._call('select', 'select_option', { entity_id: cfg.rate_select, option: val });
        break;

      // ── Feature rows ──────────────────────────────────────────────────────
      case 'toggle-preset': {
        const cur  = attrs.preset_mode || 'none';
        const next = cur === val ? 'none' : val;
        this._call('climate', 'set_preset_mode', { entity_id: cid, preset_mode: next });
        break;
      }
      case 'toggle-switch':
        this._call('switch', 'toggle', { entity_id: eid });
        break;
    }
  }

  // ── Input handling (fan speed slider) ────────────────────────────────────

  _onInput(e) {
    if (e.target.id !== 'fan-slider') return;
    const v = e.target.value;
    const label = this.shadowRoot.getElementById('fan-val');
    if (label) label.textContent = v + '%';
    // Debounce: only call service 400 ms after user stops moving slider
    clearTimeout(this._fanTimer);
    this._fanTimer = setTimeout(() => {
      if (this._config.fan_speed)
        this._call('number', 'set_value', {
          entity_id: this._config.fan_speed,
          value: +v,
        });
    }, 400);
  }

  // ── Service call wrapper ─────────────────────────────────────────────────

  _call(domain, service, data) {
    this._hass.callService(domain, service, data);
  }
}

// ── Register ──────────────────────────────────────────────────────────────────
customElements.define(CARD_TAG, AcCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type:        CARD_TAG,
  name:        'Midea AC Card',
  description: 'Full-featured climate card inspired by the Midea app — thermostat dial, airflow with louver SVGs, breeze modes, presets.',
  preview:     true,
});
