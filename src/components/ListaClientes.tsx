import React from 'react';
import { Cliente } from '../types/Cliente';

interface ListaClientesProps {
    clientes: Cliente[];
    onEdit: (clienteId: string) => void;
    onDelete: (clienteId: string) => void;
}

const ListaClientes: React.FC<ListaClientesProps> = ({ clientes, onEdit, onDelete }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Correo Electrónico</th>
                        <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Editar</span>
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {clientes.map((cliente) => (
                        <tr key={cliente.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cliente.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{cliente.nombreCompleto}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cliente.correoElectronico}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                <button
                                    onClick={() => onEdit(cliente.id)}
                                    className="text-indigo-600 hover:text-indigo-900"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => onDelete(cliente.id)}
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

export default ListaClientes;