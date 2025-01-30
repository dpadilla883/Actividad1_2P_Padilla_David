import { Cliente } from './Cliente';
import { Habitacion } from './Habitacion';

export interface Reserva {
    id: string;
    clienteId: string; // Referencia al ID del cliente
    habitacionIds: string[]; // Array de IDs de habitaciones reservadas
    fechaInicio: string; // Formato ISO 8601: YYYY-MM-DD
    fechaFin: string;   // Formato ISO 8601: YYYY-MM-DD
}