import app from "./app.js";
import dotenv from 'dotenv';
import { connectDB } from "./core/database/mongoose.js";
import { PORT } from "./core/config/env.js";

async function start() {
  try {
      dotenv.config();

    console.log("Connecting to DB...");
    await connectDB();
    console.log("DB connected");

    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  } catch (err: any) {
    console.error("Failed to start server:");
    console.error(err instanceof Error ? err.stack : err);
    process.exit(1);
  }
}



start();
