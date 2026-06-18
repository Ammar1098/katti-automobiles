/* ============================================================
   Katti Automobiles — script.js
   ============================================================

   SETUP CHECKLIST (non-technical guide):
   -------------------------------------------------------
   1. WHATSAPP NUMBER:
      Find the line that says  whatsappNumber: '919999999999'
      Replace  919999999999  with your real number.
      Format:  91 + your 10-digit mobile number (no spaces, no +)
      Example: if your number is 98765 43210, use  919876543210

   2. WEB3FORMS KEY (for email notifications when orders come in):
      a. Go to https://web3forms.com  and sign up for FREE
      b. Enter your email address → click "Create Access Key"
      c. Copy the key they give you
      d. Find the line  web3formsKey: 'YOUR_WEB3FORMS_ACCESS_KEY_HERE'
      e. Replace  YOUR_WEB3FORMS_ACCESS_KEY_HERE  with your key

   3. PHONE NUMBER DISPLAY:
      Change  phoneDisplay  to your actual phone number

   4. ADDRESS:
      Change the  address  value to your shop address
   ============================================================ */

const CONFIG = {
  /* ── REPLACE THESE VALUES ──────────────────────────────── */
  whatsappNumber: '918123395773',          // 91 + 10-digit mobile
  phoneDisplay:   '+91 81233 95773',        // shown to customers
  address:        'Athani, Karnataka – 591304',

  /* Sign up free at https://web3forms.com → paste your key here */
  web3formsKey:   'YOUR_WEB3FORMS_ACCESS_KEY_HERE',
  /* ─────────────────────────────────────────────────────── */
};

/* ============================================================
   GENERIC PART IMAGES
   Shared across cars for parts where a model-specific photo
   is not available (bonnet, door panel, grille, mechanical).
   ============================================================ */
const IMG = {
  bonnet:    'https://www.motrparts.com/wp-content/uploads/2019/07/Bonnet-Common.jpg',
  door:      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/1979_AMC_Concord_two-door_sedan_at_2015_AMO_meet-12.jpg/500px-1979_AMC_Concord_two-door_sedan_at_2015_AMO_meet-12.jpg',
  grille:    'https://www.motrparts.com/wp-content/uploads/2025/01/Maruti-Swift-Type-2-Radiator-Lower-Grill-Black-71721M68L00-5PK.webp',
  bumper:    'https://www.motrparts.com/wp-content/uploads/2019/04/Bumper-Common.jpg',
  mirror:    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Wing_mirror.jpg/500px-Wing_mirror.jpg',
  wiper:     'https://upload.wikimedia.org/wikipedia/commons/4/45/Heckscheibenwischer_kl.jpg',
  brakes:    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Brake_pad.jpg/500px-Brake_pad.jpg',
  airfilter: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Air_filter%2C_opel_astra%282%29.JPG/500px-Air_filter%2C_opel_astra%282%29.JPG',
  battery:   'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Photo-CarBattery.jpg/500px-Photo-CarBattery.jpg',
  wheel:     'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Alloy_wheel_mercury.jpg/500px-Alloy_wheel_mercury.jpg',
  glass:     'https://upload.wikimedia.org/wikipedia/commons/5/55/Panoramic-windshield.JPG',
  seat:      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Bricklin_SV-1_-_seat_detail_-_15809506379_%28cropped%29.jpg/500px-Bricklin_SV-1_-_seat_detail_-_15809506379_%28cropped%29.jpg',
};

/* ============================================================
   CAR DATA
   Each car has its own  parts  array with model-specific images.
   To replace an image: change the  image  URL.
   ============================================================ */
