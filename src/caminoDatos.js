// VARIABLES GLOBALES
var contadorPasos = 0; // acumulador para contar pasos
var banderaPasosContinuos = false; // bandera true - false para continuar el pasoContinuo
var tiempoPaso = 2000; // 2000 ms = 2s ---> tiempo en el que se ejecutará la siguiente instrucción del pasoContinuo

// FUNCIÓN PARA CAMBIAR LA VELOCIDAD DE REPRODUCCIÓN DE LA SIMULACIÓN 
function cambiarVelocidadTiempoPaso(tiempo) {

    if (typeof (tiempo) === "number") {
        if (tiempo >= 0.1 && tiempo <= 15) {
            tiempoPaso = tiempo * 1000;
            alert("- Tiempo de ejecución por instrucción: " + tiempoPaso / 1000 + "s -");
        } else {
            alert("- El valor debe estar en el rango 0.1 a 15 -");
        }
    }
}

// FUNCIÓN PARA CAMBIAR LA VELOCIDAD DE REPRODUCCIÓN DE LA SIMULACIÓN CUANDO SE LLAMA DESDE REINICIAR
function cambiarVTPReiniciar(reiniciar) {

    if (typeof (reiniciar) === "number") {
        if (reiniciar >= 0.1 && reiniciar <= 15) {
            tiempoPaso = reiniciar * 1000;
            console.log("Reiniciando:\n- Tiempo de ejecución por instrucción: " + tiempoPaso / 1000 + "s -");
        } else {
            tiempoPaso = 2000;
            console.log("Reiniciando:\n- Valor por defecto establecido -");
        }
    }
}

