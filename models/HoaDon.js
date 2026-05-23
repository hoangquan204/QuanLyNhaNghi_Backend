const mongoose = require("mongoose");

/**
 * MODEL: Hóa đơn (Invoice)
 * Nguồn: Trang "Hóa đơn", modal "Hóa đơn #HĐ-0087",
 *        bảng "Thanh toán gần đây" trên Dashboard
 */
const hoaDonSchema = new mongoose.Schema(
  {
    maHoaDon: {
      type: String,
      unique: true,
      // VD: "HĐ-0087"
    },

    datPhong: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DatPhong",
      required: true,
    },

    khachHang: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "KhachHang",
      required: true,
    },

    phong: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Phong",
      required: true,
    },

    ngayTao: {
      type: Date,
      default: Date.now,
    },

    // Chi tiết tiền phòng
    soDeom: { type: Number, default: 1 },
    giaTheoDeom: { type: Number, default: 0 },
    tienPhong: { type: Number, default: 0 }, // soDeom × giaTheoDeom

    // Dịch vụ bổ sung dùng trong kỳ lưu trú
    dichVuSuDung: [
      {
        dichVu: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "DichVu",
        },
        tenDichVu: String,      // snapshot tên lúc tạo HĐ
        soLuong: { type: Number, default: 1 },
        donGia: { type: Number, default: 0 },
        thanhTien: { type: Number, default: 0 },
      },
    ],

    tongDichVu: { type: Number, default: 0 },

    // Thuế & phí (%)
    thue: { type: Number, default: 0 },
    thueTien: { type: Number, default: 0 },   // tính ra số tiền

    // Tổng cộng cuối cùng
    tongCong: { type: Number, default: 0 },

    hinhThucThanhToan: {
      type: String,
      enum: ["Tiền mặt", "Chuyển khoản", "Thẻ ngân hàng"],
      default: "Tiền mặt",
    },

    trangThai: {
      type: String,
      enum: ["Chưa thanh toán", "Đã thanh toán", "Chờ xử lý"],
      default: "Chưa thanh toán",
    },

    // Thời điểm thanh toán thực tế
    thoiGianThanhToan: { type: Date, default: null },

    ghiChu: { type: String, default: "" },
  },
  { timestamps: true }
);

// Tự sinh mã hóa đơn
hoaDonSchema.pre("save", async function (next) {
  if (!this.maHoaDon) {
    const count = await mongoose.model("HoaDon").countDocuments();
    this.maHoaDon = "HĐ-" + String(count + 1).padStart(4, "0");
  }
  next();
});

hoaDonSchema.index({ khachHang: 1 });
hoaDonSchema.index({ trangThai: 1 });
hoaDonSchema.index({ ngayTao: -1 });

module.exports = mongoose.model("HoaDon", hoaDonSchema);
