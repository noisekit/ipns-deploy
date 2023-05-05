import { create } from "ipfs-http-client";

export async function deploy({
  log = () => null,
  key,
  cid,
  IPFS_HOST,
  IPFS_PORT,
  IPFS_PROTOCOL,
  IPFS_USER,
  IPFS_PASS,
}) {
  log({
    key,
    cid,
    IPFS_HOST,
    IPFS_PORT,
    IPFS_PROTOCOL,
    IPFS_USER: Array(`${IPFS_USER}`.length + 1).join("*"),
    IPFS_PASS: Array(`${IPFS_PASS}`.length + 1).join("*"),
  });
  const ipfs = create({
    host: IPFS_HOST,
    port: IPFS_PORT,
    protocol: IPFS_PROTOCOL,
    headers: {
      ...(IPFS_USER || IPFS_PASS
        ? {
            Authorization:
              "Basic " +
              Buffer.from(`${IPFS_USER}:${IPFS_PASS}`).toString("base64"),
          }
        : {}),
      "Content-Encoding": "utf-8",
    },
    timeout: "5m",
  });

  const keys = await ipfs.key.list();
  keys
    .filter(({ name }) => name !== "self")
    .forEach(({ name, id }) => log({ key: name, ipns: id }));
  if (!keys.some(({ name }) => name === key)) {
    throw new Error(`Key "${key}" does not exist on the IPFS server`);
  }
  const { name } = await ipfs.name.publish(cid, { key });
  log({ key, ipns: name, cid });
  return name;
}
