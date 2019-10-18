-- https://www.postgresql.org/docs/8.2/sql-droptable.html

-- ALTER TABLE "projects" DROP CONSTRAINT   IF EXISTS "fk_users";
-- ALTER TABLE "documents" DROP CONSTRAINT  IF EXISTS "fk_projects";
-- ALTER TABLE "links" DROP CONSTRAINT      IF EXISTS "fk_source_doc";
-- ALTER TABLE "links" DROP CONSTRAINT      IF EXISTS "fk_target_doc";
-- ALTER TABLE "payments" DROP CONSTRAINT   IF EXISTS "fk_coupons";
-- ALTER TABLE "payments" DROP CONSTRAINT   IF EXISTS "fk_documents";

CREATE SCHEMA IF NOT EXISTS postgres;

DROP TABLE IF EXISTS "users"; 
DROP TABLE IF EXISTS "projects";
DROP TABLE IF EXISTS "documents";
DROP TABLE IF EXISTS "links";
DROP TABLE IF EXISTS "payments";
DROP TABLE IF EXISTS "coupons";

CREATE TABLE "users" (
"id" int NOT NULL,
"email" varchar(50) NOT NULL,
"hashedPassword" varchar(64) NOT NULL,
"lastLogin" timestamp(255),
PRIMARY KEY ("id") 
)
WITHOUT OIDS;
COMMENT ON TABLE "users" IS 'Diese Tabelle speichert die Daten der Benutzer';
COMMENT ON COLUMN "users"."id" IS 'Die eindeutige Datenbank-ID der Users-Tabelle (Benutzer)';
COMMENT ON COLUMN "users"."email" IS 'Die Email-Adresse des Benutzers';
COMMENT ON COLUMN "users"."hashedPassword" IS 'Das per SHA3 gehashte Kennwort des Benutzers';
COMMENT ON COLUMN "users"."lastLogin" IS 'Optionaler Zeitstempel des letzten Logins';

CREATE TABLE "projects" (
"id" INT NOT NULL,
"name" varchar(100) NOT NULL,
"usersId" INT NOT NULL,
"description" varchar(255),
PRIMARY KEY ("id") 
)
WITHOUT OIDS;
COMMENT ON TABLE "projects" IS 'Diese Tabelle verwaltet die Liste aller Projekte';
COMMENT ON COLUMN "projects"."id" IS 'Die eindeutige Datenbank-ID der Projekts-Tabelle (Projekte)';
COMMENT ON COLUMN "projects"."name" IS 'Der Name des Projekts';
COMMENT ON COLUMN "projects"."usersId" IS 'Verweis auf den Benutzer, der das Projekt angelegt hat ';
COMMENT ON COLUMN "projects"."description" IS 'Ein optionaler Beschreibungstext';

CREATE TABLE "documents" (
"id" INT NOT NULL,
"hash" varchar(128) NOT NULL,
"projectsId" INT NOT NULL,
"kind" varchar(10) NOT NULL,
"description" varchar(255),
"address" varchar(42),
"state" varchar(10),
"stateDetails" varchar(255),
PRIMARY KEY ("id") 
)
WITHOUT OIDS;
COMMENT ON TABLE "documents" IS 'Diese Tabelle verwaltet die Dokumente (von denen auch einige Attribute auch in der Blockchain abgelegt werden). ';
COMMENT ON COLUMN "documents"."id" IS 'Die eindeutige Datenbank-ID der Documents-Tabelle (Dokumente)';
COMMENT ON COLUMN "documents"."hash" IS 'Der Hashcode des Dokument-Inhalts (wird auch in der Blockchain abgelegt)';
COMMENT ON COLUMN "documents"."projectsId" IS 'Verweis auf das Projekt zu dem das Dokument gehört';
COMMENT ON COLUMN "documents"."kind" IS 'Typ des Dokuments, kann z.B. Data, Model oder Custom sein';
COMMENT ON COLUMN "documents"."description" IS 'optionaler Beschreibungstext zu dem Dokument';
COMMENT ON COLUMN "documents"."address" IS 'Die Adresse des Dokuments in der Blockchain, also z.B. sowas cd2a3d9f938e13cd947ec05abc7fe734df8dd826';

