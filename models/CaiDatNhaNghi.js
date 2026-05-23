const mongoose = require("mongoose");

/**
 * MODEL: Cài đặt nhà nghỉ (Hotel Settings - Singleton)
 * Nguồn: Trang "Cài đặt" → "Thông tin nhà nghỉ" + "Cài đặt giá phòng"
 * Chỉ có 1 document duy nhất trong collection này
 */
const caiDatNhaNghiSchema = new mongoose.Schema(
  {
    tenNhaNghi: {
      type: String,
      default: "Nhà Nghỉ Bình An",
    },

    diaChi: {
      type: String,
      default: "",
    },

    soDienThoai: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      default: "",
    },

    // Giờ check-in / check-out mặc định
    gioCheckIn: {
      type: String,
      default: "14:00",
    },

    gioCheckOut: {
      type: String,
      default: "12:00",
    },

    // Bảng giá theo loại phòng (thay cho Settings riêng)
    bangGia: [
      {
        loaiPhong: {
          type: String,
          enum: ["Phòng đơn", "Phòng đôi", "VIP Suite"],
        },
        giaTheoDeom: { type: Number, default: 0 },
        giaTheoGio: { type: Number, default: 0 },
      },
    ],

    // Sao lưu tự động
    saoLuuTuDong: {
      type: Boolean,
      default: true,
    },

    thoiGianSaoLuuGanNhat: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CaiDatNhaNghi", caiDatNhaNghiSchema);
