-- CreateEnum
CREATE TYPE "PlanStatus" AS ENUM ('WAITING_APPROVAL', 'APPROVE', 'REJECT');

-- CreateEnum
CREATE TYPE "WOStatus" AS ENUM ('TO_DO', 'ON_PROGRESS', 'DONE');

-- CreateEnum
CREATE TYPE "PalletStatus" AS ENUM ('AVAILABLE', 'SHIPPED');

-- CreateEnum
CREATE TYPE "RoleName" AS ENUM ('ADMIN', 'SUPERVISOR', 'OPERATOR', 'BOD');

-- CreateTable
CREATE TABLE "roles" (
    "id_role" SERIAL NOT NULL,
    "nama_role" VARCHAR(50) NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id_role")
);

-- CreateTable
CREATE TABLE "users" (
    "id_user" SERIAL NOT NULL,
    "id_role" INTEGER NOT NULL,
    "nama" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(225) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "menu" (
    "id_menu" SERIAL NOT NULL,
    "nama_menu" VARCHAR(50) NOT NULL,

    CONSTRAINT "menu_pkey" PRIMARY KEY ("id_menu")
);

-- CreateTable
CREATE TABLE "roles_menus" (
    "id_role_menu" SERIAL NOT NULL,
    "id_menu" INTEGER NOT NULL,
    "id_role" INTEGER NOT NULL,

    CONSTRAINT "roles_menus_pkey" PRIMARY KEY ("id_role_menu")
);

-- CreateTable
CREATE TABLE "factory" (
    "id_factory" SERIAL NOT NULL,
    "factory_number" VARCHAR(10) NOT NULL,
    "factory_email" VARCHAR(20) NOT NULL,
    "factory_name" VARCHAR(20) NOT NULL,
    "factory_address" TEXT NOT NULL,

    CONSTRAINT "factory_pkey" PRIMARY KEY ("id_factory")
);

-- CreateTable
CREATE TABLE "destination" (
    "destination_number" VARCHAR(10) NOT NULL,
    "destination_email" VARCHAR(20) NOT NULL,
    "destination_name" VARCHAR(20) NOT NULL,
    "destination_address" TEXT NOT NULL,
    "id_destination" SERIAL NOT NULL,

    CONSTRAINT "destination_pkey" PRIMARY KEY ("id_destination")
);

-- CreateTable
CREATE TABLE "pallet_type" (
    "id_pallet_type" SERIAL NOT NULL,
    "pallet_category" VARCHAR(50) NOT NULL,
    "pallet_name" VARCHAR(100) NOT NULL,

    CONSTRAINT "pallet_type_pkey" PRIMARY KEY ("id_pallet_type")
);

-- CreateTable
CREATE TABLE "warehouse_area" (
    "id_warehouse_area" SERIAL NOT NULL,
    "warehouse_area_number" VARCHAR(10) NOT NULL,
    "warehouse_area_name" VARCHAR(100) NOT NULL,

    CONSTRAINT "warehouse_area_pkey" PRIMARY KEY ("id_warehouse_area")
);

-- CreateTable
CREATE TABLE "storage_bins" (
    "id_storage_bins" SERIAL NOT NULL,
    "id_warehouse_area" INTEGER NOT NULL,
    "bin_number" VARCHAR(50) NOT NULL,
    "max_quantity" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL,

    CONSTRAINT "storage_bins_pkey" PRIMARY KEY ("id_storage_bins")
);

-- CreateTable
CREATE TABLE "pallet" (
    "id_pallet" SERIAL NOT NULL,
    "id_pallet_type" INTEGER NOT NULL,
    "rfid_tag" VARCHAR(10) NOT NULL,
    "location" VARCHAR(100),
    "status" VARCHAR(100),

    CONSTRAINT "pallet_pkey" PRIMARY KEY ("id_pallet")
);

-- CreateTable
CREATE TABLE "inbound_plan" (
    "id_inbound_plan" SERIAL NOT NULL,
    "id_user" INTEGER NOT NULL,
    "document_number" VARCHAR(10) NOT NULL,
    "planning_month" DATE NOT NULL,
    "status" VARCHAR(100),
    "remarks" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "inbound_plan_pkey" PRIMARY KEY ("id_inbound_plan")
);

-- CreateTable
CREATE TABLE "inbound_plan_detail" (
    "id_detail" SERIAL NOT NULL,
    "id_inbound_plan" INTEGER NOT NULL,
    "id_pallet_type" INTEGER NOT NULL,
    "id_factory" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "inbound_plan_detail_pkey" PRIMARY KEY ("id_detail")
);

-- CreateTable
CREATE TABLE "outbound_plan" (
    "id_outbound_plan" SERIAL NOT NULL,
    "id_user" INTEGER NOT NULL,
    "document_number" VARCHAR(10) NOT NULL,
    "planning_month" DATE NOT NULL,
    "status" VARCHAR(100),
    "remarks" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "outbound_plan_pkey" PRIMARY KEY ("id_outbound_plan")
);

-- CreateTable
CREATE TABLE "outbound_plan_detail" (
    "id_detail" SERIAL NOT NULL,
    "id_outbound_plan" INTEGER NOT NULL,
    "id_pallet_type" INTEGER NOT NULL,
    "id_destination" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "outbound_plan_detail_pkey" PRIMARY KEY ("id_detail")
);

-- CreateTable
CREATE TABLE "work_order" (
    "id_work_order" SERIAL NOT NULL,
    "id_outbound_plan" INTEGER,
    "id_inbound_plan" INTEGER,
    "id_warehouse_area" INTEGER NOT NULL,
    "id_user" INTEGER NOT NULL,
    "work_order_number" VARCHAR(10) NOT NULL,
    "work_order_category" VARCHAR(20) NOT NULL,
    "transfer_point" VARCHAR(100),
    "date" DATE NOT NULL,
    "remarks" TEXT,
    "status" VARCHAR(100),

    CONSTRAINT "work_order_pkey" PRIMARY KEY ("id_work_order")
);

-- CreateTable
CREATE TABLE "work_order_detail" (
    "id_work_order_detail" SERIAL NOT NULL,
    "id_work_order" INTEGER NOT NULL,
    "id_pallet_type" INTEGER NOT NULL,
    "id_storage_bins" INTEGER NOT NULL,
    "total_planning" INTEGER NOT NULL,
    "actual_pcs" INTEGER NOT NULL,

    CONSTRAINT "work_order_detail_pkey" PRIMARY KEY ("id_work_order_detail")
);

-- CreateTable
CREATE TABLE "rfid_scan" (
    "id_scan" SERIAL NOT NULL,
    "id_pallet" INTEGER NOT NULL,
    "id_work_order" INTEGER NOT NULL,
    "id_user" INTEGER NOT NULL,
    "scanned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "rfid_scan_pkey" PRIMARY KEY ("id_scan")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "pallet_rfid_tag_key" ON "pallet"("rfid_tag");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_id_role_fkey" FOREIGN KEY ("id_role") REFERENCES "roles"("id_role") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roles_menus" ADD CONSTRAINT "roles_menus_id_menu_fkey" FOREIGN KEY ("id_menu") REFERENCES "menu"("id_menu") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roles_menus" ADD CONSTRAINT "roles_menus_id_role_fkey" FOREIGN KEY ("id_role") REFERENCES "roles"("id_role") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "storage_bins" ADD CONSTRAINT "storage_bins_id_warehouse_area_fkey" FOREIGN KEY ("id_warehouse_area") REFERENCES "warehouse_area"("id_warehouse_area") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pallet" ADD CONSTRAINT "pallet_id_pallet_type_fkey" FOREIGN KEY ("id_pallet_type") REFERENCES "pallet_type"("id_pallet_type") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inbound_plan" ADD CONSTRAINT "inbound_plan_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inbound_plan_detail" ADD CONSTRAINT "inbound_plan_detail_id_inbound_plan_fkey" FOREIGN KEY ("id_inbound_plan") REFERENCES "inbound_plan"("id_inbound_plan") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inbound_plan_detail" ADD CONSTRAINT "inbound_plan_detail_id_pallet_type_fkey" FOREIGN KEY ("id_pallet_type") REFERENCES "pallet_type"("id_pallet_type") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inbound_plan_detail" ADD CONSTRAINT "inbound_plan_detail_id_factory_fkey" FOREIGN KEY ("id_factory") REFERENCES "factory"("id_factory") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outbound_plan" ADD CONSTRAINT "outbound_plan_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outbound_plan_detail" ADD CONSTRAINT "outbound_plan_detail_id_outbound_plan_fkey" FOREIGN KEY ("id_outbound_plan") REFERENCES "outbound_plan"("id_outbound_plan") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outbound_plan_detail" ADD CONSTRAINT "outbound_plan_detail_id_pallet_type_fkey" FOREIGN KEY ("id_pallet_type") REFERENCES "pallet_type"("id_pallet_type") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outbound_plan_detail" ADD CONSTRAINT "outbound_plan_detail_id_destination_fkey" FOREIGN KEY ("id_destination") REFERENCES "destination"("id_destination") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_order" ADD CONSTRAINT "work_order_id_outbound_plan_fkey" FOREIGN KEY ("id_outbound_plan") REFERENCES "outbound_plan"("id_outbound_plan") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_order" ADD CONSTRAINT "work_order_id_inbound_plan_fkey" FOREIGN KEY ("id_inbound_plan") REFERENCES "inbound_plan"("id_inbound_plan") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_order" ADD CONSTRAINT "work_order_id_warehouse_area_fkey" FOREIGN KEY ("id_warehouse_area") REFERENCES "warehouse_area"("id_warehouse_area") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_order" ADD CONSTRAINT "work_order_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_order_detail" ADD CONSTRAINT "work_order_detail_id_work_order_fkey" FOREIGN KEY ("id_work_order") REFERENCES "work_order"("id_work_order") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_order_detail" ADD CONSTRAINT "work_order_detail_id_pallet_type_fkey" FOREIGN KEY ("id_pallet_type") REFERENCES "pallet_type"("id_pallet_type") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_order_detail" ADD CONSTRAINT "work_order_detail_id_storage_bins_fkey" FOREIGN KEY ("id_storage_bins") REFERENCES "storage_bins"("id_storage_bins") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rfid_scan" ADD CONSTRAINT "rfid_scan_id_pallet_fkey" FOREIGN KEY ("id_pallet") REFERENCES "pallet"("id_pallet") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rfid_scan" ADD CONSTRAINT "rfid_scan_id_work_order_fkey" FOREIGN KEY ("id_work_order") REFERENCES "work_order"("id_work_order") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rfid_scan" ADD CONSTRAINT "rfid_scan_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;
