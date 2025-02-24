-- CreateTable
CREATE TABLE "admins" (
    "admin_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("admin_id")
);

-- CreateTable
CREATE TABLE "assets" (
    "asset_id" UUID NOT NULL,
    "asset_name" TEXT NOT NULL,
    "asset_type" TEXT,
    "asset_status" TEXT NOT NULL,
    "category_id" UUID,
    "created_at" TIMESTAMPTZ(6),

    CONSTRAINT "Items_pkey" PRIMARY KEY ("asset_id")
);

-- CreateTable
CREATE TABLE "borrow_items" (
    "borrow_item_id" UUID NOT NULL,
    "borrow_id" UUID NOT NULL,
    "asset_id" UUID NOT NULL,
    "item_status" TEXT,
    "return_date" DATE,

    CONSTRAINT "borrow_items_pkey" PRIMARY KEY ("borrow_item_id")
);

-- CreateTable
CREATE TABLE "borrow_records" (
    "borrow_id" UUID NOT NULL,
    "borrower_name" TEXT NOT NULL,
    "borrower_email" TEXT,
    "borrow_date" TIMESTAMPTZ(6) NOT NULL,
    "borrow_status" TEXT,
    "admin_id" UUID,
    "return_date" TIMESTAMPTZ(6),
    "borrower_id" TEXT,
    "contact_no" TEXT,
    "description" TEXT,
    "agreement" BOOLEAN,

    CONSTRAINT "borrow_records_pkey" PRIMARY KEY ("borrow_id")
);

-- CreateTable
CREATE TABLE "categories" (
    "category_id" UUID NOT NULL,
    "category_name" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "property_borrowed_list" (
    "id" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "borrowers_name" TEXT NOT NULL,
    "borrowers_id" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "contact_no" TEXT NOT NULL,
    "items_borrowed" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date_borrowed" TEXT NOT NULL,
    "return_date" TEXT NOT NULL,
    "agreement" TEXT NOT NULL,

    CONSTRAINT "property_borrowed_list_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "uid" TEXT NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "admins"("email");

-- CreateIndex
CREATE UNIQUE INDEX "property_borrowed_list_slug_key" ON "property_borrowed_list"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_token_key" ON "sessions"("token");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_uid_key" ON "sessions"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "users_uid_key" ON "users"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "users_name_key" ON "users"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "assets" ADD CONSTRAINT "category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("category_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "borrow_items" ADD CONSTRAINT "asset_id_fkey" FOREIGN KEY ("asset_id") REFERENCES "assets"("asset_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "borrow_items" ADD CONSTRAINT "borrow_id_fkey" FOREIGN KEY ("borrow_id") REFERENCES "borrow_records"("borrow_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "borrow_records" ADD CONSTRAINT "admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "admins"("admin_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "fk_uid" FOREIGN KEY ("uid") REFERENCES "users"("uid") ON DELETE CASCADE ON UPDATE NO ACTION;