const CARS = {

  /* ── TATA NEXON ─────────────────────────────────────────── */
  'tata-nexon': {
    brand:     'Tata',
    model:     'Nexon',
    type:      'Compact SUV',
    year:      '2017 – Present',
    desc:      'One of India\'s best-selling compact SUVs. We stock a wide range of genuine and OEM replacement parts for all Nexon variants.',
    image:     'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Tata_Nexon_Blue_Dual_Tone.jpg/800px-Tata_Nexon_Blue_Dual_Tone.jpg',
    cardImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Tata_Nexon_Blue_Dual_Tone.jpg/600px-Tata_Nexon_Blue_Dual_Tone.jpg',
    parts: [
      { id: 'headlight',    name: 'Headlight',      image: 'https://www.motrparts.com/wp-content/uploads/2024/08/Tata-Nexon-Head-Light-Assy-With-MFR-LH-543854400101.webp' },
      { id: 'tail-light',   name: 'Tail Light',     image: 'https://www.motrparts.com/wp-content/uploads/2024/08/Tata-Nexon-Tail-Light-Assy-RH-543854400119.webp' },
      { id: 'bumper-front', name: 'Front Bumper',   image: 'https://www.motrparts.com/wp-content/uploads/2022/03/Tata-Nexon-Front-Bumper-543888506315.jpg' },
      { id: 'bumper-rear',  name: 'Rear Bumper',    image: 'https://www.motrparts.com/wp-content/uploads/2022/03/Tata-Nexon-Rear-Bumper-543888606303.jpg' },
      { id: 'side-mirror',  name: 'Side Mirror',    image: 'https://www.motrparts.com/wp-content/uploads/2024/08/Tata-Nexon-Side-Mirror-with-Indicator-LH-543881100131.webp' },
      { id: 'fog-lamp',     name: 'Fog Lamp',       image: 'https://www.motrparts.com/wp-content/uploads/2025/06/Hella-Tata-Nexon-Fog-Light-Assy-RH-358.206-101-400x400.webp' },
      { id: 'bonnet',       name: 'Bonnet / Hood',  image: IMG.bonnet },
      { id: 'door-panel',   name: 'Door Panel',     image: IMG.door },
      { id: 'grille',       name: 'Front Grille',   image: IMG.grille },
      { id: 'wiper-blade',  name: 'Wiper Blade',    image: IMG.wiper },
      { id: 'brake-pads',   name: 'Brake Pads',     image: IMG.brakes },
      { id: 'air-filter',   name: 'Air Filter',     image: IMG.airfilter },
      { id: 'battery',      name: 'Battery',        image: IMG.battery },
      { id: 'alloy-wheel',  name: 'Alloy Wheel',    image: IMG.wheel },
      { id: 'windshield',   name: 'Windshield',     image: IMG.glass },
      { id: 'seat-cover',   name: 'Seat Cover',     image: IMG.seat },
    ],
  },

  /* ── MARUTI SWIFT ───────────────────────────────────────── */
  'maruti-swift': {
    brand:     'Maruti Suzuki',
    model:     'Swift',
    type:      'Hatchback',
    year:      '2005 – Present',
    desc:      'India\'s most popular hatchback. Parts available for Swift 1st, 2nd, 3rd and 4th generation models.',
    image:     'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/2024_Suzuki_Swift.jpg/800px-2024_Suzuki_Swift.jpg',
    cardImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/2024_Suzuki_Swift.jpg/600px-2024_Suzuki_Swift.jpg',
    parts: [
      { id: 'headlight',    name: 'Headlight',      image: 'https://www.motrparts.com/wp-content/uploads/2024/07/Maruti-Swift-Swift-Dzire-Type-3-Head-Light-Assy-LH-35300M55R10.webp' },
      { id: 'tail-light',   name: 'Tail Light',     image: 'https://www.motrparts.com/wp-content/uploads/2024/08/Maruti-Swift-Type-3-Tail-Light-Assy-RH-35650M55RA0.webp' },
      { id: 'bumper-front', name: 'Front Bumper',   image: 'https://www.motrparts.com/wp-content/uploads/2025/01/Maruti-Swift-Type-2-Front-Bumper-71711M74L00-400x400.webp' },
      { id: 'bumper-rear',  name: 'Rear Bumper',    image: 'https://www.motrparts.com/wp-content/uploads/2025/02/Maruti-Swift-Type-2-Rear-Bumper-71811M74L00-400x400.webp' },
      { id: 'side-mirror',  name: 'Side Mirror',    image: 'https://www.motrparts.com/wp-content/uploads/2024/08/Maruti-Swift-Swift-Dzire-Type-2-Rear-View-Mirror-Assy-RH-84701M74LC1-5PK.webp' },
      { id: 'fog-lamp',     name: 'Fog Lamp',       image: 'https://www.motrparts.com/wp-content/uploads/2024/08/Maruti-Swift-Swift-Dzire-Ritz-Uno-Minda-Fog-Light-Assy-LHRH-FF-5039M-400x400.webp' },
      { id: 'grille',       name: 'Front Grille',   image: 'https://www.motrparts.com/wp-content/uploads/2025/01/Maruti-Swift-Type-2-Radiator-Lower-Grill-Black-71721M68L00-5PK.webp' },
      { id: 'bonnet',       name: 'Bonnet / Hood',  image: IMG.bonnet },
      { id: 'door-panel',   name: 'Door Panel',     image: IMG.door },
      { id: 'wiper-blade',  name: 'Wiper Blade',    image: IMG.wiper },
      { id: 'brake-pads',   name: 'Brake Pads',     image: IMG.brakes },
      { id: 'air-filter',   name: 'Air Filter',     image: IMG.airfilter },
      { id: 'battery',      name: 'Battery',        image: IMG.battery },
      { id: 'alloy-wheel',  name: 'Alloy Wheel',    image: IMG.wheel },
      { id: 'windshield',   name: 'Windshield',     image: IMG.glass },
      { id: 'seat-cover',   name: 'Seat Cover',     image: IMG.seat },
    ],
  },

  /* ── HYUNDAI i20 ────────────────────────────────────────── */
  'hyundai-i20': {
    brand:     'Hyundai',
    model:     'i20',
    type:      'Premium Hatchback',
    year:      '2008 – Present',
    desc:      'Premium hatchback with a huge parts ecosystem. We source parts for all i20 generations including the latest N-Line.',
    image:     'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Hyundai_i20_%28BC3%29_IMG_4165.jpg/800px-Hyundai_i20_%28BC3%29_IMG_4165.jpg',
    cardImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Hyundai_i20_%28BC3%29_IMG_4165.jpg/600px-Hyundai_i20_%28BC3%29_IMG_4165.jpg',
    parts: [
      { id: 'headlight',    name: 'Headlight',      image: 'https://www.motrparts.com/wp-content/uploads/2024/06/HY-I20-Active-amp-Elite-Head-Light-Assy-RH-92102C7020.webp' },
      { id: 'tail-light',   name: 'Tail Light',     image: 'https://www.motrparts.com/wp-content/uploads/2024/06/HY-I20-Active-amp-Elite-Tail-Light-Assy-RH-92402C7000.webp' },
      { id: 'side-mirror',  name: 'Side Mirror',    image: 'https://www.motrparts.com/wp-content/uploads/2024/08/HY-I20-Side-Mirror-Electrical-with-Indicator-RH-876201J690.webp' },
      { id: 'fog-lamp',     name: 'Fog Lamp',       image: 'https://www.motrparts.com/wp-content/uploads/2024/06/HY-I20-Active-Elite-Front-Fog-Lamp-RH-92202C7000.webp' },
      { id: 'bumper-front', name: 'Front Bumper',   image: IMG.bumper },
      { id: 'bumper-rear',  name: 'Rear Bumper',    image: IMG.bumper },
      { id: 'bonnet',       name: 'Bonnet / Hood',  image: IMG.bonnet },
      { id: 'door-panel',   name: 'Door Panel',     image: IMG.door },
      { id: 'grille',       name: 'Front Grille',   image: IMG.grille },
      { id: 'wiper-blade',  name: 'Wiper Blade',    image: IMG.wiper },
      { id: 'brake-pads',   name: 'Brake Pads',     image: IMG.brakes },
      { id: 'air-filter',   name: 'Air Filter',     image: IMG.airfilter },
      { id: 'battery',      name: 'Battery',        image: IMG.battery },
      { id: 'alloy-wheel',  name: 'Alloy Wheel',    image: IMG.wheel },
      { id: 'windshield',   name: 'Windshield',     image: IMG.glass },
      { id: 'seat-cover',   name: 'Seat Cover',     image: IMG.seat },
    ],
  },

  /* ── HONDA CITY ─────────────────────────────────────────── */
  'honda-city': {
    brand:     'Honda',
    model:     'City',
    type:      'Sedan',
    year:      '1998 – Present',
    desc:      'India\'s favourite sedan for over two decades. Parts for all City generations — from 1st gen to the latest 5th gen hybrid.',
    image:     'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Honda_City_%28sixth_generation%29_front.JPG/800px-Honda_City_%28sixth_generation%29_front.JPG',
    cardImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Honda_City_%28sixth_generation%29_front.JPG/600px-Honda_City_%28sixth_generation%29_front.JPG',
    parts: [
      { id: 'headlight',    name: 'Headlight',      image: 'https://www.motrparts.com/wp-content/uploads/2025/09/Head-light-Assy-LH-Fits-Honda-City-Type-1.webp' },
      { id: 'tail-light',   name: 'Tail Light',     image: 'https://www.motrparts.com/wp-content/uploads/2019/10/Honda-City-T6-Taillight-Assy-RH.jpg' },
      { id: 'bumper-front', name: 'Front Bumper',   image: 'https://www.motrparts.com/wp-content/uploads/2019/09/Honda-City-T1T2-Front-Bumper.jpg' },
      { id: 'side-mirror',  name: 'Side Mirror',    image: 'https://www.motrparts.com/wp-content/uploads/2021/08/Side-Mirror-Common.jpg' },
      { id: 'bumper-rear',  name: 'Rear Bumper',    image: IMG.bumper },
      { id: 'fog-lamp',     name: 'Fog Lamp',       image: 'https://www.motrparts.com/wp-content/uploads/2024/08/Maruti-Swift-Swift-Dzire-Ritz-Uno-Minda-Fog-Light-Assy-LHRH-FF-5039M-400x400.webp' },
      { id: 'bonnet',       name: 'Bonnet / Hood',  image: IMG.bonnet },
      { id: 'door-panel',   name: 'Door Panel',     image: IMG.door },
      { id: 'grille',       name: 'Front Grille',   image: IMG.grille },
      { id: 'wiper-blade',  name: 'Wiper Blade',    image: IMG.wiper },
      { id: 'brake-pads',   name: 'Brake Pads',     image: IMG.brakes },
      { id: 'air-filter',   name: 'Air Filter',     image: IMG.airfilter },
      { id: 'battery',      name: 'Battery',        image: IMG.battery },
      { id: 'alloy-wheel',  name: 'Alloy Wheel',    image: IMG.wheel },
      { id: 'windshield',   name: 'Windshield',     image: IMG.glass },
      { id: 'seat-cover',   name: 'Seat Cover',     image: IMG.seat },
    ],
  },

  /* ── MAHINDRA XUV300 ────────────────────────────────────── */
  'mahindra-xuv300': {
    brand:     'Mahindra',
    model:     'XUV300',
    type:      'Sub-Compact SUV',
    year:      '2019 – Present',
    desc:      'Feature-packed sub-compact SUV with strong safety ratings. We carry body and mechanical parts for all XUV300 trims.',
    image:     'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Mahindra_XUV300.jpg/800px-Mahindra_XUV300.jpg',
    cardImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Mahindra_XUV300.jpg/600px-Mahindra_XUV300.jpg',
    parts: [
      { id: 'headlight',    name: 'Headlight',      image: 'https://autoclint.com/cdn/shop/files/MM1_1024x1024@2x.jpg?v=1696245443' },
      { id: 'tail-light',   name: 'Tail Light',     image: 'https://autoclint.com/cdn/shop/files/Untitled-1_e8ed1184-9ed6-4d9b-b8e9-5b3b862c1204_1024x1024@2x.jpg?v=1696245273' },
      { id: 'fog-lamp',     name: 'Fog Lamp',       image: 'https://www.motrparts.com/wp-content/uploads/2024/08/Mahindra-XUV-300-Rear-Fog-Light-RH-1703DAA00431N.webp' },
      { id: 'bumper-front', name: 'Front Bumper',   image: IMG.bumper },
      { id: 'bumper-rear',  name: 'Rear Bumper',    image: IMG.bumper },
      { id: 'side-mirror',  name: 'Side Mirror',    image: IMG.mirror },
      { id: 'bonnet',       name: 'Bonnet / Hood',  image: IMG.bonnet },
      { id: 'door-panel',   name: 'Door Panel',     image: IMG.door },
      { id: 'grille',       name: 'Front Grille',   image: IMG.grille },
      { id: 'wiper-blade',  name: 'Wiper Blade',    image: IMG.wiper },
      { id: 'brake-pads',   name: 'Brake Pads',     image: IMG.brakes },
      { id: 'air-filter',   name: 'Air Filter',     image: IMG.airfilter },
      { id: 'battery',      name: 'Battery',        image: IMG.battery },
      { id: 'alloy-wheel',  name: 'Alloy Wheel',    image: IMG.wheel },
      { id: 'windshield',   name: 'Windshield',     image: IMG.glass },
      { id: 'seat-cover',   name: 'Seat Cover',     image: IMG.seat },
    ],
  },

  /* ── TOYOTA INNOVA ──────────────────────────────────────── */
  'toyota-innova': {
    brand:     'Toyota',
    model:     'Innova',
    type:      'MPV',
    year:      '2004 – Present',
    desc:      'The most trusted family MPV in India. Parts available for Innova (2004–2015), Innova Crysta, and Innova HyCross.',
    image:     'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Toyota_Innova_Crysta.jpg/800px-Toyota_Innova_Crysta.jpg',
    cardImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Toyota_Innova_Crysta.jpg/600px-Toyota_Innova_Crysta.jpg',
    parts: [
      { id: 'headlight',    name: 'Headlight',      image: 'https://www.motrparts.com/wp-content/uploads/2025/09/Head-Light-Assy-LH-Fits-Toyota-Innova-Type-2.webp' },
      { id: 'tail-light',   name: 'Tail Light',     image: 'https://www.motrparts.com/wp-content/uploads/2025/09/Tail-light-Assy-LH-Fits-Toyota-Innova-Crysta.webp' },
      { id: 'bumper-front', name: 'Front Bumper',   image: 'https://www.motrparts.com/wp-content/uploads/2022/04/Toyota-Innova-Type-2-Front-Bumper.jpg' },
      { id: 'bumper-rear',  name: 'Rear Bumper',    image: 'https://www.motrparts.com/wp-content/uploads/2019/09/Toyota-Innova-T23-4-Rear-Bumper.jpg' },
      { id: 'side-mirror',  name: 'Side Mirror',    image: 'https://www.motrparts.com/wp-content/uploads/2024/12/Galeria-Toyota-Innova-Type-3-Outer-Rear-View-Mirror-Motorized-Non-Autofold-LH-IRG-30205.webp' },
      { id: 'fog-lamp',     name: 'Fog Lamp',       image: 'https://www.motrparts.com/wp-content/uploads/2024/08/Uno-Minda-Toyota-Innova-Fog-Light-Assy-RH-FF-5025.webp' },
      { id: 'bonnet',       name: 'Bonnet / Hood',  image: IMG.bonnet },
      { id: 'door-panel',   name: 'Door Panel',     image: IMG.door },
      { id: 'grille',       name: 'Front Grille',   image: IMG.grille },
      { id: 'wiper-blade',  name: 'Wiper Blade',    image: IMG.wiper },
      { id: 'brake-pads',   name: 'Brake Pads',     image: IMG.brakes },
      { id: 'air-filter',   name: 'Air Filter',     image: IMG.airfilter },
      { id: 'battery',      name: 'Battery',        image: IMG.battery },
      { id: 'alloy-wheel',  name: 'Alloy Wheel',    image: IMG.wheel },
      { id: 'windshield',   name: 'Windshield',     image: IMG.glass },
      { id: 'seat-cover',   name: 'Seat Cover',     image: IMG.seat },
    ],
  },

};

