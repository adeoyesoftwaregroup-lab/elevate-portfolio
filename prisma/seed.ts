// CRITICAL FIX: Forces isolated script process runtimes to read environment maps
import "dotenv/config";

import { db } from "../lib/db";
import bcrypt from "bcrypt";

async function main() {
  console.log(
    "⚙️  [SEEDING] Initializing secure administrative credential handshake...",
  );

  const adminEmail = process.env.ADMIN_SEED_EMAIL || "admin@yourportfolio.com";
  const adminPassword =
    process.env.ADMIN_SEED_PASSWORD || "SuperSecureEnterprisePassword2026!";

  const saltRounds = 12;
  const hashedPassword = await bcrypt.hash(adminPassword, saltRounds);

  const admin = await db.admin.upsert({
    where: { email: adminEmail },
    update: {
      password: hashedPassword,
    },
    create: {
      email: adminEmail,
      password: hashedPassword,
    },
  });

  console.log(
    `✅ [SUCCESS] Admin pipeline cluster established successfully for target: ${admin.email}`,
  );
}

main()
  .catch((error) => {
    console.error(
      "❌ [CRITICAL ENGINE FAILURE] Seeding workflow aborted:",
      error,
    );
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
