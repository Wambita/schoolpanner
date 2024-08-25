let monthlyPlanData = {};
let todoList = [];
let weeklyPlanList = [];
let quoteOfWeek = '';
let songOfWeek = {};

// const schedules = {
//     weekday: [
//         { time: "00:00 - 05:30", activity: "Sleep" },
//         { time: "05:30 - 05:40", activity: "Bible" },
//         { time: "05:40 - 05:45", activity: "Journal" },
//         { time: "05:45 - 06:00", activity: "Reading" },
//         { time: "06:00 - 07:00", activity: "Exercise" },
//         { time: "07:00 - 08:00", activity: "Breakfast & Prepare for Work" },
//         { time: "08:00 - 17:00", activity: "Work" },
//         { time: "17:00 - 18:00", activity: "Commute & Relax" },
//         { time: "18:00 - 19:00", activity: "Dinner" },
//         { time: "19:00 - 21:00", activity: "Personal Projects/Study" },
//         { time: "21:00 - 22:00", activity: "Wind Down & Prepare for Bed" },
//         { time: "22:00 - 00:00", activity: "Sleep" }
//     ],
//     saturday: [
//         { time: "00:00 - 06:00", activity: "Sleep" },
//         { time: "06:00 - 06:10", activity: "Bible" },
//         { time: "06:10 - 06:15", activity: "Journal" },
//         { time: "06:15 - 06:30", activity: "Reading" },
//         { time: "06:30 - 07:30", activity: "Exercise" },
//         { time: "07:30 - 08:30", activity: "Breakfast" },
//         { time: "08:30 - 12:00", activity: "Personal Projects/Study" },
//         { time: "12:00 - 13:00", activity: "Lunch" },
//         { time: "13:00 - 18:00", activity: "Leisure/Hobbies" },
//         { time: "18:00 - 19:00", activity: "Dinner" },
//         { time: "19:00 - 22:00", activity: "Socializing/Relaxation" },
//         { time: "22:00 - 00:00", activity: "Wind Down & Sleep" }
//     ],
//     sunday: [
//         { time: "00:00 - 07:00", activity: "Sleep" },
//         { time: "07:00 - 07:10", activity: "Bible" },
//         { time: "07:10 - 07:15", activity: "Journal" },
//         { time: "07:15 - 07:30", activity: "Reading" },
//         { time: "07:30 - 08:30", activity: "Breakfast" },
//         { time: "08:30 - 10:00", activity: "Church/Spiritual Activities" },
//         { time: "10:00 - 12:00", activity: "Family Time" },
//         { time: "12:00 - 13:00", activity: "Lunch" },
//         { time: "13:00 - 16:00", activity: "Rest/Relaxation" },
//         { time: "16:00 - 18:00", activity: "Prepare for the Week Ahead" },
//         { time: "18:00 - 19:00", activity: "Dinner" },
//         { time: "19:00 - 21:00", activity: "Light Reading/Meditation" },
//         { time: "21:00 - 00:00", activity: "Wind Down & Sleep" }
//     ]
// };

function saveData() {
    localStorage.setItem('monthlyPlanData', JSON.stringify(monthlyPlanData));
    localStorage.setItem('todoList', JSON.stringify(todoList));
    localStorage.setItem('weeklyPlanList', JSON.stringify(weeklyPlanList));
    localStorage.setItem('quoteOfWeek', quoteOfWeek);
    localStorage.setItem('songOfWeek', songOfWeek);
}

function loadData() {
    const savedMonthlyPlanData = localStorage.getItem('monthlyPlanData');
    if (savedMonthlyPlanData) {
        monthlyPlanData = JSON.parse(savedMonthlyPlanData);
    }

    const savedTodoList = localStorage.getItem('todoList');
    if (savedTodoList) {
        todoList = JSON.parse(savedTodoList);
    }

    const savedWeeklyPlanList = localStorage.getItem('weeklyPlanList');
    if (savedWeeklyPlanList) {
        weeklyPlanList = JSON.parse(savedWeeklyPlanList);
    }

    quoteOfWeek = localStorage.getItem('quoteOfWeek') || '';
    songOfWeek = localStorage.getItem('songOfWeek') || '';
}

function addScheduleItem() {
    const time = document.getElementById('new-time').value;
    const activity = document.getElementById('new-activity').value;
    
    if (time && activity) {
        const tbody = document.getElementById('daily-schedule').querySelector('tbody');
        const row = createRow({ time, activity }, 'editScheduleItem(this)', 'removeScheduleItem(this)');
        tbody.appendChild(row);

        // Save updated data
        saveData();

        // Clear the input fields after adding the item
        document.getElementById('new-time').value = '';
        document.getElementById('new-activity').value = '';
    } else {
        alert('Please enter both time and activity.');
    }
}

function editScheduleItem(button) {
    const row = button.parentElement.parentElement;
    const time = row.children[0].textContent;
    const activity = row.children[1].textContent;

    // Populate the inputs with the current values for editing
    document.getElementById('new-time').value = time;
    document.getElementById('new-activity').value = activity;

    // Remove the row from the table
    row.remove();

    // Save updated data
    saveData();
}

function removeScheduleItem(button) {
    button.parentElement.parentElement.remove();
    
    // Save updated data
    saveData();
}

function createRow(data, editHandler, removeHandler) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${data.time}</td>
        <td>${data.activity}</td>
        <td>
            <button onclick="${editHandler}">Edit</button>
            <button onclick="${removeHandler}">Remove</button>
        </td>
    `;
    return row;
}

// Load data when the window loads
window.onload = function() {
    loadData();
    renderTodoList();
    renderWeeklyPlan();
    updateQuoteSong();
};

// Save data before the window unloads
window.onbeforeunload = function() {
    saveData();
};
