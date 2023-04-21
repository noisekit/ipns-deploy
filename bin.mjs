#!/usr/bin/env node
import debug from 'debug';
import * as dotenv from 'dotenv';
import { promises as fs } from 'fs';
import { deploy } from './deploy.mjs';

dotenv.config();
const log = debug('ipns-deploy');

const { IPFS_HOST, IPFS_PORT, IPFS_PROTOCOL, IPFS_USER, IPFS_PASS, IPNS_KEY } = process.env;
const [cid] = process.argv.slice(2);

console.log(
  await deploy({
    log,
    cid,
    IPFS_HOST,
    IPFS_PORT,
    IPFS_PROTOCOL,
    IPFS_USER,
    IPFS_PASS,
    IPNS_KEY,
  })
);
