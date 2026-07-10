/*==============================
MÚSICA
==============================*/

const music = document.getElementById("music");

const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const volumeControl = document.getElementById("volumeControl");

music.volume = 0.5;

playBtn.onclick = () => music.play();
pauseBtn.onclick = () => music.pause();

volumeControl.oninput = () => {
    music.volume = volumeControl.value;
};

document.body.addEventListener("click", () => {
    music.play().catch(()=>{});
}, {once:true});


const country = document.getElementById("country");
const timezoneInfo = document.getElementById("timezoneInfo");

const time1 = document.getElementById("time1");
const time2 = document.getElementById("time2");
const time3 = document.getElementById("time3");

/*==============================
ZONAS (CON CUBA)
==============================*/

const zones = {
  AR: { zone: "America/Argentina/Buenos_Aires", name: "Argentina" },
  UY: { zone: "America/Montevideo", name: "Uruguay" },
  CL: { zone: "America/Santiago", name: "Chile" },
  PY: { zone: "America/Asuncion", name: "Paraguay" },
  BO: { zone: "America/La_Paz", name: "Bolivia" },
  PE: { zone: "America/Lima", name: "Perú" },
  EC: { zone: "America/Guayaquil", name: "Ecuador" },
  CO: { zone: "America/Bogota", name: "Colombia" },
  VE: { zone: "America/Caracas", name: "Venezuela" },
  MX: { zone: "America/Mexico_City", name: "México" },
  GT: { zone: "America/Guatemala", name: "Guatemala" },
  HN: { zone: "America/Tegucigalpa", name: "Honduras" },
  SV: { zone: "America/El_Salvador", name: "El Salvador" },
  NI: { zone: "America/Managua", name: "Nicaragua" },
  CR: { zone: "America/Costa_Rica", name: "Costa Rica" },
  PA: { zone: "America/Panama", name: "Panamá" },
  DO: { zone: "America/Santo_Domingo", name: "Rep. Dominicana" },
  CU: { zone: "America/Havana", name: "Cuba" },
  ES: { zone: "Europe/Madrid", name: "España" }
};

/*==============================
CREAR SELECT (SIN DUPLICAR)
==============================*/

for (const code in zones) {
    const option = document.createElement("option");
    option.value = code;
    option.textContent = zones[code].name;
    country.appendChild(option);
}

/*==============================
HORARIO BASE
==============================*/

const baseDate = new Date("2026-07-10T21:00:00-03:00");

/*==============================
ACTUALIZAR HORARIOS
==============================*/

function actualizarHoras() {
    const zona = zones[country.value].zone;

    const hora = baseDate.toLocaleTimeString("es-AR", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: zona
    });

    time1.innerHTML = hora;
    time2.innerHTML = hora;
    time3.innerHTML = hora;

    timezoneInfo.innerHTML =
        `Horario mostrado para: <b>${zones[country.value].name}</b>`;
}

/*==============================
AUTO DETECTAR PAÍS
==============================*/

const userZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

for (const c in zones) {
    if (zones[c].zone === userZone) {
        country.value = c;
    }
}

country.addEventListener("change", actualizarHoras);

actualizarHoras();