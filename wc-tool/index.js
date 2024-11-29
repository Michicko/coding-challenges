#!/usr/bin/env node
import fs from "node:fs";
import Ccwc from "./Ccwc.js";
import Renderer from "./Renderer.js";

const getFileSize = new Renderer({
  option: "-c",
  method: (ccwc) => {
    if (ccwc.isFile) {
      return fs.statSync(ccwc.fullPath).size;
    }
    return Buffer.byteLength(ccwc.fileString, "utf8");
  },
});

const getLinesCount = new Renderer({
  option: "-l",
  method: (ccwc) => {
    let total = 0;
    let lines = ccwc.fileString.split("\n");

    while (total < lines.length) {
      total += 1;
    }

    return total;
  },
});

const getWordCounts = new Renderer({
  option: "-w",
  method: (ccwc) => {
    let totalWords = 0;
    let lineCount = 0;
    let lines = ccwc.fileString.split("\n");

    while (lineCount < lines.length) {
      let chars = lines[lineCount].trim().split(" ");

      if (!chars || (chars[0] === "" && chars.length === 1)) {
        lineCount += 1;
      } else {
        totalWords += chars.length;
        lineCount += 1;
      }
    }

    return totalWords;
  },
});

const getCharCounts = new Renderer({
  option: "-m",
  method: (ccwc) => {
    let totalChars = 0;
    let lineCount = 0;
    let lines = ccwc.fileString.split("\n");

    while (lineCount < lines.length) {
      let chars = lines[lineCount].trim().split("");
      if (chars.length === 0) {
        lineCount += 1;
      } else {
        totalChars += chars.length;
        lineCount += 1;
      }
    }

    return totalChars;
  },
});

const ccwc = new Ccwc();
ccwc.use(getFileSize, getLinesCount, getWordCounts, getCharCounts);
ccwc.process();
