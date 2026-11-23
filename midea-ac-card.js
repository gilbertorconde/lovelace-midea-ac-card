// =============================================================================
// Midea AC Control Card  v3.0.0
// Dark "Home" design: dial, mode, fan, airflow and comfort controls on one page.
//
// Install via HACS (search "Midea AC Card") or manually:
//   Place this file in:  /config/www/lovelace-midea-ac-card/midea-ac-card.js
//   Register as a Lovelace resource (type: module):
//     url: /local/lovelace-midea-ac-card/midea-ac-card.js
//
// Usage:
//   type: custom:midea-ac-card
//   entity: climate.living_room_ac
//
// All companion entity IDs are auto-derived from the climate entity name using
// the Midea AC LAN integration's standard naming convention, so the minimal
// config above is usually sufficient.
//
// Override any individual entity if its name differs (or set to null to disable):
//   indoor_temp:   sensor.living_room_ac_indoor_temperature   # auto-derived
//   outdoor_temp:  sensor.living_room_ac_outdoor_temperature  # auto-derived
//   power:         sensor.living_room_ac_power                # auto-derived
//   fan_speed:     number.living_room_ac_fan_speed            # auto-derived
//   display:       switch.living_room_ac_display              # auto-derived
//   breeze_away:   switch.living_room_ac_breeze_away          # auto-derived
//   breezeless:    switch.living_room_ac_breezeless           # auto-derived
//   purifier:      switch.living_room_ac_purifier             # auto-derived
//   swing_h_angle: select.living_room_ac_horizontal_swing_angle  # auto-derived
//   swing_v_angle: select.living_room_ac_vertical_swing_angle    # auto-derived
//   rate_select:   select.living_room_ac_rate_select          # auto-derived
//   filter_alert:  binary_sensor.living_room_ac_filter_alert  # auto-derived
//   power_on_timer:  number.living_room_ac_power_on_timer      # auto-derived
//   power_off_timer: number.living_room_ac_power_off_timer     # auto-derived
//
// Extended comfort entities (disabled-by-default in the integration; the
// "Comfort & Extras" sheet and its controls appear only for the ones you enable):
//   fresh_air:           switch.living_room_ac_fresh_air            # auto-derived
//   fresh_air_fan_speed: number.living_room_ac_fresh_air_fan_speed  # auto-derived
//   comfort_sleep:       switch.living_room_ac_comfort_sleep        # auto-derived
//   cosy_sleep_mode:     number.living_room_ac_cosy_sleep_mode      # auto-derived
//   night_light:         switch.living_room_ac_night_light          # auto-derived
//   pmv:                 switch.living_room_ac_pmv                  # auto-derived
//   power_save:          switch.living_room_ac_power_save           # auto-derived
//   low_frequency_fan:   switch.living_room_ac_low_frequency_fan    # auto-derived
//   ventilation:         switch.living_room_ac_ventilation          # auto-derived
//   anti_cold:           switch.living_room_ac_anti_cold            # auto-derived
//   diy:                 switch.living_room_ac_diy                  # auto-derived
//   smart_eye:           switch.living_room_ac_smart_eye            # auto-derived
//   reset_filter:           button.living_room_ac_reset_filter            # auto-derived
//   reset_fresh_air_filter: button.living_room_ac_reset_fresh_air_filter  # auto-derived
//
// Alerts & diagnostics (enable the integration's diagnostic entities to reveal
// the water-tank badge and the Diagnostics tile; all auto-derived):
//   flash:                       switch.living_room_ac_flash
//   cool_wind:                   binary_sensor.living_room_ac_cool_wind
//   natural_wind:                binary_sensor.living_room_ac_natural_wind
//   child_sleep:                 binary_sensor.living_room_ac_child_sleep
//   water_full:                  binary_sensor.living_room_ac_water_tank_full
//   outdoor_unit_power:          sensor.living_room_ac_outdoor_unit_power
//   compressor_frequency:        sensor.living_room_ac_compressor_frequency
//   target_compressor_frequency: sensor.living_room_ac_target_compressor_frequency
//   compressor_current:          sensor.living_room_ac_compressor_current
//   compressor_voltage:          sensor.living_room_ac_compressor_voltage
//   indoor_coil_temp:            sensor.living_room_ac_indoor_coil_temperature
//   outdoor_coil_temp:           sensor.living_room_ac_outdoor_coil_temperature
//   discharge_pipe_temp:         sensor.living_room_ac_discharge_pipe_temperature
//   outdoor_fan_speed:           sensor.living_room_ac_outdoor_fan_speed
//   indoor_fan_speed:            sensor.living_room_ac_indoor_fan_speed
//   target_indoor_fan_speed:     sensor.living_room_ac_target_indoor_fan_speed
//   water_pump:                  binary_sensor.living_room_ac_water_pump
//   louvers_h_angle:             sensor.living_room_ac_horizontal_louvers_angle
//   louvers_v_angle:             sensor.living_room_ac_vertical_louvers_angle
// =============================================================================

const CARD_TAG = 'midea-ac-card';

// ── Mode accent colours ───────────────────────────────────────────────────────
const MODE_COLORS = {
  cool:     '#3fa9ff',
  heat:     '#ff7a45',
  dry:      '#f5c542',
  fan_only: '#34d1a6',
  auto:     '#a78bfa',
  off:      '#8b93a3',
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
    const stroke = i === activeIdx ? color : 'rgba(255,255,255,.3)';
    const sw     = i === activeIdx ? '2'   : '1.5';
    return `<path d="${d}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round" fill="none"/>`;
  }).join('');
  return `<svg viewBox="0 0 30 30" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <rect ${data.rectAttrs} fill="none" stroke="rgba(255,255,255,.35)" stroke-width="1" stroke-linecap="square"/>
  ${paths}
</svg>`;
}

/** True when an entity state means it cannot be interacted with */
function isUnavail(entityState) {
  return !entityState || entityState.state === 'unavailable' || entityState.state === 'unknown';
}

/** Format a duration in minutes as a compact human string, e.g. 90 → "1h 30m". */
function fmtDuration(minutes) {
  const m = Math.round(minutes || 0);
  if (m <= 0) return 'Off';
  const h = Math.floor(m / 60);
  const mm = m % 60;
  if (h && mm) return `${h}h ${mm}m`;
  if (h) return `${h}h`;
  return `${mm}m`;
}

/** Read a timer number entity's value in minutes (0 when unset/unavailable). */
function timerMinutes(entityState) {
  if (isUnavail(entityState)) return 0;
  const v = +entityState.state;
  return isNaN(v) ? 0 : v;
}

// Preset durations (minutes) offered in the timer sheet
const TIMER_PRESETS = [0, 30, 60, 120, 240, 480];

// On/off comfort toggles surfaced in the "Comfort & Extras" sheet (config keys).
const EXTRAS_TOGGLE_KEYS = [
  'fresh_air', 'comfort_sleep', 'night_light', 'pmv', 'power_save',
  'low_frequency_fan', 'ventilation', 'anti_cold', 'diy', 'smart_eye',
];
// All keys whose presence reveals the Comfort & Extras tile (toggles + numbers + buttons).
const EXTRAS_KEYS = [
  ...EXTRAS_TOGGLE_KEYS, 'fresh_air_fan_speed', 'cosy_sleep_mode',
  'reset_filter', 'reset_fresh_air_filter',
];

// Display metadata for the comfort toggle rows: icon + friendly label + description.
const EXTRAS_TOGGLE_META = {
  fresh_air:         { icon: '🌬', name: 'Fresh Air',        desc: 'Draw in outside air' },
  comfort_sleep:     { icon: '🌙', name: 'Sleep Comfort',    desc: 'Gradual sleep temperature curve' },
  night_light:       { icon: '💡', name: 'Night Light',      desc: 'Unit indicator light' },
  pmv:               { icon: '🌡', name: 'PMV Comfort',       desc: 'Predicted-mean-vote comfort mode' },
  power_save:        { icon: '🔋', name: 'Power Save',        desc: 'Reduce power consumption' },
  low_frequency_fan: { icon: '🪶', name: 'Low-Frequency Fan', desc: 'Quieter low-frequency airflow' },
  ventilation:      { icon: '♻', name: 'Ventilation',       desc: 'Air exchange with outside' },
  anti_cold:         { icon: '❄', name: 'Anti-Cold',         desc: 'Prevent cold draft on start' },
  diy:               { icon: '🛠', name: 'DIY Mode',          desc: 'Custom user profile' },
  smart_eye:         { icon: '👁', name: 'Smart Eye',         desc: 'Occupancy / body sensing' },
};

