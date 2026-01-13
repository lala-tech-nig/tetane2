const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    instructorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    price: { type: Number, required: true },
    currency: { type: String, default: 'NGN' },
    lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    rating: { type: Number, default: 0 },
    language: { type: String, default: 'English' }, // From UI
    level: { type: String, default: 'Beginner' }, // From UI
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // Track enrollment directly here too
}, { timestamps: true });

module.exports = mongoose.model('Course', CourseSchema);
