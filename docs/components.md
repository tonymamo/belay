# Including and using the React components
------------------------------------------

Once your project is [linked to Belay](npmLink.md), you will need to import (or require in non-ES6) the various Belay components in each of your components or views. Using ES6 and Babel, this is as simple as writing a one-liner at the top of your component:

```javascript
import { Input, Button, Alert, Container } from 'belay';
```

Note that you can include one or many items from the [available list of Belay components](../src/index.js).

Now that you have your components imported, you can use them in your `render()` function and start passing them props. Each component has its own required and optional props, so refer to each component's documentation README file.

For example, you can use a Button in your component like so:

```javascript
<Button color="secondary" icon="plus" text="Your Text Here" block/>
```