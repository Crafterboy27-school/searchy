(async () => {
  var passcode = "";
  var correctPasscode = await fetch("code.txt");
  correctPasscode = await correctPasscode.text();
  correctPasscode = correctPasscode.split("\n")[0]

  if (btoa(localStorage.getItem("passcode")) !== correctPasscode) {
    passcode = prompt("Passcode?");
  } else {
    passcode = localStorage.getItem("passcode");
  }

  if (btoa(passcode) !== correctPasscode) {
    document.body.innerHTML = "No passcode L";
    alert("No passwords?");
    return;
  }
  localStorage.setItem("passcode", passcode);

  var done = false;
  setInterval(async () => {
    if (done == true) return;
    correctPasscode = await fetch("code.txt?"+Math.round(Math.random()*10000000),{cache:"no-cache"});
    correctPasscode = await correctPasscode.text();
    if (btoa(passcode) !== correctPasscode) {
      document.body.innerHTML = "Password expired L";
      alert("Password expired!");
      done = true;
      return;
    }
  }, 1000);
  let domains = ["https://webglmath.github.io/"];
  let games = await fetch("./games.json");
  games = await games.json();
  games = games.filter((game) => game.domain == 1 || game.flash === true);
  document.getElementById("count").textContent = games.length;
  games.forEach((ee) => {
    let e = ee;
    let el = document.createElement("button");
    el.textContent = e.title;
    el.onclick = () => {
      setTimeout(() => {
        let win = window.open("about:blank");

        win.document.write(`
        <title>${e.title}</title>
        <style>
          body{
            overflow:hidden;
          }
          *{
            margin:0;
          }
        </style>
        <script src="https://cdn.jsdelivr.net/gh/crafterboy27-school/searchy/butil.js"></script>
        <iframe src="${domains[e.domain - 1] + e.slug}" style="width:100vw;height:100vh;">
        `);
      }, 250);

      // document.getElementById("game").src = domain + e.slug
    };

    document.getElementById("games").appendChild(el);
  });

  setInterval(() => {
    let search = document.getElementById("search").value;
    Array.from(document.querySelectorAll("button")).forEach((el) => {
      if (/^\s*$/.test(search)) {
        el.style.display = "inline-block";
        return;
      }
      el.style.display = el.textContent
        .toLowerCase()
        .includes(search.toLowerCase())
        ? "inline-block"
        : "none";
    });
  }, 20);
})();
