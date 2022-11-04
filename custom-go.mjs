import './wasm_exec.js';

export default class CustomGo extends global.Go {
  MAX_I32 = Math.pow(2, 32);

  // Copied from 'setInt64'
  setInt64(offset, value) {
    this.mem.setUint32(offset + 0, value, true);
    this.mem.setUint32(offset + 4, this.MAX_I32, true);
  }
  /**
   * Adds function to import object
   * @param name symbol name (package.functionName)
   * @param func function.
   */
  exportFunction(name, func) {
    this.importObject.go[name] = func;
  }
}
