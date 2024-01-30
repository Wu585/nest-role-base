-- CreateTable
CREATE TABLE `Image` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `view_id` INTEGER NOT NULL,

    UNIQUE INDEX `Image_view_id_key`(`view_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_view_id_fkey` FOREIGN KEY (`view_id`) REFERENCES `View`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
