document.addEventListener("DOMContentLoaded", function () {
  // Simulate loading progress
  var progressBar = document.getElementById("progressBar");
  var width = 0;
  var interval = setInterval(function () {
    if (width >= 100) {
      clearInterval(interval);
      document.getElementById("loadingScreen").style.display = "none";
      document.getElementById("content").style.display = "block";
    } else {
      width++;
      progressBar.style.width = width + "%";
    }
  }, 10);
});
function expandScreen() {
  window.Telegram.WebApp.expand();
}

function updateBlur(coins) {
  // Adjust blur based on number of coins
  var blurRadius = 57 - coins; // Reverse blur effect
  document.getElementById("gameArea").style.filter =
    "blur(" + blurRadius + "px)";
}

var coins = 0;

function tapCoin(event) {
  coins++;
  document.getElementById("coins").innerText = coins;
  window.Telegram.WebApp.HapticFeedback.impactOccurred("light");

  // Retrieve touch coordinates
  var touchX = event.clientX || event.touches[0].clientX;
  var touchY = event.clientY || event.touches[0].clientY;

  // Create the +1 element
  var plusOne = document.createElement("div");
  plusOne.innerText = "+1";
  plusOne.style.fontSize = "20px";
  plusOne.className = "plusOne";
  plusOne.style.left = touchX + "px";
  plusOne.style.top = touchY + "px";
  plusOne.style.transform = "translate(-50%, -50%)";
  document.body.appendChild(plusOne);

  // Animate the +1 element
  setTimeout(function (event) {
    plusOne.style.top = touchY - 300 + "px"; // Move upwards twice as much
    plusOne.style.opacity = "0"; // Fade out
  }, 100);

  // Remove the +1 element after animation completes
  setTimeout(function () {
    document.body.removeChild(plusOne);
  }, 200);
}

// Add touchstart event listener for multi-touch support
document
  .getElementById("gameArea")
  .addEventListener("touchstart", function (event) {
    for (var i = 0; i < event.touches.length; i++) {
      tapCoin(event.touches[i]);
    }
  });

// Fallback for mouse click
document.getElementById("gameArea").addEventListener("click", tapCoin);

$(document).ready(function () {
  $(".menu-item").click(function (e) {
    e.preventDefault();
    const target = $(this).data("target");

    $(".content-container").removeClass("active");
    $(target).addClass("active");

    $(".menu-item").removeClass("active");
    $(this).addClass("active");
  });
});
