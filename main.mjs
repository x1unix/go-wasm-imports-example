import './polyfill.js';
import { promises as fs } from 'fs';
import Go from './custom-go.mjs';

const go = new Go();
go.exportFunction('main.multiply', sp => {
  sp >>>= 0;
  const a1 = go.mem.getInt32(sp + 8, true);  // SP + sizeof(int64)
  const a2 = go.mem.getInt32(sp + 16, true); // SP + sizeof(int64) * 2
  const result = a1 * a2;
  console.log('Got call from Go:', {a1, a2, result});
  go.setInt64(sp + 24, result);
})

const buff = await fs.readFile('./main.wasm');
const {instance} = await WebAssembly.instantiate(buff, go.importObject);
await go.run(instance);
