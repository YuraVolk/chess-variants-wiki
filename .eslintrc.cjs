module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:@typescript-eslint/strict',
        "plugin:react-hooks/recommended"
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname,
    },
    plugins: [
        '@typescript-eslint',
        'import'
    ],
    root: true,
    rules: {
        "@typescript-eslint/array-type": ["warn", {
            "default": "array-simple",
            "readonly": "array-simple"
        }],
        "@typescript-eslint/unbound-method": ["warn", {
            "ignoreStatic": true
        }],
        "@typescript-eslint/no-unused-vars": ["warn", {
            "args": "after-used"
        }],
        "prefer-rest-params": ["off"],
        "no-mixed-spaces-and-tabs": ["off"]
    },
    settings: {
        "import/resolver": {
            "typescript": {}
        }
    }
};