// Diagnostic sensors (group 1/2/7/11 data). All disabled-by-default in the
// integration; the Diagnostics tile appears only when at least one is enabled.
const DIAG_SECTIONS = [
  { title: 'Outdoor Unit', rows: [
    { key: 'outdoor_unit_power',          name: 'Power draw' },
    { key: 'compressor_frequency',        name: 'Compressor frequency' },
    { key: 'target_compressor_frequency', name: 'Compressor target' },
    { key: 'compressor_current',          name: 'Compressor current' },
    { key: 'compressor_voltage',          name: 'Compressor voltage' },
    { key: 'outdoor_coil_temp',           name: 'Coil temperature' },
    { key: 'discharge_pipe_temp',         name: 'Discharge pipe' },
    { key: 'outdoor_fan_speed',           name: 'Fan speed' },
  ]},
  { title: 'Indoor Unit', rows: [
    { key: 'indoor_coil_temp',        name: 'Coil temperature' },
    { key: 'indoor_fan_speed',        name: 'Fan speed' },
    { key: 'target_indoor_fan_speed', name: 'Fan target' },
    { key: 'water_pump',              name: 'Water pump' },
  ]},
  { title: 'Louvers', rows: [
    { key: 'louvers_h_angle', name: 'Horizontal angle' },
    { key: 'louvers_v_angle', name: 'Vertical angle' },
  ]},
];
const DIAG_KEYS = DIAG_SECTIONS.flatMap(s => s.rows.map(r => r.key));

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
    power:             `sensor.${n}_power`,
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
    filter_alert:      `binary_sensor.${n}_filter_alert`,
    power_on_timer:    `number.${n}_power_on_timer`,
    power_off_timer:   `number.${n}_power_off_timer`,
    // Extended comfort features (disabled-by-default entities in the integration)
    fresh_air:           `switch.${n}_fresh_air`,
    fresh_air_fan_speed: `number.${n}_fresh_air_fan_speed`,
    comfort_sleep:       `switch.${n}_comfort_sleep`,
    cosy_sleep_mode:     `number.${n}_cosy_sleep_mode`,
    night_light:         `switch.${n}_night_light`,
    pmv:                 `switch.${n}_pmv`,
    power_save:          `switch.${n}_power_save`,
    low_frequency_fan:   `switch.${n}_low_frequency_fan`,
    ventilation:         `switch.${n}_ventilation`,
    anti_cold:           `switch.${n}_anti_cold`,
    diy:                 `switch.${n}_diy`,
    smart_eye:           `switch.${n}_smart_eye`,
    reset_filter:           `button.${n}_reset_filter`,
    reset_fresh_air_filter: `button.${n}_reset_fresh_air_filter`,
    // Flash (rapid cool/heat, formerly "jet cool")
    flash:                  `switch.${n}_flash`,
    // Read-only status binary sensors
    cool_wind:              `binary_sensor.${n}_cool_wind`,
    natural_wind:           `binary_sensor.${n}_natural_wind`,
    child_sleep:            `binary_sensor.${n}_child_sleep`,
    // Alerts
    water_full:             `binary_sensor.${n}_water_tank_full`,
    // Diagnostic sensors (groups 1/2/7/11; disabled-by-default in the integration)
    outdoor_unit_power:          `sensor.${n}_outdoor_unit_power`,
    compressor_frequency:        `sensor.${n}_compressor_frequency`,
    target_compressor_frequency: `sensor.${n}_target_compressor_frequency`,
    compressor_current:          `sensor.${n}_compressor_current`,
    compressor_voltage:          `sensor.${n}_compressor_voltage`,
    indoor_coil_temp:            `sensor.${n}_indoor_coil_temperature`,
    outdoor_coil_temp:           `sensor.${n}_outdoor_coil_temperature`,
    discharge_pipe_temp:         `sensor.${n}_discharge_pipe_temperature`,
    outdoor_fan_speed:           `sensor.${n}_outdoor_fan_speed`,
    indoor_fan_speed:            `sensor.${n}_indoor_fan_speed`,
    target_indoor_fan_speed:     `sensor.${n}_target_indoor_fan_speed`,
    water_pump:                  `binary_sensor.${n}_water_pump`,
    louvers_h_angle:             `sensor.${n}_horizontal_louvers_angle`,
    louvers_v_angle:             `sensor.${n}_vertical_louvers_angle`,
  };

  const resolved = { ...cfg };
  for (const [key, val] of Object.entries(defaults)) {
    if (!(key in resolved)) resolved[key] = val;
  }
  return resolved;
}


const VERSION = '3.0.0';

// Dial geometry (viewBox 260×206): a 270° arc open at the bottom.
const DIAL = { CX: 130, CY: 118, R: 96, START: 225, SWEEP: 270, W: 260, H: 206, TICKS: 40 };

const ACTION_LABELS = {
  heating: 'Heating', cooling: 'Cooling', drying: 'Drying', fan: 'Fan only',
  idle: 'Idle', off: 'Off', defrosting: 'Defrosting', preheating: 'Preheating',
};

const MODE_ORDER = ['cool', 'heat', 'dry', 'fan_only', 'auto'];
const MODE_VERBS = { cool: 'Cooling', heat: 'Heating', dry: 'Drying', fan_only: 'Fan only', auto: 'Auto' };
// hvac_modes in a natural order (unknown modes last), without 'off'.
function orderedModes(attrs) {
  const modes = (attrs.hvac_modes || MODE_ORDER).filter(m => m !== 'off');
  const rank = m => { const i = MODE_ORDER.indexOf(m); return i < 0 ? 99 : i; };
  return [...modes].sort((a, b) => rank(a) - rank(b));
}

const QUICK_DESC = {
  heat: 'warm up', cool: 'cool down', dry: 'dehumidify', fan_only: 'air only', auto: 'hold target',
};

const EXTRAS_ICONS = {
  fresh_air: 'mdi:weather-windy', comfort_sleep: 'mdi:sleep', night_light: 'mdi:lightbulb-night-outline',
  pmv: 'mdi:thermometer-check', power_save: 'mdi:battery-heart-outline',
  low_frequency_fan: 'mdi:fan-chevron-down', ventilation: 'mdi:hvac', anti_cold: 'mdi:snowflake-off',
  diy: 'mdi:tune-variant', smart_eye: 'mdi:eye-outline',
};

const STATUS_CHIPS = [
  ['cool_wind',    'mdi:snowflake-thermometer', 'Cool wind'],
  ['natural_wind', 'mdi:leaf',                  'Natural wind'],
  ['child_sleep',  'mdi:baby-face-outline',     'Child sleep'],
];

const FONT_URL = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
function loadFont() {
  if ([...document.head.querySelectorAll('link')].some(l => l.href === FONT_URL)) return;
  const l = document.createElement('link');
  l.rel = 'stylesheet';
  l.href = FONT_URL;
  document.head.appendChild(l);
}

const fmtT = v => (Math.round(v * 10) / 10).toFixed(1);
const ico = (name) => `<ha-icon icon="${name}"></ha-icon>`;

// ── Card class ────────────────────────────────────────────────────────────────
class AcCard extends HTMLElement {
  constructor() {
    super();
    this._hass     = null;
    this._config   = null;
    this._built    = false;
    this._dragging = false;   // dial or fan bars are being dragged: hold re-renders
    this._dragTemp = null;
    this._fanTimer = null;
    this._open     = new Set();  // keys of expanded <details> sections
    this._uid      = Math.random().toString(36).slice(2, 8);
  }

  static getStubConfig() { return { entity: 'climate.living_room_ac' }; }
  getCardSize() { return 9; }
  getGridOptions() { return { columns: 'full', min_columns: 6 }; }

  _entity(key) {
    const id = this._config?.[key];
    return id && this._hass ? (this._hass.states[id] || null) : null;
  }
  _present(key) { return !!this._entity(key); }

