-- CreateTable
CREATE TABLE "templates" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "templates_id_key" ON "templates"("id");