/* ============================================================
   WhatsApp helper
   ============================================================ */
function waLink(msg) {
  return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;
}

/* ============================================================
   MODAL — injected into <body> on load
   ============================================================ */
function injectModal() {
  const html = `
  <div class="modal-overlay" id="orderModal" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
    <div class="modal-sheet" id="modalSheet">
      <span class="modal-handle"></span>
      <div class="modal-top">
        <h2 class="modal-title" id="modalTitle">Request a Part</h2>
        <p class="modal-subtitle">Fill in your details — we'll contact you on WhatsApp or call.</p>
        <button class="modal-close-btn" id="modalClose" aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      <form class="order-form" id="orderForm" novalidate>
        <!-- Hidden fields for Web3Forms -->
        <input type="hidden" name="access_key" id="web3formsKey" value="${CONFIG.web3formsKey}">
        <input type="hidden" name="subject"    value="New Part Request — Katti Automobiles">
        <input type="hidden" name="from_name"  value="Katti Automobiles Website">

        <!-- Status messages -->
        <div class="form-status" id="formSuccess">
          <div class="form-status-title">Order Received!</div>
          <div class="form-status-msg">We'll contact you on WhatsApp or give you a call shortly.<br>
          You can also message us directly right now:</div>
          <a id="successWaLink" href="#" class="btn btn-whatsapp btn-full" style="margin-top:12px;" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" fill="currentColor" style="width:18px;height:18px"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Chat with us on WhatsApp now
          </a>
        </div>

        <div class="form-status" id="formError">
          <div class="form-status-title">Something went wrong</div>
          <div class="form-status-msg" id="formErrorMsg">Please try WhatsApp directly or call us.</div>
          <a id="errorWaLink" href="#" class="btn btn-whatsapp btn-full" style="margin-top:12px;" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" fill="currentColor" style="width:18px;height:18px"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Message us on WhatsApp
          </a>
        </div>

        <div id="formFields">
          <div class="form-row-2">
            <div class="form-group">
              <label class="form-label" for="fieldName">Full Name <span class="req">*</span></label>
              <input class="form-input" type="text" id="fieldName" name="name" placeholder="e.g. Ravi Kumar" required autocomplete="name">
              <span class="form-error-inline" id="errName">Please enter your name</span>
            </div>
            <div class="form-group">
              <label class="form-label" for="fieldMobile">Mobile Number <span class="req">*</span></label>
              <input class="form-input" type="tel" id="fieldMobile" name="mobile" placeholder="10-digit mobile" required autocomplete="tel" maxlength="10" inputmode="numeric" pattern="[6-9][0-9]{9}">
              <span class="form-error-inline" id="errMobile">Enter a valid 10-digit Indian number</span>
            </div>
          </div>

          <div class="form-row-2">
            <div class="form-group">
              <label class="form-label" for="fieldCity">City / Location <span class="req">*</span></label>
              <input class="form-input" type="text" id="fieldCity" name="city" placeholder="e.g. Athani" required autocomplete="address-level2">
              <span class="form-error-inline" id="errCity">Please enter your city</span>
            </div>
            <div class="form-group">
              <label class="form-label" for="fieldCarModel">Car Model</label>
              <input class="form-input" type="text" id="fieldCarModel" name="car_model" readonly>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label" for="fieldAddress">Full Address <span class="req">*</span></label>
            <textarea class="form-textarea" id="fieldAddress" name="address" placeholder="House/flat no., street, landmark, district..." required autocomplete="street-address" rows="2"></textarea>
            <span class="form-error-inline" id="errAddress">Please enter your delivery address</span>
          </div>

          <div class="form-group">
            <label class="form-label" for="fieldPart">Part Needed <span class="req">*</span></label>
            <input class="form-input" type="text" id="fieldPart" name="part_needed" placeholder="e.g. Headlight" required>
            <span class="form-error-inline" id="errPart">Please specify the part you need</span>
          </div>

          <div class="form-group">
            <label class="form-label" for="fieldNotes">Additional Notes <span style="color:var(--text-muted);font-weight:400;">(optional)</span></label>
            <textarea class="form-textarea" id="fieldNotes" name="notes" placeholder="Describe condition needed (new/used/OEM), year of vehicle, urgency, any other details..." rows="2"></textarea>
            <p class="form-hint">Tip: mention if you need a new or used part, your vehicle's year, and how urgent the requirement is. You can also attach a photo when you WhatsApp us directly.</p>
          </div>

          <div class="submit-area">
            <button type="submit" class="btn btn-primary btn-full" id="submitBtn">
              <span id="submitLabel">Submit Order Request</span>
              <span class="btn-loading" id="submitLoading">
                <span class="spinner"></span>Sending…
              </span>
            </button>
            <p style="font-size:12px;color:var(--text-muted);text-align:center;line-height:1.5;">
              Or message us directly:
              <a id="directWaLink" href="#" target="_blank" rel="noopener" style="color:var(--whatsapp);font-weight:600;">WhatsApp</a>
              &nbsp;·&nbsp; <a href="tel:${CONFIG.phoneDisplay.replace(/\s/g,'')}" style="color:var(--accent);font-weight:600;">${CONFIG.phoneDisplay}</a>
            </p>
          </div>
        </div>
      </form>
    </div>
  </div>`;

  document.body.insertAdjacentHTML('beforeend', html);
}

