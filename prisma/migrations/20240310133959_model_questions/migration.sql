-- CreateTable
CREATE TABLE `Questions` (
    `id` VARCHAR(191) NOT NULL,
    `question` VARCHAR(191) NOT NULL,
    `opt1` VARCHAR(191) NULL,
    `opt2` VARCHAR(191) NULL,
    `opt3` VARCHAR(191) NULL,
    `opt4` VARCHAR(191) NULL,
    `ans` INTEGER NOT NULL,
    `topic` VARCHAR(191) NULL,
    `type` ENUM('aptitude', 'logical_reason', 'verbal_ability') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