$(document).ready(function () {

    /********************************************************************************************************************/
    // FUNCIONES GENERALES Y PRINCIPALES
    $(window).scroll(function () {
        if ($(this).scrollTop() >= 255) {
            $("#navegacion").css({
                position: "fixed",
                top: "0",
                left: "0",
            });
            $("#nav-div-aux").css({
                display: "block",
                height: "100px",
                marginBottom: "20px"
            });
        } else {
            $("#navegacion").css({
                position: "relative"
            });
            $("#nav-div-aux").css({
                display: "none",
            });
        }
    });

    // FUNCIONES COMPONENTE-IF
    // Agrega 9 elementos "li" (dependiendo del for) a nuestro "ol" de la memoria-instrucciones:
    for (var i = 0; i < 9; i++) {
        $("#memoria-instrucciones ol").append("<li id='mi-inst" + i + "'><div id='mi-inst" + i + "-num' class='mi-inst-num'>" + i * 4 + "</div><div id='mi-inst" + i + "-codop'>-</div></li>");
    }

    /********************************************************************************************************************/
    // FUNCIONES DE PROCEDIMIENTO
    // RELLENAR TABLA 
    rellenarTable(); // Rellena la tabla inicial (ver último apartado de funciones para los detalles -> línea 1368)

    // Inicializar el procedimiento:
    pasoApaso(contadorPasos);

    // FUNCIONES DE SIMULACIÓN
    $("#paso-anterior").attr("disabled", "disabled");
    $("#paso-anterior").css({
        backgroundColor: "black",
        opacity: "0.5"
    });

    // Reiniciar proceso
    $("#reiniciar").click(function () {

        cambiarVTPReiniciar(parseFloat($('#in-velocidad').val()));

        contadorPasos = 0;
        banderaPasosContinuos = false;
        console.log("- InicioDelPrograma -");
        console.log("Contador <- " + contadorPasos);
        pasoApaso(contadorPasos);

        $("#barra-pasos-estado").css({
            width: contadorPasos * 100 / 88 + "%",
            borderRadius: "0 100px 100px 0"
        });

        $("#reiniciar").css({
            backgroundColor: "cyan",
            opacity: "1"
        });
        setTimeout(function () {
            $("#reiniciar").css({
                backgroundColor: "darkcyan",
                opacity: "1"
            });
        }, 100);

        $("#paso-anterior").attr("disabled", "disabled");
        $("#paso-anterior").css({
            backgroundColor: "black",
            opacity: "0.5"
        });
        $("#paso-siguiente").removeAttr("disabled");
        $("#paso-siguiente").css({
            backgroundColor: "darkblue",
            opacity: "1"
        });
        $("#paso-continuo").removeAttr("disabled");
        $("#paso-continuo").css({
            backgroundColor: "darkred",
            opacity: "1",
            cursor: "pointer"
        });
    });

    // Un paso adelante
    $("#paso-siguiente").click(function () {
        contadorPasos++;
        if (contadorPasos >= 88) {
            contadorPasos = 88;
            console.log("Contador <- " + contadorPasos);
            pasoApaso(contadorPasos);
            console.log("- SimuladorFinalizado -");

            $("#barra-pasos-estado").css({
                width: contadorPasos * 100 / 88 + "%",
                borderRadius: "0"
            });

            // Evitar desbordamientos
            setTimeout(function () {
                $("#paso-continuo").attr("disabled", "disabled");
                $("#paso-continuo").css({
                    backgroundColor: "black",
                    opacity: "0.5"
                });
                $("#paso-siguiente").attr("disabled", "disabled");
                $("#paso-siguiente").css({
                    backgroundColor: "black",
                    opacity: "0.5"
                });
            }, 70);

            $("#paso-anterior").removeAttr("disabled");
            $("#paso-anterior").css({
                backgroundColor: "darkblue",
                opacity: "1"
            });
        } else if (contadorPasos >= 0 && contadorPasos < 88) {
            console.log("Contador <- " + contadorPasos);
            pasoApaso(contadorPasos);

            $("#barra-pasos-estado").css({
                width: contadorPasos * 100 / 88 + "%",
                borderRadius: "0 100px 100px 0"
            });

            $("#paso-siguiente").css({
                backgroundColor: "blue",
                opacity: "0.5"
            });

            // Animación de botón presionado
            setTimeout(function () {
                $("#paso-siguiente").css({
                    backgroundColor: "darkblue",
                    opacity: "1"
                });
            }, 50);

            $("#paso-anterior").removeAttr("disabled");
            $("#paso-anterior").css({
                backgroundColor: "darkblue",
                opacity: "1"
            });
        }
    });

    // Camino de datos automatizado
    $("#paso-continuo").click(function () {
        if (banderaPasosContinuos == false && contadorPasos >= 0 && contadorPasos < 88) {
            banderaPasosContinuos = true;
            console.log("Bandera <- " + banderaPasosContinuos);
            $("#paso-siguiente").attr("disabled", "disabled");
            $("#paso-anterior").attr("disabled", "disabled");
            $("#paso-continuo").css({
                backgroundColor: "red",
                opacity: "1",
                cursor: "not-allowed"
            });

            // Animación para bloquear botones síncrona
            setTimeout(function () {
                $("#paso-siguiente").css({
                    backgroundColor: "black",
                    opacity: "0.5"
                });
                $("#paso-anterior").css({
                    backgroundColor: "black",
                    opacity: "0.5"
                });
            }, 50);
            pasoContinuo();
        }
    });

    // Un paso atras
    $("#paso-anterior").click(function () {
        contadorPasos--;
        banderaPasosContinuos = false;
        if (contadorPasos <= 0) {
            contadorPasos = 0;
            console.log("- InicioDelPrograma -");
            console.log("Contador <- " + contadorPasos);
            pasoApaso(contadorPasos);

            $("#barra-pasos-estado").css({
                width: contadorPasos * 100 / 88 + "%",
                borderRadius: "0 100px 100px 0"
            });

            // Evitar desbordamientos
            setTimeout(function () {
                $("#paso-anterior").attr("disabled", "disabled");
                $("#paso-anterior").css({
                    backgroundColor: "black",
                    opacity: "0.5"
                });
            }, 70);

            $("#paso-siguiente").removeAttr("disabled");
            $("#paso-siguiente").css({
                backgroundColor: "darkblue",
                opacity: "1"
            });
            $("#paso-continuo").removeAttr("disabled");
            $("#paso-continuo").css({
                backgroundColor: "darkred",
                opacity: "1",
                cursor: "pointer"
            });
        } else if (contadorPasos > 0 && contadorPasos <= 88) {
            console.log("Contador <- " + contadorPasos);
            pasoApaso(contadorPasos);

            $("#barra-pasos-estado").css({
                width: contadorPasos * 100 / 88 + "%",
                borderRadius: "0 100px 100px 0"
            });

            $("#paso-anterior").css({
                backgroundColor: "blue",
                opacity: "0.5"
            });

            // Animación de botón presionado
            setTimeout(function () {
                $("#paso-anterior").css({
                    backgroundColor: "darkblue",
                    opacity: "1"
                });
            }, 50);

            $("#paso-siguiente").removeAttr("disabled");
            $("#paso-siguiente").css({
                backgroundColor: "darkblue",
                opacity: "1"
            });
            $("#paso-continuo").removeAttr("disabled");
            $("#paso-continuo").css({
                backgroundColor: "darkred",
                opacity: "1",
                cursor: "pointer"
            });
        }
    });

    // Función para controlar los pasos con el teclado
    $(document).keydown(function (tecla) {
        switch (tecla.which) {
            case 32:
                tecla.preventDefault();
                if (banderaPasosContinuos == false && contadorPasos < 88) {
                    $("#paso-continuo").click();
                }
                break;
            case 37:
                if (banderaPasosContinuos == false && contadorPasos > 0 && contadorPasos <= 88) {
                    tecla.preventDefault();
                    $("#paso-anterior").click();
                }
                break;
            case 39:
                if (banderaPasosContinuos == false && contadorPasos >= 0 && contadorPasos < 88) {
                    tecla.preventDefault();
                    $("#paso-siguiente").click();
                }
                break;
            case 82:
                tecla.preventDefault();
                $("#reiniciar").click();
                break;
        }
    });

    // Función para controlar los pasos con el ratón
    $("#barra-pasos").click(function (barraEstado) {
        var parentOffset = $(this).parent().offset();
        var barraX = barraEstado.pageX - parentOffset.left;
        var paso = barraX * 88 / $("#barra-pasos").width();
        contadorPasos = Math.round(parseFloat(paso));
        if (contadorPasos <= 0) {
            contadorPasos = 0;
            console.log("- InicioDelPrograma -");
            console.log("Contador <- " + contadorPasos);
            pasoApaso(contadorPasos);

            $("#barra-pasos-estado").css({
                width: contadorPasos * 100 / 88 + "%",
                borderRadius: "0 100px 100px 0"
            });

            if (banderaPasosContinuos == false) {
                $("#paso-anterior").attr("disabled", "disabled");
                $("#paso-anterior").css({
                    backgroundColor: "black",
                    opacity: "0.5"
                });
                $("#paso-continuo").removeAttr("disabled");
                $("#paso-continuo").css({
                    backgroundColor: "darkred",
                    opacity: "1",
                    cursor: "pointer"
                });
                $("#paso-siguiente").removeAttr("disabled");
                $("#paso-siguiente").css({
                    backgroundColor: "darkblue",
                    opacity: "1"
                });
            } else {
                $("#paso-anterior").attr("disabled", "disabled");
                $("#paso-anterior").css({
                    backgroundColor: "black",
                    opacity: "0.5"
                });
                $("#paso-siguiente").attr("disabled", "disabled");
                $("#paso-siguiente").css({
                    backgroundColor: "black",
                    opacity: "0.5"
                });
                $("#paso-continuo").removeAttr("disabled");
                $("#paso-continuo").css({
                    backgroundColor: "red",
                    opacity: "1",
                    cursor: "not-allowed"
                });
            }
        } else if (contadorPasos > 0 && contadorPasos < 88) {
            console.log("Contador <- " + contadorPasos);
            pasoApaso(contadorPasos);

            $("#barra-pasos-estado").css({
                width: contadorPasos * 100 / 88 + "%",
                borderRadius: "0 100px 100px 0"
            });

            if (banderaPasosContinuos == false) {
                $("#paso-anterior").removeAttr("disabled");
                $("#paso-anterior").css({
                    backgroundColor: "darkblue",
                    opacity: "1"
                });
                $("#paso-continuo").removeAttr("disabled");
                $("#paso-continuo").css({
                    backgroundColor: "darkred",
                    opacity: "1",
                    cursor: "pointer"
                });
                $("#paso-siguiente").removeAttr("disabled");
                $("#paso-siguiente").css({
                    backgroundColor: "darkblue",
                    opacity: "1"
                });
            } else {
                $("#paso-anterior").attr("disabled", "disabled");
                $("#paso-anterior").css({
                    backgroundColor: "black",
                    opacity: "0.5"
                });
                $("#paso-continuo").css({
                    backgroundColor: "red",
                    opacity: "1",
                    cursor: "not-allowed"
                });
                $("#paso-siguiente").attr("disabled", "disabled");
                $("#paso-siguiente").css({
                    backgroundColor: "black",
                    opacity: "0.5"
                });
            }
        } else if (contadorPasos >= 88) {
            contadorPasos = 88;
            banderaPasosContinuos = false;
            console.log("Contador <- " + contadorPasos);
            pasoApaso(contadorPasos);
            console.log("- SimuladorFinalizado -");

            $("#barra-pasos-estado").css({
                width: contadorPasos * 100 / 88 + "%",
                borderRadius: "0"
            });

            $("#paso-anterior").removeAttr("disabled");
            $("#paso-anterior").css({
                backgroundColor: "darkblue",
                opacity: "1"
            });
            $("#paso-continuo").attr("disabled", "disabled");
            $("#paso-continuo").css({
                backgroundColor: "black",
                opacity: "0.5"
            });
            $("#paso-siguiente").attr("disabled", "disabled");
            $("#paso-siguiente").css({
                backgroundColor: "black",
                opacity: "0.5"
            });
        }
    });

});

// Función para el camino de datos automatizado
var pasoContinuo = function () {

    if (banderaPasosContinuos == true && contadorPasos >= 0 && contadorPasos < 88) {
        console.log("Contador <- " + contadorPasos);
        pasoApaso(contadorPasos);

        $("#barra-pasos-estado").css({
            width: contadorPasos * 100 / 88 + "%",
            borderRadius: "0 100px 100px 0"
        });

        contadorPasos++;
        setTimeout(function () {
            pasoContinuo();
            return 0;
        }, tiempoPaso);
    } else if (banderaPasosContinuos == true && contadorPasos >= 88) {
        banderaPasosContinuos = false;

        $("#barra-pasos-estado").css({
            width: contadorPasos * 100 / 88 + "%",
            borderRadius: "0"
        });

        contadorPasos = 88;
        console.log("Contador <- " + contadorPasos);
        pasoApaso(contadorPasos);
        console.log("- SimuladorFinalizado -");

        $("#paso-siguiente").attr("disabled", "disabled");
        $("#paso-siguiente").css({
            backgroundColor: "black",
            opacity: "0.5"
        });
        $("#paso-continuo").attr("disabled", "disabled");
        $("#paso-continuo").css({
            backgroundColor: "black",
            opacity: "0.5"
        });
        $("#paso-anterior").removeAttr("disabled");
        $("#paso-anterior").css({
            backgroundColor: "darkblue",
            opacity: "1"
        });
        return 0;
    }
}

