module.exports = {
    parser: '@babel/eslint-parser',
    plugins: ['prettier', 'babel', 'sonarjs'],
    extends: ['airbnb/base', 'eslint:recommended', 'plugin:sonarjs/recommended', 'plugin:prettier/recommended'],
};
