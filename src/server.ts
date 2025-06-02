import dotenv from "dotenv";
import app from "./app"; // make sure this path is correct

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
