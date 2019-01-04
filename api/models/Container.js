"use strict";

const mongoose = require("mongoose");

// Arbitrary container (rack, shelf, etc)
const modelSchema = mongoose.Schema({
  createdAt    : { type: String, default: new Date() },
  createdBy    : { type: String, ref: "User", required: true },
  updatedAt    : { type: String, default: new Date() },
  updatedBy    : { type: String, ref: "User", required: true },
  lab: { type: String, ref: "Lab", required: true },
  parent: { type: String, ref: "Container" },
  parentX: { type: Number, default: 1 },
  parentY: { type: Number, default: 1 },
  name: { type: String, unique: true, required: true },
  description: String,
  innerWidth: { type: Number, min: 1, max: 200, required: true },
  innerHeight: { type: Number, min: 1, max: 200, required: true },
  width: { type: Number, default: 1 },
  height: { type: Number, default: 1 },
  children: Object,
  category: { type: String, required: true },
  datName: String,
  datHash: String,
  bgColor: { type: String, default: "#00D1FD" }
});

module.exports = mongoose.model("Container", modelSchema);

