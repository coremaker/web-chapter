module.exports = {
    rules: {
        // Maybe enable this rule in the future
        'import/max-dependencies': ['off', { max: 10 }],
        // Maybe enable this rule in the future
        'max-depth': ['off', 4],
        // Maybe enable this rule in the future
        'max-nested-callbacks': ['off', 3],

        'no-undefined': 'error',
        'no-invalid-this': 'error',
        'no-extra-parens': 'all',
        'no-constant-condition': 'error',
        'max-lines': ['error', { max: 300, skipBlankLines: false, skipComments: true }],
        'max-params': ['error', 5],
        'max-statements-per-line': ['error', { max: 1 }],
        'max-lines-per-function': [
            'error',
            {
                max: 50,
                skipBlankLines: true,
                skipComments: true,
                IIFEs: true,
            },
        ],
        complexity: ['error', 15],
        'no-magic-numbers': [
            'error',
            {
                ignore: [0, 1, -1],
                ignoreArrayIndexes: true,
                enforceConst: true,
                detectObjects: true,
            },
        ],
    },
};
