const mongoose = require("mongoose");

/**
 * MODEL: Đặt phòng / Booking (bao gồm cả walk-in và đặt trước)
 * Nguồn: Trang "Lịch đặt phòng", modal "Đặt phòng mới",
 *        form "Check-in", bảng "Khách đang lưu trú"
 */
const datPhongSchema = new mongoose.Schema(
  {
    maDatPhong: {
      type: String,
      unique: true,
      // VD: "DP-041", "DP-042" — tự sinh
    },

    khachHang: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "KhachHang",
      required: [true, "Vui lòng chọn khách hàng"],
    },

    phong: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Phong",
      required: [true, "Vui lòng chọn phòng"],
    },

    ngayCheckIn: {
      type: Date,
      required: [true, "Vui lòng nhập ngày check-in"],
    },

    ngayCheckOut: {
      type: Date,
      required: [true, "Vui lòng nhập ngày check-out"],
    },

    // Số đêm (tính toán hoặc nhập tay)
    soDeom: {
      type: Number,
      min: 1,
      default: 1,
    },

    // Giá tại thời điểm đặt (chốt cứng, không đổi theo bảng giá)
    giaTheoDeomChot: {
      type: Number,
      required: true,
    },

    tongTienPhong: {
      type: Number,
      default: 0,
    },

    hinhThucThanhToan: {
      type: String,
      enum: ["Tiền mặt", "Chuyển khoản", "Thẻ ngân hàng"],
      default: "Tiền mặt",
    },

    trangThai: {
      type: String,
      enum: [
        "Chờ xác nhận",   // Đặt trước, chưa xác nhận
        "Đã xác nhận",    // Đặt trước, đã xác nhận
        "Đã check-in",    // Khách đang lưu trú
        "Đã check-out",   // Hoàn thành
        "Hủy",            // Hủy đặt
      ],
      default: "Đã check-in",
    },

    // Thời gian thực tế check-in / check-out
    thoiGianCheckInThucTe: { type: Date },
    thoiGianCheckOutThucTe: { type: Date },

    ghiChu: { type: String, default: "" },

    // Ref tới hóa đơn sau khi checkout
    hoaDon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HoaDon",
      default: null,
    },
  },
  { timestamps: true }
);

// Tự sinh mã đặt phòng trước khi save
datPhongSchema.pre("save", async function (next) {
  if (!this.maDatPhong) {
    const count = await mongoose.model("DatPhong").countDocuments();
    this.maDatPhong = "DP-" + String(count + 1).padStart(3, "0");
  }
  next();
});

datPhongSchema.index({ khachHang: 1 });
datPhongSchema.index({ phong: 1, trangThai: 1 });
datPhongSchema.index({ ngayCheckIn: 1, ngayCheckOut: 1 });

module.exports = mongoose.model("DatPhong", datPhongSchema);
