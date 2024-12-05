// Inicializar el mapa en la Catedral de Barquisimeto
const initialCoordinates = [10.0661, -69.3470];
const map = L.map('map').setView(initialCoordinates, 15);

// Agregar capa de mapa base
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Añadir un marcador que el usuario pueda mover
const marker = L.marker(initialCoordinates, { draggable: true, autoPan: true }).addTo(map);

// Actualizar campos de latitud y longitud al mover el marcador
marker.on('moveend', function (e) {
    const { lat, lng } = e.target.getLatLng();
    document.getElementById('latitud').value = lat.toFixed(6);
    document.getElementById('longitud').value = lng.toFixed(6);
});

// Inicializar los campos con las coordenadas iniciales
document.getElementById('latitud').value = initialCoordinates[0];
document.getElementById('longitud').value = initialCoordinates[1];

// Enviar el formulario a Zapier
document.getElementById('report-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const codigo = document.getElementById('codigo').value;
    const latitud = document.getElementById('latitud').value;
    const longitud = document.getElementById('longitud').value;
    const nota = document.getElementById('nota').value;

    const payload = {
        data: {
            codigo,
            latitud,
            longitud,
            nota
        }
    };

    fetch('https://hooks.zapier.com/hooks/catch/20885204/2if1o24/', {
        method: 'POST',
        mode: 'no-cors', // Permite enviar la solicitud sin verificar los encabezados de CORS
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    .then(() => {
        Swal.fire({
            icon: 'success',
            title: 'Reporte enviado',
            text: '¡Gracias por ayudar a una mascota a regresar a casa!',
            timer: 5000,
            showConfirmButton: false
        }).then(() => {
            window.location.href = 'https://petiffinder.webflow.io/';
        });
    })
    .catch(error => {
        console.error('Error:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo enviar el reporte. Inténtalo nuevamente.',
        });
    });
});
