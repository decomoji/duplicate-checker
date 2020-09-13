const fs = require("fs");

const default_path = {
  csv: "./src/candidate.csv",
  all: "./node_modules/decomoji/configs/v5_all.json",
};

const CSV_PATH = process.argv[2] || default_path.csv;
const ALL_PATH = process.argv[3] || default_path.all;