/********************************************************************************************************************/
// PASOS PARA LA SIMULACIÓN

// programCounter(pc);
// instructions(tipo, posicionInst, idBloque, numInstBloque);
// instructionFormat(tipo, op, rs, rt, rd, shamt, funct);
// registerFile(tipo, dirA, valA, dirB, valB, dirW, valW);
// arithmeticLogicUnit(tipo, valA, valB, operando, resultado);
function pasoApaso(numPaso) {

    instructions(0, 0, "main", 0);
    instructions(0, 1, "loop", 0);
    instructions(0, 2, "loop", 1);
    instructions(0, 3, "loop", 2);
    instructions(0, 4, "exit", 0);

    switch (numPaso) {
        /********************************************************************************************************************/
        // Primera Instrucción
        case 0:
            // NuevosCambios
            programCounter("---");

            for (var i = 0; i < $("#memoria-instrucciones ol li").length; i++) {
                instructions(1, i);
            }

            instructionFormat(4);
            registerFile(4);
            arithmeticLogicUnit(1);

            $(".punta").css({
                borderLeft: "black 15px solid",
                borderTop: "transparent 5px solid",
                borderBottom: "transparent 5px solid"
            });
            break;
        case 1:
            // FuncionesIguales
            programCounter("---");
            instructionFormat(4);
            registerFile(4);
            arithmeticLogicUnit(1);

            // Desactivaciones
            caminoDatosDiagrama(0, 1, 1);
            break;
        case 2:
            // NuevosCambios
            caminoDatosDiagrama(1, 1, 1);
            programCounter(0);

            instructionFormat(4);
            registerFile(4);
            arithmeticLogicUnit(1);

            // Desactivaciones
            caminoDatosDiagrama(0, 1, 4);
            break;
        case 3:
            // NuevosCambios
            caminoDatosDiagrama(1, 1, 4);
            instructionFormat(1, "001000", "00000", "01000", "00000", "00000", "000000");

            // FuncionesIguales
            registerFile(4);
            arithmeticLogicUnit(1);

            // Desactivaciones
            caminoDatosDiagrama(0, 1, 1);
            caminoDatosDiagrama(0, 2, 1);
            caminoDatosDiagrama(0, 2, 3);
            caminoDatosDiagrama(0, 2, 5);
            break;
        case 4:
            // NuevosCambios
            caminoDatosDiagrama(1, 2, 1);
            caminoDatosDiagrama(1, 2, 3);
            caminoDatosDiagrama(1, 2, 5);
            instructionFormat(3);
            registerFile(0, "$" + parseInt("0", 2), parseInt("0", 2), "---", "---", "$" + parseInt("01000", 2), "---");

            // FuncionesIguales
            arithmeticLogicUnit(1);

            // Desactivaciones
            caminoDatosDiagrama(0, 1, 4);
            caminoDatosDiagrama(0, 2, 7);
            caminoDatosDiagrama(0, 2, 8);
            break;
        case 5:
            // NuevosCambios
            caminoDatosDiagrama(1, 2, 7);
            caminoDatosDiagrama(1, 2, 8);
            registerFile(3, "$zero", "0", "---", "---", "$t0", "---");

            // FuncionesIguales
            arithmeticLogicUnit(1);

            // Desactivaciones
            caminoDatosDiagrama(0, 2, 1);
            caminoDatosDiagrama(0, 2, 3);
            caminoDatosDiagrama(0, 2, 5);
            caminoDatosDiagrama(0, 3, 2);
            caminoDatosDiagrama(0, 3, 4);
            caminoDatosDiagrama(0, 3, 6);
            caminoDatosDiagrama(0, 3, 7);
            break;
        case 6:
            // NuevosCambios
            caminoDatosDiagrama(1, 3, 2);
            caminoDatosDiagrama(1, 3, 4);
            caminoDatosDiagrama(1, 3, 6);
            caminoDatosDiagrama(1, 3, 7);
            arithmeticLogicUnit(0, "0", "0", "+", "0");

            // FuncionesIguales
            registerFile(3, "$zero", "0", "---", "---", "$t0", "---");

            // Desactivaciones
            caminoDatosDiagrama(0, 2, 7);
            caminoDatosDiagrama(0, 2, 8);
            caminoDatosDiagrama(0, 3, 10);
            caminoDatosDiagrama(0, 4, 6);
            caminoDatosDiagrama(0, 2, 4);
            break;
        case 7:
            // NuevosCambios
            caminoDatosDiagrama(1, 3, 10);
            caminoDatosDiagrama(1, 4, 6);
            caminoDatosDiagrama(1, 2, 4);
            registerFile(1, "$zero", "0", "---", "---", "$t0", "0");

            // Desactivaciones
            caminoDatosDiagrama(0, 3, 2);
            caminoDatosDiagrama(0, 3, 4);
            caminoDatosDiagrama(0, 3, 6);
            caminoDatosDiagrama(0, 3, 7);
            break;
        case 8:
            // NuevosCambios
            registerFile(2, "$zero", "0", "---", "---", "$t0", "0");

            // Desactivaciones
            programCounter(0);
            caminoDatosDiagrama(0, 3, 10);
            caminoDatosDiagrama(0, 4, 6);
            caminoDatosDiagrama(0, 2, 4);
            caminoDatosDiagrama(0, 1, 1);
            break;
            /********************************************************************************************************************/
            // Segunda Instrucción
        case 9:
            // NuevosCambios
            caminoDatosDiagrama(1, 1, 1);
            programCounter(1);
            instructionFormat(4);
            registerFile(3, "$zero", "0", "---", "---", "$t0", "0");

            // Desactivaciones
            caminoDatosDiagrama(0, 1, 4);
            break;
        case 10:
            // NuevosCambios
            caminoDatosDiagrama(1, 1, 4);
            instructionFormat(1, "000111", "01000", "01010", "00000", "00000", "000010");
            registerFile(4);

            // FuncionesIguales
            arithmeticLogicUnit(0, "0", "0", "+", "0");

            // Desactivaciones
            caminoDatosDiagrama(0, 1, 1);
            caminoDatosDiagrama(0, 2, 1);
            caminoDatosDiagrama(0, 2, 2);
            caminoDatosDiagrama(0, 2, 5);
            break;
        case 11:
            // NuevosCambios
            caminoDatosDiagrama(1, 2, 1);
            caminoDatosDiagrama(1, 2, 2);
            caminoDatosDiagrama(1, 2, 5);
            instructionFormat(3);
            registerFile(0, "$" + parseInt("01000", 2), parseInt("0", 2), "---", parseInt("01010", 2), "---", "---");
            arithmeticLogicUnit(1);

            // Desactivaciones
            caminoDatosDiagrama(0, 1, 4);
            caminoDatosDiagrama(0, 2, 7);
            caminoDatosDiagrama(0, 2, 8);
            break;
        case 12:
            // NuevosCambios
            caminoDatosDiagrama(1, 2, 7);
            caminoDatosDiagrama(1, 2, 8);
            registerFile(3, "$t0", "0", "---", "10", "---", "---");

            // FuncionesIguales
            arithmeticLogicUnit(1);

            // Desactivaciones
            caminoDatosDiagrama(0, 2, 1);
            caminoDatosDiagrama(0, 2, 2);
            caminoDatosDiagrama(0, 2, 5);
            caminoDatosDiagrama(0, 3, 2);
            caminoDatosDiagrama(0, 3, 3);
            caminoDatosDiagrama(0, 3, 5);
            caminoDatosDiagrama(0, 3, 6);
            caminoDatosDiagrama(0, 3, 7);
            break;
        case 13:
            // NuevosCambios
            caminoDatosDiagrama(1, 3, 2);
            caminoDatosDiagrama(1, 3, 3);
            caminoDatosDiagrama(1, 3, 5);
            caminoDatosDiagrama(1, 3, 6);
            caminoDatosDiagrama(1, 3, 7);
            arithmeticLogicUnit(0, "0", "10", ">", "false");

            //FuncionesIguales
            programCounter(1);
            instructionFormat(3);

            // Desactivaciones
            caminoDatosDiagrama(0, 2, 7);
            caminoDatosDiagrama(0, 2, 8);
            caminoDatosDiagrama(0, 1, 3);
            caminoDatosDiagrama(0, 2, 6);
            caminoDatosDiagrama(0, 3, 8);
            caminoDatosDiagrama(0, 4, 1);
            caminoDatosDiagrama(0, 1, 1);
            break;
            /********************************************************************************************************************/
            // Tercera Instrucción
        case 14:
            // NuevosCambios
            caminoDatosDiagrama(1, 1, 3);
            caminoDatosDiagrama(1, 2, 6);
            caminoDatosDiagrama(1, 3, 8);
            caminoDatosDiagrama(1, 4, 1);
            caminoDatosDiagrama(1, 1, 1);
            programCounter(2);
            instructionFormat(4);

            // Desactivaciones
            caminoDatosDiagrama(0, 1, 4);
            caminoDatosDiagrama(0, 3, 2);
            caminoDatosDiagrama(0, 3, 3);
            caminoDatosDiagrama(0, 3, 5);
            caminoDatosDiagrama(0, 3, 6);
            caminoDatosDiagrama(0, 3, 7);
            break;
        case 15:
            // NuevosCambios
            caminoDatosDiagrama(1, 1, 4);
            instructionFormat(1, "001000", "01000", "01000", "00000", "00000", "000001");
            registerFile(4);

            // FuncionesIguales
            arithmeticLogicUnit(0, "0", "10", ">", "false");

            // Desactivaciones
            caminoDatosDiagrama(0, 1, 3);
            caminoDatosDiagrama(0, 2, 1);
            caminoDatosDiagrama(0, 2, 3);
            caminoDatosDiagrama(0, 2, 5);
            caminoDatosDiagrama(0, 2, 6);
            caminoDatosDiagrama(0, 3, 8);
            caminoDatosDiagrama(0, 4, 1);
            caminoDatosDiagrama(0, 1, 1);
            break;
        case 16:
            // NuevosCambios
            caminoDatosDiagrama(1, 2, 1);
            caminoDatosDiagrama(1, 2, 3);
            caminoDatosDiagrama(1, 2, 5);
            instructionFormat(3);
            registerFile(0, "$" + parseInt("001000", 2), parseInt("0", 2), "---", "---", "$" + parseInt("01000", 2), "---");

            // FuncionesIguales
            arithmeticLogicUnit(1);

            // Desactivaciones
            caminoDatosDiagrama(0, 1, 4);
            caminoDatosDiagrama(0, 2, 7);
            caminoDatosDiagrama(0, 2, 8);
            break;
        case 17:
            // NuevosCambios
            caminoDatosDiagrama(1, 2, 7);
            caminoDatosDiagrama(1, 2, 8);
            registerFile(3, "$t0", "0", "---", "---", "$t0", "---");

            // FuncionesIguales
            arithmeticLogicUnit(1);

            // Desactivaciones
            caminoDatosDiagrama(0, 2, 1);
            caminoDatosDiagrama(0, 2, 3);
            caminoDatosDiagrama(0, 2, 5);
            caminoDatosDiagrama(0, 3, 2);
            caminoDatosDiagrama(0, 3, 4);
            caminoDatosDiagrama(0, 3, 6);
            caminoDatosDiagrama(0, 3, 7);
            break;
        case 18:
            // NuevosCambios
            caminoDatosDiagrama(1, 3, 2);
            caminoDatosDiagrama(1, 3, 4);
            caminoDatosDiagrama(1, 3, 6);
            caminoDatosDiagrama(1, 3, 7);
            arithmeticLogicUnit(0, "0", "1", "+", "1");

            // FuncionesIguales
            registerFile(3, "$t0", "0", "---", "---", "$t0", "---");

            // Desactivaciones
            caminoDatosDiagrama(0, 2, 7);
            caminoDatosDiagrama(0, 2, 8);
            caminoDatosDiagrama(0, 3, 10);
            caminoDatosDiagrama(0, 4, 6);
            caminoDatosDiagrama(0, 2, 4);
            break;
        case 19:
            // NuevosCambios
            caminoDatosDiagrama(1, 3, 10);
            caminoDatosDiagrama(1, 4, 6);
            caminoDatosDiagrama(1, 2, 4);
            registerFile(1, "$t0", "0", "---", "---", "$t0", "1");

            // Desactivaciones
            caminoDatosDiagrama(0, 3, 2);
            caminoDatosDiagrama(0, 3, 4);
            caminoDatosDiagrama(0, 3, 6);
            caminoDatosDiagrama(0, 3, 7);
            break;
        case 20:
            // NuevosCambios
            registerFile(2, "$t0", "0", "---", "---", "$t0", "1");

            // Desactivaciones
            programCounter(2);
            caminoDatosDiagrama(0, 3, 10);
            caminoDatosDiagrama(0, 4, 6);
            caminoDatosDiagrama(0, 2, 4);
            caminoDatosDiagrama(0, 1, 1);
            break;
            /********************************************************************************************************************/
            // Cuarta Instrucción (Salto Bucle)
        case 21:
            // NuevosCambios
            caminoDatosDiagrama(1, 1, 1);
            programCounter(3);
            instructionFormat(4);
            registerFile(3, "$t0", "0", "---", "---", "$t0", "1");

            // Desactivaciones
            caminoDatosDiagrama(0, 1, 4);
            caminoDatosDiagrama(0, 2, 5);
            caminoDatosDiagrama(0, 2, 8);
            caminoDatosDiagrama(0, 3, 5);
            caminoDatosDiagrama(0, 3, 9);
            caminoDatosDiagrama(0, 4, 1);
            caminoDatosDiagrama(0, 1, 3);
            caminoDatosDiagrama(0, 2, 6);
            caminoDatosDiagrama(0, 3, 8);
            break;
        case 22:
            // NuevosCambios
            caminoDatosDiagrama(1, 1, 3);
            caminoDatosDiagrama(1, 1, 4);
            caminoDatosDiagrama(1, 2, 5);
            caminoDatosDiagrama(1, 2, 6);
            caminoDatosDiagrama(1, 2, 8);
            caminoDatosDiagrama(1, 3, 5);
            caminoDatosDiagrama(1, 3, 8);
            caminoDatosDiagrama(1, 3, 9);
            caminoDatosDiagrama(1, 4, 1);
            programCounter(3);
            instructionFormat(2, "000010", "00000", "00000", "00000", "00000", "000001");
            registerFile(4);

            // FuncionesIguales
            arithmeticLogicUnit(0, "0", "1", "+", "1");

            // Desactivaciones
            caminoDatosDiagrama(0, 1, 1);
            break;
            /********************************************************************************************************************/
            // Segunda Instrucción (Repetición1)
            // En las repeticiones se agiliza el camino de datos para no redundar sobre el proceso y disminuir el uso de cases.
        case 23:
            bucleCaminoDatos(0, 1, 1);
            break;
        case 24:
            bucleCaminoDatos(0, 2, 1);
            break;
        case 25:
            bucleCaminoDatos(1, 1, 1);
            break;
        case 26:
            bucleCaminoDatos(1, 2, 1);
            break;
        case 27:
            bucleCaminoDatos(2, 1, 1);
            break;
        case 28:
            bucleCaminoDatos(2, 2, 1);
            break;
        case 29:
            bucleCaminoDatos(0, 1, 2);
            break;
        case 30:
            bucleCaminoDatos(0, 2, 2);
            break;
        case 31:
            bucleCaminoDatos(1, 1, 2);
            break;
        case 32:
            bucleCaminoDatos(1, 2, 2);
            break;
        case 33:
            bucleCaminoDatos(2, 1, 2);
            break;
        case 34:
            bucleCaminoDatos(2, 2, 2);
            break;
        case 35:
            bucleCaminoDatos(0, 1, 3);
            break;
        case 36:
            bucleCaminoDatos(0, 2, 3);
            break;
        case 37:
            bucleCaminoDatos(1, 1, 3);
            break;
        case 38:
            bucleCaminoDatos(1, 2, 3);
            break;
        case 39:
            bucleCaminoDatos(2, 1, 3);
            break;
        case 40:
            bucleCaminoDatos(2, 2, 3);
            break;
        case 41:
            bucleCaminoDatos(0, 1, 4);
            break;
        case 42:
            bucleCaminoDatos(0, 2, 4);
            break;
        case 43:
            bucleCaminoDatos(1, 1, 4);
            break;
        case 44:
            bucleCaminoDatos(1, 2, 4);
            break;
        case 45:
            bucleCaminoDatos(2, 1, 4);
            break;
        case 46:
            bucleCaminoDatos(2, 2, 4);
            break;
        case 47:
            bucleCaminoDatos(0, 1, 5);
            break;
        case 48:
            bucleCaminoDatos(0, 2, 5);
            break;
        case 49:
            bucleCaminoDatos(1, 1, 5);
            break;
        case 50:
            bucleCaminoDatos(1, 2, 5);
            break;
        case 51:
            bucleCaminoDatos(2, 1, 5);
            break;
        case 52:
            bucleCaminoDatos(2, 2, 5);
            break;
        case 53:
            bucleCaminoDatos(0, 1, 6);
            break;
        case 54:
            bucleCaminoDatos(0, 2, 6);
            break;
        case 55:
            bucleCaminoDatos(1, 1, 6);
            break;
        case 56:
            bucleCaminoDatos(1, 2, 6);
            break;
        case 57:
            bucleCaminoDatos(2, 1, 6);
            break;
        case 58:
            bucleCaminoDatos(2, 2, 6);
            break;
        case 59:
            bucleCaminoDatos(0, 1, 7);
            break;
        case 60:
            bucleCaminoDatos(0, 2, 7);
            break;
        case 61:
            bucleCaminoDatos(1, 1, 7);
            break;
        case 62:
            bucleCaminoDatos(1, 2, 7);
            break;
        case 63:
            bucleCaminoDatos(2, 1, 7);
            break;
        case 64:
            bucleCaminoDatos(2, 2, 7);
            break;
        case 65:
            bucleCaminoDatos(0, 1, 8);
            break;
        case 66:
            bucleCaminoDatos(0, 2, 8);
            break;
        case 67:
            bucleCaminoDatos(1, 1, 8);
            break;
        case 68:
            bucleCaminoDatos(1, 2, 8);
            break;
        case 69:
            bucleCaminoDatos(2, 1, 8);
            break;
        case 70:
            bucleCaminoDatos(2, 2, 8);
            break;
        case 71:
            bucleCaminoDatos(0, 1, 9);
            break;
        case 72:
            bucleCaminoDatos(0, 2, 9);
            break;
        case 73:
            bucleCaminoDatos(1, 1, 9);
            break;
        case 74:
            bucleCaminoDatos(1, 2, 9);
            break;
        case 75:
            bucleCaminoDatos(2, 1, 9);
            break;
        case 76:
            bucleCaminoDatos(2, 2, 9);
            break;
        case 77:
            bucleCaminoDatos(0, 1, 10);
            break;
        case 78:
            bucleCaminoDatos(0, 2, 10);
            break;
        case 79:
            bucleCaminoDatos(1, 1, 10);
            break;
        case 80:
            bucleCaminoDatos(1, 2, 10);
            break;
        case 81:
            bucleCaminoDatos(2, 1, 10);
            break;
        case 82:
            bucleCaminoDatos(2, 2, 10);
            break;
            /********************************************************************************************************************/
            // Segunda Instrucción (RepeticiónFinal)
        case 83:
            bucleCaminoDatos(0, 1, 11);
            break;
        case 84:
            caminoDatosDiagrama(1, 1, 4);
            caminoDatosDiagrama(1, 2, 1);
            caminoDatosDiagrama(1, 2, 2);
            caminoDatosDiagrama(1, 2, 5);
            caminoDatosDiagrama(1, 2, 7);
            caminoDatosDiagrama(1, 2, 8);
            caminoDatosDiagrama(1, 3, 2);
            caminoDatosDiagrama(1, 3, 3);
            caminoDatosDiagrama(1, 3, 5);
            caminoDatosDiagrama(1, 3, 6);
            caminoDatosDiagrama(1, 3, 7);
            programCounter(1);
            instructionFormat(1, "000111", "01000", "01010", "00000", "00000", "000010");
            registerFile(0, "$t0", "11", "---", "10", "---", "---");
            arithmeticLogicUnit(0, "11", "10", ">", "true");

            // Desactivaciones           
            caminoDatosDiagrama(0, 3, 11);
            caminoDatosDiagrama(0, 4, 2);
            caminoDatosDiagrama(0, 1, 1);
            caminoDatosDiagrama(0, 1, 3);
            caminoDatosDiagrama(0, 2, 6);
            caminoDatosDiagrama(0, 3, 8);
            caminoDatosDiagrama(0, 4, 1);
            caminoDatosDiagrama(0, 1, 1);
            caminoDatosDiagrama(0, 3, 9);
            caminoDatosDiagrama(0, 3, 10);
            break;
        case 85:
            caminoDatosDiagrama(1, 1, 3);
            caminoDatosDiagrama(1, 2, 6);
            caminoDatosDiagrama(1, 3, 9);
            caminoDatosDiagrama(1, 3, 8);
            caminoDatosDiagrama(1, 3, 10);
            programCounter(1);
            instructionFormat(3, "000111", "01000", "01010", "00000", "00000", "000010");
            registerFile(3, "$t0", "11", "---", "10", "---", "---");
            arithmeticLogicUnit(0, "11", "10", ">", "true");

            // Desactivaciones
            caminoDatosDiagrama(0, 1, 4);
            caminoDatosDiagrama(0, 2, 1);
            caminoDatosDiagrama(0, 2, 2);
            caminoDatosDiagrama(0, 2, 5);
            caminoDatosDiagrama(0, 2, 7);
            caminoDatosDiagrama(0, 2, 8);
            caminoDatosDiagrama(0, 3, 2);
            caminoDatosDiagrama(0, 3, 3);
            caminoDatosDiagrama(0, 3, 5);
            caminoDatosDiagrama(0, 3, 6);
            caminoDatosDiagrama(0, 3, 7);
            caminoDatosDiagrama(0, 4, 1);
            break;
        case 86:
            caminoDatosDiagrama(1, 4, 1);
            programCounter(1);
            instructionFormat(3, "000111", "01000", "01010", "00000", "00000", "000010");
            registerFile(3, "$t0", "11", "---", "10", "---", "---");
            arithmeticLogicUnit(0, "11", "10", ">", "true");
            $("#alu-resultado").css({
                backgroundColor: "lawngreen"
            });

            // Desactivaciones
            caminoDatosDiagrama(0, 1, 3);
            caminoDatosDiagrama(0, 2, 6);
            caminoDatosDiagrama(0, 3, 9);
            caminoDatosDiagrama(0, 3, 8);
            caminoDatosDiagrama(0, 3, 10);
            caminoDatosDiagrama(0, 1, 1);
            break;
        case 87:
            caminoDatosDiagrama(1, 1, 1);
            programCounter(4);
            instructionFormat(1, "000111", "01000", "01010", "00000", "00000", "000010");
            instructionFormat(3, "000111", "01000", "01010", "00000", "00000", "000010");
            registerFile(3, "$t0", "11", "---", "10", "---", "---");
            arithmeticLogicUnit(0, "11", "10", ">", "true");
            break;
        case 88:
            // NuevosCambios
            programCounter("---");

            for (var i = 0; i < $("#memoria-instrucciones ol li").length; i++) {
                instructions(1, i);
            }

            instructionFormat(4);
            registerFile(4);
            arithmeticLogicUnit(1);

            // Desactivaciones
            caminoDatosDiagrama(0, 4, 1);
            caminoDatosDiagrama(0, 1, 1);
            break;
        default:
            console.log("- IndexOutOfBoundsException -");
            break;
    }
    return 0;
}

