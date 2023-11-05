module.exports = {
    "extends": [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:@typescript-eslint/strict',
        "plugin:react-hooks/recommended"
    ],
    "parser": '@typescript-eslint/parser',
    "parserOptions": {
        "project": ['./tsconfig.json'],
        "tsconfigRootDir": __dirname,
    },
    "plugins": [
        '@typescript-eslint',
        'import'
    ],
    "root": true,
    "rules": {
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
    "settings": {
        "import/resolver": {
            "typescript": {}
        }
    },
    "overrides": [
        {
            "files": ["VariantRule.ts", "baseTypes.ts", "TemplateInterface.tsx"],
            "rules": {
                "@typescript-eslint/no-unsafe-return": "off",
                "@typescript-eslint/no-unsafe-call": "off",
                "@typescript-eslint/no-explicit-any": "off"
            }
        },
        {
            "files": ["VariantRule.ts"],
            "rules": {
                "@typescript-eslint/no-var-requires": "off",
                "@typescript-eslint/no-unsafe-assignment": "off",
                "@typescript-eslint/no-unsafe-member-access": "off"
            }
        }
    ],
    "ignorePatterns": [
        ".gradle",
        "build",
        "!gradle/wrapper/gradle-wrapper.jar",
        "node_modules",
        ".eslintrc.cjs",
        "webpack.config.js",
        "jest.config.js",
        "src/main/resources/public"
    ]
};