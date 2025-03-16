import {
  unarchivedNotesApi,
  showResponseMessage,
} from '../data/remote/notes-api';

class UnarchivedButton extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
    this._id = this.getAttribute('id');
  }

  connectedCallback() {
    this.render();
  }

  _updateStyle() {
    this._style.textContent = `
    button {
        background-color: green;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        cursor: pointer;
        border-radius: 0.25rem;
        font-size: 0.9rem;
        }
    `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = '';
  }

  render() {
    console.log('tidak arsip');
    this._updateStyle();
    this._emptyContent();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
    <button>${this._isArchived ? 'Archive' : 'Unarchive'}</button>
    `;

    this.addEventListener('click', async () => {
      try {
        await unarchivedNotesApi(this._id);
      } catch {
        showResponseMessage(error);
      }
    });
  }
}

customElements.define('unarchive-button', UnarchivedButton);
