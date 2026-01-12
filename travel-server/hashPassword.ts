import bcrypt from "bcryptjs";

async function generateAdminPassword() {
  const plainPassword = "Admin@123"; // Make sure this is "Admin@123"
  const hashedPassword = await bcrypt.hash(plainPassword, 10);
  console.log("Hashed Admin Password:", hashedPassword);
}

generateAdminPassword();