import React, { useState, useEffect } from 'react';
import { Habitacion } from '../types/Habitacion';

interface HabitacionFormProps {
    onSave: (habitacion: Habitacion) => void;
    initialHabitacion?: Habitacion;
    onCancel?: () => void;
}

const HabitacionForm: React.FC<HabitacionFormProps> = ({ onSave, initialHabitacion, onCancel }) => {
    const [tipo, setTipo] = useState(initialHabitacion?.tipo || '');
    const [precioPorNoche, setPrecioPorNoche] = useState(initialHabitacion?.precioPorNoche || 0);

    useEffect(() => {
        if (initialHabitacion) {
            setTipo(initialHabitacion.tipo);
            setPrecioPorNoche(initialHabitacion.precioPorNoche);
        }
    }, [initialHabitacion]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const habitacion: Habitacion = {
            id: initialHabitacion?.id || crypto.randomUUID(), 
            tipo,
            precioPorNoche: Number(precioPorNoche),
        };
        onSave(habitacion);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">Tipo de Habitación:</label>
                <input
                    type="text"
                    id="tipo"
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
            </div>
            <div>
                <label htmlFor="precioPorNoche" className="block text-sm font-medium text-gray-700">Precio por Noche:</label>
                <input
    type="number"
    id="precioPorNoche"
    value={precioPorNoche}
    onChange={(e) => setPrecioPorNoche(Number(e.target.value))} 
    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
/>
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

export default HabitacionForm;