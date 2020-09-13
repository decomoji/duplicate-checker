const fs = require("fs");
const isStringOfNotEmpty = require("./utilities/isStringOfNotEmpty");
const writeJsonFileSync = require("./utilities/writeJsonFileSync");

const default_path = {
  csv: "./src/candidate.csv",
  all: "./node_modules/decomoji/configs/v5_all.json",
};

const CSV_PATH = process.argv[2] || default_path.csv;
const ALL_PATH = process.argv[3] || default_path.all;

// CSV をパースして行ごとの配列にする
const csv = fs.readFileSync(CSV_PATH).toString().split("\n");

// 既存リストの JSON
const exists = JSON.parse(fs.readFileSync(ALL_PATH));

// 行を配列にしてキーと値群に分ける
const [header, ...values] = csv.map((v) => v.replace("\r", "").split(","));

// header[i] をキーにしたオブジェクトの配列を作る
const labelled = values.map((row) => {
  const data = {};
  row.forEach((value, i) => {
    // 値が空文字列だったら何もしない
    if (!isStringOfNotEmpty(value)) return;
    data[header[i]] = value;
  });
  return data;
});

// `ignore: TRUE` を取り除く
const candidates = labelled.filter((v) => !v.ignore);

// 登録しようとしているリスト（candidates）と既存リスト（exists）を突合して重複しているものを作る
const duplicates = candidates.filter((c) => {
  return exists.findIndex((e) => e.name === c.yomi) > -1;
});

// レポートオブジェクト
const report = {
  csv: CSV_PATH,
  result: duplicates.length > 0 ? "FAIL" : "PASS",
  duplicates,
};

// REPORT.json を書き出す
writeJsonFileSync(report, "./REPORT.json", "silent");
