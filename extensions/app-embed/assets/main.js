var element = document.getElementById("main-app-extension");
var message = "Hello, world!";
let request = new XMLHttpRequest();
const url = `https://reqbin.com/echo/get/json`;
const html = `
  <div>
    <div class="post-outer">
      Point javascript to theme app success
    </div>
  </div>
`;

console.log(message);

request.onreadystatechange = function () {
  if (this.readyState === 4 && this.status === 200) {
    const response = JSON.parse(this.responseText);
    console.log(response, "Logger Theme App");

    window.onload = function () {
      if (element !== null) {
        element.innerHTML = html;
      } else {
        console.log("Element not found.");
      }
    };
  } else {
    console.log(this, "error");
  }
};

// We've covered everything except for the two lines below!
request.open("GET", url, true);
request.send();
