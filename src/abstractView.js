import * as Augmented from "augmentedjs-next";
const _bind = require("lodash.bind");

// Cached regex to split keys for `delegate`.
const DELEGATE_EVENT_SPLITTER = /^(\S+)\s*(.*)$/;

/**
 * Aubstract View - the base view for handlng display in the MV* Concept
 * @extends Augmented.Object
 */
class AbstractView extends Augmented.Object {
  constructor(options) {
    super(options);
    //console.debug(`options on AbstractView ${JSON.stringify(options)}`);
    if (options && options.name) {
      this._name = options.name;
    } else {
      this._name = "Untitled";
    }
    if (options && options.permissions) {
      this._permissions = options.permissions;
    } else {
      this._permissions = {
        include: [],
        exclude: []
      };
    }
    if (options && options.tagName) {
      this.tagName = options.tagName;
    } else {
      this.tagName = "div";
    }
    if (options && options.el) {
      this._el = options.el;
    } else {
      this._el = "";
    }

    if (options && options.model) {
      this.model = options.model;
    } else {
      this.model = null;
    }

    if (options && options.collection) {
      this.collection = options.collection;
    } else {
      this.collection = null;
    }

    if (options && options.id) {
      this.id = options.id;
    } else {
      this.id = 0;
    }

    if (options && options.className) {
      this._style = options.className;
    } else {
      this._style = "";
    }

    if (options && options.style) {
      this._style = options.style;
    } else {
      this._style = "";
    }

    if (options && options.attributes) {
      this.attributes = options.attributes;
    } else {
      this.attributes = {};
    }

    this.cid = Augmented.Utility.uniqueId("view");

    if (options && options.noEL) {
      // This is for Mediator
    } else {
      this._ensureElement();
    }

    /*this.render = Augmented.Utility.wrap(this.render, (render) => {
      this.beforeRender();
      render.apply(this);
      this.afterRender();
      return this;
    });*/
    if (options && options.template) {
      this.template = options.template;
    } else {
      this.template = "";
    }
    this.initialize(options);
  };

  /**
   * The name property of the view
   * @property {string} name The Name of the view
   * @private
   */

  /**
   * Permissions in the view
   * @property permissions
   * @private
   */

   get el() {
     return this._el;
   };

   set el(el) {
     this._el = el;
   };

  /**
   * Custom initialize - Override for custom code
   * @param {object} options Optional options to pass to the view
   */
  init(options) {
  };
  /**
   * Initializes the view - <em>Note: Do not override, use init instead!</em>
   * @param {object} options Optional options to pass to the view
   * @returns {View} Returns 'this,' as in, this view context
   */
  initialize(options) {
    this.options = options;
    this.init(options);
    return this;
  };
  /**
   * Before Render callback for the view
   * @returns this Context of the view
   */
  beforeRender() {
    return this;
  };
  /**
   * Render callback for the view
   * @returns this Context of the view
   */
  render() {
    return this;
  };
  /**
   * After Render callback for the view
   * @returns this Context of the view
   */
  afterRender() {
    return this;
  };

  /**
   * Remove this view by taking the element out of the DOM, and removing any
   * applicable Events listeners.
   */
  remove() {
    this._removeElement();
    this.stopListening();
    return this;
  };

  // Remove this view's element from the document and all event listeners
  // attached to it. Exposed for subclasses using an alternative DOM
  // manipulation API.
  _removeElement() {
    let el = this._el;
    if (this._el && Augmented.isString(this._el)) {
      el = document.querySelector(this._el);
    }
    if (el) {
      el.innerHTML = "";
    }
  };

  /**
   * Change the view's element (`this.el` property) and re-delegate the
   * view's events on the new element.
   */
  setElement(element) {
    //console.log("setting element", element);
    this.undelegateEvents();
    this._el = element;
    this.delegateEvents();
    return this;
  };

  /**
   * Creates the `this.el` and `this.$el` references for this view using the
   * given `el`. `el` can be a CSS selector or an HTML string, a jQuery
   * context or an element. Subclasses can override this to utilize an
   * alternative DOM manipulation API and are only required to set the
   * `this.el` property.
   *
   * Set callbacks, where `this.events` is a hash of
   * pairs. Callbacks will be bound to the view, with `this` set properly.
   * Uses event delegation for efficiency.
   * Omitting the selector binds the event to `this._el`.
   * @example
   * {"event selector": "callback"}
   * @example
   * {
   *   'mousedown .title':  'edit',
   *   'click .button':     'save',
   *   'click .open':       (e) => { ... }
   * }
   */
  delegateEvents(events) {
    events || (events = Augmented.result(this, "events"));
    if (!events) {
      return this;
    }
    this.undelegateEvents();
    let key;
    for (key in events) {
      let method = events[key];
      if (!Augmented.isFunction(method)) {
        method = this[method];
      }
      if (!method) {
        continue;
      }
      const match = key.match(DELEGATE_EVENT_SPLITTER);
      this.delegate(match[1], match[2], _bind(method, this));
    }
    return this;
  };

  /**
   * Add a single event listener to the view's element (or a child element
   * using `selector`). This only works for delegate-able events: not `focus`,
   * `blur`, and not `change`, `submit`, and `reset` in Internet Explorer.
   */
  delegate(eventName, selector, listener) {
    const matchesNL = document.querySelectorAll(selector);
    if (matchesNL) {
      const matches = Array.from(matchesNL);
      let i = 0;
      const l = matches.length;
      for (i = 0; i < l; i++) {
        ////console.log("match", matches[i]);
        matches[i].addEventListener(eventName, listener);
      }
    }
    return this;
  };