  setConfig(cfg) {
    if (!cfg.entity) throw new Error('midea-ac-card: entity is required');
    this._config = deriveEntities(cfg);
  }

  set hass(hass) {
    if (!this._config) return;
    const prev = this._hass;
    this._hass = hass;
    const cfg = this._config;
    const ids = Object.entries(cfg)
      .filter(([k, v]) => typeof v === 'string' && /^[a-z_]+\.[a-z0-9_]+$/.test(v) && k !== 'type')
      .map(([, v]) => v);
    if (this._dragging) return;
    if (prev && this._built && ids.every(id => prev.states[id] === hass.states[id])) return;
    if (!this._built) this._initShadow();
    this._render();
  }

  connectedCallback() {
    loadFont();
    if (this._hass && !this._built) { this._initShadow(); this._render(); }
  }

  _initShadow() {
    if (!this.shadowRoot) this.attachShadow({ mode: 'open' });
    this.shadowRoot.addEventListener('click', e => this._onClick(e));
    this.shadowRoot.addEventListener('input', e => this._onInput(e));
    // <details> toggle does not bubble; capture it to remember open sections.
    this.shadowRoot.addEventListener('toggle', e => {
      const k = e.target?.dataset?.k;
      if (!k) return;
      if (e.target.open) this._open.add(k); else this._open.delete(k);
    }, true);
    this._built = true;
  }

  _render() {
    if (!this._hass || !this._built) return;
    this.shadowRoot.innerHTML = `<style>${this._css()}</style>${this._html()}`;
    const dial = this.shadowRoot.querySelector('.dial-svg');
    if (dial) this._bindDialEvents(dial);
    const bars = this.shadowRoot.querySelector('.bars[data-drag]');
    if (bars) this._bindFanEvents(bars);
  }

