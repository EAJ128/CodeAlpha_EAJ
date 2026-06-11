import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  // === CATEGORY: Electronics === (8 base + 2 extras = 10 items)
  {
    id: 'elec-01',
    name: 'EAJ Nexus Wireless Mouse',
    description: 'Ergonomic dual-mode wireless mouse with silent clicks, precision tracking, and elegant neon-cyan battery indicators.',
    category: 'Electronics',
    price: 49.99,
    stock: 25,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&auto=format&fit=crop&q=60',
    specifications: ['Connectivity: 2.4GHz + Bluetooth 5.0', 'DPI: 800 - 4000 Adjustable', 'Battery Life: Up to 90 days', 'Charging: USB-C Fast Charge']
  },
  {
    id: 'elec-02',
    name: 'EAJ Overdrive Mechanical Keyboard',
    description: 'Hot-swappable tactile mechanical keyboard featuring custom linear red switches and dynamic RGB underglow.',
    category: 'Electronics',
    price: 89.99,
    stock: 18,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=60',
    specifications: ['Keycaps: Double-shot PBT', 'Switches: EAJ Linear Red', 'Layout: 75% Compact', 'Backlight: 16.8 million color RGB']
  },
  {
    id: 'elec-03',
    name: 'EAJ SoundForge Gaming Headset',
    description: 'Immersive 7.1 surround sound gaming headset with ultra-plush memory foam and detachable noise-cancelling microphone.',
    category: 'Electronics',
    price: 69.99,
    stock: 15,
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&auto=format&fit=crop&q=60',
    specifications: ['Drivers: 50mm Neodymium', 'Frequency Response: 20Hz - 20kHz', 'Interface: 3.5mm + USB Adapter', 'Weight: 280g']
  },
  {
    id: 'elec-04',
    name: 'EAJ Chrono Smart Watch',
    description: 'Tech-forward smartwatch with continuous heart rate sensing, SpO2 tracker, smart sleep analyzer, and custom neon watchfaces.',
    category: 'Electronics',
    price: 119.99,
    stock: 20,
    image: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=500&auto=format&fit=crop&q=60',
    specifications: ['Display: 1.78" AMOLED Always-on', 'Water Resistance: IP68 Rating', 'GPS: Integrated Multi-system', 'Battery Life: Up to 10 days']
  },
  {
    id: 'elec-05',
    name: 'EAJ Aura Bluetooth Speaker',
    description: 'Portable waterproof Bluetooth speaker showcasing a panoramic 360-degree LED pulsing lightshow and deep resonant bass.',
    category: 'Electronics',
    price: 54.99,
    stock: 30,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format&fit=crop&q=60',
    specifications: ['Audio Output: 20W Rich Stereo', 'Bluetooth: Version 5.3', 'Playtime: Up to 15 hours', 'Waterproof rating: IPX7']
  },
  {
    id: 'elec-06',
    name: 'EAJ ClearView Ultra Webcam',
    description: 'Crisp 1080p full HD streaming webcam with automatic low-light correction, integrated privacy shutter, and dual microphones.',
    category: 'Electronics',
    price: 59.99,
    stock: 12,
    image: 'https://images.unsplash.com/photo-1612444530582-fc66183b16f7?w=500&auto=format&fit=crop&q=60',
    specifications: ['Resolution: 1080p @ 30fps / 720p @ 60fps', 'Field of View: 90 degrees Diagonal', 'Mounting: Clip & Tripod Mount', 'Connection: USB-A Plug & Play']
  },
  {
    id: 'elec-07',
    name: 'EAJ MultiLink 8-in-1 USB Hub',
    description: 'Sleek aluminum USB-C hub with 4K HDMI, Gigabit Ethernet, SD card slot, and 100W Power Delivery pass-through connectivity.',
    category: 'Electronics',
    price: 39.99,
    stock: 45,
    image: 'https://images.unsplash.com/photo-1618609378039-b572f64c5b42?w=500&auto=format&fit=crop&q=60',
    specifications: ['HDMI Output: 4K @ 60Hz', 'USB Ports: 2x USB 3.0, 1x USB-C Data', 'LAN Port: RJ45 Gigabit Net', 'Power Delivery: 100W pass-through']
  },
  {
    id: 'elec-08',
    name: 'EAJ VoltVault 20K Power Bank',
    description: 'Heavy duty 20,000mAh external battery packs with high-capacity digital LED status panels and simultaneous dual USB-C charging.',
    category: 'Electronics',
    price: 45.99,
    stock: 35,
    image: 'https://images.unsplash.com/photo-1609592424109-dd9892f1b17c?w=500&auto=format&fit=crop&q=60',
    specifications: ['Capacity: 20,000 mAh', 'Max Output Power: 45W Fast Charging', 'Input Ports: USB-C Fast Recharge', 'Weight: 360g']
  },
  {
    id: 'elec-09',
    name: 'EAJ Stealth Studio Microphone',
    description: 'High-fidelity condenser microphone with selectable polar patterns, zero-latency monitor, and glowing neon indicators.',
    category: 'Electronics',
    price: 79.99,
    stock: 14,
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500&auto=format&fit=crop&q=60',
    specifications: ['Sample Rate: 96kHz / 24-bit', 'Polar Patterns: Cardioid, Omnidirectional', 'Interface: USB-C to USB-A', 'Mute Toggle: Capacitive Touch']
  },
  {
    id: 'elec-10',
    name: 'EAJ Nova VR Headset Lite',
    description: 'A stylish mobile virtual reality console with anti-flicker lenses and responsive multi-axis head tracking controls.',
    category: 'Electronics',
    price: 99.99,
    stock: 10,
    image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=500&auto=format&fit=crop&q=60',
    specifications: ['FOV: 110 degrees', 'Adjustment: Individual Focus Adjust', 'Weight: 310g', 'Compatibility: 5.5" to 6.8" Screen']
  },

  // === CATEGORY: Mobile Accessories === (6 base + 4 extras = 10 items)
  {
    id: 'macc-01',
    name: 'EAJ Ignite 65W GaN Fast Charger',
    description: 'Ultra-compact Gallium Nitride (GaN) wall adapter delivering multi-port high power outputs safely without heating.',
    category: 'Mobile Accessories',
    price: 29.99,
    stock: 50,
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500&auto=format&fit=crop&q=60',
    specifications: ['Material: Gallium Nitride (GaN)', 'Ports: 2x USB-C + 1x USB-A', 'Power Limit: 65W Max', 'Protection: Overcurrent & Surge guards']
  },
  {
    id: 'macc-02',
    name: 'EAJ CyberArmor Carbon Case',
    description: 'Heavy durable carbon-fiber military-grade phone cases with tactical textured grid grips and neon safety bezels.',
    category: 'Mobile Accessories',
    price: 19.99,
    stock: 120,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&auto=format&fit=crop&q=60',
    specifications: ['Drop Protection: Rated up to 10 feet', 'Materials: Flexible TPU + Carbon Accents', 'MagSafe Compatible: Yes', 'Bezel Size: 1.5mm raised screen lips']
  },
  {
    id: 'macc-03',
    name: 'EAJ GlassSentry Screen Protector',
    description: 'Double-tempered crystal clear screen safeguards with hydrophobic oleophobic micro-coating preventing smudges.',
    category: 'Mobile Accessories',
    price: 12.99,
    stock: 150,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&auto=format&fit=crop&q=60',
    specifications: ['Hardness Level: 9H Tempered Glass', 'Thickness: 0.33mm ultra-thin', 'Clarity Factor: 99.9% transparency', 'Pack Count: 2x Shield Protectors']
  },
  {
    id: 'macc-04',
    name: 'EAJ EchoBuds True Wireless Earbuds',
    description: 'High fidelity wireless earpieces featuring hybrid active noise cancellation (ANC) and custom ambient voice overrides.',
    category: 'Mobile Accessories',
    price: 79.99,
    stock: 40,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=60',
    specifications: ['ANC Range: Up to -40dB depth', 'Dynamic Drivers: 11mm Graphene', 'Playtime: 8hrs (Buds) + 32hrs (Case)', 'Waterproof: IPX5 certified']
  },
  {
    id: 'macc-05',
    name: 'EAJ Helix Adjustable Mobile Stand',
    description: 'Reinforced dual-pivot metal desktop folding stand crafted with anti-slip rubber pads for tablets and smartphones.',
    category: 'Mobile Accessories',
    price: 15.99,
    stock: 80,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=60',
    specifications: ['Material Type: Aviation Aluminum Alloy', 'Folding state: Flat pocket-friendly', 'Rotation range: 270 degrees', 'Device suitability: Up to 12.9 inches']
  },
  {
    id: 'macc-06',
    name: 'EAJ Armored Liquid Charging Cable',
    description: 'Premium unbreakable braided nylon USB-C to USB-C heavy-duty cable with glowing color flow rate indicators.',
    category: 'Mobile Accessories',
    price: 14.99,
    stock: 200,
    image: 'https://images.unsplash.com/photo-1541660724482-62a3f2f953fc?w=500&auto=format&fit=crop&q=60',
    specifications: ['Length: 6.6 feet (2 meters)', 'Power Limit: Supports up to 100W PD', 'Data transfer Speed: 480 Mbps', 'Sheath Lifespan: 30,000+ bends tested']
  },
  {
    id: 'macc-07',
    name: 'EAJ Solara Solar Charger',
    description: 'Eco-centric outdoor foldable solar power charging tile array with water-resistant micro panels and smart output regulator.',
    category: 'Mobile Accessories',
    price: 49.99,
    stock: 22,
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=500&auto=format&fit=crop&q=60',
    specifications: ['Solar Conversion Rate: 23.5% Efficiency', 'USB Ports: Dual automatic 5V-2A Max', 'Open size: 18" x 9"', 'Folding size: 9" x 6" Travel wallet']
  },
  {
    id: 'macc-08',
    name: 'EAJ MAG-Pro Magnetic Car Mount',
    description: 'Super-strong dynamic dashboard magnetic air vent phone holder lined with gorgeous custom blue ring LEDs.',
    category: 'Mobile Accessories',
    price: 24.99,
    stock: 65,
    image: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=500&auto=format&fit=crop&q=60',
    specifications: ['Magnet Power: N52 Neodymium magnets', 'Mount Type: 2-in-1 Vent & Console', 'Rotation Range: 360-degree Ballhead', 'LED Type: Active Ambient Flow']
  },
  {
    id: 'macc-09',
    name: 'EAJ WaveSync FM Transmitter',
    description: 'In-car wireless audio expansion converter with integrated bass boost toggles and dual fast charging modules.',
    category: 'Mobile Accessories',
    price: 18.99,
    stock: 48,
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&auto=format&fit=crop&q=60',
    specifications: ['Bluetooth Version: 5.1 Stereo', 'Transmitter Range: up to 87.5-108.0MHz', 'Quick Charge: QC 3.0 Standard', 'Mic Type: Dual High Definition Mic']
  },
  {
    id: 'macc-10',
    name: 'EAJ AeroStabilizer 3-Axis Gimbal',
    description: 'Professional active smartphone stabilizing camera wand with object-tracking AI engine and tactile zoom rings.',
    category: 'Mobile Accessories',
    price: 109.99,
    stock: 16,
    image: 'https://images.unsplash.com/photo-1584438784894-089d6a128f3e?w=500&auto=format&fit=crop&q=60',
    specifications: ['Stabilization: 3-Axis Active System', 'Battery Capacity: Up to 12 Hours', 'Phone size: up to 300g load limit', 'Self-weight: 420g ergonomic']
  },

  // === CATEGORY: Computers === (6 base + 4 extras = 10 items)
  {
    id: 'comp-01',
    name: 'EAJ Zenith Ultra Thin Laptop',
    description: 'Breathtaking CNC aluminum computing rig equipped with octa-core processor and vibrant HDR infinite panels.',
    category: 'Computers',
    price: 1299.99,
    stock: 8,
    image: 'https://images.unsplash.com/photo-1496181130204-755241524eab?w=500&auto=format&fit=crop&q=60',
    specifications: ['Processor: EAJ OctaCore V3', 'Memory: 16GB dual channel LPDDR5', 'Storage Capacity: 1TB NVMe Solid State', 'Display Size: 14" OLED 3K 120Hz']
  },
  {
    id: 'comp-02',
    name: 'EAJ Horizon 27" Curved Monitor',
    description: 'Ultra-immersive curved high refresh rate monitor featuring stunning 1ms speed levels and vivid quantum-dot screens.',
    category: 'Computers',
    price: 299.99,
    stock: 12,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=60',
    specifications: ['Panel Screen: 27" VA Curved 1500R', 'Native Resolution: QHD (2560x1440)', 'Adaptive Refresh: 165Hz Sync Screen', 'Response Time: 1ms MPRT fast']
  },
  {
    id: 'comp-03',
    name: 'EAJ VaporBlast 2TB M.2 SSD',
    description: 'Cutting edge PCIe Gen5 dynamic solid-state storage solution optimized with massive custom active heatsink coolers.',
    category: 'Computers',
    price: 189.99,
    stock: 22,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&auto=format&fit=crop&q=60',
    specifications: ['Bus Interface: PCIe Gen 5.0 x4', 'Max Read Speed: Up to 14,000 MB/s', 'Max Write Speed: Up to 12,000 MB/s', 'Cooler Shield: Solid copper active fan']
  },
  {
    id: 'comp-04',
    name: 'EAJ PrismDDR5 32GB Desktop RAM',
    description: 'Extremely clocked dual-channel desktop memory module array fitted with beautiful digital liquid RGB lights.',
    category: 'Computers',
    price: 139.99,
    stock: 32,
    image: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=500&auto=format&fit=crop&q=60',
    specifications: ['Total Capacity: 32GB (2x 16GB Kit)', 'Frequency Speed: DDR5 6000MHz', 'Latency Timings: CL30 high responsive', 'Overclocking Profiler: Intel XMP 3.0']
  },
  {
    id: 'comp-05',
    name: 'EAJ V-Force RTX Graphics Card',
    description: 'Elite ray-tracing graphical rendering power core displaying triple-fan thermal guards & customizable metadata LCD.',
    category: 'Computers',
    price: 799.99,
    stock: 5,
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=500&auto=format&fit=crop&q=60',
    specifications: ['VRAM Memory: 16GB GDDR6X', 'Interface standard: PCIe 4.0 x16', 'Fan thermal layout: Triple Fluid Dynamic Fans', 'Recommended power: 750W Watts']
  },
  {
    id: 'comp-06',
    name: 'EAJ Quantum DecaCore Processor',
    description: 'Powerhouse 10-core processing unit designed to run massive multi-threaded renders at high frame speeds.',
    category: 'Computers',
    price: 349.99,
    stock: 14,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=60',
    specifications: ['Total Core Count: 10 Cores / 16 Threads', 'Base clock rate: 3.8 GHz standard', 'Max boost rate: 5.1 GHz boost', 'Thermal wattage: 125W base TDP']
  },
  {
    id: 'comp-07',
    name: 'EAJ HydroBlast 360 AIO Liquid Cooler',
    description: 'Extreme multi-chamber liquid cooling block featuring custom infinite neon tube pumps and fluid active RGB fans.',
    category: 'Computers',
    price: 129.99,
    stock: 11,
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=500&auto=format&fit=crop&q=60',
    specifications: ['Radiator Frame: 360mm Aluminum', 'Fan types: 3x 120mm Magnetic Fluid', 'Pump Speed: Stepless 3200RPM', 'CPU Sockets: AMD AM4/AM5 + Intel LGA1700']
  },
  {
    id: 'comp-08',
    name: 'EAJ DarkFortress ATX Computer Case',
    description: 'Mid-tower tactical chassis with full-surface dual tempered glass panels and front structural airflow mesh.',
    category: 'Computers',
    price: 119.99,
    stock: 15,
    image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=500&auto=format&fit=crop&q=60',
    specifications: ['Structure Type: Mid Tower ATX', 'Panel Type: Curved Solid Glass Side', 'Preinstalled Fans: 4x 120mm Neon Fans', 'Port Suite: 1x USB-C + 2x USB 3.0']
  },
  {
    id: 'comp-09',
    name: 'EAJ Proton Gold 850W Power Supply',
    description: 'Fully modular high efficiency heavy industrial power supply delivering continuous silent wattage flows safely.',
    category: 'Computers',
    price: 109.99,
    stock: 18,
    image: 'https://images.unsplash.com/photo-1616110967391-7667ff4f6764?w=500&auto=format&fit=crop&q=60',
    specifications: ['Efficiency standard: 80 PLUS Gold certified', 'Modularity layout: Fully Customizable modular', 'Main design: Single 12V output rail', 'Fan speed control: Semi-Passive fan curve']
  },
  {
    id: 'comp-10',
    name: 'EAJ HyperLink Wi-Fi 7 PCI Card',
    description: 'Ultra high-speed network adapter with magnetic multi-directional antenna array for seamless online performance.',
    category: 'Computers',
    price: 49.99,
    stock: 24,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&auto=format&fit=crop&q=60',
    specifications: ['Wireless generation: Wi-Fi 7 (802.11be)', 'Max throughput rate: 5.8 Gbps composite', 'Bluetooth: Integrated Version 5.4', 'Antenna standard: Dual-band Omni magnetic']
  },

  // === CATEGORY: Gaming === (5 base + 5 extras = 10 items)
  {
    id: 'game-01',
    name: 'EAJ SwiftStrike Gaming Mouse',
    description: 'Superlight competitive gaming mouse weighing just 58 grams, fitted with premium optical mouse core switches.',
    category: 'Gaming',
    price: 74.99,
    stock: 28,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&auto=format&fit=crop&q=60',
    specifications: ['Total weight: 58g ultra-feather', 'Tracking accuracy: 26,000 DPI Sensor', 'Lifespan value: 90 million clicks optical', 'Feet Type: 100% Virgin PTFE skates']
  },
  {
    id: 'game-02',
    name: 'EAJ Apex Cyber Keyboard',
    description: 'Rapid-firing mechanical gaming board showcasing adjustable hall-effect magnetic switches and real-time actuation tuning.',
    category: 'Gaming',
    price: 159.99,
    stock: 14,
    image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=500&auto=format&fit=crop&q=60',
    specifications: ['Switch Type: Linear Magnetic Hall Effect', 'Actuation depth: 0.1mm - 4.0mm adjustable', 'Rapid Trigger mode: Active Dynamic triggers', 'Chassis: Aerospace Grade Aluminum']
  },
  {
    id: 'game-03',
    name: 'EAJ Vector Wireless Controller',
    description: 'Ergonomic pro-style gamepad fitted with hall-effect analog sticks, back paddles, and tactile microswitch face buttons.',
    category: 'Gaming',
    price: 64.99,
    stock: 25,
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=500&auto=format&fit=crop&q=60',
    specifications: ['Stick design: Anti-Drift Hall sticks', 'Back Buttons: 4x Assignable Paddles', 'Vibration Style: Dual Asymmetrical Motor', 'Systems Supported: PC, Xbox, Switch, Android']
  },
  {
    id: 'game-04',
    name: 'EAJ Spectral RGB Mouse Pad',
    description: 'Panoramic splash-proof micro-textured gaming surface with a premium seamless 2-zone neon neon perimeter.',
    category: 'Gaming',
    price: 24.99,
    stock: 60,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=60',
    specifications: ['Physical dimensions: 36" x 16" x 0.16"', 'Surface weave: Low-friction micro-knit', 'Base layer: Non-slip textured rubber', 'Active zones: 12 lighting presets']
  },
  {
    id: 'game-05',
    name: 'EAJ Throne Dynamic Gaming Chair',
    description: 'Spacious high-back racing gaming throne featuring fully adjustable 4D armrests & ergonomic lumbar memory foam contours.',
    category: 'Gaming',
    price: 249.99,
    stock: 6,
    image: 'https://images.unsplash.com/photo-1598550476439-6847785fce6e?w=500&auto=format&fit=crop&q=60',
    specifications: ['Frame Work: Heavy-Duty steel skeletal', 'Max load capacity: 330 lbs / 150 kg', 'Upholstery leather: Premium Breathable PU', 'Reclining mechanism: 90 - 165 degrees adjust']
  },
  {
    id: 'game-06',
    name: 'EAJ Phantom Retro Arcade Controller',
    description: 'Heavy duty tactical metal desktop combat fight stick built with authentic Sanwa joysticks and responsive buttons.',
    category: 'Gaming',
    price: 139.99,
    stock: 9,
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&auto=format&fit=crop&q=60',
    specifications: ['Lever Core: Sanwa Denshi Authentic', 'Pushbuttons: 8x Sanwa OBSF-30', 'Structural frame: Heavy steel base platform', 'Wire standard: Detachable lockable USB-C']
  },
  {
    id: 'game-07',
    name: 'EAJ SoundWave Pro Capture Card',
    description: 'High-performance streaming capture interface mapping zero-lag 4K HDR playback down to crisp lossless 1080p outputs.',
    category: 'Gaming',
    price: 129.99,
    stock: 12,
    image: 'https://images.unsplash.com/photo-1612444530582-fc66183b16f7?w=500&auto=format&fit=crop&q=60',
    specifications: ['Input resolution: 4K @ 60fps HDR passthrough', 'Capture standard: Stream pristine 1080p @ 60fps', 'Connection: USB 3.0 Type-C standard', 'Software match: OBS, Streamlabs fully ready']
  },
  {
    id: 'game-08',
    name: 'EAJ AeroShield Monitor Mounted Lightbar',
    description: 'Space-saving computer screen mounted luminaire showing zero flare reflections and responsive audio neon backglow.',
    category: 'Gaming',
    price: 39.99,
    stock: 35,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=60',
    specifications: ['Light profile: Asymmetric glare-free', 'Color spectrum: Dual 2700K - 6500K spectrum', 'Rear Accent: 15-mode RGB reactive', 'Controller unit: Remote wireless rotary dial']
  },
  {
    id: 'game-09',
    name: 'EAJ Carbon Shield Console Bag',
    description: 'Custom shell dynamic carbon-composite travel luggage specialized with protective compartments for tech.',
    category: 'Gaming',
    price: 59.99,
    stock: 20,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=60',
    specifications: ['Chassis material: Unbreakable Polycarbonate shell', 'Inner layout: Shock-absorbing sponge pockets', 'Lock standard: Built-in TSA approved lock', 'Fits: Full size consoles and laptops']
  },
  {
    id: 'game-10',
    name: 'EAJ Vortex Active Console Cooler',
    description: 'Whisper-silent external active multi-fan snap-on cooling matrix displaying custom digital thermal status meters.',
    category: 'Gaming',
    price: 29.99,
    stock: 45,
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=500&auto=format&fit=crop&q=60',
    specifications: ['Fitted fans: Quad high-reliability fans', 'Fan speeds: 3 adjustable gear modes', 'Visual readout: Accurate real-time thermals Celsius', 'Noise level: Safe under 25 dBA operation']
  },

  // === CATEGORY: Smart Devices === (4 base + 6 extras = 10 items)
  {
    id: 'smart-01',
    name: 'EAJ Helix Smart Bulb Pack',
    description: 'Pack of 3 heavy output smart bulbs packing multi-color configurations, customizable presets & voice sync.',
    category: 'Smart Devices',
    price: 34.99,
    stock: 40,
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&auto=format&fit=crop&q=60',
    specifications: ['Bulb Count: 3-Pack Lightbulbs', 'Base fitting: Standard E26 fitting', 'Max power output: 800 Lumens (equivalent 60W)', 'App control: iOS & Android mesh pairing']
  },
  {
    id: 'smart-02',
    name: 'EAJ Shield Smart Wifi Plug',
    description: 'Intelligent high-efficiency smart socket allowing automatic timing schedules and detailed appliance energy metrics.',
    category: 'Smart Devices',
    price: 19.99,
    stock: 75,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&auto=format&fit=crop&q=60',
    specifications: ['Maximum Load capacity: 15A / 1800W max', 'Wi-Fi mesh standard: 2.4GHz Wi-Fi directly', 'Metrics standard: Accurate kWh Energy tracker', 'Safety certification: ETL & FCC certified']
  },
  {
    id: 'smart-03',
    name: 'EAJ Guardian Security Camera',
    description: 'Dynamic outdoor security camera projecting 2K high fidelity pictures, full color night views, and smart motion alarms.',
    category: 'Smart Devices',
    price: 89.99,
    stock: 18,
    image: 'https://images.unsplash.com/photo-1557862921-37829c790f19?w=500&auto=format&fit=crop&q=60',
    specifications: ['Camera resolution: Crisp 2K Video', 'Night vision mode: 2-LED dynamic spotlights', 'Field of view: Wide 130-degree lens', 'Durable rating: IP67 Weatherproof rating']
  },
  {
    id: 'smart-04',
    name: 'EAJ Aegis Smart Door Lock',
    description: 'Secure, modern, keyless deadbolt lock enabling premium biometric finger scans, backup codes, and auto lock.',
    category: 'Smart Devices',
    price: 179.99,
    stock: 10,
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=500&auto=format&fit=crop&q=60',
    specifications: ['Access systems: Fingerprint, PIN, Keycard, App, Key', 'Finger recognition: Rapid 0.3s scanners', 'Battery backup: Under Emergency USB-C port', 'Chassis: Toughened metal zinc alloys']
  },
  {
    id: 'smart-05',
    name: 'EAJ HydroSmart Plant Soil Monitor',
    description: 'Durable soil-insert smart biosensor sending realtime moisture, sunlight, and humidity indicators directly to smartphones.',
    category: 'Smart Devices',
    price: 24.99,
    stock: 52,
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&auto=format&fit=crop&q=60',
    specifications: ['Sensor metrics: Moisture, UV Sunlight, Temp, EC Soil', 'Connectivity standard: Low-power Bluetooth Mesh', 'Power: Single replaceable CR2032 battery', 'Durable rating: Full IP65 splash-proof']
  },
  {
    id: 'smart-06',
    name: 'EAJ AeroSync Smart Air Purifier',
    description: 'Ultra-silent cylindrical smart air cleaner containing True HEPA-H13 active filters and automatic particle metrics.',
    category: 'Smart Devices',
    price: 119.99,
    stock: 12,
    image: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=500&auto=format&fit=crop&q=60',
    specifications: ['Core filtering: 3-stage True HEPA H13 filter', 'Clean Air Delivery Rate: (CADR) 250 m³/h', 'Noise level limits: Silent 22dB sleep mode', 'Sensors suite: Air quality laser particle sensor']
  },
  {
    id: 'smart-07',
    name: 'EAJ EcoStat Smart Thermostat',
    description: 'Vibrant touchscreen wall-mounted smart climate governor featuring learning temperature presets and multiroom sensors.',
    category: 'Smart Devices',
    price: 149.99,
    stock: 14,
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=500&auto=format&fit=crop&q=60',
    specifications: ['Touch display: 3.5" Glass IPS Touches', 'HVAC Compatibility: 24V C-wire systems multi-stage', 'Eco Mode: Average 15% Power savings', 'Mesh standard: Works with standard Wi-Fi & Matter']
  },
  {
    id: 'smart-08',
    name: 'EAJ SoundForge Smart Audio Display',
    description: 'Minimalist tabletop smart smartscreen featuring high audio speakers and quick voice helper triggers.',
    category: 'Smart Devices',
    price: 79.99,
    stock: 25,
    image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=500&auto=format&fit=crop&q=60',
    specifications: ['Display size: Rich 7 inches Touchscreen', 'Speaker: Dual 5W full-spectrum speaker', 'Camera module: Built-in 5MP video call mic', 'Mesh standard: Integrated Wi-Fi and Bluetooth Hub']
  },
  {
    id: 'smart-09',
    name: 'EAJ RoboSweep Smart Vacuum V1',
    description: 'Laser-mapping smart robotic vacuum cleaner with active multi-surface vacuum power and self-emptying docks.',
    category: 'Smart Devices',
    price: 349.99,
    stock: 8,
    image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=500&auto=format&fit=crop&q=60',
    specifications: ['Navigation system: Lidar mapping system', 'Suction Power: Real 4000Pa suction', 'Emptying cycle: 60-day dust bin capacity', 'Runtime: Large 5200mAh battery (150 mins)']
  },
  {
    id: 'smart-10',
    name: 'EAJ Lumos Neon smart LED Strip',
    description: 'Fitted smart flexible neon silicone light tube enabling segmented color displays and active music sound mapping.',
    category: 'Smart Devices',
    price: 45.99,
    stock: 38,
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&auto=format&fit=crop&q=60',
    specifications: ['Strip length: 16.4 feet (5 meters)', 'Technology: RGBIC Dynamic multi-color', 'Material: Anti-glare Diffused Silicone', 'Voice control: Works directly with Voice commands']
  },

  // === CATEGORY: Office Essentials === (4 base + 6 extras = 10 items)
  {
    id: 'off-01',
    name: 'EAJ CyberWrite Smart Notebook',
    description: 'Reusable high-tech digital notepad syncing hand-written charcoal records directly to standard online storage paths.',
    category: 'Office Essentials',
    price: 34.99,
    stock: 50,
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=500&auto=format&fit=crop&q=60',
    specifications: ['Total pages: 36 reusable cloud pages', 'E-Pen: Custom smart pen with dynamic ink', 'E-Pen charging: Passive no-charge system', 'Cloud Sync: One-tap digital backup app']
  },
  {
    id: 'off-02',
    name: 'EAJ Grid Desk Organizer',
    description: 'Clean modern acrylic tabletop visual grid featuring built-in wireless charging and modular layout widgets.',
    category: 'Office Essentials',
    price: 29.99,
    stock: 45,
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=500&auto=format&fit=crop&q=60',
    specifications: ['Wireless Charger: Qi Certified 15W panel', 'Modular trays: 3 independent moving bins', 'Chassis: Premium anti-dust carbon texture', 'Footprint: 12" x 6" executive fit']
  },
  {
    id: 'off-03',
    name: 'EAJ LaserJet Ultra Printer',
    description: 'Vibrant, fast-speed, dual-sided black and white laser jet printer for crystal-clear documents and forms.',
    category: 'Office Essentials',
    price: 199.99,
    stock: 8,
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59edd6?w=500&auto=format&fit=crop&q=60',
    specifications: ['Print speed: Up to 30 pages/minute', 'Duplex printing: Fully automatic dual side', 'Connectivity: Wi-Fi, Ethernet, USB port', 'Paper capacity: 250-sheet input tray']
  },
  {
    id: 'off-04',
    name: 'EAJ ErgoPro Elite Office Chair',
    description: 'Scientific back-matching active lumbar support office task chair lined with breath-friendly light mesh skins.',
    category: 'Office Essentials',
    price: 229.99,
    stock: 7,
    image: 'https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=500&auto=format&fit=crop&q=60',
    specifications: ['Support system: Self-adjusting lumbar curve', 'Cushioning material: Multi-density cold foam', 'Armrests: 3D Adjustable height-angle', 'Gas Lift class: Heavy-duty Class 4 shock cylinders']
  },
  {
    id: 'off-05',
    name: 'EAJ Stealth Paper Shredder V2',
    description: 'High security silent cross-cut desktop material shredder handling clips, cards, and documents.',
    category: 'Office Essentials',
    price: 49.99,
    stock: 18,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&auto=format&fit=crop&q=60',
    specifications: ['Shred standard: P-4 High Security cross cuts', 'Sheet capacity: up to 10 sheets simultaneously', 'Waste reservoirbin: 4 Gallons easy-empty', 'Continuous run: 10 mins active duty']
  },
  {
    id: 'off-06',
    name: 'EAJ Infinite Desk Mat Matrix',
    description: 'Large textured protective felt pad featuring integrated premium leather accessory pockets.',
    category: 'Office Essentials',
    price: 27.99,
    stock: 55,
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=500&auto=format&fit=crop&q=60',
    specifications: ['Mat dimensions: Extra large-scale 31.5" x 15.7"', 'Material suite: Biodegradable thick premium felt', 'Base mesh: Anti-skid rubber base backing', 'Pen rail slots: Dual solid walnut slots']
  },
  {
    id: 'off-07',
    name: 'EAJ CyberDock Vertical Laptop Stand',
    description: 'Space saving gravity-clamping vertical laptop stand lined with silicone micro-gasket protective grips.',
    category: 'Office Essentials',
    price: 24.99,
    stock: 38,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=60',
    specifications: ['Clamp mechanism: Auto-gravity slide adjustment', 'Material: Solid Sandblasted Aluminum', 'Grip panels: Inner anti-abrasion Silicone', 'Device range: 0.5" to 1.6" thicknesses']
  },
  {
    id: 'off-08',
    name: 'EAJ EchoDesk Carbon Organizer Rail',
    description: 'Elegant dual tier steel workstation organizer displaying beautiful integrated headphone docks.',
    category: 'Office Essentials',
    price: 32.99,
    stock: 30,
    image: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=500&auto=format&fit=crop&q=60',
    specifications: ['Structure rails: Twin modular magnetic rails', 'Under tier hook: 360-degree pivoting headset holder', 'Clip layout: 4x rubberized cable managers', 'Body: Coated heavy steel grid']
  },
  {
    id: 'off-09',
    name: 'EAJ DigiGage Smart Postal Scale',
    description: 'High accuracy shipping parcel scale featuring bright readable neon dual display panels.',
    category: 'Office Essentials',
    price: 21.99,
    stock: 44,
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500&auto=format&fit=crop&q=60',
    specifications: ['Weight range limit: Up to 110 lbs (50 kg)', 'Tolerance resolution: Precision 2g increments', 'Units standard: lb, oz, kg, g modes', 'Display cable: 4ft retractable stretch spring']
  },
  {
    id: 'off-10',
    name: 'EAJ Lumos Slim Table LED Lamp',
    description: 'Sleek architectural swing-arm tabletop desk lamp with auto-brightness sensors and integrated USB power docks.',
    category: 'Office Essentials',
    price: 42.99,
    stock: 26,
    image: 'https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=500&auto=format&fit=crop&q=60',
    specifications: ['Maximum brightness levels: 1000 Lumens output', 'Color variations: 5 color-temp sliders', 'Sensors: Automatic light level adjustments', 'Device Charging: 5V-1.5A USB pass-through']
  }
];
