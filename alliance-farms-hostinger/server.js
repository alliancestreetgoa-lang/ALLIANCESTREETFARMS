const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve all static files from the public folder
app.use(express.static(path.join(__dirname, "public")));

// For any route not matched (React SPA routing), serve index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Alliance Street Organic Farms running on port ${PORT}`);
});
