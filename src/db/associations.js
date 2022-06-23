// Main Models
import User from "../api/user/model";
import Image from "../api/image/model";

// ----------------------- DB Relationships ---------------------------

// ---------------- hasMany (1:M) & belongsTo (1:1) -------------------

// User-Offer / Offer-User
User.hasMany(Image, { as: "images", foreignKey: "userId", constraints: false });
Image.belongsTo(User, { as: "user", foreignKey: "userId", constraints: false });
