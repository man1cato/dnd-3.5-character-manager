"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "AbilityScores",
    embedded: false
  },
  {
    name: "Alignment",
    embedded: false
  },
  {
    name: "Character",
    embedded: false
  },
  {
    name: "Class",
    embedded: false
  },
  {
    name: "Gender",
    embedded: false
  },
  {
    name: "HitDie",
    embedded: false
  },
  {
    name: "Language",
    embedded: false
  },
  {
    name: "Race",
    embedded: false
  },
  {
    name: "Size",
    embedded: false
  },
  {
    name: "User",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `${process.env["PRISMA_ENDPOINT"]}`,
  secret: `${process.env["PRISMA_SECRET"]}`
});
exports.prisma = new exports.Prisma();
