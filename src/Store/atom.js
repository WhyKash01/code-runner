"use client";
import { atom, selector } from "recoil";
const language = atom({
  key:"lang",
  default: "javascript"
})
const room = atom({
  key:"room",
  default: ""
})
const codeValue= atom({
  key: "codeval",
  default:""
})
const textLineNumber = atom({
  key: "textLineNumber",
  default: [1,2],
});
const textSize = atom({
  key: "textSize",
  default: 3,
});
const Loading = atom({
  key: "Loading",
  default: false,
});
export {
  Loading,
  room,
  codeValue,
  language,
  textLineNumber,
  textSize,
};