/* ============================================================
   FLOATING WHATSAPP BUTTON — injected into <body>
   ============================================================ */
function injectWaFloat() {
  const wa = document.createElement('a');
  wa.className   = 'wa-float';
  wa.href        = waLink('Hi, I found your website and need help with a car part.');
  wa.target      = '_blank';
  wa.rel         = 'noopener noreferrer';
  wa.setAttribute('aria-label', 'Chat on WhatsApp');
  wa.innerHTML   = `<svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`;
  document.body.appendChild(wa);
}

/* ============================================================
   MODAL — open / close
   ============================================================ */
function openModal(partName, carLabel) {
  const overlay  = document.getElementById('orderModal');
  const fieldPart = document.getElementById('fieldPart');
  const fieldCar  = document.getElementById('fieldCarModel');

  if (fieldPart) fieldPart.value = partName  || '';
  if (fieldCar)  fieldCar.value  = carLabel  || '';

  /* Update WhatsApp links in the modal */
  const msg = `Hi, I need a *${partName}* for my *${carLabel}*. Please help.`;
  ['directWaLink', 'successWaLink', 'errorWaLink'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.href = waLink(msg);
  });

  /* Reset form state */
  resetFormState();

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';

  /* Focus first input for accessibility */
  setTimeout(() => {
    const first = document.getElementById('fieldName');
    if (first) first.focus();
  }, 300);
}

