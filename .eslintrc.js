module.exports = {
    "extends": "airbnb-base",
    "rules": {
        "comma-dangle": "off",
        "max-len": [
            "warn",
            120
        ],
        "object-shorthand": "off",
        "no-trailing-spaces": [
            "error",
            {
                "skipBlankLines": true
            }
        ],
        "no-use-before-define": [
            "error",
            {
                // allow to reference functions that will be defined below
                "functions": false
            }
        ],
        "semi": [
            "error",
            "always",
            {
                "omitLastInOneLineBlock": true
            }
        ],
        "function-paren-newline": [
            "error",
            "consistent"
        ],
        // disable inherited rules
        "padded-blocks": [0],
        "no-console": [0],
        "prefer-promise-reject-errors": [0],
        "prefer-destructuring": [0]
    },
};