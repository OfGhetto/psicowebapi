import express, {json, urlencoded} from 'express';
import morgan from 'morgan';
import usuarioRoutes from '../src/routes/usuario';
import pacienteRoutes from '../src/routes/paciente';
import profesionalRoutes from '../src/routes/profesional';
import estadoRoutes from '../src/routes/estado';
import rolRoutes from '../src/routes/rol';
import fichas_clinicasRoutes from '../src/routes/ficha_clinica';
import historial_sesionesRoutes from '../src/routes/historial_sesiones';
import especialidadRoutes from '../src/routes/especialidad';
import estado_reservaRoutes from '../src/routes/estado_reserva';
import horarioRoutes from '../src/routes/horario';
import reservaRoutes from '../src/routes/reserva';
import estado_horarioRoutes from '../src/routes/estado_horario';

//importing routes

//initialization
const app  = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//middlewares
app.use(morgan('dev'));
app.use(urlencoded({
    extended: true
}));
app.use(json());

//routes 
app.use('/api/usuario', usuarioRoutes);
app.use('/api/paciente', pacienteRoutes);
app.use('/api/profesional', profesionalRoutes);
app.use('/api/estado', estadoRoutes);
app.use('/api/rol', rolRoutes);
app.use('/api/fichas',fichas_clinicasRoutes);
app.use('/api/historial',historial_sesionesRoutes);
app.use('/api/especialidad', especialidadRoutes);
app.use('/api/estadoReserva', estado_reservaRoutes);
app.use('/api/horario', horarioRoutes);
app.use('/api/reserva', reservaRoutes);
app.use('/api/estado/horario',estado_horarioRoutes);
app.use('/api/estado/reserva', estado_reservaRoutes);

export default app;