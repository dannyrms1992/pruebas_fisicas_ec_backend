'use strict';
function tiempoASegundos(tiempo) {
    const [horas, minutos, segundos] = tiempo.split(':').map(Number);
    return horas * 3600 + minutos * 60 + segundos;
}

// Función para convertir segundos a tiempo
function segundosATiempo(segundos) {
    const horas = Math.floor(segundos / 3600);
    segundos %= 3600;
    const minutos = Math.floor(segundos / 60);
    segundos %= 60;
    return `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
}
function parseFecha(fechasG) {
    var fechas = fechasG.map((value, index) => {
        return Date.parse(value);
    });

    if (fechas.length === 1) {
        // Si solo hay una fecha, obtener inicio y fin del día
        var fechaPrincipal = new Date(fechas[0]);

        // Obtener inicio del día
        var inicioDia = new Date(fechaPrincipal);
        inicioDia.setHours(0, 0, 0, 0);

        // Obtener fin del día
        var finDia = new Date(fechaPrincipal);
        finDia.setHours(23, 59, 59, 999);

        fechas = [
            inicioDia.toISOString(),
            finDia.toISOString()
        ];
    } else if (fechas.length === 2) {
        // Si hay dos fechas, ajustarlas al inicio y al final del mismo día
        var inicioDiaPrimeraFecha = new Date(fechas[0]);
        inicioDiaPrimeraFecha.setHours(0, 0, 0, 0);

        var finDiaSegundaFecha = new Date(fechas[1]);
        finDiaSegundaFecha.setHours(23, 59, 59, 999);

        fechas = [
            inicioDiaPrimeraFecha.toISOString(),
            finDiaSegundaFecha.toISOString()
        ];
    }
    return fechas;
}
function generateNumbersGeneral(data, type) {
    let entrenamientovalue = 0;
    let pruebasValue = 0;

    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        // @ts-ignore
        for (let i = 0; i < element.dataActividad.length; i++) {
            const item = element.dataActividad[i];
            if (item.type === "mobile") {
                if (item.data.type === "ENTRENAMIENTO") {
                    switch (type) {
                        case "distancia":
                            entrenamientovalue += Number.parseFloat(item.data.distance.split(" ")[0]);
                            break;
                        case "calorias":
                            entrenamientovalue += Number.parseFloat(item.data.calories.split(" ")[0]);
                            break;
                        case "historico":
                            entrenamientovalue += 1;
                            break;
                        default:
                            break;
                    }

                } else {
                    switch (type) {
                        case "distancia":
                            pruebasValue += Number.parseFloat(item.data.distance.split(" ")[0]);
                            break;
                        case "calorias":
                            pruebasValue += Number.parseFloat(item.data.calories.split(" ")[0]);
                            break;
                        case "historico":
                            pruebasValue += 1;
                            break;
                        default:
                            break;
                    }

                }
            }
        }
    }
    const maximo = Math.max(entrenamientovalue, pruebasValue);
    const minimo = Math.min(entrenamientovalue, pruebasValue);
    return {
        entrenamiento: entrenamientovalue,
        pruebas: pruebasValue,
        max: maximo == minimo ? maximo + 20 : maximo,
        min: minimo
    };
}
function generateNumbersTest(data, type) {
    let mediaTiempoCompletoT = 0;
    let mediaMinutosAdicionalesT = 0;
    let cantidadElementos = 0;

    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        // @ts-ignore
        for (let i = 0; i < element.dataActividad.length; i++) {
            const item = element.dataActividad[i];
            if (item.type === "mobile") {
                if (item.data.type !== "ENTRENAMIENTO") {
                    cantidadElementos += 1;
                    const tiempoAdicional = item.data.adicional;
                    const tiempoNormal = item.data.time;

                    if (tiempoAdicional && typeof tiempoAdicional === 'string' && /^\d{2}:\d{2}:\d{2}$/.test(tiempoAdicional)) {
                        const [horas, minutos, segundos] = tiempoAdicional.split(':').map(Number);
                        const tiempoEnSegundos = horas * 3600 + minutos * 60 + segundos;
                        mediaMinutosAdicionalesT += tiempoEnSegundos;
                    }
                    if (tiempoNormal && typeof tiempoNormal === 'string' && /^\d{2}:\d{2}:\d{2}$/.test(tiempoNormal)) {
                        const [horas, minutos, segundos] = tiempoNormal.split(':').map(Number);
                        const tiempoEnSegundos = horas * 3600 + minutos * 60 + segundos;
                        mediaTiempoCompletoT += tiempoEnSegundos;
                    }
                    cantidadElementos += 1;

                }
            }
        }
    }
    const mediaTiempoCompleto = mediaTiempoCompletoT / cantidadElementos;
    const mediaMinutosAdicionales = mediaMinutosAdicionalesT / cantidadElementos;
    const maximo = Math.max(mediaTiempoCompleto, mediaMinutosAdicionales);
    const minimo = Math.min(mediaTiempoCompleto, mediaMinutosAdicionales);
    return {
        mediaTiempoCompleto: mediaTiempoCompleto,
        mediaTiempoAdicional: mediaMinutosAdicionales,
        max: maximo == minimo ? maximo + 20 : maximo,
        min: minimo
    };
}
function convertirAMilisegundos(tiempo) {
    const partes = tiempo.split(':');
    const horas = parseInt(partes[0], 10);
    const minutos = parseInt(partes[1], 10);
    const segundos = parseInt(partes[2], 10);
    return (horas * 3600000) + (minutos * 60000) + (segundos * 1000);
  }
module.exports = {

    generateReportByUser: async (type, fechasG, idUsuario) => {
        var fechas = parseFecha(fechasG);
        try {
            const data = await strapi.entityService.findMany('api::publicacion.publicacion', {
                fields: ["Fecha", "dataActividad"],
                filters: {
                    users_permissions_user: {
                        id: idUsuario
                    },
                    Fecha: {
                        $between: fechas,
                    }
                },
                limit: 1000
            });
            switch (type) {
                case "distancia":
                    return generateNumbersGeneral(data, type);
                case "calorias":
                    return generateNumbersGeneral(data, type);
                case "historico":
                    return generateNumbersGeneral(data, type);
                case "test3200":
                    return generateNumbersTest(data, type);

                default:
                    return ""
            }



        } catch (err) {
            return err;
        }
    },
    generateReportByCoach: async (type, fechasG, idClase) => {
        var fechas = parseFecha(fechasG);
        let totalMilisegundos = 0;
        let usuariosData = [];
        let totalEntrenamientos = 0;
        let totalPruebas = 0;
        try {
            const data = await strapi.entityService.findMany("plugin::users-permissions.user", {
                filters: {
                    mis_clases: {
                        id: idClase

                    }
                },
                limit: 1000
            });
            var ids = data.map((value, index) => {
                return value.id;
            });
            for (let index = 0; index < ids.length; index++) {
                const idElement = ids[index];
                const logsData = await strapi.entityService.findMany("api::log.log", {
                    filters: {
                        Id_Usuario: idElement.toString(),
                        clases_entrenador: {
                            id: idClase
                        }
                    },
                    limit: 1000
                });
                var fechaLogs = logsData[0].Fecha;
                const publicacionesUsuarioHistorico = await strapi.entityService.findMany('api::publicacion.publicacion', {
                    populate: {
                        clases_entrenadors: true
                    },
                    filters: {

                        clases_entrenadors: {
                            id: {
                                $in: [idClase]
                            }
                        },
                        users_permissions_user: {
                            id: idElement
                        },
                        Fecha: {
                            $gte: fechaLogs,
                            $between: fechas,
                        }
                    },
                    limit: 1000
                });
               var result = generateNumbersGeneral(publicacionesUsuarioHistorico, "historico");
               usuariosData.push({
                "id": idElement,
                "data": result
               })
                const dataPublications = await strapi.entityService.findMany('api::publicacion.publicacion', {
                    populate: {
                        clases_entrenadors: true
                    },
                    filters: {

                        clases_entrenadors: {
                            id: {
                                $in: [idClase]
                            }
                        },
                        users_permissions_user: {
                            id: idElement
                        },
                        Fecha: {
                            $gte: fechaLogs
                        }
                    },
                    limit: 1000
                });
                for (let index = 0; index < dataPublications.length; index++) {
                    const elementPublication = dataPublications[index];
                    if (elementPublication.Tipo == "ENTRENAMIENTO") {
                        totalEntrenamientos += 1;
                    } else {
                        totalPruebas += 1;
                    }
                    var totalHorasTemporal = elementPublication.dataActividad[0].data.time;
                    const tiempoEnMilisegundos = convertirAMilisegundos(totalHorasTemporal);
                    totalMilisegundos += tiempoEnMilisegundos;

                }
            }
            const totalHoras = Math.ceil(totalMilisegundos / (3600000));
            return {
                "TotalHours":totalHoras,
                "TotalEntrenamientos": totalEntrenamientos,
                "TotalPruebas": totalPruebas,
                "usuariosData": usuariosData
 
            };



        } catch (err) {
            return err;
        }
    },


};