  // ── CSS ─────────────────────────────────────────────────────────────────────
  _css() {
    return `
:host {
  --bg: #0b0d12; --bg2: #11141b; --surface: #161a22; --surface2: #1d222c; --line: rgba(255,255,255,.07);
  --text: #f2f3f5; --text2: #a9afbb; --text3: #737b8c;
  --heat: #ff7a45; --cool: #3fa9ff; --dry: #f5c542; --fan: #34d1a6; --auto: #a78bfa; --ok: #4ade80; --danger: #ff5c6c; --amber: #ffb347;
  display: block; container-type: inline-size; color: var(--text);
  font-family: Inter, Figtree, Roboto, system-ui, sans-serif; -webkit-font-smoothing: antialiased;
}
* { box-sizing: border-box; }
button { font: inherit; color: inherit; background: none; border: 0; padding: 0; cursor: pointer; }
button:disabled { cursor: default; }
ha-icon { --mdc-icon-size: 1em; display: inline-flex; }
.card { background: linear-gradient(180deg, rgba(255,255,255,.035), rgba(255,255,255,.012)), var(--bg2);
  border: 1px solid var(--line); border-radius: 26px; overflow: hidden; }
.label { font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: var(--text3); font-weight: 600; }

/* header */
.hd { display: flex; align-items: center; gap: 12px; padding: 18px 20px 0; }
.hd .ic { width: 42px; height: 42px; border-radius: 14px; display: grid; place-items: center; font-size: 22px; flex-shrink: 0;
  color: var(--mc); background: color-mix(in srgb, var(--mc) 15%, transparent); }
.hd .ht { flex: 1; min-width: 0; }
.hd h3 { margin: 0; font-size: 17px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hd p { margin: 1px 0 0; font-size: 12.5px; color: var(--text2); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hr { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
.iconbtn { width: 38px; height: 38px; border-radius: 12px; display: grid; place-items: center; font-size: 19px; color: var(--text2);
  background: rgba(255,255,255,.05); border: 1px solid var(--line); }
.iconbtn:hover { color: var(--text); }
.iconbtn.run { color: var(--fan); border-color: color-mix(in srgb, var(--fan) 45%, transparent); animation: pulse 1.6s ease-in-out infinite; }
.alert { height: 30px; padding: 0 10px; border-radius: 999px; display: inline-flex; align-items: center; gap: 5px; font-size: 12px; font-weight: 600;
  background: rgba(255,179,71,.14); color: var(--amber); }
.alert.water { background: rgba(63,169,255,.16); color: var(--cool); }
.power { width: 44px; height: 44px; border-radius: 50%; display: grid; place-items: center; font-size: 22px; background: var(--mc); color: #120a04;
  box-shadow: 0 0 0 6px color-mix(in srgb, var(--mc) 18%, transparent), 0 10px 30px -8px var(--mc); }
.power.off { background: rgba(255,255,255,.07); color: var(--text2); box-shadow: none; border: 1px solid var(--line); }
.status { display: flex; gap: 6px; flex-wrap: wrap; padding: 12px 20px 0; }
.status span { font-size: 12px; font-weight: 600; padding: 5px 10px; border-radius: 999px; background: rgba(255,255,255,.06); color: var(--text2);
  display: inline-flex; gap: 5px; align-items: center; }
@keyframes pulse { 50% { opacity: .55; } }

/* layout */
.body { display: grid; grid-template-columns: 1fr; gap: 18px; padding: 16px; }
@container (min-width: 660px) {
  .body { grid-template-columns: 320px minmax(0,1fr); gap: 22px; padding: 18px 20px 20px; }
  .left { position: sticky; top: 0; align-self: start; }
}
.left, .right { min-width: 0; }
.right { display: flex; flex-direction: column; gap: 16px; }
.blk .bh { display: flex; justify-content: space-between; align-items: baseline; gap: 10px; margin: 0 2px 8px; }
.blk .bh small { font-size: 12px; color: var(--text2); text-align: right; }

/* dial */
.dialbox { border-radius: 24px; padding: 16px 16px 14px; border: 1px solid var(--line);
  background: radial-gradient(260px 220px at 50% 36%, color-mix(in srgb, var(--mc) 22%, transparent), transparent 70%), var(--surface); }
.dial { position: relative; width: 100%; max-width: 270px; margin: 0 auto; aspect-ratio: ${DIAL.W} / ${DIAL.H}; }
.dial-svg { position: absolute; inset: 0; width: 100%; height: 100%; touch-action: none; cursor: grab; overflow: visible; }
.dial-svg.dragging { cursor: grabbing; }
.dial .ctr { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; padding-top: 8px; pointer-events: none; }
.dial .act { font-size: 11px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--mc); margin-bottom: 4px; }
.dial .set { font-size: 60px; font-weight: 300; letter-spacing: -.04em; line-height: 1; }
.dial .set sup { font-size: 20px; color: var(--text2); vertical-align: top; position: relative; top: 8px; margin-left: 2px; }
.dial .now { font-size: 12.5px; color: var(--text2); margin-top: 6px; display: flex; gap: 5px; align-items: center; }
.off .dial-svg { cursor: default; }
.steps { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin: 10px 4px 0; }
.step { width: 64px; height: 42px; border-radius: 14px; display: grid; place-items: center; font-size: 22px;
  background: rgba(255,255,255,.06); border: 1px solid var(--line); }
.step:hover { background: rgba(255,255,255,.1); }
.steps span { font-size: 12px; color: var(--text3); }
.stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(0, 1fr)); gap: 8px; margin-top: 14px; }
.stat { border-radius: 14px; background: rgba(0,0,0,.25); padding: 9px 10px; min-width: 0; }
.stat span { font-size: 11px; color: var(--text3); display: flex; gap: 4px; align-items: center; white-space: nowrap; }
.stat b { display: block; font-size: 15px; font-weight: 600; margin-top: 2px; white-space: nowrap; }

/* segmented mode control */
.seg { display: grid; grid-auto-flow: column; grid-auto-columns: 1fr; gap: 6px; background: rgba(0,0,0,.28); padding: 5px; border-radius: 16px; }
.seg button { padding: 9px 0 8px; border-radius: 12px; font-size: 12px; font-weight: 600; color: var(--text2);
  display: flex; flex-direction: column; align-items: center; gap: 4px; min-width: 0; }
.seg button svg { width: 20px; height: 20px; }
.seg button:hover { color: var(--text); background: rgba(255,255,255,.04); }
.seg button.on { background: var(--mc); color: #140a03; }
.seg .m-cool svg { color: var(--cool); } .seg .m-heat svg { color: var(--heat); } .seg .m-dry svg { color: var(--dry); }
.seg .m-fan_only svg { color: var(--fan); } .seg .m-auto svg { color: var(--auto); }
.seg button.on svg { color: inherit; }
.seg.sm button { flex-direction: row; justify-content: center; gap: 6px; padding: 8px 0; font-size: 12.5px; }

/* fan bars */
.fan { display: flex; gap: 10px; align-items: stretch; }
.bars { flex: 1; display: flex; gap: 5px; align-items: flex-end; height: 48px; padding: 6px; border-radius: 16px; background: rgba(0,0,0,.28);
  touch-action: none; cursor: pointer; }
.bars span { flex: 1; border-radius: 6px; background: rgba(255,255,255,.08); transition: background .15s; }
.bars span.on { background: linear-gradient(180deg, color-mix(in srgb, var(--mc) 85%, white), var(--mc)); }
.bars.auto span.on { background: color-mix(in srgb, var(--mc) 35%, transparent); }
.bars.dis { opacity: .4; cursor: default; }

/* chips */
.chipbtn { height: 40px; padding: 0 14px; border-radius: 14px; font-size: 12.5px; font-weight: 600; display: inline-flex; align-items: center; gap: 7px;
  background: rgba(255,255,255,.05); border: 1px solid var(--line); color: var(--text2); white-space: nowrap; }
.chipbtn ha-icon, .chipbtn svg { font-size: 17px; flex-shrink: 0; }
.chipbtn:hover:not(:disabled) { color: var(--text); }
.chipbtn.on { background: color-mix(in srgb, var(--mc) 18%, transparent); border-color: color-mix(in srgb, var(--mc) 45%, transparent); color: var(--text); }
.chipbtn.on ha-icon, .chipbtn.on svg { color: var(--mc); }
.chipbtn:disabled { opacity: .35; }
.fan .chipbtn { height: auto; }
.chips { display: flex; gap: 8px; flex-wrap: wrap; }

/* airflow */
.air { display: grid; grid-template-columns: 1fr; gap: 10px; }
@container (min-width: 900px) { .air { grid-template-columns: 1fr 1fr; } }
@container (min-width: 480px) and (max-width: 659px) { .air { grid-template-columns: 1fr 1fr; } }
.louver { border-radius: 16px; background: rgba(0,0,0,.28); padding: 10px 12px; display: flex; flex-direction: column; gap: 8px; min-width: 0; }
.louver .lh { display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: var(--text2); font-weight: 600; }
.sw { font-size: 11.5px; font-weight: 700; height: 26px; padding: 0 10px; border-radius: 999px; background: rgba(255,255,255,.06); color: var(--text3);
  display: inline-flex; gap: 4px; align-items: center; }
.sw.on { background: color-mix(in srgb, var(--mc) 22%, transparent); color: var(--mc); }
.pos { display: grid; grid-template-columns: repeat(5, 1fr); gap: 5px; }
.pos button { height: 36px; border-radius: 10px; background: rgba(255,255,255,.04); display: grid; place-items: center; }
.pos button:hover:not(:disabled) { background: rgba(255,255,255,.08); }
.pos button.on { background: color-mix(in srgb, var(--mc) 20%, transparent); outline: 1px solid color-mix(in srgb, var(--mc) 50%, transparent); }
.louver.dim .pos { opacity: .35; }
.note { font-size: 11.5px; color: var(--text3); margin: 0; }

/* toggles */
.tg { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 10px; }
.tog { border-radius: 16px; padding: 12px; background: var(--surface); border: 1px solid var(--line); display: flex; flex-direction: column; gap: 10px; text-align: left; }
.tog .t1 { display: flex; justify-content: space-between; align-items: center; }
.tog .t1 ha-icon { font-size: 20px; color: var(--text3); }
.tog b { font-size: 13px; font-weight: 600; display: block; } .tog small { font-size: 11.5px; color: var(--text3); display: block; margin-top: 1px; }
.tog.on .t1 ha-icon { color: var(--mc); }
.tog:disabled { opacity: .45; }
.sx { width: 36px; height: 21px; border-radius: 999px; background: rgba(255,255,255,.12); position: relative; flex-shrink: 0; transition: background .2s; }
.sx::after { content: ""; position: absolute; top: 3px; left: 3px; width: 15px; height: 15px; border-radius: 50%; background: #cfd3db; transition: left .2s; }
.tog.on .sx { background: var(--mc); } .tog.on .sx::after { left: 18px; background: #fff; }

/* off state */
.offhero { border-radius: 24px; background: var(--surface); border: 1px solid var(--line); padding: 22px 18px; text-align: center; }
.offhero .big { font-size: 58px; font-weight: 300; letter-spacing: -.04em; line-height: 1; margin-top: 6px; }
.offhero .big sup { font-size: 20px; color: var(--text2); vertical-align: top; position: relative; top: 6px; }
.offhero p { margin: 8px 0 0; color: var(--text2); font-size: 13px; }
.quick { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 10px; }
.qk { border-radius: 18px; padding: 13px; display: flex; gap: 12px; align-items: center; background: var(--surface); border: 1px solid var(--line); text-align: left; }
.qk:hover { border-color: color-mix(in srgb, var(--qc) 45%, transparent); }
.qk .q { width: 40px; height: 40px; border-radius: 13px; display: grid; place-items: center; flex-shrink: 0;
  color: var(--qc); background: color-mix(in srgb, var(--qc) 16%, transparent); }
.qk .q svg { width: 22px; height: 22px; }
.qk b { font-size: 14px; font-weight: 600; display: block; } .qk small { font-size: 12px; color: var(--text2); }

/* expandable sections */
details { border-radius: 16px; background: var(--surface); border: 1px solid var(--line); }
summary { list-style: none; cursor: pointer; padding: 13px 14px; display: flex; align-items: center; gap: 10px; font-size: 13px; font-weight: 600; }
summary::-webkit-details-marker { display: none; }
summary ha-icon { font-size: 18px; color: var(--text3); }
summary small { margin-left: auto; color: var(--text3); font-weight: 500; font-size: 12px; }
summary .chev { margin-left: 6px; transition: transform .2s; }
details[open] summary .chev { transform: rotate(180deg); }
.dc { padding: 0 14px 14px; display: flex; flex-direction: column; gap: 12px; }
.dc .tog { background: rgba(255,255,255,.03); }
.diag { display: grid; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); gap: 6px 16px; }
.diag div { display: flex; justify-content: space-between; gap: 10px; font-size: 12.5px; padding: 6px 0; border-bottom: 1px solid var(--line); }
.diag span { color: var(--text2); } .diag b { font-weight: 600; }
.range { display: flex; align-items: center; gap: 12px; font-size: 12.5px; color: var(--text2); }
.range input { flex: 1; accent-color: var(--mc); }
.err { padding: 16px; color: var(--danger); }
`;
  }

