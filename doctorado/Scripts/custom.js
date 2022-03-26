$(document).ready(function() {
    $.urlParam = function(name) {
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results == null) {
            return null;
        }
        return decodeURI(results[1]) || 0;
    }

    $(window).on('load', function() {
        $('#myModal').modal('show');
        $('#myModalDoc').modal('hide');
    });

    $('table').on('click', 'tr td #ver', function() {
        $('form').show();
    });

    $('table').on('click', 'tr td #subir', function() {
        $('#myModalDoc').modal('show');

    });
    $('#cerrarSol').on('click', function() {
        $('#formSol').hide();
    });
    $('#imprimirSol').on('click', function() {
        // $('#formSol').hide();
        var formData = new FormData();
        var solicitud = $.urlParam('noSolicitud');
        var correo = $.urlParam('correo');
        var data = $(this).data('solicitud');
        alert(data);

    });
    $('#actualizarDoc').on('click', function() {
        var formData = new FormData();
        var solicitud = $.urlParam('noSolicitud');
        formData.append('noSolicitud', solicitud);
        formData.append('actaNacimiento', $('#actaNacimiento').prop('files')[0]);
        formData.append('CURP', $('#CURP').prop('files')[0]);
        formData.append('TOEFL', $('#TOEFL').prop('files')[0]);
        formData.append('cartaMotivos', $('#cartaMotivos').prop('files')[0]);
        formData.append('cartaRecomendacion1', $('#cartaRecomendacion1').prop('files')[0]);
        formData.append('cartaRecomendacion2', $('#cartaRecomendacion2').prop('files')[0]);
        formData.append('propuesta', $('#propuesta').prop('files')[0]);
        formData.append('certificado', $('#certificado').prop('files')[0]);
        formData.append('titulo', $('#titulo').prop('files')[0]);
        formData.append('cvu', $('#cvu').prop('files')[0]);
        formData.append('cedulaDoc', $('#cedulaDoc').prop('files')[0]);
        formData.append('solicitud', $('#solicitud').prop('files')[0]);

        $.ajax({
            type: "POST",
            url: "php/subirDocumentos.php",
            data: formData,
            processData: false,
            contentType: false,
            beforeSend: function() {
                $('#actualizarDoc').prop('disabled', true);
            },
            xhr: function() {
                var xhr = $.ajaxSettings.xhr();
                if (xhr.upload) {
                    xhr.upload.addEventListener('progress', function(event) {
                        var percent = 0;
                        var position = event.loaded || event.position;
                        var total = event.total;
                        if (event.lengthComputable) {
                            percent = Math.ceil(position / total * 100);
                        }
                        $('.progress-bar').width(percent + "%");
                        $('.progress-bar').text(percent + "%");
                    }, false);
                }
                return xhr;
            },
            success: function(response) {
                alert('Documento almacenado correctamente');
                location.reload();
            },
            complete: function() {
                $('#actualizarDoc').prop('disabled', false);
            }

        });
    });

    $('#verDoc').on('click', function() {
        var formData = new FormData();
        var solicitud = $.urlParam('noSolicitud');

        formData.append('noSolicitud', solicitud);
        $.ajax({
            type: "POST",
            url: "php/ver-documentacion.php",
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                alert(response);

            }
        });
    });

    $('#correo-registro').blur('change', function(e) {
        var correo = $(this).val();
        if (correo) {
            $.ajax({
                type: "get",
                url: "php/check-correo.php",
                data: { correo: correo },
                dataType: "json",
                success: function(data) {
                    if (data.response === "error") {
                        alert('Este correo ya se encuentra registrado!');
                        $("#registrar").prop('disabled', true);
                        return;
                    } else {
                        if (data.response === "success") {
                            $("#registrar").prop('disabled', false);
                        }
                    }
                }
            });
        }


    });
    $('#actualizar').on('click', function() {
        var formData = new FormData();
        var solicitud = $.urlParam('noSolicitud');

        formData.append('noSolicitud', solicitud);
        formData.append('nombres', $('#nombres').val());
        formData.append('appPat', $('#appPat').val());
        formData.append('appMat', $('#appMat').val());
        formData.append('sexo', $('input[id=radioSexo]:checked').val());
        formData.append('edad', $('#edad').val());
        formData.append('fechaNacimiento', $('#fechaNacimiento').val());
        // formData.append('actaNacimiento', $('#actaNacimiento').prop('files')[0]);
        formData.append('nacionalidad', $('#nacionalidad').val());
        // formData.append('CURP', $('#CURP').prop('files')[0]);
        formData.append('rfc', $('#RFC').val());
        // formData.append('TOEFL', $('#TOEFL').prop('files')[0]);
        formData.append('direccion', $('#direccion').val());
        formData.append('telCasa', $('#telCasa').val());
        formData.append('telCel', $('#telCel').val());
        formData.append('correo', $('#correo').val());
        formData.append('correo2', $('#correo2').val());
        formData.append('estadoCivil', $('input[id=radioEstadoCivil]:checked').val());
        // formData.append('cartaMotivos', $('#cartaMotivos').prop('files')[0]);
        // formData.append('cartaRecomendacion1', $('#cartaRecomendacion1').prop('files')[0]);
        // formData.append('cartaRecomendacion2', $('#cartaRecomendacion2').prop('files')[0]);
        // formData.append('propuesta', $('#propuesta').prop('files')[0]);
        formData.append('carrera', $('#carrera').val());
        formData.append('institucion', $('#institucion').val());
        formData.append('pais', $('#pais').val());
        formData.append('fechoEgreso', $('#fechaEgreso').val());
        // formData.append('certificado', $('#certificado').prop('files')[0]);
        // formData.append('titulo', $('#titulo').prop('files')[0]);
        formData.append('promedioLicenciatura', $('#promedioLicenciatura').val());
        formData.append('cedula', $('#cedula').val());
        formData.append('estatusLicenciatura', $('input[id=radioEstatusLicenciatura]:checked').val());
        formData.append('fechaTitulacion', $('#fechaTitulacion').val());
        formData.append('areaEnfasis', $('input[id=checkAreaEnfasis]:checked').val());
        formData.append('trabaja', $('input[id=radioTrabaja]:checked').val());
        formData.append('lugarDeTrabajo', $('#lugarDeTrabajo').val());
        formData.append('puesto', $('#puesto').val());
        formData.append('tipoEmpresa', $('input[id=radioTipoEmpresa]:checked').val());
        formData.append('estatusLicenciatura', $('input[id=radioEstatusLicenciatura]:checked').val());
        formData.append('antiguedad', $('#antiguedad').val());
        formData.append('actividades_laborales', $('#actividades_laborales').val());
        formData.append('formaFinanciamiento', $('input[id=radioFormaFinanciamiento]:checked').val());
        formData.append('disposicion', $('input[id=radioDisposicion]:checked').val());
        formData.append('resumenProyecto', $('#resumenProyecto').val());
        //nuevos campos agregados
        formData.append('sede', $('input[id=radioSede]:checked').val());
        formData.append('EstatusLicenciaturaOtra', $('#txtEstatusLicenciatura').val());
        // formData.append('cvu', $('#cvu').prop('files')[0]);
        // formData.append('cedulaDoc', $('#cedulaDoc').prop('files')[0]);
        //

        $.ajax({
            type: "POST",
            url: "php/updateSolicitud.php",
            data: formData, // serializes the form's elements.
            processData: false,
            contentType: false,
            beforeSend: function() {

            },
            success: function(data) {
                alert(data); // show response from the php script.
                // window.location.href = "/mgtic/index.html";
                location.reload();
            },
            complete: function() {

            }
        });
    });

    $('input[type=radio][name=radioEstatusLicenciatura]').change(function() {
        if (this.value == 'Otra') {
            $('#txtEstatusLicenciatura').show();
        } else {
            $('#txtEstatusLicenciatura').hide();
        }
    });
    
        $('input[type=radio][name=radioTrabaja]').change(function() {
        if (this.value == 'Si') {
            $('#trabajo').show();
        } else {
            $('#trabajo').hide();
        }
    });
    $('#procesar_login_admision').on('click', function(e) {
        e.preventDefault();
        var solicitud = $('#solicitud').val();
        var correo = $('#correo').val();
        $.ajax({
            type: "get",
            url: "php/checkSolicitud.php?solicitud=" + solicitud + "&correo=" + correo + "",
            processData: false,
            contentType: false,
            success: function(response) {
                if (response === 'no encontrado') {
                    alert('Datos no encontrados');
                    // window.location.href = "/mgtic/editarSolicitud.php";
                } else {
                    // alert('datos encontrado');
                    window.location.href = "/mgtic/index-aspirante.php?noSolicitud=" + solicitud + "&correo=" + correo + "";
                }
            }
        });
    });


    $('#procesar_login_admin').on('click', function(e) {
        e.preventDefault();
        var formData = new FormData();
        formData.append('login', $('#usuario').val());
        formData.append('password', $('#password').val());
        $.ajax({
            type: "POST",
            url: "ajax/login.php",
            data: formData, // serializes the form's elements.
            processData: false,
            contentType: false,
            beforeSend: function() {
                $('#procesar_login_admin').prop('disabled', true);
            },
            success: function(data) {
                if (data === 'success') {
                    window.location.href = "/mgtic/admin/index.php";
                    $('#procesar_login_admin').prop('disabled', false);
                } else {
                    alert('Usuario y/o Password incorrectos');
                }
            }
        });
    });
    

    $('#procesar').on('click', function(e) {
        e.preventDefault();
        // var form = $('form');
        var formData = new FormData();

        formData.append('nombres', $('#nombres').val());
        formData.append('appPat', $('#appPat').val());
        formData.append('appMat', $('#appMat').val());
        var sexo = $('input[id=radioSexo]:checked').val();
        if (typeof(sexo) === "undefined") {
           
            alert('El campo sexo esta vacio');
            return;
        }
        formData.append('sexo', sexo);
        var edad = $('#edad').val();
  
        if(edad == 0){
            alert('El campo edad no puede quedar vacio');
            return;
        }
        formData.append('edad', $('#edad').val());
      

        var fechaNacimiento = $('#fechaNacimiento').val();
        if (!fechaNacimiento) {
            alert('El campo fecha de nacimiento no puede quedar vacio');
            return;

        }
        formData.append('fechaNacimiento', $('#fechaNacimiento').val());
        // formData.append('actaNacimiento', $('#actaNacimiento').prop('files')[0]);
        var nacionalidad = $('#nacionalidad').val();
   
        if(!nacionalidad){
            alert('El campo nacionalidad no puede quedar vacio');
            return;
        }
        formData.append('nacionalidad', $('#nacionalidad').val());
        // formData.append('CURP', $('#CURP').prop('files')[0]);
        formData.append('RFC', $('#RFC').val());
        // formData.append('TOEFL', $('#TOEFL').prop('files')[0]);
        var direccion = $('#direccion').val();
        if(!direccion){
            alert('El campo direccion no puede quedar vacio');
            return;
        }
        formData.append('direccion', $('#direccion').val());
        var telcasa  = $('#telCasa').val();
        if(!telcasa){
            alert('El campo Telefono Casa no puede quedar vacio');
            return;
        }
        
        formData.append('telCasa', $('#telCasa').val());
        var telcel = $('#telCel').val();
        if(!telcel){
            alert('El Campo Telefono Celular no puede quedar vacio');
            return;
        }
        formData.append('telCel', $('#telCel').val());
        formData.append('correo', $('#correo').val());
        
        var correo2 = $('#correo2').val();
        if(!correo2){
            correo2 = "No definido";
        }
        formData.append('correo2',correo2);
        
        var estadoCivil = $('input[id=radioEstadoCivil]:checked').val();
        if (typeof(estadoCivil) === "undefined") {
           alert('El campo estado civil no puede quedar vacio');
            return;
        }
        formData.append('estadoCivil', estadoCivil);
        // formData.append('cartaMotivos', $('#cartaMotivos').prop('files')[0]);
        // formData.append('cartaRecomendacion1', $('#cartaRecomendacion1').prop('files')[0]);
        // formData.append('cartaRecomendacion2', $('#cartaRecomendacion2').prop('files')[0]);
        // formData.append('propuesta', $('#propuesta').prop('files')[0]);
        var carrera = $('#carrera').val();
        if(!carrera) {
            alert('El campo carrera no puede quedar vacio');
            return;
        }
        formData.append('carrera', $('#carrera').val());
        
        var institucion =  $('#institucion').val();
        if(!institucion){
            alert('El campo institucion no puede quedar vacio');
            return;
        }
        formData.append('institucion', $('#institucion').val());
        
        var pais = $('#pais').val();
        if(!pais) {
            alert('El campo pais no puede quedar vacio');
            return;
        }
        formData.append('pais', $('#pais').val());
        
        var fechaEgreso = $('#fechaEgreso').val();
        if (!fechaEgreso) {
            alert('El campo fecha de egreso no puede quedar vacio');
            return;
        }
        formData.append('fechoEgreso', $('#fechaEgreso').val());
        // formData.append('certificado', $('#certificado').prop('files')[0]);
        // formData.append('titulo', $('#titulo').prop('files')[0]);
        var promedioLicenciatura = $('#promedioLicenciatura').val();
        if(promedioLicenciatura == 0 ){
            alert('El campo promedio de licenciatura no puede quedar vacio');
            return;
        }
        formData.append('promedioLicenciatura', $('#promedioLicenciatura').val());
        var cedula = $('#cedula').val();
        if(!cedula) {
            alert('El campo cedula no puede quedar vacio');
            return;
        }
        formData.append('cedula', $('#cedula').val());
        var estatusLicenciatura = $('input[id=radioEstatusLicenciatura]:checked').val();
        if (typeof(estatusLicenciatura) === "undefined") {
             
            alert('El campo estatus licenciatura no puede quedar vacio');
            return;
        }
        formData.append('estatusLicenciatura', estatusLicenciatura);
        var fechaTitulacion = $('#fechaTitulacion').val();
        if (!fechaTitulacion) {
            alert('El campo fecha de titulacion no puede quedar vacio');
            return;
        }
        formData.append('fechaTitulacion', $('#fechaTitulacion').val());
        var areaEnfasis = $('input[id=checkAreaEnfasis]:checked').val();
        if (typeof(areaEnfasis) === "undefined") {
             areaEnfasis = "No definido";
        }

        formData.append('areaEnfasis', areaEnfasis);
        var trabaja = $('input[id=radioTrabaja]:checked').val();
        if (typeof(trabaja) === "undefined") {
            alert('El campo trabaja no puede quedar vacio');
             return;
        }
        formData.append('trabaja', trabaja);
        
        var lugartrabajo = $('#lugarDeTrabajo').val();
        if(!lugartrabajo){
            lugartrabajo = "No definido";
        }
        formData.append('lugarDeTrabajo', lugartrabajo);
        
        var puesto = $('#puesto').val();
        if(!puesto){
            puesto = "No definido";
        }
        formData.append('puesto', puesto);
        
        var tipoEmpresa = $('input[id=radioTipoEmpresa]:checked').val();
        if (typeof(tipoEmpresa) === "undefined") {
             tipoEmpresa = "No definido"
        }
        formData.append('tipoEmpresa', tipoEmpresa);
       // var estatusLicenciatura = $('input[id=radioEstatusLicenciatura]:checked').val();
      //  if (typeof(estatusLicenciatura) === "undefined") {
          //   estatusLicenciatura = "No definido";
       // }
       // formData.append('estatusLicenciatura', estatusLicenciatura);
        
        formData.append('antiguedad', $('#antiguedad').val());
        formData.append('actividades_laborales', $('#actividades_laborales').val());
        var formaFinanciamiento = $('input[id=radioFormaFinanciamiento]:checked').val();
        if (typeof(formaFinanciamiento) === "undefined") {
             
            alert('El campo forma de financiamiento no puede quedar vacio');
            return;
        }
        formData.append('formaFinanciamiento', formaFinanciamiento);
        var disposicion = $('input[id=radioDisposicion]:checked').val()
        if (typeof(disposicion) === "undefined") {
             disposicion = "No definido";
        }
        formData.append('disposicion', disposicion);
        formData.append('resumenProyecto', $('#resumenProyecto').val());
        //nuevos campos agregados
        formData.append('sede', $('input[id=radioSede]:checked').val());
        formData.append('EstatusLicenciaturaOtra', $('#txtEstatusLicenciatura').val());
        // formData.append('cvu', $('#cvu').prop('files')[0]);
        // formData.append('cedulaDoc', $('#cedulaDoc').prop('files')[0]);
        //

        $.ajax({
            type: "POST",
            url: "php/registrarAdmision.php",
            data: formData, // serializes the form's elements.
            processData: false,
            contentType: false,
            beforeSend: function() {
                $("#procesar").prop('disabled', true);
            },
            success: function(data) {
                alert(data); // show response from the php script.
                window.location.href = "/mgtic/registro-admision.html";
                $("#procesar").prop('disabled', false);
            },
            complete: function() {
                $("#procesar").prop('disabled', false);
            }
        });
    });
    $('.card').hover(
        // trigger when mouse hover
        function() {
            $(this).animate({
                marginTop: "-=1%",
            }, 200);
        },

        // trigger when mouse out
        function() {
            $(this).animate({
                marginTop: "0%"
            }, 200);
        }
    );


});