// Función para agilizar el camino de datos y disminuir el uso de cases.
function bucleCaminoDatos(instruccion, mitad, valorDato) {

    switch (instruccion) {
        /********************************************************************************************************************/
        // Segunda Instrucción (Repetición1)
        case 0:
            if (mitad == 1) {
                // NuevosCambios
                caminoDatosDiagrama(1, 1, 1);
                programCounter(1);
                instructionFormat(4);
                registerFile(4);
                arithmeticLogicUnit(1);

                // Desactivaciones
                caminoDatosDiagrama(0, 1, 3);
                caminoDatosDiagrama(0, 1, 4);
                caminoDatosDiagrama(0, 2, 1);
                caminoDatosDiagrama(0, 2, 2);
                caminoDatosDiagrama(0, 2, 5);
                caminoDatosDiagrama(0, 2, 6);
                caminoDatosDiagrama(0, 2, 7);
                caminoDatosDiagrama(0, 2, 8);
                caminoDatosDiagrama(0, 3, 2);
                caminoDatosDiagrama(0, 3, 3);
                caminoDatosDiagrama(0, 3, 5);
                caminoDatosDiagrama(0, 3, 6);
                caminoDatosDiagrama(0, 3, 7);
                caminoDatosDiagrama(0, 3, 8);
                caminoDatosDiagrama(0, 3, 9);
                caminoDatosDiagrama(0, 4, 1);
            } else if (mitad == 2) {
                caminoDatosDiagrama(1, 1, 4);
                caminoDatosDiagrama(1, 2, 1);
                caminoDatosDiagrama(1, 2, 2);
                caminoDatosDiagrama(1, 2, 5);
                caminoDatosDiagrama(1, 2, 7);
                caminoDatosDiagrama(1, 2, 8);
                caminoDatosDiagrama(1, 3, 2);
                caminoDatosDiagrama(1, 3, 3);
                caminoDatosDiagrama(1, 3, 5);
                caminoDatosDiagrama(1, 3, 6);
                caminoDatosDiagrama(1, 3, 7);
                programCounter(1);
                instructionFormat(1, "000111", "01000", "01010", "00000", "00000", "000010");
                registerFile(0, "$t0", valorDato, "---", "10", "---", "---");
                arithmeticLogicUnit(0, valorDato, "10", ">", "false");

                // Desactivaciones           
                caminoDatosDiagrama(0, 3, 11);
                caminoDatosDiagrama(0, 4, 2);
                caminoDatosDiagrama(0, 1, 1);
                caminoDatosDiagrama(0, 1, 3);
                caminoDatosDiagrama(0, 2, 6);
                caminoDatosDiagrama(0, 3, 8);
                caminoDatosDiagrama(0, 4, 1);
                caminoDatosDiagrama(0, 1, 1);
            }
            break;
            /********************************************************************************************************************/
            // Tercera Instrucción (Repetición1)
        case 1:
            if (mitad == 1) {
                // NuevosCambios
                caminoDatosDiagrama(1, 1, 3);
                caminoDatosDiagrama(1, 2, 6);
                caminoDatosDiagrama(1, 3, 8);
                caminoDatosDiagrama(1, 4, 1);
                caminoDatosDiagrama(1, 1, 1);
                programCounter(2);
                instructionFormat(4);
                registerFile(4);
                arithmeticLogicUnit(1);

                // Desactivaciones
                caminoDatosDiagrama(0, 1, 4);
                caminoDatosDiagrama(0, 2, 1);
                caminoDatosDiagrama(0, 2, 2);
                caminoDatosDiagrama(0, 2, 3);
                caminoDatosDiagrama(0, 2, 5);
                caminoDatosDiagrama(0, 2, 7);
                caminoDatosDiagrama(0, 2, 8);
                caminoDatosDiagrama(0, 3, 2);
                caminoDatosDiagrama(0, 3, 3);
                caminoDatosDiagrama(0, 3, 4);
                caminoDatosDiagrama(0, 3, 5);
                caminoDatosDiagrama(0, 3, 6);
                caminoDatosDiagrama(0, 3, 7);
                caminoDatosDiagrama(0, 3, 10);
                caminoDatosDiagrama(0, 4, 6);
                caminoDatosDiagrama(0, 2, 4);
                caminoDatosDiagrama(0, 3, 11);
                caminoDatosDiagrama(0, 4, 2);
            } else if (mitad == 2) {

                // NuevosCambios
                caminoDatosDiagrama(1, 1, 4);
                caminoDatosDiagrama(1, 2, 1);
                caminoDatosDiagrama(1, 2, 3);
                caminoDatosDiagrama(1, 2, 5);
                caminoDatosDiagrama(1, 2, 7);
                caminoDatosDiagrama(1, 2, 8);
                caminoDatosDiagrama(1, 3, 2);
                caminoDatosDiagrama(1, 3, 4);
                caminoDatosDiagrama(1, 3, 6);
                caminoDatosDiagrama(1, 3, 7);
                caminoDatosDiagrama(1, 3, 10);
                caminoDatosDiagrama(1, 4, 6);
                caminoDatosDiagrama(1, 2, 4);
                programCounter(2);
                instructionFormat(1, "001000", "01000", "01000", "00000", "00000", "000001");
                registerFile(0, "$t0", valorDato, "---", "---", "$t0", valorDato + 1);
                registerFile(2, "$t0", valorDato, "---", "---", "$t0", valorDato + 1);
                arithmeticLogicUnit(0, valorDato, "1", "+", valorDato + 1);

                // Desactivaciones
                caminoDatosDiagrama(0, 1, 3);
                caminoDatosDiagrama(0, 2, 6);
                caminoDatosDiagrama(0, 3, 8);
                caminoDatosDiagrama(0, 4, 1);
                caminoDatosDiagrama(0, 1, 1);
            }
            break;
            /********************************************************************************************************************/
            // Cuarta Instrucción (Repetición1)
        case 2:
            if (mitad == 1) {
                // NuevosCambios
                caminoDatosDiagrama(1, 1, 1);
                programCounter(3);
                instructionFormat(4);
                registerFile(4);
                arithmeticLogicUnit(1);

                // Desactivaciones
                caminoDatosDiagrama(0, 1, 4);
                caminoDatosDiagrama(0, 1, 3);
                caminoDatosDiagrama(0, 2, 1);
                caminoDatosDiagrama(0, 2, 3);
                caminoDatosDiagrama(0, 2, 5);
                caminoDatosDiagrama(0, 2, 6);
                caminoDatosDiagrama(0, 2, 7);
                caminoDatosDiagrama(0, 2, 8);
                caminoDatosDiagrama(0, 3, 2);
                caminoDatosDiagrama(0, 3, 4);
                caminoDatosDiagrama(0, 3, 5);
                caminoDatosDiagrama(0, 3, 6);
                caminoDatosDiagrama(0, 3, 7);
                caminoDatosDiagrama(0, 3, 8);
                caminoDatosDiagrama(0, 3, 9);
                caminoDatosDiagrama(0, 3, 10);
                caminoDatosDiagrama(0, 4, 1);
                caminoDatosDiagrama(0, 4, 6);
                caminoDatosDiagrama(0, 2, 4);
            } else if (mitad == 2) {
                // NuevosCambios
                caminoDatosDiagrama(1, 1, 4);
                caminoDatosDiagrama(1, 2, 5);
                caminoDatosDiagrama(1, 2, 8);
                caminoDatosDiagrama(1, 3, 5);
                caminoDatosDiagrama(1, 3, 9);
                caminoDatosDiagrama(1, 4, 1);
                caminoDatosDiagrama(1, 1, 3);
                caminoDatosDiagrama(1, 2, 6);
                caminoDatosDiagrama(1, 3, 8);

                programCounter(3);
                instructionFormat(2, "000010", "00000", "00000", "00000", "00000", "000001");
                registerFile(4);
                arithmeticLogicUnit(1);

                // Desactivaciones
                caminoDatosDiagrama(0, 1, 1);
            }
            break;
        default:
            console.log("- bucleIndexOutOfBoundsException -");
            break;
    }

}

