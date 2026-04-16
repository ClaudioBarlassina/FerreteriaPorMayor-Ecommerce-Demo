
import "dotenv/config";
import mongoose from "mongoose";

const productosSchema = new mongoose.Schema(
  {
    
      id: { type: String },
    
      nombre: { type: String },
    
      marca: { type: String },
    
      precio: { type: Number },
    
      stock: { type: Number },
    
      categoria: { type: String },
    
      imagen: { type: String },
    
  },
  { timestamps: true }
);

const collection = process.env.COLLECTION || "productos";

export default mongoose.model(
  collection,
  productosSchema,
  collection
);
