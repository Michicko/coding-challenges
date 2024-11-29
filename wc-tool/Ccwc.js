import fs from "node:fs";
import path from "node:path";
import { getFullPath } from "./helper.js";

class Ccwc {
  constructor() {
    const args = process.argv;
    this.isFile = args.length === 3 && args[2].startsWith("-") ? false : true;

    let file = null;
    this.fullPath = null;
    this.fileString = null;
    this.filename = null;

    // if input is a file
    if (this.isFile) {
      file = args.length === 3 ? process.argv[2] : process.argv[3];
      this.fullPath = getFullPath(file);
      this.fileString = fs.readFileSync(this.fullPath, "utf-8").toString();
      this.filename = path.basename(this.fullPath);
    } else {
      // if input is a readable stream
      this.fileString = fs.readFileSync("/dev/stdin").toString("utf-8");
    }
    // cli option
    this.option = args[2].startsWith("-") ? process.argv[2] : null;
    // methods
    this.renderers = [];
  }

  // use methods
  use(...args) {
    this.renderers = [...args];
  }

  process() {
    // get current method through option
    const current = this.renderers.find((el) => el.option === this.option);
    const filename = this.filename || "";
    let result;

    // if option is passed
    if (current) {
      result = `${current.method(this)} ${filename}`;
    } else {
      // if no option is passed
      let defaults = ["-l", "-w", "-c"];
      defaults = defaults
        .map((el) => {
          const option = this.renderers.find(
            (renderer) => renderer.option === el
          );
          return option.method(this);
        })
        .join("  ");
      result = `${defaults} ${filename}`;
    }

    console.log("  " + result);
  }
}

export default Ccwc;
