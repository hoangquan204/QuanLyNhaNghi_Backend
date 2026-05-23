const mongoose = require("mongoose");

/**
 * MODEL: Phòng (Room)
 * Nguồn: Trang "Quản lý phòng", modal "Thêm phòng mới", modal "Chi tiết phòng",
 *        trang "Cài đặt giá phòng", form Check-in
 */
const phongSchema = new mongoose.Schema(
  {
    soPhong: {
      type: String,
      required: [true, "Vui lòng nhập số phòng"],
      unique: true,
      trim: true,
      // VD: "101", "102", "103"
    },

    loaiPhong: {
      type: String,
      enum: ["Phòng đơn", "Phòng đôi", "VIP Suite"],
      required: [true, "Vui lòng chọn loại phòng"],
    },

    tang: {
      type: String,
      enum: ["Tầng 1", "Tầng 2", "Tầng 3"],
      default: "Tầng 1",
    },

    // Giá theo đêm (VND)
    giaTheoDeom: {
      type: Number,
      required: [true, "Vui lòng nhập giá/đêm"],
      min: 0,
    },

    // Giá theo giờ (VND) - nhà nghỉ thường có 2 loại giá
    giaTheoGio: {
      type: Number,
      default: 0,
    },

    trangThai: {
      type: String,
      enum: ["Trống", "Đang thuê", "Dọn phòng", "Đã đặt", "Bảo trì"],
      default: "Trống",
    },

    // Tiện nghi: ["Điều hòa", "WiFi", "TV 32\"", "Phòng tắm riêng", "Tủ lạnh mini"]
    tienNghi: [{ type: String }],

    moTa: { type: String, default: "" },

    // Phòng có đang hoạt động không (ẩn/hiện)
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

phongSchema.index({ trangThai: 1 });
phongSchema.index({ loaiPhong: 1 });

module.exports = mongoose.model("Phong", phongSchema);
