window.onload = async function () {
  flatpickr("#checkOut", {
    enableTime: false, // Disable time selection (default)
    dateFormat: "Y-m-d", // Set date format (YYYY-MM-DD)
  });
  flatpickr("#checkIn", {
    enableTime: false,
    dateFormat: "Y-m-d",
  });

  document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.querySelector("#searchBox button");
    const destination = document.getElementById("destination");
    const checkIn = document.getElementById("checkIn");
    const checkOut = document.getElementById("checkOut");
    const totalGuest = document.getElementById("totalGuest");

    searchButton.addEventListener("click", function () {
      if (
        destination.value.trim() === "" ||
        checkIn.value.trim() === "" ||
        checkOut.value.trim() === "" ||
        totalGuest.value.trim() === ""
      ) {
        alert("Please fill in all the fields.");
      } //else {
      //   // Submit the form or perform the desired action
      //   document.querySelector("form").submit();
      // }
    });
  });

  // let loginButton = document.querySelector(".loginButton");
  // loginButton.addEventListener("click", () => {
  //   const email = document.getElementById("typeEmailX");
  //   const username = document.getElementById("username");
  //   let user = document.getElementById("user");

  //   if (email.value && username.value) {
  //     alert("login Successfully");
  //     user.innerText = email.value;
  //     email.value = "";
  //     phoneNo.value = "";
  //   }
  // });
  const addBtns = document.querySelectorAll("#add");
  const subtractBtns = document.querySelectorAll("#subtract");
  const guestInput = document.getElementById("totalGuest");
  const totalAdult = document.getElementById("totalAdult");
  const totalChild = document.getElementById("totalChild");
  const totalInfant = document.getElementById("totalInfant");

  let card = document.querySelector(".guestCard");
  guestInput.addEventListener("click", () => {
    card.style.display = "block";
  });
  document.addEventListener("click", function (event) {
    if (!card.contains(event.target) && !guestInput.contains(event.target)) {
      card.style.display = "none";
    }
  });
  const guestCounts = {
    Adult: 0,
    Children: 0,
    Infant: 0,
  };
  addBtns.forEach(function (button) {
    button.addEventListener("click", () => {
      const span = button.parentElement.querySelector("span");
      const parentId = button.parentElement.id;

      if (parentId === totalAdult.id) {
        span.textContent = Number(span.textContent) + 1;
        guestCounts.Adult++;
      }
      if (parentId === totalChild.id) {
        span.textContent = Number(span.textContent) + 1;
        guestCounts.Children++;
      }
      if (parentId === totalInfant.id) {
        span.textContent = Number(span.textContent) + 1;
        guestCounts.Infant++;
      }
      updateInput();
    });
  });

  subtractBtns.forEach(function (button) {
    button.addEventListener("click", () => {
      const span = button.parentElement.querySelector("span");
      const parentId = button.parentElement.id;
      if (Number(span.textContent) >= 1) {
        button.style.cursor = "pointer";
        if (parentId === totalAdult.id) {
          span.textContent = Number(span.textContent) - 1;
          guestCounts.Adult--;
        }
        if (parentId === totalChild.id) {
          span.textContent = Number(span.textContent) - 1;
          guestCounts.Children--;
        }
        if (parentId === totalInfant.id) {
          span.textContent = Number(span.textContent) - 1;
          guestCounts.Infant--;
        }
      } else {
        button.style.cursor = "not-allowed";
      }
      updateInput();
    });
  });

  function updateInput() {
    let str = "";
    for (const key in guestCounts) {
      if (guestCounts[key] > 0) {
        // Correcting the condition
        str += guestCounts[key] + " " + key + ", "; // Correct string interpolation and plural handling
      }
    }
    console.log(str);

    guestInput.value = str;
  }

  const rentalContainer = document.getElementById("rentals");
  function createRentalCard(hotelName, rating, price, images, carouselId) {
    // Create the card div
    const hotelCard = document.createElement("div");
    hotelCard.classList.add("hotelCard");
    hotelCard.style.width = "19rem";

    // Create the carousel container div
    const carouselContainer = document.createElement("div");
    carouselContainer.id = carouselId;
    carouselContainer.classList.add("carousel", "slide");
    carouselContainer.style.width = "100%";
    carouselContainer.style.height = "280px";

    // Create the carousel-inner div
    const carouselInner = document.createElement("div");
    carouselInner.classList.add("carousel-inner");
    carouselInner.style.height = "100%";

    // Add carousel items dynamically from images array
    images = JSON.parse(images);
    images.forEach((src, index) => {
      const carouselItem = document.createElement("div");

      carouselItem.classList.add("carousel-item");
      if (index === 0) {
        carouselItem.classList.add("active");
      }
      const img = document.createElement("img");
      img.src = src;
      img.classList.add("d-block", "w-100");
      img.alt = "...";
      img.style.width = "100%";
      img.style.height = "100%";
      img.style.borderRadius = "10px";
      img.style.objectFit = "cover";
      carouselItem.appendChild(img);
      carouselInner.appendChild(carouselItem);
    });

    // Create the carousel controls (previous and next buttons)
    const prevButton = document.createElement("button");
    prevButton.classList.add("carousel-control-prev");
    prevButton.type = "button";
    prevButton.setAttribute("data-bs-target", `#${carouselId}`);
    prevButton.setAttribute("data-bs-slide", "prev");
    prevButton.innerHTML = `<span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="visually-hidden">Previous</span>`;

    const nextButton = document.createElement("button");
    nextButton.classList.add("carousel-control-next");
    nextButton.type = "button";
    nextButton.setAttribute("data-bs-target", `#${carouselId}`);
    nextButton.setAttribute("data-bs-slide", "next");
    nextButton.innerHTML = `<span class="carousel-control-next-icon" aria-hidden="true"></span><span class="visually-hidden">Next</span>`;

    // Append the carousel elements to the carousel container
    carouselContainer.appendChild(carouselInner);
    carouselContainer.appendChild(prevButton);
    carouselContainer.appendChild(nextButton);

    // Create the card body
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    // Create the hotel name and rating section
    const hotelinfo = document.createElement("div");
    hotelinfo.classList.add("hotelinfo", "justify-content-between");

    const hotelNameSpan = document.createElement("span");
    hotelNameSpan.classList.add("h6");
    hotelNameSpan.id = "hotelName";
    hotelNameSpan.textContent = hotelName;

    const ratingSpan = document.createElement("span");
    ratingSpan.id = "rating";
    ratingSpan.classList.add("fw-bold");
    ratingSpan.textContent = `★${rating}`;

    hotelinfo.appendChild(hotelNameSpan);
    hotelinfo.appendChild(ratingSpan);
    cardBody.appendChild(hotelinfo);

    // Create the rent section
    const rentParagraph = document.createElement("p");
    rentParagraph.id = "rent";
    rentParagraph.innerHTML = `<span class="fw-bold">$${price}</span> per Night`;

    cardBody.appendChild(rentParagraph);

    // Append carousel and body to hotelCard
    hotelCard.appendChild(carouselContainer);
    hotelCard.appendChild(cardBody);

    // Wrap hotelCard in a link
    const link = document.createElement("a");
    link.style.textDecoration = "none";
    link.style.color = "inherit";
    link.appendChild(hotelCard);

    return link;
  }

  function hotelcard(houses) {
    rentalContainer.innerHTML = "";
    houses.forEach((item) => {
      // Call the createRentalCard function for each rental
      const rentalCard = createRentalCard(
        item.name,
        item.rating,
        item.rent,
        item.images,
        item.id
      );

      // Append the created card to the container
      rentalContainer.appendChild(rentalCard);
    });
    let hotelCards = document.querySelectorAll(".hotelCard");
    hotelCards.forEach((card) => {
      card.addEventListener("click", () => {
        const id = card.querySelector(".carousel").getAttribute("id");
        const cardLink = card.parentElement;
        const checkIn = document.getElementById("checkIn").value;
        const checkOut = document.getElementById("checkOut").value;
        const TotalGuest = document.getElementById("totalGuest").value;
        cardLink.href =
          "hotel.html?id=" +
          id +
          "&inDate=" +
          checkIn +
          "&outDate=" +
          checkOut +
          "&totalGuest=" +
          TotalGuest;
      });
    });
  }

  document.querySelector(".signupButton").addEventListener("click", (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", document.getElementById("name").value);
    formData.append("email", document.getElementById("email").value);
    formData.append("username", document.getElementById("user_name").value);
    formData.append("password", document.getElementById("password").value);

    userName = document.getElementById("user_name").value;
    localStorage.setItem("username", userName);
    console.log(document.getElementById("user_name").value);

    fetch("apis/user.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          document.getElementById("signuperror").innerText = data.error;
        } else {
          alert("Account created successfully!");
          const modalEl = document.getElementById("signupModal");
          const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
          modal.hide();
        }
      })
      .catch((error) => {
        document.getElementById("signuperror").innerText = error.message;
      });
  });

  document.querySelector("#loginform").addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", document.getElementById("username").value);
    formData.append("password", document.getElementById("password").value);

    userName = document.getElementById("username").value;
    localStorage.setItem("username", userName);

    fetch("apis/user.php?location='destination'", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          document.getElementById("loginerror").innerText = data.error;
        } else {
          alert(data.success);
          const modalEl = document.getElementById("loginModal");
          const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
          modal.hide();
        }
      })
      .catch((error) => {
        document.getElementById("loginerror").innerText = error.message;
      });
  });
  user = localStorage.getItem("username");
  console.log(user);
  document.getElementById("user").innerText = user;

  let houses = [];

  async function fetchHotels(params = {}) {
    const queryString = new URLSearchParams(params).toString();

    return fetch(`http://127.0.0.1/stayease/apis/hotels.php?${queryString}`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .catch((error) => {
        console.error("Error fetching hotels:", error);
        return [];
      });
  }

  houses = await fetchHotels();
  hotelcard(houses);

  let searchBoxForm = document.querySelector(".searchBoxForm");
  searchBoxForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const destination = document.getElementById("destination").value;
    houses = await fetchHotels({ location: destination });
    hotelcard(houses);
  });
};
