import initSqlJs from 'sql.js';

const sqlPromise = initSqlJs({ locateFile: () => '/sql-wasm.wasm' });

export async function buildSession(
  dcId: number,
  serverAddress: string,
  port: number,
  authKey: Buffer,
) {
  const dataPromise = fetch('/template.session').then((res) =>
    res.arrayBuffer(),
  );
  const [SQL, buf] = await Promise.all([sqlPromise, dataPromise]);
  const db = new SQL.Database(new Uint8Array(buf));

  db.run(
    'INSERT INTO sessions (dc_id, server_address, port, auth_key) VALUES (:dcId, :serverAddress, :port, :authKey)',
    {
      ':dcId': dcId,
      ':serverAddress': serverAddress,
      ':port': port,
      ':authKey': authKey,
    },
  );
  const result = db.export();
  db.close();
  return result;
}
