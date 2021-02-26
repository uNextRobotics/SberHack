const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
const db = require("./models");
const cors = require("cors");
const connectDB = require("./models");
connectDB();
app.use(cors());
app.use(bodyParser.json());

function success(res, payload) {
  return res.status(200).json(payload);
}

app.get("/categories", async (req, res, next) => {
  try {
    const categories = await db.Category.find({});
    return success(res, categories);
  } catch (err) {
    next({ status: 400, message: "failed to get categories" });
  }
});

app.post("/categories", async (req, res, next) => {
  try {
    const category = await db.Category.create(req.body);
    return success(res, category);
  } catch (err) {
    next({ status: 400, message: "failed to create category" });
  }
});

app.put("/categories/:id", async (req, res, next) => {
  try {
    const category = await db.Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    return success(res, category);
  } catch (err) {
    next({ status: 400, message: "failed to update category" });
  }
});
app.delete("/categories/:id", async (req, res, next) => {
  try {
    await db.Category.findByIdAndRemove(req.params.id);
    return success(res, "category deleted!");
  } catch (err) {
    next({ status: 400, message: "failed to delete category" });
  }
});

app.get("/questions", async (req, res, next) => {
  try {
    const question = await db.QA.find({ Category: req.query.Cat });
    return success(res, question);
  } catch (err) {
    next({ status: 400, message: "failed to get todos" });
  }
});

app.post("/questions", async (req, res, next) => {
  try {
    const question = await db.QA.create(req.body);
    return success(res, question);
  } catch (err) {
    next({ status: 400, message: "failed to create question" });
  }
});

app.put("/questions/:id", async (req, res, next) => {
  try {
    const question = await db.QA.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return success(res, question);
  } catch (err) {
    next({ status: 400, message: "failed to update question" });
  }
});
app.delete("/questions/:id", async (req, res, next) => {
  try {
    await db.QA.findByIdAndRemove(req.params.id);
    return success(res, "question deleted!");
  } catch (err) {
    next({ status: 400, message: "failed to delete question" });
  }
});

app.use((err, req, res, next) => {
  return res.status(err.status || 400).json({
    status: err.status || 400,
    message: err.message || "there was an error processing request",
  });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
