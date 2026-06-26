// ⏔⏔⏔ todays date ⏔⏔⏔
const date = new Date();
const day = date.getDate();
let month = date.getMonth();
const currentYear = date.getFullYear();
let year = currentYear;

console.log(date);

const noteInput = document.getElementById('note');
let id = '';

const monthLabel = document.getElementById('month');
const yearLabel = document.getElementById('year');

let selectedMonth = month;
let selectedYear = year;

// ⏔⏔⏔ arrays ⏔⏔⏔
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// ⏔⏔⏔ display month and year ⏔⏔⏔
function displayMonthYear(monthValue, yearValue) {
  // Change the innerHTML
  monthLabel.innerHTML = months[monthValue];
  yearLabel.innerHTML = yearValue;

  // display selected month & year indicator in the panel
  selectMonthYear(monthValue, yearValue);

  displayDays();
}

// ⏔⏔⏔ arrow buttons ⏔⏔⏔
const prevButton = document.getElementById('previous-button');
const nextButton = document.getElementById('next-button');

/* 
  upon clicking previous month button,
  ಄ make sure the year will not go down below 2000
  ಄ when a month goes down to January, jump to December and go a year down
  ಄ then call the function responsible for displaying month and year
*/
prevButton.addEventListener('click', () => {
  if (year <= 2000 && month == 0) {
    console.log('Year limit reached 𐙚');
  } else {
    if (month > 0) {
      month--;
    } else {
      month = 11;
      year = year - 1;
    }
  
    displayMonthYear(month, year);
  }
});

/*
  upon clicking next month button,
  ಄ make sure it wouldn't reach above the year limit
  ಄ if the month goes up to December, go back to January and go a year down
  ಄ then call the function responsible for displaying month and year
*/
nextButton.addEventListener('click', () => {
  let maxYear = 50;

  if (year >= currentYear + maxYear && month == 11) {
    console.log('Year limit reached 𐙚');
  } else {
    if (month < 11) {
      month++;
    } else {
      month = 0;
      year = year + 1;
    }

    displayMonthYear(month, year);
  }
});

/* ⏔⏔⏔ months container ⏔⏔⏔
  generates months html */
const monthsContainer = document.getElementById('months-container');

let monthsHTML = '';

months.forEach((month, index) => {
  monthsHTML += `
    <button class="month-name month-name-${index} months-years-button" data-month="${index}">${month}</button>
  `;
});

monthsContainer.innerHTML = monthsHTML;

// ⏔⏔⏔ years container ⏔⏔⏔
// generate years, 2000 - 2026 + 50
const yearsContainer = document.getElementById('years-container');

let yearsHTML = '';

for (let i = 2000; i <= currentYear + 50; i++) {
  yearsHTML += `
    <button class="year year-${i} months-years-button" data-year="${i}">${i}</button>
  `;
}

yearsContainer.innerHTML = yearsHTML;

/* ⏔⏔⏔ display days ⏔⏔⏔
  ಄ get the first day to identify the weekday
  ಄ get the last day to identify how many days in a month
  ಄ store day selected and weekday of month
  
*/

function displayDays() {
  const firstWeekday = (new Date(year + '-' + (month + 1) + "-01")).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  let daySelected = '';
  let daysHTML = '';

  // previous days
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  let prevDaysNeeded = 0;

  for (let i = firstWeekday; i > 0; i--) {
    daysHTML += `<div class="prev-day">${daysInPrevMonth - (i - 1)}</div>`;
    prevDaysNeeded++;
  }

  // current days
  for (let i = 1; i <= daysInMonth; i++) {
    let dayFormat = i;

    if (i < 10) {
      dayFormat = '0' + i;
    }

    daySelected = dayFormat + ' ' + months[month] + ' ' + year;

    if (i === date.getDate() && month === date.getMonth() && year === date.getFullYear()) {
      daysHTML += `<div class="day current-day" data-date="${daySelected}">${i}</div>`;
    } else {
      daysHTML += `<div class="day" data-date="${daySelected}">${i}</div>`;
    }

    
  }

  // next days
  for (let i = 1; i <= 42 - (prevDaysNeeded + daysInMonth); i++) {
    daysHTML += `<div class="next-day">${i}</div>`;
  }


  document.querySelector('.days')
    .innerHTML = daysHTML;

  document.querySelectorAll(('.day'))
  .forEach((day) => {
    day.addEventListener('click', () => {
      const dayDate = day.dataset.date;
      id = dayDate;

      // show note panel
      notePanel.classList.remove('hidden');

      // display date
      const dateSelected = document.getElementById('date-selected');
      dateSelected.innerHTML = dayDate;

      // display note
      let matchingItem = '';

      notes.forEach((note) => {
        if (note.id === dayDate) {
          matchingItem = note;
        }
      });

      if (matchingItem) {
        noteInput.value = matchingItem.input;

      } else {
        noteInput.value = '';
      }
    });
  });
};

