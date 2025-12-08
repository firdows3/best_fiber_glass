-- AlterTable
ALTER TABLE "User" ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productImage" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "customerPhone" TEXT NOT NULL,
    "customerLocation" TEXT NOT NULL,
    "approval" TEXT NOT NULL DEFAULT 'pending',
    "paymentStatus" TEXT NOT NULL DEFAULT 'pending',
    "completion" TEXT NOT NULL DEFAULT 'toBeStarted',
    "paymentImage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
