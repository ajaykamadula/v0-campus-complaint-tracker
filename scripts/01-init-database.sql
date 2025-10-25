-- Create locations table
CREATE TABLE IF NOT EXISTS locations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  building VARCHAR(100),
  floor INT,
  qr_code_data TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  color VARCHAR(7),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create complaints table
CREATE TABLE IF NOT EXISTS complaints (
  id SERIAL PRIMARY KEY,
  location_id INT NOT NULL REFERENCES locations(id),
  category_id INT NOT NULL REFERENCES categories(id),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'open',
  priority VARCHAR(20) DEFAULT 'medium',
  image_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id SERIAL PRIMARY KEY,
  complaint_id INT NOT NULL REFERENCES complaints(id),
  message TEXT NOT NULL,
  type VARCHAR(50),
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create feedback table
CREATE TABLE IF NOT EXISTS feedback (
  id SERIAL PRIMARY KEY,
  complaint_id INT NOT NULL REFERENCES complaints(id),
  status_update VARCHAR(50),
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample categories
INSERT INTO categories (name, description, color) VALUES
  ('Maintenance', 'Building maintenance issues', '#3B82F6'),
  ('Cleanliness', 'Cleanliness and hygiene issues', '#10B981'),
  ('Safety', 'Safety concerns', '#EF4444'),
  ('Facilities', 'Facilities and amenities', '#F59E0B'),
  ('Other', 'Other issues', '#8B5CF6')
ON CONFLICT (name) DO NOTHING;

-- Insert sample locations
INSERT INTO locations (name, building, floor, qr_code_data) VALUES
  ('Library Main Entrance', 'Library', 1, 'https://campus-tracker.com/location/1'),
  ('Cafeteria', 'Student Center', 2, 'https://campus-tracker.com/location/2'),
  ('Gym', 'Sports Complex', 1, 'https://campus-tracker.com/location/3'),
  ('Dormitory A', 'Dorm A', 3, 'https://campus-tracker.com/location/4'),
  ('Computer Lab', 'Tech Building', 2, 'https://campus-tracker.com/location/5')
ON CONFLICT (qr_code_data) DO NOTHING;