  // ── HTML ────────────────────────────────────────────────────────────────────
  _html() {
    const { _hass: hass, _config: cfg } = this;
    const entity = hass.states[cfg.entity];
    if (!entity) return `<div class="card err">Entity not found: ${cfg.entity}</div>`;

    const mode  = entity.state;
    const attrs = entity.attributes;
    const acOff = mode === 'off' || mode === 'unavailable';
    const mc    = MODE_COLORS[mode] || MODE_COLORS.off;
    const target = attrs.temperature != null ? +attrs.temperature : null;
    const fanLabel = FAN_LABELS[attrs.fan_mode] || attrs.fan_mode || '';
    const name = cfg.name || attrs.friendly_name || cfg.entity;

    let sub;
    if (mode === 'unavailable') sub = 'Unavailable';
    else if (acOff) sub = `Off${target != null ? ` · target ${fmtT(target)}°` : ''}`;
    else if (mode === 'fan_only') sub = `Fan only${fanLabel ? ` · fan ${fanLabel.toLowerCase()}` : ''}`;
    else sub = `${MODE_VERBS[mode] || MODE_LABELS[mode] || mode}${target != null && mode !== 'dry' ? ` to ${fmtT(target)}°` : ''}${fanLabel ? ` · fan ${fanLabel.toLowerCase()}` : ''}`;

    // Alerts and header buttons
    const alerts = [
      this._entity('filter_alert')?.state === 'on' ? `<span class="alert" title="Filter needs cleaning">${ico('mdi:air-filter')}Filter</span>` : '',
      this._entity('water_full')?.state === 'on' ? `<span class="alert water" title="Water tank full — empty the tank">${ico('mdi:water-alert')}Tank full</span>` : '',
    ].join('');
    const hasClean = this._present('self_clean_btn') || this._present('self_clean_sensor');
    const cleaning = this._entity('self_clean_sensor')?.state === 'on';
    const statusChips = STATUS_CHIPS.filter(([k]) => this._entity(k)?.state === 'on')
      .map(([, i, l]) => `<span>${ico(i)}${l}</span>`).join('');

    return `
<div class="card ${acOff ? 'off' : ''}" style="--mc:${mc}">
  <div class="hd">
    <div class="ic">${ico('mdi:air-conditioner')}</div>
    <div class="ht"><h3>${name}</h3><p>${sub}</p></div>
    <div class="hr">
      ${alerts}
      ${hasClean ? `<button class="iconbtn${cleaning ? ' run' : ''}" data-action="start-self-clean" title="${cleaning ? 'Self-clean running…' : 'Start self-clean'}">${ico('mdi:shimmer')}</button>` : ''}
      <button class="power${acOff ? ' off' : ''}" data-action="toggle-power" title="${acOff ? 'Turn on (last mode)' : 'Turn off'}">${ico('mdi:power')}</button>
    </div>
  </div>
  ${statusChips ? `<div class="status">${statusChips}</div>` : ''}
  <div class="body">
    ${acOff ? this._offHtml(attrs) : this._onHtml(entity, mc)}
  </div>
</div>`;
  }

  _statsHtml(attrs, withInside = true) {
    const cfg = this._config;
    const out = this._entity('outdoor_temp');
    const outT = out && !isUnavail(out) && isFinite(+out.state) ? `${fmtT(+out.state)}°` : null;
    const cur = attrs.current_temperature != null ? `${fmtT(+attrs.current_temperature)}°` : null;
    const hum = attrs.current_humidity != null ? `${Math.round(attrs.current_humidity)}%` : null;
    // Group 4 power sensor first, outdoor-unit power as the fallback.
    const pMain = this._entity('power');
    const pEnt = (!isUnavail(pMain) && isFinite(+pMain?.state)) ? pMain
      : (cfg.outdoor_unit_power ? this._hass.states[cfg.outdoor_unit_power] : null);
    const pNum = (!isUnavail(pEnt) && pEnt && isFinite(+pEnt.state)) ? +pEnt.state : null;
    const pUnit = pEnt?.attributes?.unit_of_measurement || 'W';
    const pow = pNum == null ? null : `${/^kw$/i.test(pUnit) ? pNum.toFixed(1) : Math.round(pNum)} ${pUnit}`;
    const cells = [
      outT && ['mdi:weather-partly-cloudy', 'Outside', outT],
      withInside && cur && ['mdi:home-outline', 'Inside', cur],
      hum && ['mdi:water-outline', 'Humidity', hum],
      pow && ['mdi:flash-outline', 'Power', pow],
    ].filter(Boolean);
    if (!cells.length) return '';
    return `<div class="stats">${cells.map(([i, l, v]) => `<div class="stat"><span>${ico(i)}${l}</span><b>${v}</b></div>`).join('')}</div>`;
  }

  _dialSvg(temp, minT, maxT, mc) {
    const { CX, CY, R, START, SWEEP, TICKS, W, H } = DIAL;
    const frac = Math.max(0, Math.min(1, (temp - minT) / (maxT - minT)));
    const end = frac * SWEEP;
    const gid = `acg-${this._uid}`;
    let ticks = '';
    for (let i = 0; i <= TICKS; i++) {
      const a = START + SWEEP * i / TICKS;
      const major = i % 5 === 0;
      const [x1, y1] = pt(CX, CY, R + 14, a);
      const [x2, y2] = pt(CX, CY, R + (major ? 20 : 18), a);
      const lit = SWEEP * i / TICKS <= end + 0.01;
      ticks += `<line class="tk" data-f="${i / TICKS}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${lit ? mc : 'rgba(255,255,255,.14)'}" stroke-width="${major ? 1.6 : 1}" stroke-linecap="round" opacity="${lit ? .8 : 1}"/>`;
    }
    const [hx, hy] = pt(CX, CY, R, START + end);
    return `<svg class="dial-svg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="${gid}" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="${mc}" stop-opacity=".55"/><stop offset="1" stop-color="${mc}"/></linearGradient></defs>
      ${ticks}
      <path d="${arcD(CX, CY, R, START, SWEEP)}" fill="none" stroke="rgba(255,255,255,.07)" stroke-width="16" stroke-linecap="round"/>
      <path id="arc-fill" d="${arcD(CX, CY, R, START, end)}" fill="none" stroke="url(#${gid})" stroke-width="16" stroke-linecap="round" style="filter:drop-shadow(0 0 8px ${mc})${end < 0.5 ? ';display:none' : ''}"/>
      <circle id="arc-handle" cx="${hx}" cy="${hy}" r="12" fill="#fff" stroke="${mc}" stroke-width="4"/>
    </svg>`;
  }

  _onHtml(entity, mc) {
    const attrs = entity.attributes;
    const mode = entity.state;
    const target = attrs.temperature != null ? +attrs.temperature : 22;
    const minT = attrs.min_temp || 16, maxT = attrs.max_temp || 30;
    const act = ACTION_LABELS[attrs.hvac_action] || MODE_VERBS[mode] || MODE_LABELS[mode] || mode;
    const cur = attrs.current_temperature != null ? `${fmtT(+attrs.current_temperature)}° now` : '';

    const left = `
    <div class="left"><div class="dialbox">
      <div class="dial">
        ${this._dialSvg(target, minT, maxT, mc)}
        <div class="ctr">
          <div class="act">${act}</div>
          <div class="set"><span id="arc-temp-val">${fmtT(target)}</span><sup>°C</sup></div>
          ${cur ? `<div class="now">${ico('mdi:home-thermometer-outline')} ${cur}</div>` : ''}
        </div>
      </div>
      <div class="steps">
        <button class="step" data-action="temp-down" title="−0.5°">${ico('mdi:minus')}</button>
        <span>${minT}–${maxT}° · 0.5° steps</span>
        <button class="step" data-action="temp-up" title="+0.5°">${ico('mdi:plus')}</button>
      </div>
      ${this._statsHtml(attrs)}
    </div></div>`;

    return `${left}
    <div class="right">
      ${this._modeHtml(attrs, mode)}
      ${this._fanHtml(attrs)}
      ${this._airflowHtml(attrs, mc)}
      ${this._comfortHtml(attrs, mode)}
      ${this._togglesHtml(attrs)}
      ${this._timerHtml(false)}
      ${this._extrasHtml()}
      ${this._diagHtml()}
    </div>`;
  }

  _offHtml(attrs) {
    const cur = attrs.current_temperature != null ? fmtT(+attrs.current_temperature) : '—';
    const target = attrs.temperature != null ? `Target ${fmtT(+attrs.temperature)}°` : '';
    const modes = orderedModes(attrs);
    const quick = modes.map(m => `
      <button class="qk" style="--qc:${MODE_COLORS[m] || MODE_COLORS.off}" data-action="set-hvac-mode" data-val="${m}">
        <span class="q">${MODE_ICONS[m] || ''}</span>
        <span><b>${MODE_LABELS[m] || m}</b><small>${QUICK_DESC[m] || ''}</small></span>
      </button>`).join('');
    return `
    <div class="left">
      <div class="offhero">
        <div class="label">Room now</div>
        <div class="big">${cur}<sup>°C</sup></div>
        ${target ? `<p>${target}</p>` : ''}
        ${this._statsHtml(attrs, false)}
      </div>
    </div>
    <div class="right">
      <div class="blk"><div class="bh"><span class="label">Start</span><small>power button resumes the last mode</small></div>
        <div class="quick">${quick}</div></div>
      ${this._timerHtml(true)}
      ${this._togglesHtml(attrs)}
      ${this._extrasHtml()}
      ${this._diagHtml()}
    </div>`;
  }

