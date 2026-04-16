
import productos from "../models/productos.model.js";

export const getAllproductos = async (query, options) => {
  const { skip, limit } = options;

  const [data, total] = await Promise.all([
    productos.find(query).skip(skip).limit(limit),
    productos.countDocuments(query)
  ]);

  return { data, total };
};

export const getproductosById = async (id) => {
  return await productos.findById(id);
};

export const createproductos = async (body) => {
  return await productos.create(body);
};

export const updateproductos = async (id, body) => {
  return await productos.findByIdAndUpdate(id, body, { new: true });
};

export const deleteproductos = async (id) => {
  return await productos.findByIdAndDelete(id);
};
