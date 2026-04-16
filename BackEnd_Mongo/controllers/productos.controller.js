
import {
  getAllproductos,
  getproductosById,
  createproductos,
  updateproductos,
  deleteproductos
} from "../services/productos.service.js";

export const getAll = async (req, res) => {
  try {
    const { page = 1, limit = 10, ...filters } = req.query;

    const query = {};

    for (const key in filters) {
      if (key.startsWith("min") || key.startsWith("max")) continue;

      query[key] = { $regex: filters[key], $options: "i" };
    }

    if (filters.minPrecio || filters.maxPrecio) {
      query.precio = {};
      if (filters.minPrecio) query.precio.$gte = Number(filters.minPrecio);
      if (filters.maxPrecio) query.precio.$lte = Number(filters.maxPrecio);
    }

    const skip = (page - 1) * limit;

    const { data, total } = await getAllproductos(query, {
      skip,
      limit: Number(limit)
    });

    res.json({
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getById = async (req, res) => {
  const data = await getproductosById(req.params.id);
  res.json(data);
};

export const create = async (req, res) => {
  const newItem = await createproductos(req.body);
  res.json(newItem);
};

export const update = async (req, res) => {
  const updated = await updateproductos(req.params.id, req.body);
  res.json(updated);
};

export const remove = async (req, res) => {
  await deleteproductos(req.params.id);
  res.json({ message: "Deleted" });
};
