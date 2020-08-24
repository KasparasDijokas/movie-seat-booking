const seatsLeft = document.getElementById('seats-l');
const seatsMiddle = document.getElementById('seats-m');
const seatsRight = document.getElementById('seats-r');
const options = document.getElementById('options');
const cinema = document.getElementById('cinema');
const total = document.getElementById('total');
let numberOfSeats = 0;
let totalAmount = 0;
let money = 10;

// render seats
function renderSeats(seats, row) {
    for (let i=0; i<seats; i++) {
        let random = Math.random();
        const seat = document.createElement('div');
        seat.className = 'seat';
        if (random > 0.8) {
            seat.classList = 'occupied seat';
        }
        row.append(seat);
    }
}

renderSeats(12, seatsLeft);
renderSeats(24, seatsMiddle);
renderSeats(12, seatsRight);
const seatsAll = document.querySelectorAll('.seats .seat');


// select menu eventListener + localStorage
options.addEventListener('change', (event) => {
    money = +event.target.value;
    movieData(event.target.selectedIndex, event.target.value);
    updateTotal();
});

function movieData(index, value) {
    localStorage.setItem('selectedMovieIndex', index);
    localStorage.setItem('movieValue', value);
}

// seats eventListener
cinema.addEventListener('click', (event) => {
    if (event.target.classList.contains('occupied')) {
        return;
    }
    if (!event.target.classList.contains('selected')) {
        event.target.classList.add('selected');
        updateTotal();
        storage();
    } else {
        event.target.classList.remove('selected');
        updateTotal();
    }
    
})

// local storage (seats)
function storage() {
    const selectedSeats = document.querySelectorAll('.seats .seat.selected');
     seatIndex = [...selectedSeats].map((item) => {
        return [...seatsAll].indexOf(item);
    });
    localStorage.setItem('selectedSeats', JSON.stringify(seatIndex));
}

// update total number of seats and total amount
function updateTotal() { 
    const selectedSeats = document.querySelectorAll('.seats .seat.selected');
    numberOfSeats = selectedSeats.length;
    totalAmount = selectedSeats.length * money;

    total.innerHTML = `You have selected ${numberOfSeats} seats for a price of $${totalAmount}`;
}

// update UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seatsAll.forEach((seat, index) => {      
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    const selectedMovieValue = localStorage.getItem('movieValue');
    if (selectedMovieIndex !== null) {
        options.selectedIndex = selectedMovieIndex;
        money = selectedMovieValue;
    }
}

populateUI();
updateTotal();