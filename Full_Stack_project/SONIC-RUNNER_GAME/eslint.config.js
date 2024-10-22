import globals from 'globals';
import pluginJs from '@eslint/js';


export default [
  {
    languageOptions: { globals: globals.browser },
    rules: {
      'quotes': ['error', 'single'],
      'semi': ['error', 'always']
    }
  },
  pluginJs.configs.recommended,

];