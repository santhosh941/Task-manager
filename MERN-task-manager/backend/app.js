
app.use(express.json());
app.use(cors());

const mongoUrl = process.env.MONGODB_URL;
console.log("MongoDB URL:", mongoUrl);
mongoose.connect(mongoUrl, err => {
  if (err) throw err;
  console.log("connected to your database..");
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/profile", profileRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "../frontend/build")));
  app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "../frontend/build/index.html")));
}

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Backend is running on port ${port}`);
});
