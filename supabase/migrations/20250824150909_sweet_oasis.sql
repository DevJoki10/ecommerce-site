/*
  # Seed Data for KJ Electronics

  1. Categories and Subcategories
  2. Sample Products
  3. Admin User Setup
  4. Shipping Zones
  5. Initial Configuration
*/

-- Insert main categories
INSERT INTO categories (name, slug, description, icon, sort_order) VALUES
('Sensors & Modules', 'sensors-modules', 'Electronic sensors, modules, and IoT components', '🔧', 1),
('Electronics & Components', 'electronics-components', 'Basic electronic components like resistors, capacitors, and ICs', '⚡', 2),
('Power & Energy Solutions', 'power-energy', 'Batteries, chargers, inverters, and power management', '🔋', 3),
('Electrical Tools & Equipment', 'tools-equipment', 'Measurement tools, soldering equipment, and testing devices', '🛠️', 4),
('Audio & Sound Systems', 'audio-sound', 'Microphones, speakers, amplifiers, and audio equipment', '🎵', 5),
('Electronics Wiring & Connectors', 'wiring-connectors', 'Cables, connectors, and wiring accessories', '🔌', 6),
('Home Essentials and Appliances', 'home-appliances', 'Home electronics, appliances, and gaming accessories', '🏠', 7);

-- Get category IDs for subcategories
DO $$
DECLARE
    sensors_id uuid;
    electronics_id uuid;
    power_id uuid;
    tools_id uuid;
    audio_id uuid;
    wiring_id uuid;
    home_id uuid;
BEGIN
    SELECT id INTO sensors_id FROM categories WHERE slug = 'sensors-modules';
    SELECT id INTO electronics_id FROM categories WHERE slug = 'electronics-components';
    SELECT id INTO power_id FROM categories WHERE slug = 'power-energy';
    SELECT id INTO tools_id FROM categories WHERE slug = 'tools-equipment';
    SELECT id INTO audio_id FROM categories WHERE slug = 'audio-sound';
    SELECT id INTO wiring_id FROM categories WHERE slug = 'wiring-connectors';
    SELECT id INTO home_id FROM categories WHERE slug = 'home-appliances';

    -- Sensors & Modules subcategories
    INSERT INTO categories (name, slug, parent_id, sort_order) VALUES
    ('Basic Sensors', 'basic-sensors', sensors_id, 1),
    ('Environmental & Utility Sensors', 'environmental-sensors', sensors_id, 2),
    ('Smart Modules & IoT Boards', 'smart-modules', sensors_id, 3),
    ('Display & Control', 'display-control', sensors_id, 4),
    ('Motors & Drivers', 'motors-drivers', sensors_id, 5),
    ('Power Modules', 'power-modules', sensors_id, 6),
    ('Microcontrollers & Boards', 'microcontrollers', sensors_id, 7),
    ('DIY Kits', 'diy-kits', sensors_id, 8),
    ('Cooling & Fans', 'cooling-fans', sensors_id, 9),
    ('Transformers', 'transformers', sensors_id, 10);

    -- Electronics & Components subcategories
    INSERT INTO categories (name, slug, parent_id, sort_order) VALUES
    ('Resistors', 'resistors', electronics_id, 1),
    ('Capacitors', 'capacitors', electronics_id, 2),
    ('Transistors', 'transistors', electronics_id, 3),
    ('Diodes & Rectifiers', 'diodes-rectifiers', electronics_id, 4),
    ('ICs (Integrated Circuits)', 'integrated-circuits', electronics_id, 5);

    -- Power & Energy subcategories
    INSERT INTO categories (name, slug, parent_id, sort_order) VALUES
    ('Batteries', 'batteries', power_id, 1),
    ('Chargers & Power Management', 'chargers-power', power_id, 2),
    ('Inverters & Solar Systems', 'inverters-solar', power_id, 3),
    ('Converters and Adapters', 'converters-adapters', power_id, 4);

    -- Tools & Equipment subcategories
    INSERT INTO categories (name, slug, parent_id, sort_order) VALUES
    ('Measurement Tools', 'measurement-tools', tools_id, 1),
    ('Soldering Tools & Accessories', 'soldering-tools', tools_id, 2),
    ('Heat & Rework Tools', 'heat-rework-tools', tools_id, 3),
    ('Battery Welding & Assembly', 'battery-welding', tools_id, 4),
    ('PCB Fabrication & Prototyping', 'pcb-fabrication', tools_id, 5);

    -- Audio & Sound subcategories
    INSERT INTO categories (name, slug, parent_id, sort_order) VALUES
    ('Microphones', 'microphones', audio_id, 1),
    ('Sound & Musical Accessories', 'sound-accessories', audio_id, 2),
    ('Home Theater', 'home-theater', audio_id, 3),
    ('Public Address Systems', 'pa-systems', audio_id, 4);

    -- Home Appliances subcategories
    INSERT INTO categories (name, slug, parent_id, sort_order) VALUES
    ('Home Appliances', 'home-appliances-sub', home_id, 1),
    ('Power & Lighting', 'power-lighting', home_id, 2),
    ('Audio, Gaming & Accessories', 'audio-gaming', home_id, 3);
