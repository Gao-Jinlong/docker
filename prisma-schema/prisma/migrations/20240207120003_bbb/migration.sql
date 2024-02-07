-- CreateTable
CREATE TABLE `tset_test` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `aaa` TEXT NOT NULL,
    `bbb2` TINYINT NOT NULL,
    `ccc` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `tset_test_ccc_key`(`ccc`),
    INDEX `tset_test_ccc_bbb2_idx`(`ccc`, `bbb2`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
