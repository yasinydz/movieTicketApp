const container = document.querySelector('.container-op'); 
const count = document.getElementById('count');
const amount = document.getElementById('amount');
const select = document.getElementById('movie');

getFromLocalStorage();
calculateTotal();

container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('reserved')) {
        e.target.classList.toggle('selected');
        calculateTotal();
    }
});

select.addEventListener('change', (e) => {
    calculateTotal();
});

function calculateTotal() {
    const selectedSeats = container.querySelectorAll('.seat.selected');
    const seats = container.querySelectorAll('.seat:not(.reserved)');

    const selectedSeatsArr = Array.from(selectedSeats);
    const seatsArr = Array.from(seats);

    let selectedSeatIndexes = selectedSeatsArr.map(seat => seatsArr.indexOf(seat));

    let selectedSeatCount = selectedSeats.length;
    count.innerText = selectedSeatCount;

    const ticketPrice = parseFloat(select.value);
    amount.innerText = selectedSeatCount * ticketPrice;

    saveToLocalStorage(selectedSeatIndexes);
}

function getFromLocalStorage() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats && selectedSeats.length > 0) {
        const seats = container.querySelectorAll('.seat:not(.reserved)');
        selectedSeats.forEach(index => {
            if (index > -1 && index < seats.length) {
                seats[index].classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if (selectedMovieIndex !== null) {
        select.selectedIndex = selectedMovieIndex;
    }
}

function saveToLocalStorage(indexes) {
    localStorage.setItem('selectedSeats', JSON.stringify(indexes));
    localStorage.setItem('selectedMovieIndex', select.selectedIndex);
}
