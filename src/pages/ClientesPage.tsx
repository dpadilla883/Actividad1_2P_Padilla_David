import React, { useState, useEffect } from 'react';
import ListaClientes from '../components/ListaClientes';
import ClienteForm from '../components/ClienteForm';
import { Cliente } from '../types/Cliente';

const ClientesPage: React.FC = () => {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [editingClienteId, setEditingClienteId] = useState<string | null>(null);
    const [isAddingNew, setIsAddingNew] = useState(false);

    useEffect(() => {
        cargarClientes();
    }, []);

    const cargarClientes = () => {
        const storedClientes = localStorage.getItem('clientes');
        if (storedClientes) {
            setClientes(JSON.parse(storedClientes));
        }
    };

    const guardarClientes = (clientesActualizados: Cliente[]) => {
        localStorage.setItem('clientes', JSON.stringify(clientesActualizados));
        setClientes(clientesActualizados);
    };

    const handleAgregarCliente = () => {
        setIsAddingNew(true);
        setEditingClienteId(null);
    };

    const handleEditarCliente = (clienteId: string) => {
        setEditingClienteId(clienteId);
        setIsAddingNew(false); // Asegura que el formulario de edición se muestre si estaba en modo "agregar nuevo"
    };

    const handleEliminarCliente = (clienteId: string) => {
        const nuevosClientes = clientes.filter(cliente => cliente.id !== clienteId);
        guardarClientes(nuevosClientes);
        setEditingClienteId(null); // Limpiar el estado de edición si se estaba editando el cliente eliminado
    };

    const handleGuardarCliente = (cliente: Cliente) => {
        let nuevosClientes = [...clientes];
        if (editingClienteId) { // Editar cliente existente
            nuevosClientes = nuevosClientes.map(c => c.id === editingClienteId ? cliente : c);
            setEditingClienteId(null);
        } else { // Agregar nuevo cliente
            nuevosClientes = [...nuevosClientes, cliente];
        }
        guardarClientes(nuevosClientes);
        setIsAddingNew(false); // Cerrar formulario de "agregar nuevo"
    };

    const handleCancelarForm = () => {
        setIsAddingNew(false);
        setEditingClienteId(null);
    };


    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Gestión de Clientes</h1>

            <div className="mb-4 flex justify-between items-center">
                <button onClick={handleAgregarCliente} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Agregar Cliente
                </button>
            </div>


            {isAddingNew || editingClienteId ? (
                <div className="mb-4 p-4 border rounded">
                    <ClienteForm
                        onSave={handleGuardarCliente}
                        initialCliente={editingClienteId ? clientes.find(c => c.id === editingClienteId) : undefined}
                        onCancel={handleCancelarForm}
                    />
                </div>
            ) : null}


            <ListaClientes
                clientes={clientes}
                onEdit={handleEditarCliente}
                onDelete={handleEliminarCliente}
            />
        </div>
    );
};

export default ClientesPage;