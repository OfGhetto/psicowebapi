// para cargar el backend del horario lo que hay que hacer es recorrer
// por la cantidad de dias que se mande desde el body, primer loop, for dias
// luego hay que recorrer por la cantidad de horas en un intervalo estatico de una hora
// parametros a pedir 
// los meses que va a cargar o es 1 o es muchos capturarlos en numeros, donde 1 indica enero, 1-7 indicando de enero a julio
// el intevalo de dias es decir 1 lunes y 1-5 de lunes a viernes
// el intervalo de horas donde los valores sean el inicio 9:00 y el final 15:00 en intervalos de 1 hora.
// for meses
    // for dias
        // for horas
            //create horario

import Horario from "../models/horario";
import Profesional from "../models/profesional";
import EstadoHorario from "../models/estado_horario";


export async function cargarHorario(req, res){

    const {mesInicio,mesFinal,diaInicio,diaFinal,horaInicio,horaFinal, profesional_id} = req.body;
    console.log(mesInicio,mesFinal,diaInicio,diaFinal,horaInicio,horaFinal,profesional_id);
    let estado_horario_id = '1';
    
     try{
        let anio = new Date().getFullYear();
        let mes = 0;
        let diasMes = 1;

        let diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        let resta = horaFinal - horaInicio;
        for(mes=mesInicio; mes<=mesFinal; mes++){
            diasMes = new Date(anio, mes, 0).getDate();
            for (let dia = 1; dia <= diasMes; dia++) {
                for(let i=diaInicio;i<=diaFinal;i++){
                    let indice = new Date(anio, mes - 1, dia).getDay();
                    if(diasSemana[indice] === diasSemana[i]){
                        for(let k = 0 ; k<resta; k++){
                            let fecha = '';
                            let mes_asignar = '';
                            let dia_asignar = '';
                            if (mes < 10) {
                                mes_asignar = '0' + mes;
                            }else{
                                mes_asignar = mes;
                            }
                            if (dia < 10) {
                                dia_asignar = '0' + dia;
                            }else{
                                dia_asignar = dia;
                            }
                            
                            fecha = anio + '-' + mes_asignar + '-' + dia;
                            let hora_asignar = (parseInt(horaInicio)+k);
                            let hora_incrementar=hora_asignar;
                            if(hora_asignar<=9){
                                 hora_incrementar= '0'+hora_asignar;
                            }
                            let hora = hora_incrementar+':00';
                            await Horario.create({hora,fecha,profesional_id,estado_horario_id});
                        }
                    }
                }                
            }    
        }
        res.json({
            code:200,
            message: 'horarios creados con éxito',
        });

    }catch(e){
        console.log(e);
        res.json({
            code:400,
            message: 'Error al crear el horario',
            error: e.errors
        });
    }
}

export async function buscarDisponibilidad(req, res){

    const {fecha,profesional_id} = req.body;
    console.log(JSON.stringify(req.body));
    try{
        let horario = await Horario.findAll({
            where:{fecha,profesional_id},
            attributes:['id', 'fecha', 'hora'],
            include: [{
                model: EstadoHorario,
                attributes: ['nombre']
            }],
        });
        if(horario){
            res.json({
                code:200,
                message: 'El horario ha sido encontrado con éxito',
                data : horario
            });
        }else{
            res.json({
                code:400,
                message: 'El horario no existe'
            });
        }
    }catch(e){
        console.log(e);
        res.json({
            code:401,
            message: 'ERROR'
        });
    }
}