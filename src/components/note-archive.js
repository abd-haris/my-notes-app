import {
  getArchivedNotesFromApi,
  showResponseMessage,
} from '../data/remote/notes-api';

class NoteArchive extends HTMLElement {
  constructor() {
    super();
    this.notes = [];
  }

  // fungsi baru
  async setNoteArchive(note) {
    try {
      const getArchive = await getArchivedNotesFromApi(note);
      this.notes = getArchive;
      this.render();
    } catch (error) {
      showResponseMessage(error);
    }
  }

  connectedCallback() {
    this.render();
  }

  async render() {
    const noteList = document.querySelector('note-archive');
    noteList.innerHTML = '';
    const notes = await getArchivedNotesFromApi();
    notes.forEach((note) => {
      const noteItem = document.createElement('note-item');
      noteItem.setNote(note);
      noteList.appendChild(noteItem);
    });
  }
}

customElements.define('note-archive', NoteArchive);
