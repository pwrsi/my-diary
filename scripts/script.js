// todays date ⏔⏔⏔
const date = new Date();
const day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();
let lastDay = new Date(year, month + 1, 0).getDate();

const noteInput = document.getElementById('note');
let id = '';

// arrays ⏔⏔⏔
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// display month and year ⏔⏔⏔
function displayMonthYear(monthValue) {
  const monthLabel = document.getElementById('month');
  const yearLabel = document.getElementById('year');
  
  monthLabel.innerHTML = monthValue;
  yearLabel.innerHTML = year;
}

// arrow buttons ⏔⏔⏔
const prevButton = document.getElementById('previous-button');
const nextButton = document.getElementById('next-button');

prevButton.addEventListener('click', () => {
  if (month > 0) {
    month--;
  } else {
    month = 11;
    year = year - 1;
  }

  displayMonthYear(months[month]);
  displayDays();
});

nextButton.addEventListener('click', () => {
  if (month < 11) {
    month++;
  } else {
    month = 0;
    year = year + 1;
  }

  displayMonthYear(months[month]);
  displayDays();
});

// month and year panel ⏔⏔⏔
const monthYearLabel = document.getElementById('month-year');

// show month and year panel
const monthYearPanel = document.getElementById('month-year-panel');

monthYearLabel.addEventListener('click', () => {
  monthYearPanel.classList.remove('hidden');
});

// months container ⏔⏔⏔
const monthsContainer = document.getElementById('months-container');

let monthsHTML = '';

months.forEach((month) => {
  monthsHTML += `
    <p class="month-name">${month}</p>
  `;
});

monthsContainer.innerHTML = monthsHTML;

// years container ⏔⏔⏔
const yearsContainer = document.getElementById('years-container');

// generate years
let yearsHTML = '';

for (let i = 2000; i <= year + 50; i++) {
  yearsHTML += `
    <p class="year">${i}</p>
  `;
}

yearsContainer.innerHTML = yearsHTML;

// close month year panel ⏔⏔⏔
const closeMonthYearButton = document.getElementById('close-month-year-panel');

closeMonthYearButton.addEventListener('click', () => {
  monthYearPanel.classList.add('hidden');
});

// days ⏔⏔⏔
function displayDays() {
  const date = new Date(year + '-' + (month + 1) + "-01");
  let daySelected = '';
  lastDay = new Date(year, month + 1, 0).getDate();

  let weekdayOfMonth = '';

  if (date.getDay() - 1 < 0) {
    weekdayOfMonth = weekdays[6];
  } else {
    weekdayOfMonth = weekdays[date.getDay() - 1];
  }

  let daysHTML = '';

  weekdays.forEach((weekday) => {

    if (weekday === weekdayOfMonth) {
      for (let i = 1; i <= lastDay; i++) {
        let dayNumber = i;
        let monthNumber = month + 1;

        if (i < 10) {
          dayNumber = '0' + i;
        }

        if (month < 10) {
          monthNumber = '0' + monthNumber;
        }

        daySelected = monthNumber + '/' + dayNumber + '/' + year;

        daysHTML += `
          <div class="day" data-date="${daySelected}">${i}</div>
        `;
      }
    } else {
      daysHTML += `<div class="empty"></div>`;
    }
  });

  document.querySelector('.days')
    .innerHTML = daysHTML;

    document.querySelectorAll(('.day'))
    .forEach((day) => {
      day.addEventListener('click', () => {
        const dayDate = day.dataset.date;
        id = dayDate;
        // show note panel
        console.log(dayDate);

        notePanel.classList.remove('hidden');

        // display date
        const dateSelected = document.getElementById('date-selected');
        dateSelected.innerHTML = dayDate;

        // display note
        let matchingItem = '';

        notes.forEach((note) => {
          if (note.id === dayDate) {
            matchingItem = note.input;
          }
        });

        if (matchingItem) {
          noteInput.value = matchingItem;
        } else {
          noteInput.value = '';
        }
      });
    });
};

// note panel ⏔⏔⏔
const notePanel = document.getElementById('note-panel');
const closeNoteButton = document.getElementById('close-note-panel');

closeNoteButton.addEventListener('click', () => {
  notePanel.classList.add('hidden');
});

// save button
const saveButton = document.getElementById('save-button');

saveButton.addEventListener('click', () => {
  // see if the note entry for that day already exists
  notes.forEach((note) => {
    if (note.id === id) {
      note.input = noteInput.value;
    } else {
      notes.push({
        id: id,
        input: noteInput.value,
        mood: 'happy'
      });
    }
  });
});

// render when the page loads ⏔⏔⏔
displayMonthYear(months[month]);
displayDays();