import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";

export default ({
  input: 'client/scripts/main.js',
  plugins: [commonjs(), resolve()],
  output: [{
    file: 'build/bundle.js',
    format: 'cjs'
  }]
});
