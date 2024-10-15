"use client";
import { atom, selector } from "recoil";
const textLineNumber = atom({
  key: "textLineNumber",
  default: [1,2],
});
const textSize = atom({
  key: "textSize",
  default: 3,
});
export {
  textLineNumber,
  textSize,
};