/********************************************************************************************************************/
// FUNCIONES PARA EL CAMINO DE DATOS

// TIPO
// 0 = apagado
// 1 = encendido
function caminoDatosDiagrama(tipo, etapa, numPunta) {

    switch (tipo) {
        case 0:
            $("#punta" + numPunta + "-e" + etapa).css({
                borderLeft: "black 15px solid",
                borderTop: "transparent 5px solid",
                borderBottom: "transparent 5px solid"
            });
            break;
        case 1:
            $("#punta" + numPunta + "-e" + etapa).css({
                borderLeft: "lawngreen 15px solid",
                borderTop: "transparent 5px solid",
                borderBottom: "transparent 5px solid"
            });
            break;
        default:
            console.log("- Desconocido Instructions -");
            break;
    }

}

function programCounter(pc) {

    $("#pc-contador").text($("#mi-inst" + pc + "-num").text());
    if (typeof (pc) === "string") {
        $("#pc-contador").text(pc);
    }
    for (var i = 0; i < $("#memoria-instrucciones ol li").length; i++) {
        $("#mi-inst" + i).css({
            backgroundColor: "white"
        });
    }
    $("#mi-inst" + pc).css({
        backgroundColor: "lawngreen"
    });

}

// TIPO
// 0 = ingreso
// 1 = vaciar
function instructions(tipo, posicionInst, idBloque, numInstBloque) {

    switch (tipo) {
        case 0:
            $("#mi-inst" + posicionInst + "-codop").text($("#" + idBloque + "-inst" + numInstBloque + "-op").text() + " " + $("#" + idBloque + "-inst" + numInstBloque + "-destino").text() + " " + $("#" + idBloque + "-inst" + numInstBloque + "-src1").text() + " " + $("#" + idBloque + "-inst" + numInstBloque + "-src2").text());
            break;
        case 1:
            $("#mi-inst" + posicionInst + "-codop").text("-");
            break;
        default:
            console.log("- Desconocido Instructions -");
            break;
    }

}

