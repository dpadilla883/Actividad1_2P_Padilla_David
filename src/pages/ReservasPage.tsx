import React, { useState, useEffect } from 'react';
import ListaReservas from '../components/ListaReservas';
import ReservaForm from '../components/ReservaForm';
import { Reserva } from '../types/Reserva';
import { Cliente } from '../types/Cliente';
import { Habitacion } from '../types/Habitacion';

const ReservasPage: React.FC = () => {
    const [reservas, setReservas] = useState<Reserva[]>([]);
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [habitaciones, setHabitaciones] = useState<Habitacion[]>([]);
    const [editingReservaId, setEditingReservaId] = useState<string | null>(null);
    const [isAddingNew, setIsAddingNew] = useState(false);


    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {
        const storedReservas = localStorage.getItem('reservas');
        if (storedReservas) {
            setReservas(JSON.parse(storedReservas));
        }
        const storedClientes = localStorage.getItem('clientes');
        if (storedClientes) {
            setClientes(JSON.parse(storedClientes));
        }
        const storedHabitaciones = localStorage.getItem('habitaciones');
        if (storedHabitaciones) {
            setHabitaciones(JSON.parse(storedHabitaciones));
        }
    };


    const guardarReservas = (reservasActualizadas: Reserva[]) => {
        localStorage.setItem('reservas', JSON.stringify(reservasActualizadas));
        setReservas(reservasActualizadas);
    };


    const handleAgregarReserva = () => {
        setIsAddingNew(true);
        setEditingReservaId(null);
    };

    const handleEditarReserva = (reservaId: string) => {
        setEditingReservaId(reservaId);
        setIsAddingNew(false);
    };

    const handleEliminarReserva = (reservaId: string) => {
        const nuevasReservas = reservas.filter(reserva => reserva.id !== reservaId);
        guardarReservas(nuevasReservas);
        setEditingReservaId(null);
    };


    const handleGuardarReserva = (reserva: Reserva) => {
        let nuevasReservas = [...reservas];
        if (editingReservaId) {
            nuevasReservas = nuevasReservas.map(r => r.id === editingReservaId ? reserva : r);
            setEditingReservaId(null);
        } else {
            nuevasReservas = [...nuevasReservas, reserva];
        }
        guardarReservas(nuevasReservas);
        setIsAddingNew(false);
    };


    const handleCancelarForm = () => {
        setIsAddingNew(false);
        setEditingReservaId(null);
    };


    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Gestión de Reservas</h1>

            <div className="mb-4 flex justify-between items-center">
                <button onClick={handleAgregarReserva} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Agregar Reserva
                </button>
            </div>

            {isAddingNew || editingReservaId ? (
                <div className="mb-4 p-4 border rounded">
                    <ReservaForm
                        onSave={handleGuardarReserva}
                        clientes={clientes}
                        habitaciones={habitaciones}
                        initialReserva={editingReservaId ? reservas.find(r => r.id === editingReservaId) : undefined}
                        onCancel={handleCancelarForm}
                        reservasExistentes={reservas} // Pasar reservas existentes para validación
                    />
                </div>
            ) : null}


            <ListaReservas
                reservas={reservas}
                clientes={clientes}
                habitaciones={habitaciones}
                onEdit={handleEditarReserva}
                onDelete={handleEliminarReserva}
            />
        </div>
    );
};

export default ReservasPage;