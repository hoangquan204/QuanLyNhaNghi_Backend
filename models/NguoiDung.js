const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const nguoiDungSchema = new mongoose.Schema(
  {
    hoVaTen: {
      type: String,
      required: [true, "Vui lòng nhập họ và tên"],
      trim: true,
    },

    tenDangNhap: {
      type: String,
      required: [true, "Vui lòng nhập tên đăng nhập"],
      unique: true,
      lowercase: true,
      trim: true,
      minlength: [3, "Tên đăng nhập phải từ 3 ký tự"],
      match: [/^[a-z0-9._]+$/, "Tên đăng nhập chỉ gồm chữ thường, số, dấu chấm và gạch dưới"],
    },

    email: {
      type: String,
      required: [true, "Vui lòng nhập email"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Email không hợp lệ"],
    },

    matKhau: {
      type: String,
      required: [true, "Vui lòng nhập mật khẩu"],
      minlength: [6, "Mật khẩu phải từ 6 ký tự"],
      select: false,
    },

    vaiTro: {
      type: String,
      enum: ["admin", "nhanVien"],
      default: "nhanVien",
    },

    isActive: { type: Boolean, default: true },

    avatar: { type: String, default: "" },

    // Refresh token để duy trì phiên đăng nhập
    refreshToken: {
      type: String,
      select: false,
      default: null,
    },
  },
  { timestamps: true }
);

// Hash password trước khi lưu
nguoiDungSchema.pre("save", async function (next) {
  if (!this.isModified("matKhau")) return next();
  this.matKhau = await bcrypt.hash(this.matKhau, 12);
  next();
});

// So sánh password
nguoiDungSchema.methods.kiemTraMatKhau = async function (matKhauNhap) {
  return await bcrypt.compare(matKhauNhap, this.matKhau);
};

module.exports = mongoose.model("NguoiDung", nguoiDungSchema);
