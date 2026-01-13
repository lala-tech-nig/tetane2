const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    title: { type: String, required: true },
    type: { type: String, enum: ['video', 'pdf', 'quiz'], required: true },
    url: { type: String, required: true }, // S3 or Vimeo URL
    duration: { type: String }, // e.g. "12:04"
    isPreview: { type: Boolean, default: false } // For free preview
}, { timestamps: true });

module.exports = mongoose.model('Lesson', LessonSchema);
