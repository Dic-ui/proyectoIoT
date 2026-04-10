// Configuración Firebase
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_PROYECTO.firebaseapp.com",
  databaseURL: "https://TU_PROYECTO-default-rtdb.firebaseio.com",
  projectId: "TU_PROYECTO",
  storageBucket: "TU_PROYECTO.appspot.com",
  messagingSenderId: "XXXX",
  appId: "XXXX"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Referencia a datos
const ref = db.ref("sensores");

// Escuchar cambios en tiempo real
ref.on("value", (snapshot) => {
    const data = snapshot.val();

    document.getElementById("pm25").innerText = data.PM2_5;
    document.getElementById("temp").innerText = data.Temperatura;
    document.getElementById("hum").innerText = data.Humedad;

    evaluarCalidad(data.PM2_5);
});

// Evaluar calidad del aire
function evaluarCalidad(pm25) {

    let estado = document.getElementById("estado");

    if (pm25 <= 12) {
        estado.innerText = "🟢 Buena";
        estado.style.color = "lightgreen";
    }
    else if (pm25 <= 35) {
        estado.innerText = "🟡 Moderada";
        estado.style.color = "yellow";
    }
    else if (pm25 <= 50) {
        estado.innerText = "🟠 Dañina para sensibles";
        estado.style.color = "orange";
    }
    else {
        estado.innerText = "🔴 Peligrosa";
        estado.style.color = "red";
    }
}
