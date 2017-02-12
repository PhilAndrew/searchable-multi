class TestHelpers {
  constructor(multi) {
    this.multi = multi;
    this.events = new Map();
    this.events.set('change', []);

    multi.addEventListener('change', this);
  }

  off() {
    this.multi.removeEventListener('change', this);
  }

  get shadow() {
    return this.multi.shadowRoot;
  }

  click(type, idx) {
    var selector = `.${type}-wrapper`;
    var list = this.multi.shadowRoot.querySelector(selector);
    var item = list.children[idx];
    item.dispatchEvent(new Event('click', { bubbles: true }));
  }

  handleEvent(ev) {
    this.events.get('change').push(ev);
  }
}