END $$;

-- Insert sample products
DO $$
DECLARE
    electronics_cat_id uuid;
    sensors_cat_id uuid;
    resistors_cat_id uuid;
    basic_sensors_cat_id uuid;
    admin_id uuid := gen_random_uuid();
BEGIN
    SELECT id INTO electronics_cat_id FROM categories WHERE slug = 'electronics-components';
    SELECT id INTO sensors_cat_id FROM categories WHERE slug = 'sensors-modules';
    SELECT id INTO resistors_cat_id FROM categories WHERE slug = 'resistors';
    SELECT id INTO basic_sensors_cat_id FROM categories WHERE slug = 'basic-sensors';

    -- Create admin profile first
    INSERT INTO profiles (id, email, full_name, role) VALUES
    (admin_id, 'admin@kjelectronics.com', 'KJ Electronics Admin', 'admin');

    -- Sample Electronics Components (no images)
    INSERT INTO products (seller_id, category_id, name, slug, description, short_description, price, inventory_quantity, specifications, key_features, applications, usage_instructions, safety_cautions, status, is_featured) VALUES
    (admin_id, resistors_cat_id, '1/4W Resistor Kit (100 pieces)', '1-4w-resistor-kit-100pcs', 
     'Complete assortment of 1/4W carbon film resistors ranging from 0.20Ω to 910kΩ. Perfect for electronics projects, repairs, and prototyping. Each resistor is color-coded for easy identification.',
     'Complete 1/4W resistor kit with 100 pieces, perfect for electronics projects',
     2500, 120,
     '{"Power Rating": "1/4W (0.25W)", "Tolerance": "±5%", "Temperature Coefficient": "±200 ppm/°C", "Operating Temperature": "-55°C to +155°C", "Resistance Range": "0.20Ω to 910kΩ", "Construction": "Carbon Film", "Lead Material": "Tinned Copper", "Body Length": "6.5mm ±0.5mm", "Body Diameter": "2.3mm ±0.3mm", "Lead Diameter": "0.6mm ±0.05mm", "Lead Length": "28mm ±3mm", "Packaging": "Bulk pack with value list"}',
     ARRAY['100 pieces assorted resistor kit', '1/4W power rating', 'Carbon film construction', 'Color-coded for easy identification', '±5% tolerance', 'Wide resistance range (0.20Ω - 910kΩ)', 'Suitable for breadboard use', 'Lead-free construction'],
     ARRAY['Electronic circuit prototyping', 'Current limiting applications', 'Voltage divider circuits', 'Pull-up and pull-down resistors', 'LED current limiting', 'Analog signal conditioning', 'Filter circuits', 'Amplifier biasing'],
     ARRAY['Identify resistance value using color code', 'Check polarity (resistors are non-polar)', 'Insert into breadboard or PCB', 'Solder connections if permanent', 'Verify resistance with multimeter', 'Ensure power rating is adequate', 'Use appropriate safety margins', 'Store unused resistors properly'],
     ARRAY['Do not exceed 1/4W power rating', 'Avoid overheating during soldering', 'Check resistance value before use', 'Use proper wattage for your application', 'Handle leads carefully to avoid breakage', 'Store in dry environment', 'Avoid mechanical stress on body', 'Double-check connections in critical circuits'],
     'active', true),

    (admin_id, resistors_cat_id, '2W Resistor 10Ω', '2w-resistor-10-ohm', 
     'High-power 2W metal film resistor with 10Ω resistance value. Suitable for power applications and high-current circuits.',
     '2W metal film resistor, 10Ω resistance value',
     150, 50,
     '{"Power Rating": "2W", "Resistance": "10Ω", "Tolerance": "±5%", "Temperature Coefficient": "±100 ppm/°C", "Construction": "Metal Film"}',
     ARRAY['2W power rating', 'Metal film construction', '±5% tolerance', 'High stability', 'Low noise'],
     ARRAY['Power supply circuits', 'Current sensing', 'Load testing', 'Power amplifiers'],
     ARRAY['Check power requirements', 'Mount with adequate cooling', 'Verify resistance value', 'Use proper heat sinking if needed'],
     ARRAY['Do not exceed 2W power rating', 'Ensure adequate ventilation', 'Handle with care when hot'],
     'active', false);

    -- Sample Sensors & Modules (with images)
    INSERT INTO products (seller_id, category_id, name, slug, description, short_description, price, inventory_quantity, images, specifications, key_features, applications, usage_instructions, safety_cautions, status, is_featured) VALUES
    (admin_id, basic_sensors_cat_id, 'Arduino Uno R3 Development Board', 'arduino-uno-r3-development-board',
     'The Arduino Uno R3 is a microcontroller board based on the ATmega328P. It has 14 digital input/output pins, 6 analog inputs, a 16 MHz ceramic resonator, a USB connection, a power jack, an ICSP header and a reset button.',
     'Arduino Uno R3 microcontroller board with ATmega328P',
     15000, 45,
     ARRAY['https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=800'],
     '{"Microcontroller": "ATmega328P", "Operating Voltage": "5V", "Input Voltage (recommended)": "7-12V", "Input Voltage (limit)": "6-20V", "Digital I/O Pins": "14 (6 PWM)", "Analog Input Pins": "6", "DC Current per I/O Pin": "20 mA", "DC Current for 3.3V Pin": "50 mA", "Flash Memory": "32 KB (0.5 KB bootloader)", "SRAM": "2 KB", "EEPROM": "1 KB", "Clock Speed": "16 MHz", "Length": "68.6 mm", "Width": "53.4 mm", "Weight": "25 g"}',
     ARRAY['ATmega328P microcontroller', '14 digital I/O pins (6 PWM outputs)', '6 analog input pins', '16 MHz crystal oscillator', 'USB connection for programming', 'Power jack (7-12V recommended)', 'ICSP header for direct programming', 'Reset button'],
     ARRAY['IoT projects and prototyping', 'Educational electronics learning', 'Home automation systems', 'Robotics and motor control', 'Sensor data acquisition', 'LED lighting projects', 'Temperature monitoring', 'Security systems'],
     ARRAY['Connect to computer via USB cable', 'Install Arduino IDE software', 'Select Arduino Uno board type', 'Write or load your sketch code', 'Upload code to the board', 'Connect sensors and components', 'Power via USB or external adapter', 'Monitor serial output if needed'],
     ARRAY['Do not exceed input voltage limits (6-20V)', 'Avoid short circuits on I/O pins', 'Use proper current limiting resistors', 'Disconnect power when wiring', 'Handle with care to avoid static damage', 'Do not reverse polarity on power connections', 'Keep away from moisture and extreme temperatures', 'Use genuine Arduino boards for best compatibility'],
     'active', true),

    (admin_id, basic_sensors_cat_id, 'DHT22 Temperature & Humidity Sensor', 'dht22-temperature-humidity-sensor',
     'High-precision digital temperature and humidity sensor with calibrated digital signal output. Perfect for weather monitoring, HVAC systems, and environmental control projects.',
     'Digital temperature and humidity sensor with high precision',
     8000, 75,
     ARRAY['https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=400'],
     '{"Temperature Range": "-40°C to +80°C", "Humidity Range": "0-100% RH", "Temperature Accuracy": "±0.5°C", "Humidity Accuracy": "±2% RH", "Resolution": "0.1°C, 0.1% RH", "Operating Voltage": "3.3-6V DC", "Current": "1-1.5mA", "Sampling Period": "2 seconds"}',
     ARRAY['High precision measurements', 'Calibrated digital output', 'Long-term stability', 'Low power consumption', 'Single-wire digital interface'],
     ARRAY['Weather stations', 'HVAC control systems', 'Environmental monitoring', 'Greenhouse automation', 'Data logging', 'Smart home systems'],
     ARRAY['Connect VCC to 3.3-5V', 'Connect GND to ground', 'Connect DATA to digital pin', 'Use pull-up resistor (4.7kΩ-10kΩ)', 'Wait 2 seconds between readings', 'Use appropriate library for your platform'],
     ARRAY['Do not exceed maximum voltage', 'Avoid condensation on sensor', 'Handle with care to prevent damage', 'Keep away from corrosive gases'],
     'active', true);
