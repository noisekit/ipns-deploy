# ipns-deploy

## Setting up IPNS keys in CircleCI

NOTE: `ipfs` is expected to be installed and initialised

1. Generate PEM PKCS8 key

    ```sh
    openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:2048 -out synthetix.pem -outform PEM
    ```

2. Add PEM to CI in `Project Settings` -> `SSH Keys` -> `Additional SSH Keys` and copy fingerprint (e.g. `35:3e:32:54:6a:22:d8:31:26:84:ae:50:ef:a9:6f:00`)

    ```sh
    ssh-keygen -e -m PKCS8 -f synthetix.pem
    ```

3. Add SHH key by fingerprint in config

    ```yaml
      - add_ssh_keys:
          fingerprints:
            - "35:3e:32:54:6a:22:d8:31:26:84:ae:50:ef:a9:6f:00"
    ```

4. Add IPNS key

    ```sh
   # Note that fingerprint is used as part of key file name
   ipfs key import synthetix --format=pem-pkcs8-cleartext ~/.ssh/id_rsa_353e32546a22d8312684ae50efa96f00
   
   # This returns the key ID (IPNS name)
   # k2k4r8konodshfk5z7ldevnry88x3epurmmul13vs28v6b80y54ipupu
   ```

5. Now we can use IPNS key with name `synthetix` to publish to IPNS

    ```js
   await ipfs.name.publish(cid, { key: 'synthetix' })
   ```
