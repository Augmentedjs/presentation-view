# presentation-view

Augmented.js Presentation View Module

# API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [AbstractView](#abstractview)
    -   [Parameters](#parameters)
    -   [el](#el)
    -   [render](#render)
    -   [remove](#remove)
    -   [setElement](#setelement)
        -   [Parameters](#parameters-1)
    -   [delegateEvents](#delegateevents)
        -   [Parameters](#parameters-2)
        -   [Examples](#examples)
    -   [delegate](#delegate)
        -   [Parameters](#parameters-3)
    -   [undelegateEvents](#undelegateevents)
    -   [undelegate](#undelegate)
        -   [Parameters](#parameters-4)
    -   [name](#name)
        -   [Parameters](#parameters-5)
    -   [addPermission](#addpermission)
        -   [Parameters](#parameters-6)
    -   [removePermission](#removepermission)
        -   [Parameters](#parameters-7)
    -   [permissions](#permissions)
        -   [Parameters](#parameters-8)
    -   [permissions](#permissions-1)
        -   [Properties](#properties)
    -   [clearPermissions](#clearpermissions)
    -   [matchesPermission](#matchespermission)
        -   [Parameters](#parameters-9)
    -   [canDisplay](#candisplay)
-   [View](#view)
    -   [Parameters](#parameters-10)
    -   [render](#render-1)
    -   [remove](#remove-1)

## AbstractView

**Extends AugmentedObject**

Aubstract View - the base view for handlng display in the MV\* Concept

### Parameters

-   `options`  

### el

The element bound

### render

Render callback for the view

Returns **any** this Context of the view

### remove

Remove this view by taking the element out of the DOM, and removing any
applicable Events listeners.

### setElement

Change the view's element (`this.el` property) and re-delegate the
view's events on the new element.

#### Parameters

-   `element`  

### delegateEvents

Creates the `this.el` and `this.$el` references for this view using the
given `el`. `el` can be a CSS selector or an HTML string, a jQuery
context or an element. Subclasses can override this to utilize an
alternative DOM manipulation API and are only required to set the
`this.el` property.

Set callbacks, where `this.events` is a hash of
pairs. Callbacks will be bound to the view, with `this` set properly.
Uses event delegation for efficiency.
Omitting the selector binds the event to `this._el`.

#### Parameters

-   `events`  

#### Examples

```javascript
{"event selector": "callback"}
```

```javascript
{
  'mousedown .title':  'edit',
  'click .button':     'save',
  'click .open':       (e) => { ... }
}
```

### delegate

Add a single event listener to the view's element (or a child element
using `selector`). This only works for delegate-able events: not `focus`,
`blur`, and not `change`, `submit`, and `reset` in Internet Explorer.

#### Parameters

-   `eventName`  
-   `selector`  
-   `listener`  

### undelegateEvents

Clears all callbacks previously bound to the view by `delegateEvents`.
You usually don't need to use this, but may wish to if you have multiple
views attached to the same DOM element.

### undelegate

A finer-grained `undelegateEvents` for removing a single delegated event.
`selector` and `listener` are both optional.

#### Parameters

-   `eventName`  
-   `selector`  
-   `listener`  

### name

The name of the view

#### Parameters

-   `name`  

### addPermission

Adds a permission to the view

#### Parameters

-   `permission` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The permission to add
-   `negative` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Flag to set a nagative permission (optional)

### removePermission

Removes a permission to the view

#### Parameters

-   `permission` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The permission to remove
-   `negative` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Flag to set a nagative permission (optional)

### permissions

Sets the permissions to the view

#### Parameters

-   `permissions` **[array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** The permissions to set
-   `negative` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Flag to set a negative permission (optional)

### permissions

The permissions to the view<br/>
Return format:<br/>

<pre>{
    include: [],
    exclude: []
}</pre>

#### Properties

-   `permissions` **[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

### clearPermissions

Clears the permissions in the view

### matchesPermission

Matches a permission in the view

#### Parameters

-   `match` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The permissions to match
-   `negative` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Flag to set a nagative permission (optional)

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Returns true if the match exists

### canDisplay

Callback to return if this view can display

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Returns true if this view can display

## View

**Extends AbstractView**

View - the base view for handlng display in the MV\* Concept

### Parameters

-   `options`  

### render

Render callback for the view

Returns **any** this Context of the view

### remove

Remove the view and all binds
