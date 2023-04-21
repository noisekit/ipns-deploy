import {create} from 'ipfs-http-client';

export async function deploy({
  log = () => null,
  cid,
  IPFS_HOST,
  IPFS_PORT,
  IPFS_PROTOCOL,
  IPFS_USER,
  IPFS_PASS,
  IPNS_KEY
}) {
  const ipfs = create({
    host: IPFS_HOST,
    port: IPFS_PORT,
    protocol: IPFS_PROTOCOL,
    headers: {
      ...(IPFS_USER || IPFS_PASS
        ? {
            Authorization: 'Basic ' + Buffer.from(`${IPFS_USER}:${IPFS_PASS}`).toString('base64'),
          }
        : {}),
      'Content-Encoding': 'utf-8',
    },
    timeout: '5m',
  });

  const { name } = await ipfs.name.publish(cid, { key: IPNS_KEY });
  return name
}
