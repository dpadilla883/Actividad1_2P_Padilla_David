import React, { useState, useEffect } from 'react';
import { Cliente } from '../types/Cliente';

interface ClienteFormProps {
    onSave: (cliente: Cliente) => void;
    initialCliente?: Cliente;
    onCancel?: () => void;
}

const ClienteForm: React.FC<ClienteFormProps> = ({ onSave, initialCliente, onCancel }) => {
    const [nombreCompleto, setNombreCompleto] = useState(initialCliente?.nombreCompleto || '');
    const [correoElectronico, setCorreoElectronico] = useState(initialCliente?.correoElectronico || '');
    const [errorCorreo, setErrorCorreo] = useState('');
    const [errorNombre, setErrorNombre] = useState('');

    useEffect(() => {
        if (initialCliente) {
            setNombreCompleto(initialCliente.nombreCompleto);
            setCorreoElectronico(initialCliente.correoElectronico);
        }
    }, [initialCliente]);


    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setErrorCorreo('');
        setErrorNombre('');

        if (!nombreCompleto.trim()) {
            setErrorNombre('El nombre no puede estar vacío.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(correoElectronico)) {
            setErrorCorreo('Correo electrónico no válido.');
            return;
        }

        const cliente: Cliente = {
            id: initialCliente?.id || crypto.randomUUID(), 
            nombreCompleto,
            correoElectronico,
        };
        onSave(cliente);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="nombreCompleto" className="block text-sm font-medium text-gray-700">Nombre Completo:</label>
                <input
                    type="text"
                    id="nombreCompleto"
                    value={nombreCompleto}
                    onChange={(e) => setNombreCompleto(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errorNombre && <p className="mt-1 text-sm text-red-500">{errorNombre}</p>}
            </div>
            <div>
                <label htmlFor="correoElectronico" className="block text-sm font-medium text-gray-700">Correo Electrónico:</label>
                <input
                    type="email"
                    id="correoElectronico"
                    value={correoElectronico}
                    onChange={(e) => setCorreoElectronico(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errorCorreo && <p className="mt-1 text-sm text-red-500">{errorCorreo}</p>}
            </div>
            <div className="flex justify-end space-x-2">
                {onCancel && (
                    <button type="button" onClick={onCancel} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Cancelar
                    </button>
                )}
                <button type="submit" className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Guardar
                </button>
            </div>
        </form>
    );
};

export default ClienteForm;