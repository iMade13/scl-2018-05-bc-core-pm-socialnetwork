$(function() {
    let boton = $('#btn-menu');
    let fondo_enlace = $('#fondo-enlace');

    boton.on('click', function() {
        fondo_enlace.toggleClass('active');
        $('#barra-lateral-izquierda').toggleClass('active');
    });

    fondo_enlace.on('click', function() {
        fondo_enlace.toggleClass('active');
        $('#barra-lateral-izquierda').toggleClass('active');
    });
}())