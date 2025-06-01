window.onload = async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const carouselId = urlParams.get("id");
  const inDate = urlParams.get("inDate");
  const outDate = urlParams.get("outDate");
  const guest = urlParams.get("totalGuest");
  let hotelInDate = document.getElementById("checkIn");
  hotelInDate.value = inDate;
  let hotelOutDate = document.getElementById("checkOut");
  hotelOutDate.value = outDate;

  user = localStorage.getItem("username");
  console.log(user);
  document.getElementById("user").innerText = user;

  async function fetchHotels() {
    return fetch(`apis/hotels.php?id=${carouselId}`, {
      method: "GET",
    })
      .then((res) => {
        if (!res.ok) throw new Error("network response was not ok");
        return res.json();
      })
      .catch((error) => {
        console.error(error);
        return [];
      });
  }
  const hotel = await fetchHotels();
  // const hotel = getHotel(carouselId);

  const hotelRent = document.getElementById("rent");

  const hotelRating = document.getElementById("hotelRating");
  hotelRating.innerText = hotel.rating + "  " + hotel.ratingStars;

  const hotelName = document.querySelector("#hotelNameBox h3");
  hotelName.innerHTML = hotel.name;
  const hostimg = document.querySelector("#hostBox img");
  hostimg.src = hotel.hostImage;
  const hostName = document.getElementById("hostName");
  hostName.innerHTML = "Hosted by " + hotel.host;
  let img1 = document.getElementById("img-1");
  let img2 = document.getElementById("img-2");
  let img3 = document.getElementById("img-3");
  let crsolimg_1 = document.getElementById("carouselImg-1");
  let crsolimg_2 = document.getElementById("carouselImg-2");
  let crsolimg_3 = document.getElementById("carouselImg-3");
  let crsolimgArr = [crsolimg_1, crsolimg_2, crsolimg_3];
  let imgarr = [img1, img2, img3];

  JSON.parse(hotel.images).forEach((item, index) => {
    imgarr[index].src = item;
    crsolimgArr[index].src = item;
  });
  const hotelPraisePara = document.querySelector("#hotelPraisePara p");
  hotelRent.innerText = "$" + hotel.rent;
  const services = document.querySelectorAll(".services");
  hotelPraisePara.innerText = hotel.description;

  JSON.parse(hotel.services).forEach((item, index) => {
    console.log(item);
    services[index].innerText = item;
  });

  let daysStay = document.getElementById("daysStay");
  let stayAmount = document.getElementById("stayAmount");
  let GuestElement = document.getElementById("totalGuest");
  changeDayStays();

  let totalAmount = document.getElementById("totalRent");
  new MutationObserver(() => {
    const stay = Number(stayAmount.innerText.replace("$", ""));
    totalAmount.innerText = "$" + (stay + 2100);
  }).observe(stayAmount, {
    childList: true,
  });
  GuestElement.value = guest;
  hotelInDate.onchange = function () {
    changeDayStays();
  };

  hotelOutDate.onchange = function () {
    changeDayStays();
  };

  function changeDayStays() {
    const stayDays = calculateStayDays(hotelInDate.value, hotelOutDate.value);
    daysStay.innerText = "$" + hotel.rent + " x " + stayDays + "nights";
    stayAmount.innerText = "$" + Number(hotel.rent) * stayDays;
  }

  function calculateStayDays(inDate, outDate) {
    const indate = new Date(inDate);
    const outdate = new Date(outDate);

    const diffTime = outdate - indate;

    const stayDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return stayDays;
  }

  // function getHotel(hotelId) {
  //   for (let hotel of hotels) {
  //     if (hotel.id == hotelId) {
  //       return hotel;
  //     }
  //   }
  // }

  document.getElementById("makePayment").onclick = function () {
    console.log("MAKE PAYMENT");
    makePayment();
  };

  document.getElementById("cardNumber").addEventListener("input", () => {
    document.getElementById("cardNumberError").innerText = "";
  });

  document.getElementById("cardHolder").addEventListener("input", () => {
    document.getElementById("cardHolderError").innerText = "";
  });

  document.getElementById("expiry").addEventListener("input", () => {
    document.getElementById("expiryError").innerText = "";
  });

  document.getElementById("cvv").addEventListener("input", () => {
    document.getElementById("cvvError").innerText = "";
  });

  function makePayment() {
    const cardNumber = document.getElementById("cardNumber");
    const cardHolder = document.getElementById("cardHolder");
    const expiry = document.getElementById("expiry");
    const cvv = document.getElementById("cvv");

    const card = cardNumber.value.trim().replace(/\s/g, "");
    const name = cardHolder.value.trim();
    const exp = expiry.value.trim();
    const code = cvv.value.trim();

    // Error spans
    const errors = {
      card: document.getElementById("cardNumberError"),
      name: document.getElementById("cardHolderError"),
      expiry: document.getElementById("expiryError"),
      cvv: document.getElementById("cvvError"),
    };

    // Clear previous error messages
    Object.values(errors).forEach((el) => (el.innerText = ""));

    // Validation regex
    const cardRegex = /^\d{16}$/;
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const cvvRegex = /^\d{3}$/;

    let isValid = true;

    if (!cardRegex.test(card)) {
      errors.card.innerText = "Card number must be 16 digits.";
      isValid = false;
    }

    if (name.length < 3) {
      errors.name.innerText = "Enter card holder's full name.";
      isValid = false;
    }

    if (!expiryRegex.test(exp)) {
      errors.expiry.innerText = "Use MM/YY format.";
      isValid = false;
    }

    if (!cvvRegex.test(code)) {
      errors.cvv.innerText = "CVV must be 3 digits.";
      isValid = false;
    }

    if (!isValid) return;

    // Disable all inputs after validation passes
    cardNumber.disabled = true;
    cardHolder.disabled = true;
    expiry.disabled = true;
    cvv.disabled = true;

    const button = document.querySelector(".card-container button");
    button.innerText = "Processing Payment...";
    button.disabled = true;

    setTimeout(() => {
      button.innerText = "Paid ✅";
    }, 2000);

    const formData = new FormData();
    formData.append("checkIn", document.getElementById("checkIn").value);
    formData.append("checkOut", document.getElementById("checkOut").value);
    formData.append("totalGuest", document.getElementById("totalGuest").value);
    formData.append("hotelId", carouselId);
    formData.append("username", user);

    fetch("apis/reservations.php", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert(data.success);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }
  cancelbtn = document.getElementById("cancelBtn");
  cancelbtn.addEventListener("click", (e) => {
    e.preventDefault();
    inputfeedback = document.getElementById("inputfeedback");
    inputfeedback.value = "";
  });

  function addFeedbackDiv(user, enterfeedback) {
    const outerDiv = document.createElement("div");
    outerDiv.className = "feedbackItem";

    const feedback = document.createElement("div");
    feedback.id = "feedback";
    feedback.textContent = enterfeedback;

    const feedbackuser = document.createElement("div");
    feedbackuser.id = "feedbackuser";
    feedbackuser.textContent = `@${user}`;

    outerDiv.appendChild(feedbackuser);
    outerDiv.appendChild(feedback);

    const feedbackBox = document.querySelector(".feedbackBox");
    feedbackBox.appendChild(outerDiv);
  }

  commentbtn = document.getElementById("commentBtn");

  commentbtn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("btn clicked");
    inputfeedback = document.getElementById("inputfeedback").value;
    let formData = new FormData();
    formData.append("hotelId", carouselId);
    formData.append("user", user);
    formData.append("feedback", inputfeedback);
    fetch("apis/feedback.php", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        document.getElementById("inputfeedback").value = "";
        addFeedbackDiv(user, inputfeedback);
      })

      .catch((res) => {
        console.log(res.json());
      });
  });

  fetch(`apis/feedback.php?hotelId=${carouselId}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((comment) => {
      console.log(comment);
      comment.forEach((item) => {
        addFeedbackDiv(item.usermail, item.feedback);
      });
    })

    .catch((error) => {
      console.log(error.json());
    });
};