// TIPO
// 0 = r
// 1 = i
// 2 = j
// 3 = detener estado
// 4 = vaciar
function instructionFormat(tipo, op, rs, rt, rd, shamt, funct) {

    switch (tipo) {
        case 0:
            $("#tipo-inst-r").css({
                backgroundColor: "lawngreen"
            });
            $("#tipo-inst-i").css({
                backgroundColor: "white"
            });
            $("#tipo-inst-j").css({
                backgroundColor: "white"
            });
            $("#if-r-op").text(op);
            $("#if-r-rs").text(rs);
            $("#if-r-rt").text(rt);
            $("#if-r-rd").text(rd);
            $("#if-r-shamt").text(shamt);
            $("#if-r-funct").text(funct);
            $("#if-i-op").text("---");
            $("#if-i-rs").text("---");
            $("#if-i-rt").text("---");
            $("#if-i-const").text("---");
            $("#if-j-op").text("---");
            $("#if-j-dir").text("---");
            break;
        case 1:
            $("#tipo-inst-r").css({
                backgroundColor: "white"
            });
            $("#tipo-inst-i").css({
                backgroundColor: "lawngreen"
            });
            $("#tipo-inst-j").css({
                backgroundColor: "white"
            });
            $("#if-r-op").text("---");
            $("#if-r-rs").text("---");
            $("#if-r-rt").text("---");
            $("#if-r-rd").text("---");
            $("#if-r-shamt").text("---");
            $("#if-r-funct").text("---");
            $("#if-i-op").text(op);
            $("#if-i-rs").text(rs);
            $("#if-i-rt").text(rt);
            $("#if-i-const").text(rd + shamt + funct);
            $("#if-j-op").text("---");
            $("#if-j-dir").text("---");
            break;
        case 2:
            $("#tipo-inst-r").css({
                backgroundColor: "white"
            });
            $("#tipo-inst-i").css({
                backgroundColor: "white"
            });
            $("#tipo-inst-j").css({
                backgroundColor: "lawngreen"
            });
            $("#if-r-op").text("---");
            $("#if-r-rs").text("---");
            $("#if-r-rt").text("---");
            $("#if-r-rd").text("---");
            $("#if-r-shamt").text("---");
            $("#if-r-funct").text("---");
            $("#if-i-op").text("---");
            $("#if-i-rs").text("---");
            $("#if-i-rt").text("---");
            $("#if-i-const").text("---");
            $("#if-j-op").text("---");
            $("#if-j-dir").text("---");
            $("#if-j-op").text(op);
            $("#if-j-dir").text(rs + rt + rd + shamt + funct);
            break;
        case 3:
            $("#tipo-inst-r").css({
                backgroundColor: "white"
            });
            $("#tipo-inst-i").css({
                backgroundColor: "white"
            });
            $("#tipo-inst-j").css({
                backgroundColor: "white"
            });
            break;
        case 4:
            $("#tipo-inst-r").css({
                backgroundColor: "white"
            });
            $("#tipo-inst-i").css({
                backgroundColor: "white"
            });
            $("#tipo-inst-j").css({
                backgroundColor: "white"
            });
            $("#if-r-op").text("---");
            $("#if-r-rs").text("---");
            $("#if-r-rt").text("---");
            $("#if-r-rd").text("---");
            $("#if-r-shamt").text("---");
            $("#if-r-funct").text("---");
            $("#if-i-op").text("---");
            $("#if-i-rs").text("---");
            $("#if-i-rt").text("---");
            $("#if-i-const").text("---");
            $("#if-j-op").text("---");
            $("#if-j-dir").text("---");
            break;
        default:
            console.log("- Desconocido InstructionFormat -");
            break;
    }

}