  _modeHtml(attrs, mode) {
    const modes = orderedModes(attrs);
    return `<div class="blk"><div class="bh"><span class="label">Mode</span></div>
      <div class="seg">${modes.map(m => `
        <button class="m-${m}${m === mode ? ' on' : ''}" data-action="set-hvac-mode" data-val="${m}">${MODE_ICONS[m] || ''}${MODE_LABELS[m] || m}</button>`).join('')}
      </div></div>`;
  }

  // Fan: 10 bars. With a fan_speed number entity a drag/tap sets the exact %;
  // otherwise the bar position picks the nearest named fan mode.
  _fanModesNamed(attrs) {
    return (attrs.fan_modes || []).filter(m => m !== 'auto' && m !== 'custom');
  }
  _fanPct(attrs) {
    const fs = this._entity('fan_speed');
    if (fs && !isUnavail(fs) && isFinite(+fs.state)) return Math.round(+fs.state);
    const named = this._fanModesNamed(attrs);
    const i = named.indexOf(attrs.fan_mode);
    return i < 0 ? 0 : Math.round((i + 1) / named.length * 100);
  }
  _fanLabel(attrs, pct) {
    if (attrs.fan_mode === 'auto') return 'Auto';
    const fs = this._entity('fan_speed');
    const lbl = FAN_LABELS[attrs.fan_mode] || attrs.fan_mode || '';
    return fs && !isUnavail(fs) ? `${lbl} · ${pct}%` : lbl;
  }
  _barsHtml(pct) {
    return Array.from({ length: 10 }, (_, i) =>
      `<span style="height:${28 + i * 8}%" class="${(i + 1) * 10 <= pct + 5 ? 'on' : ''}"></span>`).join('');
  }
  _fanHtml(attrs) {
    if (!(attrs.fan_modes || []).length) return '';
    const auto = attrs.fan_mode === 'auto';
    const pct = auto ? 0 : this._fanPct(attrs);
    const hasAuto = (attrs.fan_modes || []).includes('auto');
    return `<div class="blk"><div class="bh"><span class="label">Fan speed</span><small id="fan-lbl">${this._fanLabel(attrs, pct)}${auto ? ' · tap the bars to set a speed' : ''}</small></div>
      <div class="fan">
        <div class="bars${auto ? ' auto' : ''}" data-drag>${this._barsHtml(pct)}</div>
        ${hasAuto ? `<button class="chipbtn${auto ? ' on' : ''}" data-action="toggle-fan-auto">${ico('mdi:fan-auto')}Auto</button>` : ''}
      </div></div>`;
  }

  _airflowHtml(attrs, mc) {
    const swingModes = attrs.swing_modes || [];
    const sm = attrs.swing_mode || 'off';
    const hOsc = sm === 'horizontal' || sm === 'both';
    const vOsc = sm === 'vertical' || sm === 'both';
    const canH = swingModes.includes('horizontal') || swingModes.includes('both');
    const canV = swingModes.includes('vertical') || swingModes.includes('both');
    const hEnt = this._entity('swing_h_angle'), vEnt = this._entity('swing_v_angle');
    if (!canH && !canV && !hEnt && !vEnt) return '';
    const idx = s => s?.startsWith('pos_') ? parseInt(s.slice(4), 10) - 1 : -1;

    const group = (axis) => {
      const v = axis === 'v';
      const ent = v ? vEnt : hEnt;
      const can = v ? canV : canH;
      const osc = v ? vOsc : hOsc;
      if (!ent && !can) return '';
      const unavail = ent && isUnavail(ent);
      const cur = ent && !unavail ? idx(ent.state) : -1;
      const pos = ent ? `<div class="pos">${[0, 1, 2, 3, 4].map(i => `
        <button class="${i === cur ? 'on' : ''}" ${unavail || osc ? 'disabled' : ''}
          data-action="${i === cur ? `set-${axis === 'v' ? 'v' : 'h'}-off` : `set-${axis === 'v' ? 'v' : 'h'}-angle`}" data-val="pos_${i + 1}"
          title="${i === cur ? 'Release' : `Position ${i + 1}`}">${louverSvg(v ? LOUVER_V : LOUVER_H, i, mc, 26)}</button>`).join('')}</div>` : '';
      return `<div class="louver${osc || unavail ? ' dim' : ''}">
        <div class="lh">${v ? 'Up / down' : 'Left / right'}
          ${can ? `<button class="sw${osc ? ' on' : ''}" data-action="toggle-osc-${axis}">${ico(v ? 'mdi:swap-vertical' : 'mdi:swap-horizontal')}${osc ? 'Swinging' : 'Swing'}</button>` : ''}</div>
        ${pos}
        ${unavail && !osc ? '<p class="note">Unavailable right now</p>' : ''}
      </div>`;
    };

    const desc = sm === 'both' ? 'Swinging both ways'
      : sm === 'vertical' ? 'Swinging up and down'
      : sm === 'horizontal' ? 'Swinging left and right'
      : 'Tap a position again to release it';
    const hNow = this._fmtSensor('louvers_h_angle'), vNow = this._fmtSensor('louvers_v_angle');
    const actual = (hNow || vNow) ? `<p class="note">Louvers now:${vNow ? ` ↕ ${vNow}` : ''}${hNow ? ` ↔ ${hNow}` : ''}</p>` : '';
    return `<div class="blk"><div class="bh"><span class="label">Airflow</span><small>${desc}</small></div>
      <div class="air">${group('v')}${group('h')}</div>${actual}</div>`;
  }

  _comfortHtml(attrs, mode) {
    const isCool = mode === 'cool';
    const presets = attrs.preset_modes || [];
    const preset = attrs.preset_mode || 'none';
    const chips = [];
    for (const [id, icon, lbl] of [['sleep', 'preset_sleep', 'Sleep'], ['boost', 'preset_boost', 'Boost'], ['away', 'preset_away', 'Away']]) {
      if (!presets.includes(id)) continue;
      chips.push(`<button class="chipbtn${preset === id ? ' on' : ''}" data-action="toggle-preset" data-val="${id}">${iconSvg(icon, 17)}${lbl}</button>`);
    }
    let coolOnly = false;
    const brz = (key, icon, lbl, action) => {
      const ent = this._entity(key);
      if (!ent) return;
      coolOnly = true;
      const on = isCool && !isUnavail(ent) && ent.state === 'on';
      const dis = !isCool || isUnavail(ent);
      chips.push(`<button class="chipbtn${on ? ' on' : ''}" ${dis ? 'disabled' : ''} data-action="${on ? 'set-breeze-normal' : action}">${iconSvg(icon, 17)}${lbl}</button>`);
    };
    brz('breeze_away', 'breeze_away', 'Breeze away', 'set-breeze-away');
    brz('breezeless', 'breeze_less', 'Breezeless', 'set-breezeless');
    const rate = this._entity('rate_select');
    if (rate) {
      coolOnly = true;
      const dis = !isCool || isUnavail(rate);
      for (const [v, l] of [['gear_75', 'Rate 75%'], ['gear_50', 'Rate 50%']]) {
        const on = !dis && rate.state === v;
        chips.push(`<button class="chipbtn${on ? ' on' : ''}" ${dis ? 'disabled' : ''} data-action="set-rate" data-val="${on ? 'off' : v}">${ico('mdi:gauge')}${l}</button>`);
      }
    }
    if (!chips.length) return '';
    return `<div class="blk"><div class="bh"><span class="label">Comfort</span>${coolOnly && !isCool ? '<small>Breeze and output rate work in Cool only</small>' : ''}</div>
      <div class="chips">${chips.join('')}</div></div>`;
  }

  _togHtml({ icon, name, desc, on, dis, action, entity, val }) {
    return `<button class="tog${on ? ' on' : ''}" ${dis ? 'disabled' : ''} data-action="${action}"${entity ? ` data-entity="${entity}"` : ''}${val ? ` data-val="${val}"` : ''}>
      <span class="t1">${ico(icon)}<span class="sx"></span></span>
      <span><b>${name}</b>${desc ? `<small>${desc}</small>` : ''}</span></button>`;
  }

