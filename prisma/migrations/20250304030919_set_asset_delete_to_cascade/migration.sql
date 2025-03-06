-- DropForeignKey
ALTER TABLE "borrow_items" DROP CONSTRAINT "asset_id_fkey";

-- AddForeignKey
ALTER TABLE "borrow_items" ADD CONSTRAINT "asset_id_fkey" FOREIGN KEY ("asset_id") REFERENCES "assets"("asset_id") ON DELETE CASCADE ON UPDATE NO ACTION;
