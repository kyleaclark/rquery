describe('rquery', function () {
  var reactClass, component;

  var TestUtils = React.addons.TestUtils;

  function run (selector) {
    component = TestUtils.renderIntoDocument(React.createElement(reactClass));
    return $R(component, selector);
  };

  before(function () {
    reactClass = React.createClass({
      displayName: "MyComponent",

      render: function () {
        return (
          React.createElement('div', { id: 'my-component', className: 'my-class some-other-class' },
            React.createElement('p', {}, 'Hello, world!'),
            React.createElement('p', {}, 'More paragraphs.'),
            React.createElement('a', { className: 'button', target: '_blank', 'data-something': 'hello ' }, 'Click me!'),
            React.createElement('button', { className: 'button button-default' }, 'Save')
          )
        );
      }
    });
  });

  describe('#find', function () {
    describe('text description of component', function () {
      before(function () {
        this.$r = run('MyComponent');
      });

      it('finds one component', function () {
        expect(this.$r).to.have.length(1);
      });

      it('component is instance of MyComponent', function () {
        expect(this.$r[0]).to.be.componentOfType(reactClass);
      });
    });

    describe('text description of DOM component', function () {
      before(function () {
        this.$r = run('a');
      });

      it('finds one component', function () {
        expect(this.$r).to.have.length(1);
      });

      it('component is instance of "a" tag', function () {
        expect(this.$r[0]).to.be.componentWithTag('a');
      });
    });

    describe('DOM selector with multiple matches', function () {
      before(function () {
        this.$r = run('p');
      });

      it('finds two components', function () {
        expect(this.$r).to.have.length(2);
      });

      it('first component is instance of "p" tag', function () {
        expect(this.$r[0]).to.be.componentWithTag('p');
      });

      it('second component is instance of "p" tag', function () {
        expect(this.$r[1]).to.be.componentWithTag('p');
      });
    });

    describe('DOM class selector', function () {
      before(function () {
        this.$r = run('.button');
      });

      it('finds two components', function () {
        expect(this.$r).to.have.length(2);
      });

      it('first component is instance of "a" tag', function () {
        expect(this.$r[0]).to.be.componentWithTag('a');
      });

      it('second component is instance of "button" tag', function () {
        expect(this.$r[1]).to.be.componentWithTag('button');
      });
    });

    describe('DOM class selector with dash', function () {
      before(function () {
        this.$r = run('.my-class');
      });

      it('find one component', function () {
        expect(this.$r).to.have.length(1);
      });

      it('first component is instance of "a" tag', function () {
        expect(this.$r[0]).to.be.componentWithTag('div');
      });
    });

    describe('attribute selector', function () {
      before(function () {
        this.$r = run('[target]');
      });

      it('finds one component', function () {
        expect(this.$r).to.have.length(1);
      });

      it('component is instance of "a" tag', function () {
        expect(this.$r[0]).to.be.componentWithTag('a');
      });

      it('component has target property', function () {
        expect(this.$r[0].props).to.contain.key('target');
      });
    });

    describe('attribute selector with dash in name', function () {
      before(function () {
        this.$r = run('[data-something]');
      });

      it('finds one component', function () {
        expect(this.$r).to.have.length(1);
      });

      it('component is instance of "a" tag', function () {
        expect(this.$r[0]).to.be.componentWithTag('a');
      });

      it('component has data-something property', function () {
        expect(this.$r[0].props).to.contain.key('data-something');
      });
    });

    describe('attribute value selector', function () {
      before(function () {
        this.$r = run('[target=_blank]');
      });

      it('finds one component', function () {
        expect(this.$r).to.have.length(1);
      });

      it('component is instance of "a" tag', function () {
        expect(this.$r[0]).to.be.componentWithTag('a');
      });

      it('component has target property', function () {
        expect(this.$r[0].props).to.contain.key('target');
      });
    });
  });

  describe('#findComponent', function () {
    before(function () {
      this.$r = run().findComponent(reactClass);
    });

    it('finds one component', function () {
      expect(this.$r).to.have.length(1);
    });

    it('component is instance of MyComponent', function () {
      expect(this.$r[0]).to.be.componentOfType(reactClass);
    });
  });

  describe('#get', function () {
    before(function () {
      this.$r = run('p');
    });

    describe('when accessing a valid index', function () {
      before(function () {
        this.$getr = this.$r.get(1);
      });

      it('returns a new rquery instance with one component', function () {
        expect(this.$getr).to.have.length(1);
      });

      it('returns a new rquery instance with the correct component', function () {
        expect(this.$getr[0]).to.equal(this.$r[1]);
      });
    });

    describe('when accessing an invalid index', function () {
      before(function () {
        this.$getr = this.$r.get(3);
      });

      it('returns a new rquery instance with zero components', function () {
        expect(this.$getr).to.have.length(0);
      });
    });
  });
});
