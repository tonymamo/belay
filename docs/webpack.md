# Including the SASS framework with webpack
-------------------------------------------

Including the SASS framework into your project is a simple two step process.
We've included every SASS file individually as well, so you can choose to grab
all of the framework at once, just the variables, or any other combination you
can think of.

First, you will need to have your own SASS file for your project.  Be sure to
use all of the appropiate loaders for style, sass, etc.

Inside the SASS file be sure to import Belay like so:

```sass
@import '~belay/lib/styles/framework';
```

This will include the whole belay framework into your project.  The special ~
syntax in the import tells webpack to check your node_modules directory for the
belay node module and grab our SASS framework from there.

Lastly, you will now make sure that your webpack config is including this SASS
file with the Belay import in your entry property.

```javascript
module.exports = {

    entry: [
        'webpack-hot-middleware/client',
        './src/styles/styles.scss',
        './src/js/client.js'
    ]
}
```
