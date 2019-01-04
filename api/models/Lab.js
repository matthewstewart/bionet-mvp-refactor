'use strict'

const mongoose = require('mongoose');

const modelSchema = mongoose.Schema({
  createdAt    : { type: String, default: new Date() },
  createdBy    : { type: String, ref: "User", required: true },
  updatedAt    : { type: String, default: new Date() },
  updatedBy    : { type: String, ref: "User", required: true },
  name         : { type: String, required: true },
  width        : { type: Number, default: 1, min: 1 },
  height       : { type: Number, default: 1, min: 1 },
  description  : String,
  children     : Object,
  users        : [{ type: String, ref: "User"}],
  joinRequests : [{ type: String, ref: "User"}],
  datKey       : { type: String, default: "" }
});


module.exports = mongoose.model('Lab', modelSchema);