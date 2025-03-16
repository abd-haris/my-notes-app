import '../components/note-item.js';
import '../components/note-list.js';

const notesData = [];

export default notesData;

const noteListEl = document.querySelector('note-list');
noteListEl.setNoteList(notesData);
