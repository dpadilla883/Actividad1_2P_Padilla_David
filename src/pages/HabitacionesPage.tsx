import React, { useState, useEffect } from 'react';
import ListaHabitaciones from '../components/ListaHabitaciones';
import HabitacionForm from '../components/HabitacionForm';
import { Habitacion } from '../types/Habitacion';

const HabitacionesPage: React.FC = () => {
    const [habitaciones, setHabitaciones] = useState<Habitacion[]>([]);
    const [editingHabitacionId, setEditingHabitacionId] = useState<string | null>(null);
    const [isAddingNew, setIsAddingNew] = useState(false);


    useEffect(() => {
        cargarHabitaciones();
    }, []);

    const cargarHabitaciones = () => {
        const storedHabitaciones = localStorage.getItem('habitaciones');
        if (storedHabitaciones) {
            setHabitaciones(JSON.parse(storedHabitaciones));
        }
    };

    const guardarHabitaciones = (habitacionesActualizadas: Habitacion[]) => {
        localStorage.setItem('habitaciones', JSON.stringify(habitacionesActualizadas));
        setHabitaciones(habitacionesActualizadas);
    };


    const handleAgregarHabitacion = () => {
        setIsAddingNew(true);
        setEditingHabitacionId(null);
    };

    const handleEditarHabitacion = (habitacionId: string) => {
        setEditingHabitacionId(habitacionId);
        setIsAddingNew(false);
    };

    const handleEliminarHabitacion = (habitacionId: string) => {
        const nuevasHabitaciones = habitaciones.filter(habitacion => habitacion.id !== habitacionId);
        guardarHabitaciones(nuevasHabitaciones);
        setEditingHabitacionId(null);
    };

    const handleGuardarHabitacion = (habitacion: Habitacion) => {
        let nuevasHabitaciones = [...habitaciones];
        if (editingHabitacionId) {
            nuevasHabitaciones = nuevasHabitaciones.map(h => h.id === editingHabitacionId ? habitacion : h);
            setEditingHabitacionId(null);
        } else {
            nuevasHabitaciones = [...nuevasHabitaciones, habitacion];
        }
        guardarHabitaciones(nuevasHabitaciones);
        setIsAddingNew(false);
    };

    const handleCancelarForm = () => {
        setIsAddingNew(false);
        setEditingHabitacionId(null);
    };


    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Gestión de Habitaciones</h1>

            <div className="mb-4 flex justify-between items-center">
                <button onClick={handleAgregarHabitacion} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Agregar Habitación
                </button>
            </div>


            {isAddingNew || editingHabitacionId ? (
                <div className="mb-4 p-4 border rounded">
                    <HabitacionForm
                        onSave={handleGuardarHabitacion}
                        initialHabitacion={editingHabitacionId ? habitaciones.find(h => h.id === editingHabitacionId) : undefined}
                        onCancel={handleCancelarForm}
                    />
                </div>
            ) : null}


            <ListaHabitaciones
                habitaciones={habitaciones}
                onEdit={handleEditarHabitacion}
                onDelete={handleEliminarHabitacion}
            />
        </div>
    );
};

export default HabitacionesPage;