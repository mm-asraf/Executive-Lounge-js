
document.addEventListener("DOMContentLoaded", () => {

    
   
  let container = document.querySelector(".container");
  let boxes = document.querySelectorAll(".box");

  let allAvailableSeats = [];
  let allocatedSeats = JSON.parse(localStorage.getItem("allocatedSeats")) || [];
  let ticketsData = JSON.parse(localStorage.getItem("ticketsData")) || [];

 
  let seats = localStorage.getItem("totalAvailableSeats");
  let availableSeatsFromLocalDb = seats ? JSON.parse(seats) : null;

  function allBookedSeatStausColor() {
    boxes.forEach((item) => {
      allocatedSeats.forEach((seat) => {
        if (item.id == seat) {
          item.style.backgroundColor = "#87D7A4";
        }
      });
    });
  }
  allBookedSeatStausColor();

  
  if (!availableSeatsFromLocalDb || availableSeatsFromLocalDb.length === 0) {
    boxes.forEach((item) => {
      allAvailableSeats.push(item.id);
    });
    localStorage.setItem(
      "totalAvailableSeats",
      JSON.stringify(allAvailableSeats)
    );
    availableSeatsFromLocalDb = allAvailableSeats;
  } else {
    allAvailableSeats = availableSeatsFromLocalDb;
  }


  let selectElement = document.getElementById("select-seat");
  putDataOnSeatOptions(availableSeatsFromLocalDb, selectElement);

  function putDataOnSeatOptions(availableSeats, selectElement) {

    selectElement.innerHTML = "";

    availableSeats.forEach((seat) => {
      let optionElement = document.createElement("option");
      optionElement.textContent = seat;
      selectElement.appendChild(optionElement);
    });
  }

  let form = document.getElementById("form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let seatNo = document.getElementById("select-seat").value;
    let qty = document.getElementById("select-qty").value;
    let name = document.getElementById("name").value;
    let bookingDate = document.getElementById("bookingDate").value;

    bookTicket(seatNo, qty, name, bookingDate);
    showTickets();
    form.reset();
  });

  function formatDate(bookingTime, bookingDate) {
    let getBookingTime = new Date(bookingTime);
    let getBookingDate = new Date(bookingDate);

    let hours = getBookingTime.getHours();
    let minutes = getBookingTime.getMinutes();
    let seconds = getBookingTime.getSeconds();

    let combinedDateTime = new Date(bookingDate);
    combinedDateTime.setHours(hours, minutes, seconds);

    let day = String(getBookingDate.getDate()).padStart(2, "0");
    let month = String(getBookingDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    let year = getBookingDate.getFullYear();

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }

  function bookTicket(seatNo, qty, name, bookingDate) {
    let bookingTime = new Date();
    let bookingDateTime = formatDate(bookingTime, bookingDate);

    let ticketObj = {};
    allocatedSeats.push(seatNo);
    localStorage.setItem("allocatedSeats", JSON.stringify(allocatedSeats));

    let index = allAvailableSeats.indexOf(seatNo);
    if (index !== -1) {
      allAvailableSeats.splice(index, 1);
      localStorage.setItem(
        "totalAvailableSeats",
        JSON.stringify(allAvailableSeats)
      );
      putDataOnSeatOptions(allAvailableSeats, selectElement);
    }

    let ticketNumber = Math.floor(Math.random() * 123444);
    let AMOUNT_ON_HOURLY_BASIS = 50;
    let totalAmount = qty * AMOUNT_ON_HOURLY_BASIS;

    ticketObj.ticketNumber = ticketNumber;
    ticketObj.qtyOfSeat = qty;
    ticketObj.name = name;
    ticketObj.totalAmount = totalAmount;
    ticketObj.allocatedSeatNo = seatNo;
    ticketObj.bookingDateTime = bookingDateTime;

    ticketsData.push(ticketObj);
    localStorage.setItem("ticketsData", JSON.stringify(ticketsData));

    allBookedSeatStausColor();
  }
 
 
});

function showTickets() {
    let ticketData = JSON.parse(localStorage.getItem("ticketsData")) || [];
    let ticketContainers = document.getElementsByClassName("ticketContainer");

    // Assuming you have only one container or you want to append to the first one
    let ticketContainer = ticketContainers[0];

    // Clear the container first
    ticketContainer.innerHTML = '';

    ticketData.forEach((data) => {
        let ticketBox = document.createElement("div");
        ticketBox.className = "ticketBox";

        let TicketNumber = document.createElement("p");
        TicketNumber.textContent = `Ticket Number: ${data.ticketNumber}`;

        let QtyOfSeat = document.createElement("p");
        QtyOfSeat.textContent = `Quantity of Seats: ${data.qtyOfSeat}`;

        let name = document.createElement("p");
        name.textContent = `Name: ${data.name}`;

        let bookingDateAndTime = document.createElement("p");
        bookingDateAndTime.textContent = `Booking Date and Time: ${data.bookingDateTime}`;

        let SeatNo = document.createElement("p");
        SeatNo.textContent = `Seat Number: ${data.allocatedSeatNo}`;

        let TotalAmount = document.createElement("p");
        TotalAmount.textContent = `Total Amount: ${data.totalAmount}`;

        
        ticketBox.appendChild(TicketNumber);
        ticketBox.appendChild(QtyOfSeat);
        ticketBox.appendChild(name);
        ticketBox.appendChild(bookingDateAndTime);
        ticketBox.appendChild(SeatNo);
        ticketBox.appendChild(TotalAmount);

       
        ticketContainer.appendChild(ticketBox);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname.split("/").pop();

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');

       
        link.classList.remove('active');

       
        if (linkPath === currentPath) {
            link.classList.add('active');
        }
    });
});


  showTickets();