CREATE TABLE "links" (
"id" INT NOT NULL,
"sourceDocumentId" INT NOT NULL,
"targetDocumentId" INT NOT NULL,
PRIMARY KEY ("id") 
)
WITHOUT OIDS;
COMMENT ON TABLE "links" IS 'Die Tabelle speichert die Verknüpfung zwischen Dokumenten (uni-directional)';
COMMENT ON COLUMN "links"."id" IS 'Die eindeutige Datenbank-ID der Links-Tabelle (Verlinkung zwischen Dokumenten)';
COMMENT ON COLUMN "links"."sourceDocumentId" IS 'Das Dokument von dem aus verwiesen wird';
COMMENT ON COLUMN "links"."targetDocumentId" IS 'Das Dokument zu dem verwiesen wird';

CREATE TABLE "payments" (
"id" INT NOT NULL,
"documentsId" INT NOT NULL,
"type" varchar(10) NOT NULL,
"paypalReceipt" varchar(255),
"couponId" INT,
"createdAt" timestamp(255) NOT NULL,
PRIMARY KEY ("id") 
)
WITHOUT OIDS;
COMMENT ON TABLE "payments" IS 'Die Tabelle speichert die Zahlungsvorgänge (wahlweise per PayPal oder Coupon) ';
COMMENT ON COLUMN "payments"."id" IS 'Die eindeutige Datenbank-ID der Payment-Tabelle (Zahlungsvorgänge)';
COMMENT ON COLUMN "payments"."documentsId" IS 'Verweis auf das Dokument für das diese Zahlung durchgeführt wurde';
COMMENT ON COLUMN "payments"."type" IS 'Typ des Dokuments, z.B. Model, Data, Custom';
COMMENT ON COLUMN "payments"."paypalReceipt" IS 'Falls per PayPal gezahlt wurde: Die ID der Zahlungsbestätigung';
COMMENT ON COLUMN "payments"."couponId" IS 'Falls per Coupon gezahlt wurde: Der Verweis auf den verwendeten Coupon';

CREATE TABLE "coupons" (
"id" INT NOT NULL,
"code" varchar(25) NOT NULL,
"usedAt" timestamp(255),
PRIMARY KEY ("id") 
)
WITHOUT OIDS;
COMMENT ON TABLE "coupons" IS 'Dieses Tabelle speichert die Daten der Coupons (Vouchers), die man zum Bezahlen (alternativ zu PayPal) benutzen kann';
COMMENT ON COLUMN "coupons"."id" IS 'Die eindeutige Datenbank-ID der Coupon-Tabelle';
COMMENT ON COLUMN "coupons"."code" IS 'Der Coupon-Code (nur einmal zu verwenden)';
COMMENT ON COLUMN "coupons"."usedAt" IS 'Zeitstempel der Einlösung des Coupons';


ALTER TABLE "projects" ADD CONSTRAINT "fk_users" FOREIGN KEY ("usersId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "documents" ADD CONSTRAINT "fk_projects" FOREIGN KEY ("projectsId") REFERENCES "projects" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "links" ADD CONSTRAINT "fk_source_doc" FOREIGN KEY ("sourceDocumentId") REFERENCES "documents" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "links" ADD CONSTRAINT "fk_target_doc" FOREIGN KEY ("targetDocumentId") REFERENCES "documents" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "payments" ADD CONSTRAINT "fk_coupons" FOREIGN KEY ("couponId") REFERENCES "coupons" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "payments" ADD CONSTRAINT "fk_documents" FOREIGN KEY ("documentsId") REFERENCES "documents" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
