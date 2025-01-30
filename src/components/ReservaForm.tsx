import React, { useState, useEffect } from 'react';
import { Reserva } from '../types/Reserva';
import { Cliente } from '../types/Cliente';
import { Habitacion } from '../types/Habitacion';

interface ReservaFormProps {
    onSave: (reserva: Reserva) => void;
    clientes: Cliente[];
    habitaciones: Habitacion[];
    initialReserva?: Reserva;
    onCancel?: () => void;
    reservasExistentes: Reserva[]; // Para validación de solapamiento
}

const ReservaForm: React.FC<ReservaFormProps> = ({ onSave, clientes, habitaciones, initialReserva, onCancel, reservasExistentes }) => {
    const [clienteId, setClienteId] = useState<string>(initialReserva?.clienteId || '');
    const [habitacionIds, setHabitacionIds] = useState<string[]>(initialReserva?.habitacionIds || []);
    const [fechaInicio, setFechaInicio] = useState<string>(initialReserva?.fechaInicio || '');
    const [fechaFin, setFechaFin] = useState<string>(initialReserva?.fechaFin || '');
    const [errorSolapamiento, setErrorSolapamiento] = useState('');
    const [errorFechas, setErrorFechas] = useState('');


    useEffect(() => {
        if (initialReserva) {
            setClienteId(initialReserva.clienteId);
            setHabitacionIds(initialReserva.habitacionIds);
            setFechaInicio(initialReserva.fechaInicio);
            setFechaFin(initialReserva.fechaFin);
        }
    }, [initialReserva]);


    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setErrorSolapamiento('');
        setErrorFechas('');

        if (!fechaInicio || !fechaFin) {
            setErrorFechas('Por favor, seleccione fechas de inicio y fin.');
            return;
        }

        if (new Date(fechaInicio) >= new Date(fechaFin)) {
            setErrorFechas('La fecha de inicio debe ser anterior a la fecha de fin.');
            return;
        }


        // Validar solapamiento de reservas
        const habitacionesReservadas = habitaciones.filter(hab => habitacionIds.includes(hab.id));
        for (const habitacionId of habitacionIds) {
            const reservasHabitacion = reservasExistentes.filter(reserva => reserva.habitacionIds.includes(habitacionId));
            for (const reservaExistente of reservasHabitacion) {
                if (reservaExistente.id !== initialReserva?.id) { // No validar contra sí misma en edición
                    const inicioNuevaReserva = new Date(fechaInicio);
                    const finNuevaReserva = new Date(fechaFin);
                    const inicioReservaExistente = new Date(reservaExistente.fechaInicio);
                    const finReservaExistente = new Date(reservaExistente.fechaFin);

                    if (
                        (inicioNuevaReserva < finReservaExistente && finNuevaReserva > inicioReservaExistente)
                    ) {
                        setErrorSolapamiento(`La habitación ${habitaciones.find(h => h.id === habitacionId)?.tipo} no está disponible en esas fechas.`);
                        return; // Detener al primer solapamiento encontrado
                    }
                }
            }
        }


        const reserva: Reserva = {
            id: initialReserva?.id || crypto.randomUUID(), 
            clienteId,
            habitacionIds,
            fechaInicio,
            fechaFin,
        };
        onSave(reserva);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="clienteId" className="block text-sm font-medium text-gray-700">Cliente:</label>
                <select
                    id="clienteId"
                    value={clienteId}
                    onChange={(e) => setClienteId(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                    <option value="">Seleccione un cliente</option>
                    {clientes.map((cliente) => (
                        <option key={cliente.id} value={cliente.id}>{cliente.nombreCompleto}</option>
                    ))}
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Habitaciones:</label>
                <div>
                    {habitaciones.map((habitacion) => (
                        <div key={habitacion.id} className="flex items-center">
                            <input
                                type="checkbox"
                                id={`habitacion-${habitacion.id}`}
                                value={habitacion.id}
                                checked={habitacionIds.includes(habitacion.id)}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setHabitacionIds([...habitacionIds, habitacion.id]);
                                    } else {
                                        setHabitacionIds(habitacionIds.filter(id => id !== habitacion.id));
                                    }
                                }}
                                className="mr-2 focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            />
                            <label htmlFor={`habitacion-${habitacion.id}`} className="text-gray-700">{habitacion.tipo} (${habitacion.precioPorNoche}/noche)</label>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <label htmlFor="fechaInicio" className="block text-sm font-medium text-gray-700">Fecha de Inicio:</label>
                <input
                    type="date"
                    id="fechaInicio"
                    value={fechaInicio}
                    onChange={(e) => setFechaInicio(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
            </div>
            <div>
                <label htmlFor="fechaFin" className="block text-sm font-medium text-gray-700">Fecha de Fin:</label>
                <input
                    type="date"
                    id="fechaFin"
                    value={fechaFin}
                    onChange={(e) => setFechaFin(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errorFechas && <p className="mt-1 text-sm text-red-500">{errorFechas}</p>}
            </div>
            {errorSolapamiento && <p className="mt-2 text-red-500">{errorSolapamiento}</p>}

            <div className="flex justify-end space-x-2">
                {onCancel && (
                    <button type="button" onClick={onCancel} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Cancelar
                    </button>
                )}
                <button type="submit" className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Guardar Reserva
                </button>
            </div>
        </form>
    );
};

export default ReservaForm;