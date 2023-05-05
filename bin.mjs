#!/usr/bin/env node

import debug from "debug";
import * as dotenv from "dotenv";
import { promises as fs } from "fs";
import { deploy } from "./deploy.mjs";

dotenv.config(".env");
const log = debug("ipns-deploy");

const { IPFS_HOST, IPFS_PORT, IPFS_PROTOCOL, IPFS_USER, IPFS_PASS } =
  process.env;
const [key, cid] = process.argv.slice(2);

console.log(
  await deploy({
    log,
    key,
    cid,
    IPFS_HOST,
    IPFS_PORT,
    IPFS_PROTOCOL,
    IPFS_USER,
    IPFS_PASS,
  })
);
