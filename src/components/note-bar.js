class NotesBar extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._imageUrl = this.getAttribute('img');
    this._altImage = this.getAttribute('altImage');
    this._style = document.createElement('style');
  }

  connectedCallback() {
    this.render();
  }

  _updateStyle() {
    this._style.textContent = `
          host: {
              display: block;
              width: 100%;
              box-shadow: 0 4px 4px 0 rgb(205, 193, 255);
          }
          
          .container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1rem;
          }

          .note-content {
              display: flex;
              align-items: center;
              justify-content: flex-start;
              gap: 1rem;
          }
  
          img {
          height: 3rem;
          }
  
          .title-bar {
              margin: 0;
              font-size: 1.7rem;
              color: #F5EFFF;
          }

          .note-buttons {
              display: flex;
              gap: 2rem;
          }

          .note-buttons button {
              font-family: 'Poppins', serif;
              background-color: transparent;
              border: none;
              font-size: 1rem;
              cursor: pointer;
              color: #F5EFFF;
              font-weight: semi-bold;
          }
      `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = '';
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
        <div class="container">
          <div class="note-content">
            <img src="${this._imageUrl}" alt="${this._altImage}"/>
            <h1 class="title-bar">Notes App</h1>
          </div>
          <div class="note-buttons">
            <button id="add-note">Add Note</button>
            <button id="notes-btn">All Notes</button>
            <button id="archive-btn">Archived</button>
          </div>
        </div>
      `;

    this.addNoteBtn = this._shadowRoot.querySelector('#add-note');
    this.allNotesBtn = this._shadowRoot.querySelector('#notes-btn');
    this.archiveBtn = this._shadowRoot.querySelector('#archive-btn');
  }

  getButtons() {
    return {
      addNote: this.addNoteBtn,
      allNotes: this.allNotesBtn,
      archive: this.archiveBtn,
    };
  }
}

customElements.define('notes-bar', NotesBar);
