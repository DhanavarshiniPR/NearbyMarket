const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Electronics',
      'Furniture',
      'Fashion',
      'Books',
      'Sports',
      'Vehicles',
      'Home & Garden',
      'Other'
    ]
  },
  condition: {
    type: String,
    required: true,
    enum: ['New', 'Like New', 'Excellent', 'Good', 'Fair', 'For Parts']
  },
  location: {
    type: String,
    required: true
  },
  images: [{
    type: String,
    required: true
  }],
  seller: {
    name: {
      type: String,
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    rating: {
      type: Number,
      default: 0
    },
    totalSales: {
      type: Number,
      default: 0
    }
  },
  tags: [{
    type: String
  }],
  status: {
    type: String,
    enum: ['available', 'sold', 'pending'],
    default: 'available'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamp on save
productSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Product', productSchema); 