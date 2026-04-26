require('dotenv').config(); 
const prisma = require('../src/config/prisma');
const bcrypt = require('bcryptjs');

async function main() {
  console.log('🌱 Memulai proses seeding database WMS sesuai Master Data...');

  // ---------------------------------------------------------
  // 1. MASTER ROLE
  // ---------------------------------------------------------
  const rolesData = [
    { id_role: 1, nama_role: 'ADMIN' },
    { id_role: 2, nama_role: 'SUPERVISOR' },
    { id_role: 3, nama_role: 'OPERATOR' },
    { id_role: 4, nama_role: 'BOD' },
  ];
  for (const role of rolesData) {
    await prisma.role.upsert({
      where: { id_role: role.id_role },
      update: {},
      create: role,
    });
  }
  console.log('✅ Master Role berhasil di-seed');

  // ---------------------------------------------------------
  // 2. MASTER USER (Sesuai Sheet1: OP 1 & Tambahan Admin)
  // ---------------------------------------------------------
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('password123', salt); // Default password

  const usersData = [
    {
      id_user: 1,
      nama: 'Super Admin',
      email: 'admin@wms.com',
      password: hashedPassword,
      id_role: 1, // ADMIN
    },
    {
      id_user: 2,
      nama: 'OP 1', // Sesuai master data
      email: 'op1@example.com',
      password: hashedPassword,
      id_role: 3, // OPERATOR
    }
  ];
  for (const user of usersData) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
  }
  console.log('✅ Master User berhasil di-seed');

  // ---------------------------------------------------------
  // 3. MASTER PALLET TYPE (Kombinasi Kategori & Nama dari Sheet1)
  // ---------------------------------------------------------
  const palletTypesData = [
    { id_pallet_type: 1, pallet_category: 'Standard', pallet_name: 'T1B' },
    { id_pallet_type: 2, pallet_category: 'Standard', pallet_name: 'T1F' },
    { id_pallet_type: 3, pallet_category: 'Module+Inner', pallet_name: 'T1X' },
    { id_pallet_type: 4, pallet_category: 'EG', pallet_name: 'SP1' },
    { id_pallet_type: 5, pallet_category: 'RR Box', pallet_name: 'SP2' },
  ];
  for (const pt of palletTypesData) {
    await prisma.palletType.upsert({
      where: { id_pallet_type: pt.id_pallet_type },
      update: {},
      create: pt,
    });
  }
  console.log('✅ Master Pallet Type berhasil di-seed');

  // ---------------------------------------------------------
  // 4. MASTER FACTORY & DESTINATION
  // ---------------------------------------------------------
  await prisma.factory.upsert({
    where: { id_factory: 1 },
    update: {},
    create: {
      id_factory: 1,
      factory_name: 'PT TKN',
      factory_number: 'F-001',
      factory_email: 'tkn@example.com',
      factory_address: 'Kawasan Industri Terpadu Indonesia China, Jl, KITIC, Kec. Serang Baru, Kabupaten Bekasi, Jawa Barat 17330',
    },
  });
  
  await prisma.destination.upsert({
    where: { id_destination: 1 },
    update: {},
    create: {
      id_destination: 1,
      destination_name: 'PT Toyota Motor Manufacturing Indonesia',
      destination_number: 'D-001',
      destination_email: 'tmmin@example.com',
      destination_address: 'Jalan Laksda Yos Sudarso Sunter 1, RT.2/RW.9, Sunter Jaya, Kec. Tj. Priok, Jkt Utara, Daerah Khusus Ibukota Jakarta 14350',
    },
  });
  console.log('✅ Master Factory & Destination berhasil di-seed');

  // ---------------------------------------------------------
  // 5. MASTER WAREHOUSE AREA
  // ---------------------------------------------------------
  const areasData = [
    { id_warehouse_area: 1, warehouse_area_number: 'WH-AREA-001', warehouse_area_name: 'Transit Incoming Area' },
    { id_warehouse_area: 2, warehouse_area_number: 'WH-AREA-002', warehouse_area_name: 'Quarantine Area' },
    { id_warehouse_area: 3, warehouse_area_number: 'WH-AREA-003', warehouse_area_name: 'Central Store Area' },
    { id_warehouse_area: 4, warehouse_area_number: 'WH-AREA-004', warehouse_area_name: 'Delivery Area' }, // Tambahan menyesuaikan teks contoh data
  ];
  for (const area of areasData) {
    await prisma.warehouseArea.upsert({
      where: { id_warehouse_area: area.id_warehouse_area },
      update: {},
      create: area,
    });
  }
  console.log('✅ Master Warehouse Area berhasil di-seed');

  // ---------------------------------------------------------
  // 6. MASTER STORAGE BIN
  // ---------------------------------------------------------
  // Mengacu pada Sheet1: 001-01 / 001-02 / 001-03 (Kita pasang di WH-AREA-001)
  const binsData = [
    { id_storage_bins: 1, id_warehouse_area: 1, bin_number: '001-01', max_quantity: 50, stock: 0 },
    { id_storage_bins: 2, id_warehouse_area: 1, bin_number: '001-02', max_quantity: 50, stock: 0 },
    { id_storage_bins: 3, id_warehouse_area: 1, bin_number: '001-03', max_quantity: 50, stock: 0 },
  ];
  for (const bin of binsData) {
    await prisma.storageBin.upsert({
      where: { id_storage_bins: bin.id_storage_bins },
      update: {},
      create: bin,
    });
  }
  console.log('✅ Master Storage Bin berhasil di-seed');

  // ---------------------------------------------------------
  // 7. MASTER PALLET (Aset RFID)
  // ---------------------------------------------------------
  await prisma.pallet.upsert({
    where: { rfid_tag: '300833B2DDD9014000000001' }, // ID Tag sesuai Sheet1
    update: {},
    create: {
      id_pallet: 1,
      id_pallet_type: 1, // Pasang ke Tipe Standard T1B
      rfid_tag: '300833B2DDD9014000000001',
      location: 'WH-AREA-001', // Lokasi Awal
      status: 'AVAILABLE'
    },
  });
  console.log('✅ Master Pallet (RFID) berhasil di-seed');

  console.log('🎉 Seeding Selesai! Seluruh data Master sukses diinput ke PostgreSQL.');
}

main()
  .catch((e) => {
    console.error('❌ Terjadi Error saat Seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    // Mematikan pool PostgreSQL secara graceful (dari file config)
    // await prisma.$disconnect(); 
    // Kita tidak perlu disconnect() manual di sini karena adapter-pg akan menutup koneksi secara otomatis saat proses Node.js selesai.
    process.exit(0);
  });