[![Build Status](https://travis-ci.org/percyhanna/rquery.svg?branch=master)](https://travis-ci.org/percyhanna/rquery)

# rquery
A [React](http://facebook.github.io/react/) tree traversal utility similar to
jQuery, which can be useful for making assertions on your components in your
tests.

## Vision
[`chai-react`](https://github.com/percyhanna/chai-react/) was originally built
to help with test assertions of React components. However, it quickly started
adding too much complexity because it was attempting to solve two problems: 1)
making assertions of properties/rendered content and 2) traversing the rendered
React tree to make those assertions.

`rquery` is meant to take over the rendered tree traversing responsibility from
`chai-react`, which will allow it to be used with any testing framework. It will
also provide convenience wrappers for various common test actions, such as event
dispatching.

## Setup

### Node.js, Webpack, Browserify

```javascript
var _ = require('lodash');
var React = require('react/addons);
var $R = require('rquery)(_, React);
```

### Browser with Scripttags

Include `react-with-addons` and `lodash` in the page, then you get

```javascript
window.$R
```
as a global.


## Usage

### $R Factory

The `$R` factory method returns a new instance of an `rquery` object.

**Example**:

```javascript
var $r = $R(component);
```

### `rquery` Class

An instance of the `rquery` class contains an array of components, and provides
an `Array`-like interface to directly access each component.

**Example**:

```javascript
var $r = $R([component1, component2 /* , componentN */]);
$r.length === 2; // true
$r[0] === component1; // true
$r[1] === component2; // true
```

#### *Instance Methods*

* `find (String selector)`: Returns a new `rquery` instace with the
components that match the provided selector (see [Selector](#selectors)
documentation).
* `simulateEvent (String eventName, Object eventData)`: simulates
triggering the `eventName` DOM event on the component(s) in the rquery object.
* `[eventName] (Object eventData)`: Convenience helper methods to trigger any
supported React DOM event. See the [React documentation](http://facebook.github.io/react/docs/events.html)
to read about the events that are currently supported.

### Selectors

#### Component Selector

**Example**:

```javascript
$R(component).find('MyComponentName');
$R(component, 'MyButton');
```

**Description**:

Traverses the tree to find components based on their `displayName` value. *NB*:
the selector must start with an upper-case letter, to signify a
CompositeComponent vs. a DOM component.

#### DOM Tag Selector

**Example**:

```javascript
$R(component).find('div');
$R(component, 'p');
```

**Description**:

Traverses the tree to find DOM components based on their `tagName`. *NB*: the
selector must start with a lower-case letter, to signify a CompositeComponent
vs. a DOM component.

#### DOM Class Selector

**Example**:

```javascript
$R(component).find('.button');
$R(component, '.green');
```

**Description**:

Traverses the tree to find components with `className`s that contain the
specified class.

#### Attribute Selector

**Example**:

```javascript
$R(component).find('[target]');
$R(component, '[onClick]');
```

**Description**:

Traverses the tree to find components that have a value defined for the given
property name.

*Note:* Although these are labeled as *attribute* selectors, they are really
*property* selectors. In other words, they match properties being passed to a
DOM/Composite component, not actual DOM attributes being rendered.

#### Attribute Value Selectors

**Example**:

```javascript
$R(component).find('[target="_blank"]');
$R(component, '[href="http://www.github.com/"]');
```

**Supported Operators**:

`rquery` supports the [CSS Selectors level 3 spec]
(http://dev.w3.org/csswg/selectors-3/#attribute-selectors):

* `[att="val"]`: equality
* `[att~="val"]`: whitespace-separated list
* `[att|="val"]`: namespace-prefixed (e.g. `val` or `val-*`)
* `[att^="val"]`: prefix
* `[att$="val"]`: suffix
* `[att*="val"]`: substring

**Description**:

Traverses the tree to find components with a property value that matches the
given key/value pair.

*Note:* Although these are labeled as *attribute* selectors, they are really
*property* selectors. In other words, they match properties being passed to a
DOM/Composite component, not actual DOM attributes being rendered. For complex
property values (e.g. arrays, objects, etc.), the value matchers are less useful
as `rquery` doesn't currently support any complex value matching.

*Note:* All values *must* be provided as double-quoted strings. `[att="val"]` is
valid, but `[att=val]` and `[att='val']` are not.

## Usage with Test Suites

The rquery interface is meant to be generic enough to use with any assertion
library/test runner.

Sample usage with Chai BDD style assertions:

```javascript
expect($R(component).find('MyComponent')).to.have.length(1);
