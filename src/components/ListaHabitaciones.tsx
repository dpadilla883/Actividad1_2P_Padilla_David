import React from 'react';
import { Habitacion } from '../types/Habitacion';

interface ListaHabitacionesProps {
    habitaciones: Habitacion[];
    onEdit: (habitacionId: string) => void;
    onDelete: (habitacionId: string) => void;
}

const ListaHabitaciones: React.FC<ListaHabitacionesProps> = ({ habitaciones, onEdit, onDelete }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio/Noche</th>
                        <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Editar</span>
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {habitaciones.map((habitacion) => (
                        <tr key={habitacion.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{habitacion.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{habitacion.tipo}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${habitacion.precioPorNoche}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                <button
                                    onClick={() => onEdit(habitacion.id)}
                                    className="text-indigo-600 hover:text-indigo-900"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => onDelete(habitacion.id)}
                                    className="text-red-600 hover:text-red-900"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListaHabitaciones;