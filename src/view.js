import AbstractView from "./abstractView.js";
import { isString } from "next-core-utilities";

/**
 * View - the base view for handlng display in the MV* Concept
 * @extends Presentation.AbstractView
 */
class View extends AbstractView {
  constructor(options) {
    super(options);
  };

  /**
   * Render callback for the view
   * @returns this Context of the view
   */
  render() {
    if (this._el && this.template) {
      let el = this._el;
      if (isString(this._el)) {
        el = document.querySelector(this._el);
      }
      if (el) {
        el.innerHTML = this.template;
      }
    }
    return this;
  };

  /**
   * Remove the view and all binds
   */
  remove() {
    /* off to unbind the events */
    this.undelegateEvents();
    this.off();
    this.stopListening();
    if (this._el) {
      let el = this._el;
      if (isString(this._el)) {
        el = document.querySelector(this._el);
      }
      if (el) {
        el.innerHTML = "";
      }
    }
    return this;
  };
};

export default View;
