export const products = [
  {
    id: 1,
    title: 'iPhone 13 Pro',
    price: 699,
    description: 'Barely used iPhone 13 Pro with all accessories. Perfect condition with no scratches.',
    category: 'Electronics',
    condition: 'Like New',
    location: 'New York',
    seller: {
      name: 'John Doe',
      rating: 4.5,
      totalSales: 28
    },
    images: [
      'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    specifications: [
      { label: 'Storage', value: '256GB' },
      { label: 'Color', value: 'Pacific Blue' },
      { label: 'Battery Health', value: '94%' },
      { label: 'Warranty', value: 'Until Dec 2023' },
    ],
    tags: ['apple', 'smartphone', 'mobile'],
  },
  {
    id: 2,
    title: 'Leather Sofa',
    price: 450,
    description: 'Comfortable leather sofa in brown color. Perfect for your living room.',
    category: 'Furniture',
    condition: 'Good',
    location: 'Los Angeles',
    seller: {
      name: 'Sarah Wilson',
      rating: 4.8,
      totalSales: 15
    },
    images: [
      'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/276566/pexels-photo-276566.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    specifications: [
      { label: 'Material', value: 'Genuine Leather' },
      { label: 'Color', value: 'Brown' },
      { label: 'Dimensions', value: '84" x 38" x 34"' },
      { label: 'Age', value: '2 years' },
    ],
    tags: ['furniture', 'sofa', 'leather', 'living room'],
  },
  {
    id: 3,
    title: 'Mountain Bike',
    price: 299,
    description: 'High-quality mountain bike, perfect for trails and outdoor adventures.',
    category: 'Sports',
    condition: 'Excellent',
    location: 'Denver',
    seller: {
      name: 'Mike Johnson',
      rating: 4.7,
      totalSales: 22
    },
    images: [
      'https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/5465247/pexels-photo-5465247.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2158963/pexels-photo-2158963.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    specifications: [
      { label: 'Brand', value: 'Trek' },
      { label: 'Frame Size', value: '19"' },
      { label: 'Gears', value: '21-Speed' },
      { label: 'Type', value: 'Mountain Bike' },
    ],
    tags: ['bike', 'sports', 'outdoor', 'mountain bike'],
  },
  {
    id: 4,
    title: 'Designer Handbag',
    price: 199,
    description: 'Authentic designer handbag in excellent condition. Perfect for any occasion.',
    category: 'Fashion',
    condition: 'Like New',
    location: 'Miami',
    seller: {
      name: 'Emma Davis',
      rating: 4.9,
      totalSales: 45
    },
    images: [
      'https://images.pexels.com/photos/904350/pexels-photo-904350.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1936848/pexels-photo-1936848.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    specifications: [
      { label: 'Brand', value: 'Gucci' },
      { label: 'Material', value: 'Leather' },
      { label: 'Color', value: 'Black' },
      { label: 'Style', value: 'Shoulder Bag' },
    ],
    tags: ['fashion', 'handbag', 'designer', 'accessories'],
  },
  {
    id: 5,
    title: 'Gaming Console',
    price: 250,
    description: 'Latest gaming console with two controllers and popular games included.',
    category: 'Electronics',
    condition: 'Good',
    location: 'Chicago',
    seller: {
      name: 'Alex Thompson',
      rating: 4.6,
      totalSales: 33
    },
    images: [
      'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/13189272/pexels-photo-13189272.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    specifications: [
      { label: 'Brand', value: 'PlayStation' },
      { label: 'Model', value: 'PS5' },
      { label: 'Storage', value: '1TB' },
      { label: 'Includes', value: '2 Controllers + 3 Games' },
    ],
    tags: ['gaming', 'electronics', 'console', 'playstation'],
  },
  {
    id: 6,
    title: 'Vintage Watch',
    price: 599,
    description: 'Classic vintage watch in excellent condition. A true collector\'s item.',
    category: 'Fashion',
    condition: 'Excellent',
    location: 'Boston',
    seller: {
      name: 'Robert Miller',
      rating: 5.0,
      totalSales: 19
    },
    images: [
      'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/280250/pexels-photo-280250.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/364822/pexels-photo-364822.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    specifications: [
      { label: 'Brand', value: 'Omega' },
      { label: 'Movement', value: 'Automatic' },
      { label: 'Year', value: '1965' },
      { label: 'Case Material', value: '18K Gold' },
    ],
    tags: ['watch', 'vintage', 'luxury', 'accessories'],
  },
  {
    id: 7,
    title: 'Garden Tool Set',
    price: 89,
    description: 'Complete 12-piece garden tool set with storage bag. Perfect for all your gardening needs.',
    category: 'Home & Garden',
    condition: 'New',
    location: 'Portland',
    seller: {
      name: 'Lisa Green',
      rating: 4.8,
      totalSales: 56
    },
    images: [
      'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1094767/pexels-photo-1094767.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    specifications: [
      { label: 'Items Included', value: '12 pieces' },
      { label: 'Material', value: 'Stainless Steel' },
      { label: 'Warranty', value: '2 years' },
      { label: 'Storage', value: 'Canvas Bag Included' },
    ],
    tags: ['garden', 'tools', 'outdoor', 'gardening'],
  },
  {
    id: 8,
    title: 'Best-Selling Novel Collection',
    price: 45,
    description: 'Collection of 5 best-selling novels in excellent condition. Perfect for book lovers.',
    category: 'Books',
    condition: 'Like New',
    location: 'Seattle',
    seller: {
      name: 'Mark Reader',
      rating: 4.9,
      totalSales: 124
    },
    images: [
      'https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/694740/pexels-photo-694740.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    specifications: [
      { label: 'Quantity', value: '5 Books' },
      { label: 'Genre', value: 'Mixed Fiction' },
      { label: 'Language', value: 'English' },
      { label: 'Format', value: 'Hardcover' },
    ],
    tags: ['books', 'reading', 'novels', 'literature'],
  },
  {
    id: 9,
    title: 'Electric Scooter',
    price: 599,
    description: 'High-performance electric scooter with long-range battery and smart features. Perfect for urban commuting.',
    category: 'Transportation',
    condition: 'New',
    location: 'San Francisco',
    seller: {
      name: 'Tech Mobility',
      rating: 4.8,
      totalSales: 67
    },
    images: [
      'https://cdn.bikedekho.com/processedimages/bgauss/c12i-max/source/c12i-max67f7bb495bc9b.jpg?imwidth=400&impolicy=resize',
      'https://images.pexels.com/photos/7290989/pexels-photo-7290989.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/7290986/pexels-photo-7290986.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    specifications: [
      { label: 'Range', value: '25 miles' },
      { label: 'Top Speed', value: '20 mph' },
      { label: 'Battery', value: '36V 10.4Ah' },
      { label: 'Weight', value: '30 lbs' },
      { label: 'Max Load', value: '265 lbs' },
      { label: 'Charging Time', value: '4-5 hours' }
    ],
    tags: ['electric', 'scooter', 'transportation', 'eco-friendly', 'commuting'],
  },
  {
    id: 10,
    title: 'Professional Tennis Racket',
    price: 159,
    description: 'High-end tennis racket with carrying case. Used by professionals.',
    category: 'Sports',
    condition: 'Excellent',
    location: 'Austin',
    seller: {
      name: 'Tom Wilson',
      rating: 4.7,
      totalSales: 38
    },
    images: [
      'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/5739101/pexels-photo-5739101.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/5739151/pexels-photo-5739151.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    specifications: [
      { label: 'Brand', value: 'Wilson' },
      { label: 'Weight', value: '300g' },
      { label: 'Grip Size', value: '4 3/8"' },
      { label: 'Includes', value: 'Racket & Case' },
    ],
    tags: ['tennis', 'sports', 'racket', 'athletic'],
  },
  {
    id: 11,
    title: 'Classic Mustang 1967',
    price: 28500,
    description: 'Beautifully restored 1967 Ford Mustang. Red exterior with black interior.',
    category: 'Vehicles',
    condition: 'Restored',
    location: 'Dallas',
    seller: {
      name: 'James Carter',
      rating: 5.0,
      totalSales: 12
    },
    images: [
      'https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/5214795/pexels-photo-5214795.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/7556677/pexels-photo-7556677.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    specifications: [
      { label: 'Year', value: '1967' },
      { label: 'Mileage', value: '85,000' },
      { label: 'Engine', value: 'V8' },
      { label: 'Transmission', value: 'Manual' },
    ],
    tags: ['mustang', 'classic car', 'vintage', 'ford'],
  },
  {
    id: 12,
    title: 'Indoor Plant Collection',
    price: 120,
    description: 'Set of 5 healthy indoor plants with decorative pots. Perfect for home decoration.',
    category: 'Home & Garden',
    condition: 'New',
    location: 'San Diego',
    seller: {
      name: 'Emily Gardens',
      rating: 4.9,
      totalSales: 89
    },
    images: [
      'https://images.pexels.com/photos/3125195/pexels-photo-3125195.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    specifications: [
      { label: 'Plants Included', value: '5 Different Species' },
      { label: 'Pot Material', value: 'Ceramic' },
      { label: 'Size', value: 'Mixed Sizes' },
      { label: 'Care Level', value: 'Easy to Maintain' },
    ],
    tags: ['plants', 'indoor', 'decoration', 'garden'],
  },
  {
    id: 13,
    title: 'Vintage Cookbook Collection',
    price: 75,
    description: 'Collection of 10 vintage cookbooks from the 1950s-1970s. Rare recipes and beautiful illustrations.',
    category: 'Books',
    condition: 'Good',
    location: 'Chicago',
    seller: {
      name: 'Martha Stewart',
      rating: 4.8,
      totalSales: 67
    },
    images: [
      'https://m.media-amazon.com/images/I/A1AQd9XdtPL._SY385_.jpg',
      'https://images.pexels.com/photos/6442576/pexels-photo-6442576.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/6442563/pexels-photo-6442563.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    specifications: [
      { label: 'Quantity', value: '10 Books' },
      { label: 'Era', value: '1950s-1970s' },
      { label: 'Condition', value: 'Well Preserved' },
      { label: 'Type', value: 'Hardcover' },
    ],
    tags: ['cookbooks', 'vintage', 'cooking', 'recipes'],
  },
  {
    id: 14,
    title: 'Golf Club Set',
    price: 450,
    description: 'Complete set of professional golf clubs with bag. Ideal for both beginners and intermediates.',
    category: 'Sports',
    condition: 'Excellent',
    location: 'Phoenix',
    seller: {
      name: 'Golf Pro Shop',
      rating: 4.9,
      totalSales: 156
    },
    images: [
      'https://images.pexels.com/photos/1325750/pexels-photo-1325750.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1325752/pexels-photo-1325752.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1325756/pexels-photo-1325756.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    specifications: [
      { label: 'Clubs Included', value: '14 pieces' },
      { label: 'Brand', value: 'Callaway' },
      { label: 'Material', value: 'Graphite & Steel' },
      { label: 'Includes', value: 'Clubs, Bag & Covers' },
    ],
    tags: ['golf', 'sports', 'clubs', 'athletic'],
  },
  {
    id: 15,
    title: 'Modern Patio Set',
    price: 699,
    description: 'Contemporary 6-piece patio furniture set. Weather-resistant and stylish.',
    category: 'Home & Garden',
    condition: 'New',
    location: 'Miami',
    seller: {
      name: 'Outdoor Living',
      rating: 4.7,
      totalSales: 92
    },
    images: [
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1643385/pexels-photo-1643385.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    specifications: [
      { label: 'Pieces', value: '6-Piece Set' },
      { label: 'Material', value: 'Weather-Resistant Wicker' },
      { label: 'Color', value: 'Gray' },
      { label: 'Includes', value: 'Cushions & Covers' },
    ],
    tags: ['patio', 'furniture', 'outdoor', 'garden'],
  }
]; 