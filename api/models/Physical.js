"use strict";

const mongoose = require("mongoose");

// Arbitrary physical
const modelSchema = mongoose.Schema({
  virtual: { type: String, ref: "Virtual", required: true },
  createdAt    : { type: String, default: new Date() },
  createdBy    : { type: String, ref: "User", required: true },
  updatedAt    : { type: String, default: new Date() },
  updatedBy    : { type: String, ref: "User", required: true },
  lab: { type: String, ref: "Lab", required: true },
  parent: { type: String, ref: "Container" },
  parentX: { type: Number, default: 1 },
  parentY: { type: Number, default: 1 },
  width: { type: Number, default: 1 },
  height: { type: Number, default: 1 },
  name: { type: String, unique: true, required: true },
  description: String,
  datKey: String
});

module.exports = mongoose.model("Physical", modelSchema);