/* 
  ⏔⏔⏔ month and year panel ⏔⏔⏔
  when the month-year label is clicked, 
  show the hidden panel for selecting a certain month and year 
*/
const monthYearLabel = document.getElementById('month-year-label');
const monthYearPanel = document.getElementById('month-year-panel');

monthYearLabel.addEventListener('click', () => {
  monthYearPanel.classList.remove('hidden');
});

/*
  ⏔⏔⏔ jump onto a specific month & year ⏔⏔⏔
  for every html element with a class "month-name,"
  remove the class "selected" which styles the selected month and year

  upon selecting or clicking a month or year,
  ಄ get the monthId/yearId (month index)
  ಄ remove previous month/year that was clicked
  ಄ add the selected class for the latest month/year clicked by getting the element that has the ID
  ಄ set selectedMonth value to monthId (this will be used to display the month and year after selection)
*/

document.querySelectorAll('.month-name')
    .forEach((monthButton) => {
      monthButton.classList.remove('selected');

      monthButton.addEventListener('click', () => {
        console.log(monthButton.dataset.month);
        const monthId = Number(monthButton.dataset.month);

        document.querySelectorAll('.month-name')
          .forEach((monthButton) => {
            monthButton.classList.remove('selected');
          });

        document.querySelector(`.month-name-${monthId}`)
          .classList.add('selected');

        selectedMonth = monthId;
      });
    });

document.querySelectorAll('.year')
  .forEach((yearButton) => {
    yearButton.classList.remove('selected');

    yearButton.addEventListener('click', () => {
      const yearId = Number(yearButton.dataset.year);

      document.querySelectorAll('.year')
        .forEach((yearButton) => {
          yearButton.classList.remove('selected');
        });

      document.querySelector(`.year-${yearId}`)
        .classList.add('selected');

      selectedYear = yearId;
    });
  });

function selectMonthYear(monthValue, yearValue) {
  document.querySelectorAll('.month-name')
    .forEach((monthButton) => {
      monthButton.classList.remove('selected');
    });

  document.querySelectorAll('.year')
    .forEach((yearButton) => {
      yearButton.classList.remove('selected');
    });

  selectedMonth = monthValue;
  selectedYear = yearValue;

  document.querySelector(`.month-name-${monthValue}`)
    .classList.add('selected');

  document.querySelector(`.year-${yearValue}`)
    .classList.add('selected');
}

// ⏔⏔⏔ close button - hide month year panel ⏔⏔⏔
const closeMonthYearButton = document.getElementById('close-month-year-panel');

closeMonthYearButton.addEventListener('click', () => {
  monthYearPanel.classList.add('hidden');

  month = selectedMonth;
  year = selectedYear;

  displayMonthYear(selectedMonth, selectedYear);
});

// ⏔⏔⏔ note panel ⏔⏔⏔
const notePanel = document.getElementById('note-panel');
const closeNoteButton = document.getElementById('close-note-panel');

closeNoteButton.addEventListener('click', () => {
  notePanel.classList.add('hidden');
});

// ⏔⏔⏔ save button ⏔⏔⏔
const saveButton = document.getElementById('save-button');

saveButton.addEventListener('click', () => {
  
  let matchingItem = "";

  // see if the note entry for that day already exists
  notes.forEach((note) => {
    // if current note id matches the id (got from clicking a day)
    // store in an array
    if (note.id === id) {
      matchingItem = note;
    }
  });

  console.log(matchingItem);

  if (matchingItem) {
    if (!noteInput.value) {
      notes.forEach((note, i) => {
        if (note === matchingItem) {
          notes.splice(i, 1);
        }

        console.log('removed');
      });
    }

  } else if (!matchingItem && noteInput.value) {
    notes.push({
      id: id,
      input: noteInput.value,
    });

  }
  
  localStorage.setItem('notes', JSON.stringify(notes));
  console.log(notes);
});

// ⏔⏔⏔ draggable stickers panel ⏔⏔⏔
const stickersPanel = document.getElementById('stickers-panel');
const stickersButton = document.getElementById('stickers-button');
const closeStickersButton = document.getElementById('close-stickers-panel');
const stickerHeader = document.getElementById('stickers-header');


stickersButton.addEventListener('click', () => {
  stickersPanel.classList.remove('hidden');
});

closeStickersButton.addEventListener('click', () => {
  stickersPanel.classList.add('hidden');
});

stickerHeader.addEventListener('mousedown', () => {
  console.log('started dragging');
});



// ⏔⏔⏔ render when the page loads ⏔⏔⏔
displayMonthYear(month, year);