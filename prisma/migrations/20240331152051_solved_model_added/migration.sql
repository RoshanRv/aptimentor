-- CreateTable
CREATE TABLE `Solved` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `questionId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Solved` ADD CONSTRAINT `Solved_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Solved` ADD CONSTRAINT `Solved_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `Questions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
