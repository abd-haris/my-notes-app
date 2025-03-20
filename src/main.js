import './components/index.js';
import './data/data.js';
import './data/input-data.js';
import './styles/reset.css';
import './styles/style.css';
import './styles/responsive.css';

import { gsap } from 'gsap/gsap-core';
import CSSPlugin from 'gsap/CSSPlugin';
gsap.registerPlugin(CSSPlugin);

const noteList = document.querySelector('#note-list');
const addNoteElement = document.querySelector('#form');
const archiveNoteElement = document.querySelector('#archive-note');
const noteBarElement = document.querySelector('notes-bar');
const { addNote, allNotes, archive } = noteBarElement.getButtons();

document.addEventListener('DOMContentLoaded', () => {
  archiveNoteElement.style.display = 'none';
  noteList.style.display = 'none';

  allNotes.addEventListener('click', () => {
    noteList.style.display = 'block';
    archiveNoteElement.style.display = 'none';
    addNoteElement.style.display = 'none';
  });

  addNote.addEventListener('click', () => {
    addNoteElement.style.display = 'block';
    archiveNoteElement.style.display = 'none';
    noteList.style.display = 'none';
  });

  archive.addEventListener('click', () => {
    archiveNoteElement.style.display = 'grid';
    addNoteElement.style.display = 'none';
    noteList.style.display = 'none';
  });
});

gsap.from(noteList, {
  duration: 1,
  opacity: 0,
  y: 50,
  ease: 'power2.out',
  stagger: 0.2,
});
