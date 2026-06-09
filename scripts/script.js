// ⏔⏔⏔ todays date ⏔⏔⏔
const date = new Date();
const day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

const noteInput = document.getElementById('note');
let id = '';

// ⏔⏔⏔ arrays ⏔⏔⏔
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// ⏔⏔⏔ display month and year ⏔⏔⏔
function displayMonthYear(monthValue, yearValue) {
  const monthLabel = document.getElementById('month');
  const yearLabel = document.getElementById('year');
  
  // Change the innerHTML
  monthLabel.innerHTML = monthValue;
  yearLabel.innerHTML = year;

  // display selected month & year indicator in the panel
  selectMonthYear(monthValue, yearValue);

  displayDays();
}

// ⏔⏔⏔ arrow buttons ⏔⏔⏔
const prevButton = document.getElementById('previous-button');
const nextButton = document.getElementById('next-button');

prevButton.addEventListener('click', () => {
  // If month goes down to Jan, jump to Dec and go a year down
  if (month > 0) {
    month--;
  } else {
    month = 11;
    year = year - 1;
  }

  displayMonthYear(months[month], year);
});

nextButton.addEventListener('click', () => {
  // If month goes up to December, go back to January and go a year up
  if (month < 11) {
    month++;
  } else {
    month = 0;
    year = year + 1;
  }

  displayMonthYear(months[month], year);
});

// ⏔⏔⏔ month and year panel ⏔⏔⏔
const monthYearLabel = document.getElementById('month-year');

// show month and year panel
const monthYearPanel = document.getElementById('month-year-panel');

// when the label gets clicked, show the panel
monthYearLabel.addEventListener('click', () => {
  monthYearPanel.classList.remove('hidden');
});

// ⏔⏔⏔ jump onto a specific month & year ⏔⏔⏔
function selectMonthYear(monthValue, yearValue) {
  // toggle and untoggle buttons feature
  document.querySelectorAll('.month-name')
    .forEach((monthButton) => {
      monthButton.classList.remove('selected');

      // get the dataset stored in the element when clicked
      monthButton.addEventListener('click', () => {
        const monthId = monthButton.dataset.month;

        // for all elements with this class, remove class 'selected'
        document.querySelectorAll('.month-name')
          .forEach((monthButton) => {
            monthButton.classList.remove('selected');
          });

        // add 'selected' class for the element with the class of returned dataset
        document.querySelector(`.month-name-${monthId}`)
          .classList.add('selected');

        console.log(monthId);
      });
    });

  document.querySelectorAll('.year')
    .forEach((yearButton) => {
      yearButton.classList.remove('selected');

      yearButton.addEventListener('click', () => {
        const yearId = yearButton.dataset.year;

        document.querySelectorAll('.year')
          .forEach((yearButton) => {
            yearButton.classList.remove('selected');
          });

        document.querySelector(`.year-${yearId}`)
          .classList.add('selected');
        console.log(yearId);
      });
    });

  // automatically selects the current month and year
  // store the month index of the month that matched the monthValue parameter
  let monthIndex = 0;

  for (let i = 0; i < months.length; i++) {
    if (months[i] === monthValue) { 
      monthIndex = i;
    }
  }

  // modify the element and add the 'selected' class
  document.querySelector(`.month-name-${monthIndex}`)
    .classList.add('selected');

  document.querySelector(`.year-${year}`)
    .classList.add('selected');
}

// ⏔⏔⏔ months container ⏔⏔⏔
// generates months html
const monthsContainer = document.getElementById('months-container');

let monthsHTML = '';

months.forEach((month, index) => {
  monthsHTML += `
    <button class="month-name month-name-${index}" data-month="${index}">${month}</button>
  `;
});

monthsContainer.innerHTML = monthsHTML;

// ⏔⏔⏔ years container ⏔⏔⏔
// generate years, 2000 - 2026 + 50
const yearsContainer = document.getElementById('years-container');

let yearsHTML = '';

for (let i = 2000; i <= year + 50; i++) {
  yearsHTML += `
    <button class="year year-${i}" data-year="${i}">${i}</button>
  `;
}

yearsContainer.innerHTML = yearsHTML;

// ⏔⏔⏔ close button - hide month year panel ⏔⏔⏔
const closeMonthYearButton = document.getElementById('close-month-year-panel');

closeMonthYearButton.addEventListener('click', () => {
  monthYearPanel.classList.add('hidden');
});

// ⏔⏔⏔ display days ⏔⏔⏔
function displayDays() {
  // get the first day to identify the weekday
  const firstDay = new Date(year + '-' + (month + 1) + "-01");

  // get the last day to identify days count in a month
  const lastDay = new Date(year, month + 1, 0).getDate();

  // store day selected and weekday of month
  let daySelected = '';
  let weekdayOfMonth = '';

  // get weekday
  if (firstDay.getDay() - 1 < 0) {
    weekdayOfMonth = weekdays[6];
  } else {
    weekdayOfMonth = weekdays[firstDay.getDay() - 1];
  }

  let daysHTML = '';

  // generate days
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

        // console.log(`${i} === ${day} && ${month} === ${date.getMonth()}`);

        // put special class for today's date
        if (i === day && month === date.getMonth()) {
          daysHTML += `
          <div class="day current-day" data-date="${daySelected}">${i}</div>
        `;
        } else {
          daysHTML += `
          <div class="day" data-date="${daySelected}">${i}</div>
        `;
        }
      }
    } else {
      // leave blank if first day doesn't have *this* weekday
      daysHTML += `<div class="empty"></div>`;
    }
  });

  document.querySelector('.days')
    .innerHTML = daysHTML;

  // for every element with 'day' class
  // make day clickable  for note entries
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

// ⏔⏔⏔ note panel ⏔⏔⏔
const notePanel = document.getElementById('note-panel');
const closeNoteButton = document.getElementById('close-note-panel');

closeNoteButton.addEventListener('click', () => {
  notePanel.classList.add('hidden');
});

// ⏔⏔⏔ save button ⏔⏔⏔
const saveButton = document.getElementById('save-button');

saveButton.addEventListener('click', () => {
  // see if the note entry for that day already exists
  notes.forEach((note) => {
    // if current note id matches the id (got from clicking a day)
    // store in an array
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

  localStorage.setItem('notes', JSON.stringify(notes));
});

// ⏔⏔⏔ render when the page loads ⏔⏔⏔
displayMonthYear(months[month]);