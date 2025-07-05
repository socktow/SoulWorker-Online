import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    packId: { type: Number, required: true },
    cash: { type: Number, required: true },
    coin: { type: Number, required: true },
    provider: { type: String, enum: ['momo', 'zalopay'], required: true },
    orderId: { type: String, required: true, unique: true },
    requestId: { type: String }, // cho MoMo
    transId: { type: String },   // cho ZaloPay
    status: { type: String, enum: ['pending', 'success', 'failed'], default: 'pending' },
    paymentData: { type: Object }, // lưu JSON raw trả về từ MoMo/Zalo
  },
  { timestamps: true }
);

export const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
