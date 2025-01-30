import React from 'react';
import { Reserva } from '../types/Reserva';
import { Cliente } from '../types/Cliente';
import { Habitacion } from '../types/Habitacion';

interface ListaReservasProps {
    reservas: Reserva[];
    clientes: Cliente[];
    habitaciones: Habitacion[];
    onEdit: (reservaId: string) => void;
    onDelete: (reservaId: string) => void;
}

const ListaReservas: React.FC<ListaReservasProps> = ({ reservas, clientes, habitaciones, onEdit, onDelete }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Habitaciones</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inicio</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fin</th>
                        <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Editar</span>
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {reservas.map((reserva) => {
                        const cliente = clientes.find(c => c.id === reserva.clienteId);
                        const habitacionesReservadas = habitaciones.filter(h => reserva.habitacionIds.includes(h.id));
                        return (
                            <tr key={reserva.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reserva.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{cliente?.nombreCompleto}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {habitacionesReservadas.map(hab => hab.tipo).join(', ')}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reserva.fechaInicio}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reserva.fechaFin}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                    <button
                                        onClick={() => onEdit(reserva.id)}
                                        className="text-indigo-600 hover:text-indigo-900"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => onDelete(reserva.id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default ListaReservas;