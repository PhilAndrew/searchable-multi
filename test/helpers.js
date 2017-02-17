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

  search(term) {
    var input = this.shadow.querySelector('input');
    input.value = term;
    input.dispatchEvent(new Event('keyup'));
  }

  visibleChildren(container) {
    return Array.from(container.children).filter(item => {
      return item.style.display !== 'none';
    }).length;
  }

  handleEvent(ev) {
    this.events.get('change').push(ev);
  }
}
