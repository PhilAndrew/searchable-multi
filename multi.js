
class SearchableMulti extends HTMLElement {
  static get observedAttributes() {
    return ['placeholder'];
  }

  constructor() {
    super();
    this._values = [];
    this._placeholder = 'Search...';
  }

  connectedCallback() {
    if(!this._rendered) {
      this._rendered = true;
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(this._template());
      this._refresh();
    }

    this._nonSelected.addEventListener('click', this);
    this._selected.addEventListener('click', this);
    this._search.addEventListener('keyup', this);
  }

  disconnectedCallback() {
    this._nonSelected.removeEventListener('click', this);
    this._selected.removeEventListener('click', this);
    this._search.removeEventListener('keyup', this);
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if(name === 'placeholder') {
      this.placeholder = newVal;
    }
  }

  get value() {
    return this._values;
  }

  get placeholder() {
    return this._placeholder;
  }

  set placeholder(val) {
    this._placeholder = val;
    if(this._rendered) {
      this.shadowRoot.querySelector('input').placeholder = val;
    }
  }

  handleEvent(ev) {
    var el = ev.target;
    switch(ev.type) {
      case 'click':
        if(el.className === 'item') {
          if(el.parentNode.className === 'non-selected-wrapper') {
            this._nonSelectedClick(el);
          } else {
            this._selectedClick(el);
          }
        }
        break;
      case 'keyup':
        if(ev.keyCode === 32 || ev.keyCode === 13) {
          if(el.className === 'item') {
            if(el.parentNode.className === 'non-selected-wrapper') {
              this._nonSelectedClick(el);
            } else {
              this._selectedClick(el);
            }
            ev.preventDefault();
          }
        } else {
          this._onSearch();
        }
        break;
    }
  }

  _nonSelectedClick(el) {
    // Not already selected
    if(!el._selected) {
      this._setSelected(el);
      this.dispatchEvent(new Event('change'));
    }
  }

  _setSelected(el) {
    el._option.selected = true;
    var clone = el._selected = el.cloneNode(true);
    clone._nonSelected = el;
    this._selected.appendChild(clone);
    this._values.push(el.dataset.value);
  }

  _selectedClick(el) {
    var nonSelected = el._nonSelected;
    var option = nonSelected._option;
    nonSelected._selected = undefined;
    el.parentNode.removeChild(el);

    // Deselect the option
    option.selected = false;

    // Remove from values
    var idx = this._values.indexOf(el.dataset.value);
    if(idx !== -1) {
      this._values.splice(idx, 1);
      this.dispatchEvent(new Event('change'));
    }
  }

  _onSearch() {
    var term = this._search.value.toLowerCase();

    function includes(str) {
      return str.toLowerCase().indexOf(term) !== -1;
    }

    var nonSelected, d;
    for(var i = 0, len = this._nonSelected.children.length; i < len; i++) {
      nonSelected = this._nonSelected.children[i];

      if(term && !includes(nonSelected.dataset.value) &&
        !includes(nonSelected.textContent)) {
        d = 'none';
      } else {
        d = '';
      }
      nonSelected.style.display = d;
      if(nonSelected._selected) {
        nonSelected._selected.style.display = d;
      }
    }
  }

  _template() {
    var doc = this.ownerDocument;
    var wrapper = doc.createElement('div');
    wrapper.className = 'wrapper';

    var style = doc.createElement('style');
    style.textContent = this._styles();

    var input = this._search = doc.createElement('input');
    input.type = 'text';
    input.className = 'search-input';
    input.placeholder = this.placeholder;

    var nonSelected = this._nonSelected = doc.createElement('div');
    nonSelected.className = 'non-selected-wrapper';

    var selected = this._selected = doc.createElement('div');
    selected.className = 'selected-wrapper';

    wrapper.appendChild(style);
    wrapper.appendChild(input);
    wrapper.appendChild(nonSelected);
    wrapper.appendChild(selected);
    return wrapper;
  }

  _styles() {
    return `
      :host {
        display: block;
      }

      .wrapper {
          border: 1px solid #ccc;
          border-radius: 3px;
          overflow: hidden;
          width: 100%;
      }

      .non-selected-wrapper,
      .selected-wrapper {
          box-sizing: border-box;
          display: inline-block;
          height: 200px;
          overflow-y: scroll;;
          padding: 10px;
          vertical-align: top;
          width: 50%;
      }

      .non-selected-wrapper {
          background: #fafafa;
          border-right: 1px solid #ccc;
      }

      .selected-wrapper {
          background: #fff;
      }

      .item {
          cursor: pointer;
          display: block;
          padding: 5px 10px;
      }

      .item:hover {
          background: #ececec;
          border-radius: 2px;
      }

      .search-input {
          border: 0;
          border-bottom: 1px solid #ccc;
          border-radius: 0;
          display: block;
          font-size: 1em;
          margin: 0;
          outline: 0;
          padding: 10px 20px;
          width: 100%;
      }

      .non-selected-wrapper .item.selected {
          opacity: 0.5;
      }

      .non-selected-wrapper .row.selected:hover {
          background: inherit;
          cursor: inherit;
      }
    `;
  }

  _refresh() {
    this._selected.innerHTML = this._nonSelected.innerHTML = '';

    var term = this._search.value;
    var options = [].slice.call(this.querySelectorAll('option'));
    var doc = this.ownerDocument;

    options.forEach(function(option){
      var row = doc.createElement('a');
      row.setAttribute('tabindex', "0");
      row.setAttribute('role', 'button');
      row.textContent = option.textContent;
      row.dataset.value = option.value;
      row.className = 'item';
      row._option = option;
      this._nonSelected.appendChild(row);

      if(option.selected) {
        this._setSelected(row);
      }
    }.bind(this));
  }
}

customElements.define('searchable-multi', SearchableMulti);
