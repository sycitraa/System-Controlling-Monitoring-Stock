const prisma = require('../config/prisma');
const AppError = require('../utils/AppError');

const getAllWarehouseAreas = async () => {
  return await prisma.warehouseArea.findMany({
    include: {_count: { select: { storage_bins: true}}},
    orderBy: { id_warehouse_area: 'asc'}
  });
}

const createArea = async (data) => {
  const { warehouse_area_number, warehouse_area_name } = data;
  
  if(!warehouse_area_number || !warehouse_area_name) {
    throw new AppError('warehouse area number dan warehouse_area_name harus diisi', 400);
  }

  const exists = await prisma.warehouseArea.findFirst({
    where: { warehouse_area_number: warehouse_area_number }
  });

  if(exists) throw new AppError('warehouse area number sudah digunakan', 400);

  return await prisma.warehouseArea.create({
    data: { warehouse_area_number, warehouse_area_name }
  });
};

const updateArea = async (id, data) => {
  const { warehouse_area_number, warehouse_area_name } = data;

  const area = await prisma.warehouseArea.findUnique({ where: { id_warehouse_area: id } });
  if (!area) throw new AppError('Warehouse area tidak ditemukan', 404);

  const updateData = { warehouse_area_number, warehouse_area_name };

  return await prisma.warehouseArea.update({
    where: { id_warehouse_area: id },
    data: updateData
  });
}

const deleteArea = async (id) => {
  const area = await prisma.warehouseArea.findUnique({ where: { id_warehouse_area: id } });
  if (!area) throw new AppError('Warehouse area tidak ditemukan', 404);

  await prisma.warehouseArea.delete({ where: { id_warehouse_area: id } });
}

module.exports = { getAllWarehouseAreas, createArea, updateArea, deleteArea };