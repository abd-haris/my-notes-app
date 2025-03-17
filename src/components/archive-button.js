import {
  archivedNotesApi,
  getArchivedNotesFromApi,
  showResponseMessage,
  showSuccessMessage,
} from '../data/remote/notes-api.js';

import 'material-icons/iconfont/material-icons.css';

import { gsap } from 'gsap/gsap-core';
import CSSPlugin from 'gsap/CSSPlugin';
gsap.registerPlugin(CSSPlugin);

class ArchivedButton extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
    this._isArchived = this.getAttribute('archived') === 'false';
  }

  connectedCallback() {
    this.render();
  }

  _updateStyle() {
    this._style.textContent = `
    @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
        button {
          font-family: 'Material Icons';
        }
    button {
        background-color: green;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        cursor: pointer;
        border-radius: 0.25rem;
        font-size: 0.9rem;

    span {
        font-size: 1.5rem;
    }
    `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = '';
  }

  render() {
    console.log('arsip');
    this._updateStyle();
    this._emptyContent();
    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
    <button>
    <span class="material-symbols-outlined">archive</span>
    </button>
    `;
    this.addEventListener('click', async () => {
      const noteItem = this.parentNode.parentNode;
      if (noteItem) {
        const noteId = noteItem._note.id;
        try {
          const response = await archivedNotesApi(noteId);
          if (response.success) {
            showSuccessMessage('Catatan berhasil diarsipkan');
            const archiveNote = await getArchivedNotesFromApi();
            const noteArchive = document.querySelector('note-archive');
            gsap.to(noteItem, {
              duration: 1,
              opacity: 0,
              ease: 'power2.out',
              onComplete: () => {
                noteArchive.setNoteArchive(archiveNote);
              },
            });
          }
        } catch (error) {
          showResponseMessage(error);
        }
      }
    });
  }
}

customElements.define('archive-button', ArchivedButton);
