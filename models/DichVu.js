const mongoose = require("mongoose");

/**
 * MODEL: Dịch vụ bổ sung (Service)
 * Nguồn: Modal "Hóa đơn #HĐ-0087" → dòng "Dịch vụ bổ sung"
 *        (nhà nghỉ có thể tính thêm: giặt ủi, ăn sáng, gọi xe,...)
 */
const dichVuSchema = new mongoose.Schema(
  {
    tenDichVu: {
      type: String,
      required: true,
      trim: true,
      // VD: "Giặt ủi", "Ăn sáng", "Đồ uống", "Gọi xe"
    },
    donGia: {
      type: Number,
      required: true,
      min: 0,
    },
    donViTinh: {
      type: String,
      default: "lần",
      // VD: "lần", "bộ", "chai", "bữa"
    },
    isActive: { type: Boolean, default: true },
    moTa: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DichVu", dichVuSchema);