  _togglesHtml(attrs) {
    const cfg = this._config;
    const items = [];
    if ((attrs.preset_modes || []).includes('eco')) {
      items.push(this._togHtml({ icon: 'mdi:leaf', name: 'iECO', desc: 'Saves energy', on: attrs.preset_mode === 'eco', action: 'toggle-preset', val: 'eco' }));
    }
    for (const [key, icon, name, desc] of [
      ['display', 'mdi:monitor-small', 'Display', 'Unit LEDs'],
      ['purifier', 'mdi:air-purifier', 'Purifier', 'Ionizer'],
      ['flash', 'mdi:rocket-launch-outline', 'Flash', 'Rapid cool / heat'],
    ]) {
      const ent = this._entity(key);
      if (!ent) continue;
      const un = isUnavail(ent);
      items.push(this._togHtml({ icon, name, desc: un ? 'Needs the AC on' : desc, on: !un && ent.state === 'on', dis: un, action: 'toggle-switch', entity: cfg[key] }));
    }
    return items.length ? `<div class="tg">${items.join('')}</div>` : '';
  }

  _timerHtml(acOff) {
    const key = acOff ? 'power_on_timer' : 'power_off_timer';
    const ent = this._entity(key);
    if (!ent) return '';
    const cur = timerMinutes(ent);
    const action = acOff ? 'set-on-timer' : 'set-off-timer';
    const chips = TIMER_PRESETS.map(m => {
      const on = m === 0 ? cur <= 0 : Math.round(cur) === m;
      return `<button class="chipbtn${on ? ' on' : ''}" data-action="${action}" data-val="${m}">${m === 0 ? 'Off' : fmtDuration(m)}</button>`;
    }).join('');
    const label = acOff ? 'Turn on in' : 'Turn off in';
    const now = cur > 0 ? `${acOff ? 'Turns on' : 'Turns off'} in ${fmtDuration(cur)}` : 'No timer';
    return `<div class="blk"><div class="bh"><span class="label">${label}</span><small>${now}</small></div><div class="chips">${chips}</div></div>`;
  }

  _extrasHtml() {
    if (!EXTRAS_KEYS.some(k => this._present(k))) return '';
    const cfg = this._config;
    const active = EXTRAS_TOGGLE_KEYS.filter(k => this._entity(k)?.state === 'on').length;
    const togs = EXTRAS_TOGGLE_KEYS.filter(k => this._present(k)).map(k => {
      const ent = this._entity(k), un = isUnavail(ent), meta = EXTRAS_TOGGLE_META[k];
      return this._togHtml({ icon: EXTRAS_ICONS[k], name: meta.name, desc: un ? 'Needs the AC on' : meta.desc, on: !un && ent.state === 'on', dis: un, action: 'toggle-switch', entity: cfg[k] });
    }).join('');
    const parts = [];
    if (togs) parts.push(`<div class="tg">${togs}</div>`);
    const sp = this._entity('fresh_air_fan_speed');
    if (sp) {
      const un = isUnavail(sp), faOn = this._entity('fresh_air')?.state === 'on';
      const v = un ? 50 : Math.min(Math.round(+sp.state), 100);
      parts.push(`<label class="range">Fresh air speed <input type="range" id="fresh-air-slider" min="${sp.attributes?.min ?? 1}" max="${sp.attributes?.max ?? 100}" value="${v}" ${un || !faOn ? 'disabled' : ''}><b id="fresh-air-val">${un ? '—' : v + '%'}</b></label>`);
    }
    const cm = this._entity('cosy_sleep_mode');
    if (cm) {
      const un = isUnavail(cm), val = un ? -1 : Math.round(+cm.state);
      parts.push(`<div><div class="label" style="margin:0 0 8px 2px">Sleep curve</div><div class="seg sm">${['Off', '1', '2', '3'].map((l, i) =>
        `<button class="${val === i ? 'on' : ''}" ${un ? 'disabled' : ''} data-action="set-cosy-curve" data-val="${i}">${l}</button>`).join('')}</div></div>`);
    }
    const resets = [['reset_filter', 'Reset filter'], ['reset_fresh_air_filter', 'Reset fresh-air filter']]
      .filter(([k]) => this._present(k))
      .map(([k, l]) => `<button class="chipbtn" data-action="press-button" data-entity="${cfg[k]}">${ico('mdi:air-filter')}${l}</button>`).join('');
    if (resets) parts.push(`<div class="chips">${resets}</div>`);
    return `<details data-k="extras" ${this._open.has('extras') ? 'open' : ''}>
      <summary>${ico('mdi:tune-variant')}More comfort<small>${active ? `${active} on` : ''}</small><ha-icon class="chev" icon="mdi:chevron-down"></ha-icon></summary>
      <div class="dc">${parts.join('')}</div></details>`;
  }

  _diagHtml() {
    if (!DIAG_KEYS.some(k => this._present(k))) return '';
    const summary = [this._fmtSensor('outdoor_unit_power'), this._fmtSensor('compressor_frequency')].filter(Boolean).join(' · ');
    const secs = DIAG_SECTIONS.map(sec => {
      const rows = sec.rows.filter(r => this._present(r.key))
        .map(r => `<div><span>${r.name}</span><b>${this._fmtSensor(r.key) ?? '—'}</b></div>`).join('');
      return rows ? `<div class="label" style="margin:4px 0 0 2px">${sec.title}</div><div class="diag">${rows}</div>` : '';
    }).join('');
    return `<details data-k="diag" ${this._open.has('diag') ? 'open' : ''}>
      <summary>${ico('mdi:chart-line')}Diagnostics<small>${summary}</small><ha-icon class="chev" icon="mdi:chevron-down"></ha-icon></summary>
      <div class="dc">${secs}</div></details>`;
  }

  /**
   * Format a diagnostic entity's state for display: numbers keep one decimal
   * at most and append the entity's unit; binary sensors map to Running/Off.
   * Returns null when the entity is absent or unavailable.
   */
  _fmtSensor(key) {
    const ent = this._entity(key);
    if (!ent || isUnavail(ent)) return null;
    if (ent.state === 'on')  return 'Running';
    if (ent.state === 'off') return 'Off';
    const v = +ent.state;
    if (isNaN(v)) return ent.state;
    const unit = ent.attributes?.unit_of_measurement;
    const disp = Number.isInteger(v) ? v : +v.toFixed(1);
    return unit ? `${disp} ${unit}` : `${disp}`;
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
    svg.addEventListener('pointermove', e => { if (this._dragging) this._applyDialPoint(e, svg); });
    const end = () => {
      if (!this._dragging) return;
      this._dragging = false;
      svg.classList.remove('dragging');
      if (this._dragTemp != null) {
        this._call('climate', 'set_temperature', { entity_id: this._config.entity, temperature: this._dragTemp });
        this._dragTemp = null;
      }
    };
    svg.addEventListener('pointerup', end);
    svg.addEventListener('pointercancel', end);
  }

  _applyDialPoint(e, svg) {
    const { CX, CY, START, SWEEP, W, H } = DIAL;
    const rect = svg.getBoundingClientRect();
    const px = (e.clientX - rect.left) * (W / rect.width);
    const py = (e.clientY - rect.top) * (H / rect.height);
    let deg = Math.atan2(px - CX, -(py - CY)) * 180 / Math.PI;   // 0° = top, clockwise
    if (deg < 0) deg += 360;
    const gapEnd = START, gapStart = (START + SWEEP) % 360;       // 135° → 225° is the open bottom
    if (deg > gapStart && deg < gapEnd) return;
    const norm = deg >= START ? deg - START : deg + (360 - START);
    const frac = Math.max(0, Math.min(1, norm / SWEEP));
    const attrs = this._hass.states[this._config.entity].attributes;
    const minT = attrs.min_temp || 16, maxT = attrs.max_temp || 30;
    const temp = Math.round((minT + frac * (maxT - minT)) * 2) / 2;
    if (temp === this._dragTemp) return;
    this._dragTemp = temp;
    this._updateDialArc(temp);
  }