  /**
   * Clears all callbacks previously bound to the view by `delegateEvents`.
   * You usually don't need to use this, but may wish to if you have multiple
   * views attached to the same DOM element.
   */
  undelegateEvents() {
    ////console.log("undelegateEvents");
    if (this._el) {
      ////console.log("undelegateEvents el", this._el);
      let el = this._el;
      if (Augmented.isString(this._el)) {
        el = document.querySelector(this._el);
      }
      if (el) {
        ////console.log("undelegateEvents selected el", el);
        const new_el = el.cloneNode(true); //true means a deep copy

        //console.log("undelegateEvents cloned el", new_el);
        if (new_el && new_el.parentNode) {
          //console.log("undelegateEvents parent el", new_el.parentNode);
          el.parentNode.replaceChild(new_el, el);
          //console.log("undelegateEvents replaced el");
        }
      }
      //this._el.removeEventListener(`.delegateEvents${this.cid}`);
    }
    return this;
  };

  /**
   * A finer-grained `undelegateEvents` for removing a single delegated event.
   * `selector` and `listener` are both optional.
   */
  undelegate(eventName, selector, listener) {
    if (this._el) {
      let el = this._el;
      if (Augmented.isString(this._el)) {
        el = document.querySelector(this._el);
      }
      if (el) {
        const matchesNL = el.querySelectorAll(selector);
        if (matchesNL) {
          const matches = Array.from(matchesNL);
          let i = 0;
          const l = matches.length;

          for (i = 0; i < l; i++) {
            ////console.log("match", matches[i]);
            matches[i].removeEventListener(eventName, listener);
          }
        }
      }

      //for (i = 0; i < l; i++) {
      //  matches[i].removeEventListener(`${eventName}.delegateEvents${this.cid}`, listener);
      //}
    }
    //this._el.removeEventListener(`${eventName}.delegateEvents${this.cid}`, selector, listener);
    return this;
  };

  // Produces a DOM element to be assigned to your view. Exposed for
  // subclasses using an alternative DOM manipulation API.
  _createElement(tagName) {
    return document.createElement(tagName);
  };

  // Ensure that the View has a DOM element to render into.
  // If `this.el` is a string, pass it through querySelector, take the first
  // matching element, and re-assign it to `el`. Otherwise, create
  // an element from the `id`, `style` and `tagName` properties.
  _ensureElement() {
    if (!this._el) {
      const attrs = Augmented.Utility.extend({}, Augmented.result(this, "attributes"));
      if (this.id) {
        attrs.id = this.id;
      }
      if (this._style) {
        attrs["class"] = this._style;
      }
      const el = this._createElement(this.tagName);
      const body = document.querySelector("body");
      if (body) {
        //console.debug("creating element " + this.tagName + " on body.")
        body.appendChild(el);
      }
      if (el) {
        this.setElement(el);
      }
      this._setAttributes(attrs);
    } else {
      this.setElement(this._el);
    }
  };

  // Set attributes from a hash on this view's element.  Exposed for
  // subclasses using an alternative DOM manipulation API.
  _setAttributes(attributes) {
    let key;
    for(key in attributes) {
      if (this._el) {
        let el = this._el;
        if (Augmented.isString(this._el)) {
          el = document.querySelector(this._el);
        }
        if (el) {
          el.setAttribute(key, attributes[key]);
        }
      }
    }
  };

  /**
  * Sets the name of the view
  * @param {string} name The name of the view
  */
  set name(name) {
    this._name = name;
  };
  /**
  * Gets the name of the view
  * @returns {string} Returns the name of the view
  */
  get name() {
    return this._name;
  };

  /**
  * Adds a permission to the view
  * @param {string} permission The permission to add
  * @param {boolean} negative Flag to set a nagative permission (optional)
  */
  addPermission(permission, negative) {
    if (!negative) {
      negative = false;
    }
    if (permission !== null && !Array.isArray(permission)) {
      const p = (negative) ? this._permissions.exclude : this._permissions.include;
      p.push(permission);
    }
  };
  /**
  * Removes a permission to the view
  * @param {string} permission The permission to remove
  * @param {boolean} negative Flag to set a nagative permission (optional)
  */
  removePermission(permission, negative) {
    if (!negative) {
      negative = false;
    }
    if (permission !== null && !Array.isArray(permission)) {
      const p = (negative) ? this._permissions.exclude : this._permissions.include;
      p.splice((p.indexOf(permission)), 1);
    }
  };
  /**
  * Sets the permissions to the view
  * @param {array} permissions The permissions to set
  * @param {boolean} negative Flag to set a negative permission (optional)
  */
  set permissions(permissions) {
    /*if (!negative) {
      negative = false;
    }
    if (permissions !== null && Array.isArray(permissions)) {
      if (negative) {
        this._permissions.exclude = permissions;
      } else {
        this._permissions.include = permissions;
      }
    }*/
    this._permissions = permissions;
  };


  /**
  * Gets the permissions to the view<br/>
  * Return format:<br/>
  * <pre>{
  *     include: [],
  *     exclude: []
  * }</pre>
  *
  * @returns {object} The permissions in the view
  */
  get permissions() {
    return this._permissions;
  };
  /**
  * Clears the permissions in the view
  */
  clearPermissions() {
    this._permissions = {
      include: [],
      exclude: []
    };
  };
  /**
  * Matches a permission in the view
  * @param {string} match The permissions to match
  * @param {boolean} negative Flag to set a nagative permission (optional)
  * @returns {boolean} Returns true if the match exists
  */
  matchesPermission(match, negative) {
    if (!negative) {
      negative = false;
    }
    const p = (negative) ? this._permissions.exclude : this._permissions.include;
    return (p.indexOf(match) !== -1);
  };
  /**
  * Callback to return if this view can display
  * @returns {boolean} Returns true if this view can display
  */
  canDisplay() {
    return true;
  };
};

export default AbstractView;
