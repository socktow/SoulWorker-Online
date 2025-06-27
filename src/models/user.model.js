import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: { type: String, enum: ['admin', 'mod' , 'member'], default: 'member' },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
