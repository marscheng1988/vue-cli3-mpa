module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'plugin:vue/essential',
        '@vue/airbnb',
        '@vue/typescript',
    ],
    rules: {
        "indent": [
            "error",
            2
        ],
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        "no-param-reassign": [2, {
            "props": false
        }],
        //#不添加后缀，添加会报错
        'import/extensions': ['error', 'always', {
            //   ignorePackages: true,
            'js': 'never',
            'ts': 'never',
            'scss': 'never',
            'vue': 'ignorePackages'
        }]
    },
    parserOptions: {
        parser: '@typescript-eslint/parser',
    },
    "settings": {
        "indent": ["error", 4],
        "import/resolver": {
            "webpack": {
                "config": require.resolve('@vue/cli-service/webpack.config.js')
            }
        }
    },
};