function closeModal() {
  const overlay = document.getElementById('orderModal');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

function resetFormState() {
  document.getElementById('formSuccess').className = 'form-status';
  document.getElementById('formError').className   = 'form-status';
  document.getElementById('formFields').style.display = '';
  document.querySelectorAll('.form-error-inline').forEach(el => el.classList.remove('show'));
  setSubmitLoading(false);
}

/* ============================================================
   FORM VALIDATION
   ============================================================ */
function validateForm() {
  let ok = true;

  function check(fieldId, errId, validFn) {
    const val = document.getElementById(fieldId).value.trim();
    const err = document.getElementById(errId);
    if (!validFn(val)) {
      err.classList.add('show');
      if (ok) document.getElementById(fieldId).focus();
      ok = false;
    } else {
      err.classList.remove('show');
    }
  }

  check('fieldName',    'errName',    v => v.length >= 2);
  check('fieldMobile',  'errMobile',  v => /^[6-9][0-9]{9}$/.test(v));
  check('fieldCity',    'errCity',    v => v.length >= 2);
  check('fieldAddress', 'errAddress', v => v.length >= 5);
  check('fieldPart',    'errPart',    v => v.length >= 2);

  return ok;
}

/* ============================================================
   SUBMIT BUTTON — loading state
   ============================================================ */
function setSubmitLoading(loading) {
  const btn     = document.getElementById('submitBtn');
  const label   = document.getElementById('submitLabel');
  const spinner = document.getElementById('submitLoading');

  if (loading) {
    btn.disabled = true;
    label.style.display   = 'none';
    spinner.style.display = 'flex';
  } else {
    btn.disabled = false;
    label.style.display   = '';
    spinner.style.display = 'none';
  }
}

/* ============================================================
   FORM SUBMISSION — Web3Forms
   ============================================================ */
async function handleSubmit(e) {
  e.preventDefault();
  if (!validateForm()) return;

  setSubmitLoading(true);

  const form = document.getElementById('orderForm');
  const data = new FormData(form);

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: data,
    });
    const json = await res.json();

    if (json.success) {
      /* Show success */
      document.getElementById('formFields').style.display = 'none';
      document.getElementById('formSuccess').className    = 'form-status success';
      /* Scroll to top of modal */
      document.getElementById('modalSheet').scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      throw new Error(json.message || 'Submission failed');
    }
  } catch (err) {
    document.getElementById('formErrorMsg').textContent =
      'Could not send the form right now. Please try WhatsApp or call us directly.';
    document.getElementById('formError').className = 'form-status error';
    setSubmitLoading(false);
  }
}

