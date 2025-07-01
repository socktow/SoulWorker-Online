import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  // Tài khoản cơ bản
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 20,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },

  // Thông tin hệ thống
  sCoin: {
    type: Number,
    default: 0,
    min: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  lastLogin: {
    type: Date,
  },
  lastLogout: {
    type: Date,
  },

  // Câu hỏi bảo mật
  securityQuestion: {
    question: { type: String, default: null },
    answer: { type: String, default: null }, // Bạn có thể mã hóa nếu cần
  },

  // Tùy chọn người dùng
  receivePromotions: {
    type: Boolean,
    default: true,
  },

  // Avatar
  avatarUrl: {
    type: String,
    default: null,
  },

  // Forum activity
  forum: {
    createdTopics: { type: Number, default: 0 },
    leftComments: { type: Number, default: 0 },
    receivedLikes: { type: Number, default: 0 },
    bookmarkedTopics: { type: Number, default: 0 },
    sanction: { type: String, default: 'None' },
  },

  // Inquiry thống kê
  inquiryStats: {
    total: { type: Number, default: 0 },
    answered: { type: Number, default: 0 },
    notAnswered: { type: Number, default: 0 },
  },

  // Thời gian tạo/cập nhật
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware cập nhật updatedAt trước khi lưu
UserSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

export const User = mongoose.models.User || mongoose.model('User', UserSchema);
