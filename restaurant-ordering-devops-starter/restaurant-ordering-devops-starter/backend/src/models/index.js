import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv'; dotenv.config();

export const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST, port: process.env.DB_PORT, dialect: 'mysql', logging: false
});

export const User = sequelize.define('User', {
  id:{ type:DataTypes.INTEGER, autoIncrement:true, primaryKey:true },
  role:{ type:DataTypes.ENUM('CUSTOMER','ADMIN','KITCHEN'), defaultValue:'CUSTOMER' },
  name:DataTypes.STRING, email:{ type:DataTypes.STRING, unique:true }, phone:{ type:DataTypes.STRING, unique:true },
  password_hash:DataTypes.STRING
},{ tableName:'users', timestamps:true });

export const Category = sequelize.define('Category', {
  id:{ type:DataTypes.INTEGER, autoIncrement:true, primaryKey:true },
  name:DataTypes.STRING, description:DataTypes.TEXT, display_order:DataTypes.INTEGER,
  is_active:{ type:DataTypes.BOOLEAN, defaultValue:true }
},{ tableName:'categories', timestamps:true });

export const MenuItem = sequelize.define('MenuItem', {
  id:{ type:DataTypes.INTEGER, autoIncrement:true, primaryKey:true },
  name:DataTypes.STRING, description:DataTypes.TEXT, price:DataTypes.DECIMAL(10,2),
  image_url:DataTypes.STRING, is_available:{ type:DataTypes.BOOLEAN, defaultValue:true }
},{ tableName:'menu_items', timestamps:true });

export const Order = sequelize.define('Order', {
  id:{ type:DataTypes.INTEGER, autoIncrement:true, primaryKey:true },
  status:{ type:DataTypes.ENUM('PENDING','PREPARING','READY','COMPLETED','CANCELLED'), defaultValue:'PENDING' },
  subtotal:DataTypes.DECIMAL(10,2), tax:DataTypes.DECIMAL(10,2),
  discount:DataTypes.DECIMAL(10,2), total:DataTypes.DECIMAL(10,2), notes:DataTypes.TEXT
},{ tableName:'orders', timestamps:true });

export const OrderItem = sequelize.define('OrderItem', {
  id:{ type:DataTypes.INTEGER, autoIncrement:true, primaryKey:true },
  qty:DataTypes.INTEGER, unit_price:DataTypes.DECIMAL(10,2), line_total:DataTypes.DECIMAL(10,2)
},{ tableName:'order_items', timestamps:true });

export const Payment = sequelize.define('Payment', {
  id:{ type:DataTypes.INTEGER, autoIncrement:true, primaryKey:true },
  provider:{ type:DataTypes.STRING, defaultValue:'RAZORPAY' },
  provider_order_id:DataTypes.STRING, provider_payment_id:DataTypes.STRING,
  amount:DataTypes.INTEGER, currency:{ type:DataTypes.STRING, defaultValue:'INR' },
  status:DataTypes.STRING, method:DataTypes.STRING
},{ tableName:'payments', timestamps:true });

Category.hasMany(MenuItem, { foreignKey: 'category_id' });
MenuItem.belongsTo(Category, { foreignKey: 'category_id' });
Order.hasMany(OrderItem, { foreignKey: 'order_id' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });
MenuItem.hasMany(OrderItem, { foreignKey: 'menu_item_id' });
OrderItem.belongsTo(MenuItem, { foreignKey: 'menu_item_id' });
Order.hasOne(Payment, { foreignKey: 'order_id' });
Payment.belongsTo(Order, { foreignKey: 'order_id' });

export async function syncDb(){ await sequelize.authenticate(); await sequelize.sync(); }