  _updateDialArc(temp) {
    const s = this.shadowRoot;
    const { CX, CY, R, START, SWEEP } = DIAL;
    const attrs = this._hass.states[this._config.entity].attributes;
    const minT = attrs.min_temp || 16, maxT = attrs.max_temp || 30;
    const frac = Math.max(0, Math.min(1, (temp - minT) / (maxT - minT)));
    const end = frac * SWEEP;
    const mc = MODE_COLORS[this._hass.states[this._config.entity].state] || MODE_COLORS.off;
    const fill = s.getElementById('arc-fill');
    if (fill) { fill.setAttribute('d', arcD(CX, CY, R, START, end)); fill.style.display = end < 0.5 ? 'none' : ''; }
    const [hx, hy] = pt(CX, CY, R, START + end);
    s.getElementById('arc-handle')?.setAttribute('cx', hx);
    s.getElementById('arc-handle')?.setAttribute('cy', hy);
    s.querySelectorAll('.tk').forEach(t => {
      const lit = +t.dataset.f * SWEEP <= end + 0.01;
      t.setAttribute('stroke', lit ? mc : 'rgba(255,255,255,.14)');
      t.setAttribute('opacity', lit ? .8 : 1);
    });
    const v = s.getElementById('arc-temp-val');
    if (v) v.textContent = fmtT(temp);
  }

  // ── Fan bars drag ────────────────────────────────────────────────────────
  _bindFanEvents(bars) {
    let pct = null;
    const at = e => {
      const r = bars.getBoundingClientRect();
      return Math.max(1, Math.min(100, Math.round((e.clientX - r.left) / r.width * 100)));
    };
    const show = p => {
      bars.querySelectorAll('span').forEach((b, i) => b.classList.toggle('on', (i + 1) * 10 <= p + 5));
      bars.classList.remove('auto');
      const lbl = this.shadowRoot.getElementById('fan-lbl');
      if (lbl) lbl.textContent = `${p}%`;
    };
    bars.addEventListener('pointerdown', e => {
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      e.preventDefault();
      bars.setPointerCapture(e.pointerId);
      this._dragging = true;
      pct = at(e); show(pct);
    });
    bars.addEventListener('pointermove', e => { if (this._dragging && pct != null) { pct = at(e); show(pct); } });
    const end = () => {
      if (pct == null) return;
      this._dragging = false;
      this._setFanPct(pct);
      pct = null;
    };
    bars.addEventListener('pointerup', end);
    bars.addEventListener('pointercancel', end);
  }

  _setFanPct(pct) {
    const climate = this._hass.states[this._config.entity];
    const attrs = climate.attributes;
    const named = this._fanModesNamed(attrs);
    const nearest = named[Math.max(0, Math.ceil(pct / 100 * named.length) - 1)];
    const fs = this._entity('fan_speed');
    if (fs && !isUnavail(fs)) {
      // Leave Auto first, then set the exact speed.
      if (attrs.fan_mode === 'auto' && nearest) this._call('climate', 'set_fan_mode', { entity_id: climate.entity_id, fan_mode: nearest });
      const lo = fs.attributes?.min ?? 1, hi = fs.attributes?.max ?? 100;
      this._call('number', 'set_value', { entity_id: fs.entity_id, value: Math.max(lo, Math.min(hi, pct)) });
    } else if (nearest) {
      this._call('climate', 'set_fan_mode', { entity_id: climate.entity_id, fan_mode: nearest });
    }
  }

  // ── Click handling ────────────────────────────────────────────────────────
  _onClick(e) {
    const el = e.composedPath().find(n => n instanceof Element && n.dataset?.action);
    if (!el || el.disabled) return;
    const action = el.dataset.action, val = el.dataset.val, eid = el.dataset.entity;
    const { _hass: hass, _config: cfg } = this;
    const climate = hass.states[cfg.entity];
    if (!climate) return;
    const cid = climate.entity_id;
    const attrs = climate.attributes;

    switch (action) {
      case 'temp-up':
      case 'temp-down': {
        const step = action === 'temp-up' ? 0.5 : -0.5;
        const minT = attrs.min_temp || 16, maxT = attrs.max_temp || 30;
        const t = Math.max(minT, Math.min(maxT, +((attrs.temperature || 22) + step).toFixed(1)));
        this._updateDialArc(t);
        this._call('climate', 'set_temperature', { entity_id: cid, temperature: t });
        break;
      }
      case 'start-self-clean':
        if (this._present('self_clean_btn')) this._call('button', 'press', { entity_id: cfg.self_clean_btn });
        break;
      case 'toggle-power':
        this._call('climate', climate.state === 'off' ? 'turn_on' : 'turn_off', { entity_id: cid });
        break;
      case 'set-hvac-mode':
        this._call('climate', 'set_hvac_mode', { entity_id: cid, hvac_mode: val });
        break;
      case 'toggle-fan-auto': {
        const next = attrs.fan_mode === 'auto'
          ? ((attrs.fan_modes || []).find(m => m !== 'auto' && m !== 'custom') || 'medium')
          : 'auto';
        this._call('climate', 'set_fan_mode', { entity_id: cid, fan_mode: next });
        break;
      }
      case 'toggle-osc-h':
      case 'toggle-osc-v': {
        const h = action === 'toggle-osc-h';
        const sm = attrs.swing_mode || 'off';
        const modes = attrs.swing_modes || [];
        const canBoth = modes.includes('both');
        const self = h ? 'horizontal' : 'vertical', other = h ? 'vertical' : 'horizontal';
        let next;
        if (sm === self) next = 'off';
        else if (sm === 'both') next = modes.includes(other) ? other : 'off';
        else if (sm === other) next = canBoth ? 'both' : self;
        else next = self;
        this._call('climate', 'set_swing_mode', { entity_id: cid, swing_mode: next });
        break;
      }
      case 'set-h-angle': case 'set-h-off':
        if (cfg.swing_h_angle) this._call('select', 'select_option', { entity_id: cfg.swing_h_angle, option: action === 'set-h-off' ? 'off' : val });
        break;
      case 'set-v-angle': case 'set-v-off':
        if (cfg.swing_v_angle) this._call('select', 'select_option', { entity_id: cfg.swing_v_angle, option: action === 'set-v-off' ? 'off' : val });
        break;
      case 'set-breeze-normal':
        if (this._present('breeze_away')) this._call('switch', 'turn_off', { entity_id: cfg.breeze_away });
        if (this._present('breezeless'))  this._call('switch', 'turn_off', { entity_id: cfg.breezeless });
        break;
      case 'set-breeze-away':
        this._call('switch', 'turn_on', { entity_id: cfg.breeze_away });
        if (this._present('breezeless')) this._call('switch', 'turn_off', { entity_id: cfg.breezeless });
        break;
      case 'set-breezeless':
        this._call('switch', 'turn_on', { entity_id: cfg.breezeless });
        if (this._present('breeze_away')) this._call('switch', 'turn_off', { entity_id: cfg.breeze_away });
        break;
      case 'set-rate':
        this._call('select', 'select_option', { entity_id: cfg.rate_select, option: val });
        break;
      case 'set-on-timer':
        this._call('number', 'set_value', { entity_id: cfg.power_on_timer, value: +val });
        break;
      case 'set-off-timer':
        this._call('number', 'set_value', { entity_id: cfg.power_off_timer, value: +val });
        break;
      case 'toggle-preset': {
        const next = (attrs.preset_mode || 'none') === val ? 'none' : val;
        this._call('climate', 'set_preset_mode', { entity_id: cid, preset_mode: next });
        break;
      }
      case 'toggle-switch':
        this._call('switch', 'toggle', { entity_id: eid });
        break;
      case 'set-cosy-curve':
        this._call('number', 'set_value', { entity_id: cfg.cosy_sleep_mode, value: +val });
        break;
      case 'press-button':
        if (eid) this._call('button', 'press', { entity_id: eid });
        break;
    }
  }

  // ── Fresh-air speed slider ────────────────────────────────────────────────
  _onInput(e) {
    if (e.target.id !== 'fresh-air-slider') return;
    const v = e.target.value;
    const lbl = this.shadowRoot.getElementById('fresh-air-val');
    if (lbl) lbl.textContent = v + '%';
    clearTimeout(this._fanTimer);
    this._fanTimer = setTimeout(() => {
      this._call('number', 'set_value', { entity_id: this._config.fresh_air_fan_speed, value: +v });
    }, 400);
  }

  _call(domain, service, data) {
    this._hass.callService(domain, service, data);
  }
}

customElements.define(CARD_TAG, AcCard);
console.info(`%c MIDEA-AC-CARD %c ${VERSION} `, 'background:#3fa9ff;color:#fff;font-weight:700', 'background:#1d222c;color:#fff');
