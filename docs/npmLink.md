# Using up to date Belay with npm link
--------------------------------------

Note: These instructions are if you want to use Belay from the master branch on
github.  Once Belay is stable and released, it'll be recommended to not use the
unstable master branch with these instructions.  But, in the meantime, this is
the best method to integrate with and use Belay.

First, you will need to build belay as an npm package.  From Belay's root
folder run:

```bash
npm install
```

Then you will need to go to the newly created dist/ directory:

```bash
cd dist
```

We're going to link this dist/ directory as a globally installed npm
package by running:

```bash
npm link
```

Finally, from your project's directory you can link a reference to your
node_modules/belay/ to the globally "installed" (linked) dist folder from the
last step by running:

```bash
npm link belay
```
