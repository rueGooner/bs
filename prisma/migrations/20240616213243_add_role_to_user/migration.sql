-- Check if column exists before adding
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'User' 
    AND column_name = 'roleId'
  ) THEN
    ALTER TABLE "User" ADD COLUMN "roleId" INTEGER NOT NULL DEFAULT 3;
  
    -- CreateIndex
    CREATE INDEX "roleId" ON "User"("roleId");
  
    -- AddForeignKey
    ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
  END IF;
END $$;

-- Update existing rows if necessary
UPDATE "User" SET "roleId" = 3 WHERE "roleId" IS NULL;