END $$;

-- Insert shipping zones
INSERT INTO shipping_zones (name, countries, states, base_rate, per_km_rate, free_shipping_threshold) VALUES
('Nigeria - Lagos/Ibadan', ARRAY['Nigeria'], ARRAY['Lagos', 'Ogun'], 500, 100, 50000),
('Nigeria - Other States', ARRAY['Nigeria'], ARRAY['Abuja', 'Kano', 'Rivers', 'Kaduna', 'Oyo', 'Imo', 'Enugu', 'Delta', 'Edo', 'Kwara', 'Osun', 'Ondo', 'Anambra', 'Abia', 'Plateau', 'Cross River', 'Akwa Ibom', 'Borno', 'Bauchi', 'Katsina', 'Jigawa', 'Adamawa', 'Gombe', 'Yobe', 'Taraba', 'Kebbi', 'Sokoto', 'Zamfara', 'Niger', 'Kogi', 'Benue', 'Nasarawa', 'Bayelsa', 'Ebonyi', 'Ekiti'], 500, 80, 50000),
('West Africa', ARRAY['Ghana', 'Benin', 'Togo', 'Burkina Faso', 'Mali', 'Senegal', 'Guinea', 'Sierra Leone', 'Liberia', 'Ivory Coast'], 5000, 0, 100000),
('International', ARRAY['United States', 'United Kingdom', 'Canada', 'Germany', 'France', 'Australia', 'South Africa'], 15000, 0, 200000);

-- Insert sample coupons
INSERT INTO coupons (code, type, value, minimum_amount, usage_limit, expires_at) VALUES
('WELCOME10', 'percentage', 10, 5000, 1000, now() + interval '30 days'),
('NEWUSER20', 'percentage', 20, 10000, 500, now() + interval '60 days'),
('BULK50', 'fixed', 5000, 50000, 100, now() + interval '90 days');