// TIPO
// 0 = lectura
// 1 = lectura de write-value
// 2 = escritura
// 3 = detener estados
// 4 = vaciar
function registerFile(tipo, dirA, valA, dirB, valB, dirW, valW) {

    switch (tipo) {
        case 0:
            $(".rf-entrada-estado, #rf-writeD-estado").css({
                backgroundColor: "royalblue"
            });
            $("#rf-writeV-estado").css({
                backgroundColor: "white"
            });
            $("#rf-readA-dir").text(dirA);
            $("#rf-readA-value").text(valA);
            $("#rf-readB-dir").text(dirB);
            $("#rf-readB-value").text(valB);
            $("#rf-write-dir").text(dirW);
            $("#rf-write-value").text(valW);
            break;
        case 1:
            $(".rf-entrada-estado, #rf-writeD-estado").css({
                backgroundColor: "white"
            });
            $("#rf-writeV-estado").css({
                backgroundColor: "royalblue"
            });
            $("#rf-write-value").text(valW);
            break;
        case 2:
            $(".rf-salida-estado").css({
                backgroundColor: "darkred"
            });
            break;
        case 3:
            $(".rf-entrada-estado, .rf-salida-estado").css({
                backgroundColor: "white"
            });
            $("#rf-readA-dir").text(dirA);
            $("#rf-readA-value").text(valA);
            $("#rf-readB-dir").text(dirB);
            $("#rf-readB-value").text(valB);
            $("#rf-write-dir").text(dirW);
            $("#rf-write-value").text(valW);
            break;
        case 4:
            $(".rf-entrada-estado, .rf-salida-estado").css({
                backgroundColor: "white"
            });
            $("#rf-readA-dir").text("---");
            $("#rf-readA-value").text("---");
            $("#rf-readB-dir").text("---");
            $("#rf-readB-value").text("---");
            $("#rf-write-dir").text("---");
            $("#rf-write-value").text("---");
            break;
        default:
            console.log("- Desconocido RegisterFile -");
            break;
    }

}