/* ============================================================
   BUILD HOMEPAGE CAR GRID
   Called from index.html
   ============================================================ */
function buildCarGrid() {
  const grid = document.getElementById('carGrid');
  if (!grid) return;

  Object.entries(CARS).forEach(([slug, car]) => {
    const card = document.createElement('a');
    card.className = 'car-card';
    card.href      = `car.html?model=${slug}`;

    card.innerHTML = `
      <div class="car-card-img-wrap">
        <img class="car-card-img" src="${car.cardImage}" alt="${car.brand} ${car.model}" loading="lazy">
      </div>
      <div class="car-card-body">
        <div class="car-card-brand">${car.brand}</div>
        <div class="car-card-model">${car.model}</div>
        <div class="car-card-type">${car.type} &middot; ${car.year}</div>
        <div class="car-card-footer">
          <span class="car-card-parts">${car.parts.length} parts listed</span>
          <span class="car-card-arrow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </span>
        </div>
      </div>`;

    grid.appendChild(card);
  });
}

/* ============================================================
   BUILD CAR MODEL PAGE
   Called from car.html
   ============================================================ */
function buildCarPage() {
  const params = new URLSearchParams(window.location.search);
  const slug   = params.get('model');
  const car    = CARS[slug];

  if (!car) {
    /* Car not found — show error state */
    const main = document.getElementById('carPageContent');
    if (main) {
      main.innerHTML = `
        <div class="not-found">
          <div class="not-found-icon">&#x1F697;</div>
          <h1>Car not found</h1>
          <p>We couldn't find that car model. Please go back and choose from the available models.</p>
          <a href="index.html" class="btn btn-primary" style="margin-top:8px;">Back to Home</a>
        </div>`;
    }
    return;
  }

  /* Set page title */
  document.title = `${car.brand} ${car.model} Parts — Katti Automobiles`;

  /* Set meta description */
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.content = `Order genuine ${car.brand} ${car.model} spare parts. Headlight, bumper, door panel, engine parts and more. Fast delivery. Call or WhatsApp Katti Automobiles.`;

  /* Breadcrumb */
  const bc = document.getElementById('breadcrumbModel');
  if (bc) bc.textContent = `${car.brand} ${car.model}`;

  /* Hero section */
  const h1      = document.getElementById('modelH1');
  const modelBrand = document.getElementById('modelBrand');
  const modelType  = document.getElementById('modelType');
  const modelYear  = document.getElementById('modelYear');
  const modelDesc  = document.getElementById('modelDesc');
  const modelImg   = document.getElementById('modelImg');
  const waBtn      = document.getElementById('modelWaBtn');

  if (h1)         { h1.innerHTML = `<span>${car.brand}</span> ${car.model}`; }
  if (modelBrand) modelBrand.textContent = car.brand;
  if (modelType)  modelType.textContent  = car.type;
  if (modelYear)  modelYear.textContent  = car.year;
  if (modelDesc)  modelDesc.textContent  = car.desc;
  if (modelImg) {
    modelImg.src = car.image;
    modelImg.alt = `${car.brand} ${car.model}`;
  }
  if (waBtn) {
    waBtn.href = waLink(`Hi, I'm looking for parts for my ${car.brand} ${car.model}. Can you help?`);
  }

  /* Parts count */
  const partsCount = document.getElementById('partsCount');
  if (partsCount) partsCount.textContent = `${car.parts.length} parts`;

  /* Parts section header */
  const partsHead = document.getElementById('partsHeadModel');
  if (partsHead) partsHead.textContent = `${car.brand} ${car.model}`;

  /* Build parts grid */
  const grid    = document.getElementById('partsGrid');
  const carLabel = `${car.brand} ${car.model}`;

  car.parts.forEach(part => {
    const card = document.createElement('div');
    card.className = 'part-card';
    card.innerHTML = `
      <div class="part-img-wrap">
        <img class="part-img" src="${part.image}" alt="${part.name} for ${carLabel}" loading="lazy"
             onerror="this.style.opacity='0.3';this.src='data:image/svg+xml,<svg xmlns=\\'http://www.w3.org/2000/svg\\'><rect width=\\'100%25\\' height=\\'100%25\\' fill=\\'%231a3a5f\\'/></svg>'">
      </div>
      <div class="part-body">
        <div class="part-name">${part.name}</div>
        <button class="part-btn" data-part="${part.name}" data-car="${carLabel}" aria-label="Request ${part.name} for ${carLabel}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          Request This Part
        </button>
      </div>`;
    grid.appendChild(card);
  });

  /* Delegate click events on parts grid */
  grid.addEventListener('click', e => {
    const btn = e.target.closest('.part-btn');
    if (!btn) return;
    openModal(btn.dataset.part, btn.dataset.car);
  });
}

/* ============================================================
   WIRE UP MODAL CLOSE / KEYBOARD
   ============================================================ */
function setupModalEvents() {
  const overlay  = document.getElementById('orderModal');
  const closeBtn = document.getElementById('modalClose');
  const form     = document.getElementById('orderForm');

  closeBtn.addEventListener('click', closeModal);

  /* Close when clicking backdrop */
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeModal();
  });

  /* Close on Escape key */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) closeModal();
  });

  form.addEventListener('submit', handleSubmit);
}

/* ============================================================
   NAV TOGGLE (hamburger menu for mobile)
   ============================================================ */
function setupNav() {
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });

  /* Close nav on link click (mobile) */
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  injectModal();
  injectWaFloat();
  setupModalEvents();
  setupNav();

  /* Homepage */
  buildCarGrid();

  /* Car model page */
  buildCarPage();

  /* Animate page in */
  document.body.classList.add('page-load');
});
