describe("Given an Augmented View", () => {
  describe("creating a standard instance of Augmented View", () => {
    let view = null;
    let fired  = false;

    beforeEach(() => {
      fired = false;
      view = new View.View();
    });

    afterEach(() => {
      fired  = false;
      view.remove();
      view = null;
    });

    it("has an augmented View", () => {
      expect(View.View).to.not.be.undefined;
    });
    it("can set a name property", () => {
      view.name = "test";
      expect(view.name).to.equal("test");
    });
    it("can set permissions", () => {
      view.addPermission("admin");
      expect(view.permissions.include).to.not.equal([]);
    });
    it("can match a permission", () => {
      view.permissions = { "include": ["admin", "bubba"], "exclude": [] };
      expect(view.matchesPermission("bubba")).to.be.true;
    });
    it("does not match a negative permission", () => {
      view.permissions = { "include": ["admin", "bubba"], "exclude": [] };
      expect(view.matchesPermission("bubba", true)).to.be.false;
    });
    it("contains a overridable canDisplay", () => {
      expect(view.canDisplay()).to.be.true;
    });

    it("can render", () => {
      const v = view.render();
      expect(v).to.not.be.undefined;
    });

    xit("supports beforeRender when attempting a render", () => {
      view.beforeRender = () => { fired = true; };
      view.render();
      expect(fired).to.be.true;
    });

    xit("supports afterRender when attempting a render", () => {
      view.afterRender = () => { fired = true; };
      view.render();
      expect(fired).to.be.true;
    });

    it("supports correct \"this\" when overriding a render", () => {
      view.monkey = "monkey";
      const that = view;
      view.render = () => {
        fired = ((that !== window) && (that.monkey === "monkey"));
      };
      view.render();
      expect(fired).to.be.true;
    });
  });

  describe("extending my own instance of Presentation View", () => {
    class BaseView extends View.View {
      constructor() {
        super({ "name": "monkey" });
        this.monkey = "monkey";
      };
    };

    let view = null;
    let fired  = false;

    beforeEach(() => {
      fired = false;
      view = new BaseView();
    });

    afterEach(() => {
      fired  = false;
      view.remove();
      view = null;
    });

    it("has an BaseView that extends View.View", () => {
      expect(BaseView).to.not.be.undefined;
    });
    it("can set a name property", () => {
      view.name = "test";
      expect(view.name).to.equal("test");
    });
    it("can set permissions", () => {
      view.addPermission("admin");
      expect(view.permissions.include).to.not.equal([]);
    });
    it("can match a permission", () => {
      view.permissions = { "include": ["admin", "bubba"], "exclude": [] };
      expect(view.matchesPermission("bubba")).to.be.true;
    });
    it("does not match a negative permission", () => {
      view.permissions = { "include": ["admin", "bubba"], "exclude": [] };
      expect(view.matchesPermission("bubba", true)).to.be.false;
    });
    it("contains a overridable canDisplay", () => {
      expect(view.canDisplay()).to.be.true;
    });

    xit("supports beforeRender when attempting a render", () => {
      view.beforeRender = () => { fired = true; };
      view.render();
      expect(fired).to.be.true;
    });

    xit("supports afterRender when attempting a render", () => {
      view.afterRender = () => { fired = true; };
      view.render();
      expect(fired).to.be.true;
    });

    // defect fixs
    it("supports correct \"this\" when overriding a render", () => {
      view.monkey = "monkey";
      const that = view;
      view.render = () => {
        fired = ((that !== window) && (that.monkey === "monkey"));
      };
      view.render();
      expect(fired).to.be.true;
    });

    xit("supports beforeRender, render, then afterRender when attempting a render", () => {
      view.r = 0;
      view.beforeRender = () => { view.r++; };
      view.render = () => {
        view.r++;
        fired = true;
      };
      view.afterRender = () => { view.r++; };
      view.render();
      expect(view.r).to.equal(1);
      expect(fired).to.be.true;
    });

    it("calls render only once", () => {
      view.r = 0;
      view.f = false;
      view.beforeRender = () => { view.f = true; };
      view.render = () => {
        view.r++;
      };
      view.render();
      expect(view.r).to.equal(1);
      //expect(view.f).to.be.true;
    });
  });

  describe("Extending my own using option declarations", () => {
    class YetAnotherView extends View.View {
      constructor(options) {
        //console.log("options", options);
        super(options);
        //console.log("im here", this.name);
        if (!this.template) {
          //console.log("oops no template");
          this.template = `oops`;
        }
        if (!this.events) {
          //console.log("oops no events");
          this.events = {
            "click #bump2": "bump"
          };
        }
      };
      bump(e) {
        console.log("I was clicked!");
      };
    };
    it("can init without error with no options", () => {
      const yetAnotherView = new YetAnotherView();
      expect(yetAnotherView).to.not.be.undefined;
    });
    it("can init without error with options with invalid el", () => {
      const yetAnotherView = new YetAnotherView({
        "el": "view2",
        "name": "YetAnotherView",
        "template": "<h1>This is a simple view.</h1><h2>My view name is YetAnotherView.</h2><p>This vew is declared by passing options.</p><button id=\"bump2\">Click Me</button>",
        "events": {
          "click #bump2": "bump"
        }
      });
      expect(yetAnotherView).to.not.be.undefined;
    });
    it("can init without error with options with valid el", () => {
      const yetAnotherView = new YetAnotherView({
        "el": "#sandbox",
        "name": "YetAnotherView",
        "template": "<h1>This is a simple view.</h1><h2>My view name is YetAnotherView.</h2><p>This vew is declared by passing options.</p><button id=\"bump2\">Click Me</button>",
        "events": {
          "click #bump2": "bump"
        }
      });
      expect(yetAnotherView).to.not.be.undefined;
    });

    it("can render without error with options with invalid el", () => {
      const yetAnotherView = new YetAnotherView({
        "el": "stupid"
      });
      const result = yetAnotherView.render();
      expect(result).to.not.be.undefined;
    });
  });
});