// TIPO
// 0 = operar
// 1 = reiniciado
function arithmeticLogicUnit(tipo, valA, valB, operando, resultado) {

    switch (tipo) {
        case 0:
            $("#alu-valueA").text(valA);
            $("#alu-valueB").text(valB);
            $("#alu-operando").text(operando);
            $("#alu-resultado").text(resultado);
            $("#alu-resultado").css({
                backgroundColor: "royalblue"
            });
            break;
        case 1:
            $("#alu-valueA").text("---");
            $("#alu-valueB").text("---");
            $("#alu-operando").text("");
            $("#alu-resultado").text("---");
            $("#alu-resultado").css({
                backgroundColor: "white"
            });
            break;
        default:
            console.log("- Desconocido ArithmeticLogicUnit -");
            break;
    }

}

/********************************************************************************************************************/
// RELLENAR TABLE
function rellenarTable() {
    // crearTableBloque(nombreBloque, numInstrucciones);
    // TIPO
    // 0 = todos los campos
    // 1 = 3 campos
    // 2 = 2 campos
    // completarTableInstDesc(tipo, index, nombreBloque, codop, destino, src1, src2, descripcion);
    crearTableBloque("main", 1);
    crearTableBloque("loop", 3);
    crearTableBloque("exit", 1);
    completarTableID(0, 0, "main", "addi", "$t0", "$zero", 0, "# $t0 = 0");
    completarTableID(0, 0, "loop", "bgt", "$t0", "10", "exit", "# Si $t0 > 10 entonces >- salto al bloque -> exit:");
    completarTableID(0, 1, "loop", "addi", "$t0", "$t0", "1", "# $t0 <- $t0 + 1");
    completarTableID(2, 2, "loop", "j", "loop", "", "", "# Salto al bloque loop:");
    completarTableID(2, 0, "exit", "Fin", "Programa", "", "", "# Final del programa");
}

// crearTableBloque(nombreBloque, numInstrucciones);
function crearTableBloque(nombreBloque, numInstrucciones) {

    $("#cl-table").append("<tr id='" +
        nombreBloque + "'>" +
        "<td class='bloque'>" + nombreBloque + "</td>" +
        "<td class='instrucciones'>" +
        "<table id='" + nombreBloque + "-inst'></table>" +
        "</td>" +
        "<td class='descripcion'>" +
        "<table id='" + nombreBloque + "-desc'></table>" +
        "</td>" +
        "</tr>"
    );

    for (var i = 0; i < numInstrucciones; i++) {
        $("#" + nombreBloque + "-inst").append("<tr id='" + nombreBloque + "-inst" + i + "'><td id='" + nombreBloque + "-inst" + i + "-op'></td><td  id='" + nombreBloque + "-inst" + i + "-destino'></td><td  id='" + nombreBloque + "-inst" + i + "-src1'></td><td  id='" + nombreBloque + "-inst" + i + "-src2'></td></tr>");
        $("#" + nombreBloque + "-desc").append("<tr><td id='" + nombreBloque + "-desc" + i + "'></td></tr>");
    }

}

// completarTableInstDesc(tipo, index, nombreBloque, codop, destino, src1, src2, descripcion);
function completarTableID(tipo, index, nombreBloque, codop, destino, src1, src2, descripcion) {

    switch (tipo) {
        case 0:
            $("#" + nombreBloque + "-inst" + index + "-op").text(codop);
            $("#" + nombreBloque + "-inst" + index + "-destino").text(destino);
            $("#" + nombreBloque + "-inst" + index + "-src1").text(src1);
            $("#" + nombreBloque + "-inst" + index + "-src2").text(src2);
            $("#" + nombreBloque + "-desc" + index).text(descripcion);

            break;
        case 1:
            $("#" + nombreBloque + "-inst" + index + "-op").text(codop);
            $("#" + nombreBloque + "-inst" + index + "-destino").text(destino);
            $("#" + nombreBloque + "-inst" + index + "-src1").text(src1);
            $("#" + nombreBloque + "-inst" + index + "-src2").text();
            $("#" + nombreBloque + "-desc" + index).text(descripcion);
            break;
        case 2:
            $("#" + nombreBloque + "-inst" + index + "-op").text(codop);
            $("#" + nombreBloque + "-inst" + index + "-destino").text(destino);
            $("#" + nombreBloque + "-inst" + index + "-src1").text();
            $("#" + nombreBloque + "-inst" + index + "-src2").text();
            $("#" + nombreBloque + "-desc" + index).text(descripcion);
            break;
        default:
            console.log("- Desconocido completarTable -");
            break;
    }

}
