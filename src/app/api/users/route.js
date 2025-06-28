import { connectMongo } from '@/lib/mongodb';
import { User } from '@/models/user.model';
import bcrypt from 'bcryptjs';

// GET - Lấy danh sách users
export async function GET() {
  try {
    await connectMongo();
    const users = await User.find({}, { password: 0 }).sort({ createdAt: -1 });
    
    return Response.json({ 
      success: true, 
      data: users 
    });
  } catch (error) {
    console.error('GET Users Error:', error);
    return Response.json({ 
      success: false, 
      message: error.message 
    }, { status: 500 });
  }
}

// POST - Tạo user mới
export async function POST(request) {
  try {
    await connectMongo();
    const body = await request.json();
    const { username, email, password } = body;

    // Validation
    if (!username || !email || !password) {
      return Response.json({ 
        success: false, 
        message: 'Username, email và password là bắt buộc' 
      }, { status: 400 });
    }

    // Kiểm tra username đã tồn tại
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return Response.json({ 
        success: false, 
        message: 'Username đã tồn tại' 
      }, { status: 400 });
    }

    // Kiểm tra email đã tồn tại
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return Response.json({ 
        success: false, 
        message: 'Email đã tồn tại' 
      }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Tạo user mới
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    
    // Trả về user không có password
    const userResponse = {
      _id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      createdAt: savedUser.createdAt,
      updatedAt: savedUser.updatedAt,
      isActive: savedUser.isActive,
    };

    return Response.json({ 
      success: true, 
      message: 'User created successfully',
      data: userResponse
    }, { status: 201 });
    
  } catch (error) {
    console.error('POST User Error:', error);
    return Response.json({ 
      success: false, 
      message: error.message 
    }, { status: 500 });
  }
} 