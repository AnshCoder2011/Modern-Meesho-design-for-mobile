let swiper = new Swiper(".mySwiper", {
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
  });
  
  let swiper2 = new Swiper(".mySwiper2", {
    spaceBetween: 10,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    thumbs: {
      swiper: swiper,
    },

    autoplay: {
        delay: 2000,
      },
  });
  



  const newYearEl = document.getElementById("date");
const daysEl = document.getElementById("days");
const daysElCurr = daysEl.getElementsByClassName("curr");
const daysElNext = daysEl.getElementsByClassName("next");
const hoursEl = document.getElementById("hours");
const hoursElCurr = hoursEl.getElementsByClassName("curr");
const hoursElNext = hoursEl.getElementsByClassName("next");
const minsEl = document.getElementById("mins");
const minsElCurr = minsEl.getElementsByClassName("curr");
const minsElNext = minsEl.getElementsByClassName("next");
const secondsEl = document.getElementById("seconds");
const secondsElCurr = secondsEl.getElementsByClassName("curr");
const secondsElNext = secondsEl.getElementsByClassName("next");

const newYear = new Date().getFullYear() + 1;
let newYearTime = new Date("2024-05-18 13:30:00");
newYearTime = new Date(
  newYearTime.getTime() - new Date().getTimezoneOffset() * 100 * 1000
);

function updateAllCountdowns() {
  const dates = {
    current: {
      elements: [daysElCurr, hoursElCurr, minsElCurr, secondsElCurr],
      values: ["00", "00", "00", "00"]
    },
    next: {
      elements: [daysElNext, hoursElNext, minsElNext, secondsElNext],
      values: ["00", "00", "00", "00"]
    },
    general: {
      elements: [daysEl, hoursEl, minsEl, secondsEl]
    }
  };
  const currentDate = new Date();
  updateCountdown(dates.current, currentDate, true);
  const nextDate = new Date(
    currentDate.setSeconds(currentDate.getSeconds() + 1)
  );
  updateCountdown(dates.next, nextDate, false);
  for (let i = 0; i < dates.current.values.length; i++) {
    if (dates.current.values[i] - dates.next.values[i] !== 0) {
      dates.general.elements[i].classList.remove("flip");
    }
    setTimeout(function () {
      dates.general.elements[i].classList.add("flip");
    }, 50);
  }
}

function updateCountdown(dates, currentTime, isCurrent) {
  const totalSeconds = (newYearTime - currentTime) / 1000;

  const days = Math.floor(totalSeconds / 3600 / 24);
  const hours = Math.floor(totalSeconds / 3600) % 24;
  const mins = Math.floor(totalSeconds / 60) % 60;
  const seconds = Math.floor(totalSeconds) % 60;

  if (currentTime.getMonth() == 0 && currentTime.getDate() <= 2) {
    dates.values = ["00", "00", "00", "00"];
    for (let i = 0; i < dates.elements.length; i++) {
      for (let j = 0; j < daysElCurr.length; j++) {
        dates.elements[i][j].innerHTML = dates.values[i];
        if (isCurrent) {
          newYearEl.innerHTML = newYear - 1;
        }
      }
    }

    return;
  }

  dates.values = [
    days,
    formatTime(hours),
    formatTime(mins),
    formatTime(seconds)
  ];

  for (let i = 0; i < dates.elements.length; i++) {
    for (let j = 0; j < daysElCurr.length; j++) {
      dates.elements[i][j].innerHTML = dates.values[i];
    }
  }
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

updateAllCountdowns();
setInterval(updateAllCountdowns, 1000);


  