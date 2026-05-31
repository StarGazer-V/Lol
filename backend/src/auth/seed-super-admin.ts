import bcrypt from "bcrypt";
import type { Pool } from "pg";

const SUPER_ADMIN_EMAIL = "vishwasv2004@gmail.com";
const SUPER_ADMIN_ROLE = "SUPER_ADMIN";

export async function seedSuperAdmin(pool: Pool): Promise<void> {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword || adminPassword.length < 16) {
    throw new Error("ADMIN_PASSWORD must be set to a strong value of at least 16 characters before seeding the Super Admin.");
  }

  await pool.query("BEGIN");
  try {
    const roleResult = await pool.query(
      `INSERT INTO roles (name, description)
       VALUES ($1, $2)
       ON CONFLICT (name) DO UPDATE SET description = EXCLUDED.description
       RETURNING id`,
      [SUPER_ADMIN_ROLE, "Unrestricted platform owner with full audit accountability"]
    );

    const existing = await pool.query("SELECT id FROM users WHERE email = $1 LIMIT 1", [SUPER_ADMIN_EMAIL]);
    if (existing.rowCount === 0) {
      const passwordHash = await bcrypt.hash(adminPassword, 12);
      await pool.query(
        `INSERT INTO users (email, password_hash, full_name, role_id, email_verified_at)
         VALUES ($1, $2, $3, $4, now())`,
        [SUPER_ADMIN_EMAIL, passwordHash, "Super Admin", roleResult.rows[0].id]
      );
    }

    await pool.query("COMMIT");
  } catch (error) {
    await pool.query("ROLLBACK");
    throw error;
  }
}
