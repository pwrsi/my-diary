const notes = JSON.parse(localStorage.getItem('notes')) || [
  {
    id: '19 June 2026',
    input: 'hello',
    mood: 'happy'
  }
];