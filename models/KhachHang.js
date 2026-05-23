const mongoose = require("mongoose");

/**
 * MODEL: Khách hàng (Guest/Customer)
 * Nguồn: Trang "Khách hàng", form "Check-in", modal "Đặt phòng mới"
 */
const khachHangSchema = new mongoose.Schema(
  {
    hoVaTen: {
      type: String,
      required: [true, "Vui lòng nhập họ tên khách"],
      trim: true,
    },

    // CCCD / CMND - định danh pháp lý (bắt buộc khi check-in nhà nghỉ)
    cccd: {
      type: String,
      trim: true,
      default: "",
      // unique + sparse để tránh conflict khi chưa nhập
      sparse: true,
    },

    soDienThoai: {
      type: String,
      trim: true,
      default: "",
    },

    diaChi: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      default: "",
      lowercase: true,
      trim: true,
    },

    // Thống kê nhanh — cập nhật sau mỗi lần check-out
    soLanLuuTru: {
      type: Number,
      default: 0,
    },

    tongChiTieu: {
      type: Number,
      default: 0,
    },

    // Khách thường xuyên: >= 3 lần lưu trú
    isKhachThuongXuyen: {
      type: Boolean,
      default: false,
    },

    ghiChu: { type: String, default: "" },
  },
  { timestamps: true }
);

khachHangSchema.index({ hoVaTen: "text", soDienThoai: 1, cccd: 1 });

module.exports = mongoose.model("KhachHang", khachHangSchema);
