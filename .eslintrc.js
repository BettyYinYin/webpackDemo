
module.exports = {
    "parser": "babel-eslint",
    "extends": "airbnb",
    "env": {
        "browser": true,
        "node": true
    },
    rules: {
        "linebreak-style": ["error", "windows"],
        "import/no-extraneous-dependencies": 0,
        "comma-dangle": [0,"always-multiline"],
        "semi": [2, "never"], 
        "arrow-body-style": [0, "never"],
        "import/prefer-default-export": 0,
        "array-callback-return": "off",
        "func-names": "off" 
    }
}