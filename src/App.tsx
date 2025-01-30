import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ClientesPage from './pages/ClientesPage';
import HabitacionesPage from './pages/HabitacionesPage';
import ReservasPage from './pages/ReservasPage';

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-100">
                <nav className="bg-white shadow">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex items-center">
                                <div className="hidden md:block">
                                    <div className="ml-10 flex items-baseline space-x-4">
                                        <Link to="/clientes" className="text-gray-600 hover:bg-gray-200 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">Clientes</Link>
                                        <Link to="/habitaciones" className="text-gray-600 hover:bg-gray-200 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">Habitaciones</Link>
                                        <Link to="/reservas" className="text-gray-600 hover:bg-gray-200 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">Reservas</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                <main>
                    <div className="py-6">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <Routes>
                                <Route path="/clientes" element={<ClientesPage />} />
                                <Route path="/habitaciones" element={<HabitacionesPage />} />
                                <Route path="/reservas" element={<ReservasPage />} />
                                <Route path="/" element={<ClientesPage />} /> {/* Página de inicio */}
                            </Routes>
                        </div>
                    </div>
                </main>
            </div>
        </Router>
    );
}

export default App;