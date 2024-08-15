global.config = require('./config.js').config;



    const mongoose = require('mongoose');
const Ciudad = require('./api/modelos/ciudadModel.js'); // Ajusta la ruta si es necesario
const Departamento = require('./api/modelos/departamentoModel.js'); // Ajusta la ruta si es necesario

mongoose.connect("mongodb://127.0.0.1:27017/" + config.bd, {})
    .then(() => {
        console.log('Conectado a MongoDB');

        console.log('Conectado a MongoDB');

        const departamentos = [
            { nombre: 'Amazonas', activo: true, codigo: 'AMA' },
            { nombre: 'Antioquia', activo: true, codigo: 'ANT' },
            { nombre: 'Arauca', activo: true, codigo: 'ARA' },
            { nombre: 'Atlántico', activo: true, codigo: 'ATL' },
            { nombre: 'Bolívar', activo: true, codigo: 'BOL' },
            { nombre: 'Boyacá', activo: true, codigo: 'BOY' },
            { nombre: 'Caldas', activo: true, codigo: 'CAL' },
            { nombre: 'Caquetá', activo: true, codigo: 'CAQ' },
            { nombre: 'Casanare', activo: true, codigo: 'CAS' },
            { nombre: 'Cauca', activo: true, codigo: 'CAU' },
            { nombre: 'Cesar', activo: true, codigo: 'CES' },
            { nombre: 'Chocó', activo: true, codigo: 'CHO' },
            { nombre: 'Córdoba', activo: true, codigo: 'COR' },
            { nombre: 'Cundinamarca', activo: true, codigo: 'CUN' },
            { nombre: 'Guainía', activo: true, codigo: 'GUA' },
            { nombre: 'Guaviare', activo: true, codigo: 'GUV' },
            { nombre: 'Huila', activo: true, codigo: 'HUI' },
            { nombre: 'La Guajira', activo: true, codigo: 'LAG' },
            { nombre: 'Magdalena', activo: true, codigo: 'MAG' },
            { nombre: 'Meta', activo: true, codigo: 'MET' },
            { nombre: 'Nariño', activo: true, codigo: 'NAR' },
            { nombre: 'Norte de Santander', activo: true, codigo: 'NSA' },
            { nombre: 'Putumayo', activo: true, codigo: 'PUT' },
            { nombre: 'Quindío', activo: true, codigo: 'QUI' },
            { nombre: 'Risaralda', activo: true, codigo: 'RIS' },
            { nombre: 'San Andrés y Providencia', activo: true, codigo: 'SAP' },
            { nombre: 'Santander', activo: true, codigo: 'SAN' },
            { nombre: 'Sucre', activo: true, codigo: 'SUC' },
            { nombre: 'Tolima', activo: true, codigo: 'TOL' },
            { nombre: 'Valle del Cauca', activo: true, codigo: 'VAL' },
            { nombre: 'Vaupés', activo: true, codigo: 'VAU' },
            { nombre: 'Vichada', activo: true, codigo: 'VIC' }
        ];

        Departamento.insertMany(departamentos)
            .then(() => {
                console.log('Departamentos insertados');

                const ciudades = [
                    { nombre: 'Leticia', activo: true, codigo: 'LET', codigo_depto: 'AMA' },
                    { nombre: 'Medellín', activo: true, codigo: 'MED', codigo_depto: 'ANT' },
                    { nombre: 'Arauca', activo: true, codigo: 'ARA', codigo_depto: 'ARA' },
                    { nombre: 'Barranquilla', activo: true, codigo: 'BAR', codigo_depto: 'ATL' },
                    { nombre: 'Cartagena', activo: true, codigo: 'CAR', codigo_depto: 'BOL' },
                    { nombre: 'Tunja', activo: true, codigo: 'TUN', codigo_depto: 'BOY' },
                    { nombre: 'Manizales', activo: true, codigo: 'MAN', codigo_depto: 'CAL' },
                    { nombre: 'Florencia', activo: true, codigo: 'FLO', codigo_depto: 'CAQ' },
                    { nombre: 'Yopal', activo: true, codigo: 'YOP', codigo_depto: 'CAS' },
                    { nombre: 'Popayán', activo: true, codigo: 'POP', codigo_depto: 'CAU' },
                    { nombre: 'Valledupar', activo: true, codigo: 'VAL', codigo_depto: 'CES' },
                    { nombre: 'Quibdó', activo: true, codigo: 'QUI', codigo_depto: 'CHO' },
                    { nombre: 'Montería', activo: true, codigo: 'MON', codigo_depto: 'COR' },
                    { nombre: 'Bogotá', activo: true, codigo: 'BOG', codigo_depto: 'CUN' },
                    { nombre: 'Inírida', activo: true, codigo: 'INI', codigo_depto: 'GUA' },
                    { nombre: 'San José del Guaviare', activo: true, codigo: 'SJO', codigo_depto: 'GUV' },
                    { nombre: 'Neiva', activo: true, codigo: 'NEI', codigo_depto: 'HUI' },
                    { nombre: 'Riohacha', activo: true, codigo: 'RIO', codigo_depto: 'LAG' },
                    { nombre: 'Santa Marta', activo: true, codigo: 'STA', codigo_depto: 'MAG' },
                    { nombre: 'Villavicencio', activo: true, codigo: 'VIL', codigo_depto: 'MET' },
                    { nombre: 'Pasto', activo: true, codigo: 'PAS', codigo_depto: 'NAR' },
                    { nombre: 'Cúcuta', activo: true, codigo: 'CUC', codigo_depto: 'NSA' },
                    { nombre: 'Mocoa', activo: true, codigo: 'MOC', codigo_depto: 'PUT' },
                    { nombre: 'Armenia', activo: true, codigo: 'ARM', codigo_depto: 'QUI' },
                    { nombre: 'Pereira', activo: true, codigo: 'PER', codigo_depto: 'RIS' },
                    { nombre: 'San Andrés', activo: true, codigo: 'SAA', codigo_depto: 'SAP' },
                    { nombre: 'Bucaramanga', activo: true, codigo: 'BUC', codigo_depto: 'SAN' },
                    { nombre: 'Sincelejo', activo: true, codigo: 'SIN', codigo_depto: 'SUC' },
                    { nombre: 'Ibagué', activo: true, codigo: 'IBA', codigo_depto: 'TOL' },
                    { nombre: 'Cali', activo: true, codigo: 'CAL', codigo_depto: 'VAL' },
                    { nombre: 'Mitú', activo: true, codigo: 'MIT', codigo_depto: 'VAU' },
                    { nombre: 'Puerto Carreño', activo: true, codigo: 'PCN', codigo_depto: 'VIC' }
                ];

                // Insertar ciudades
                Ciudad.insertMany(ciudades)
                    .then(() => console.log('Ciudades insertadas'))
                    .catch(error => console.error('Error insertando ciudades:', error));
            })
            .catch(error => console.error('Error insertando departamentos:', error));
    })
    .catch(error => console.error('Error conectando a MongoDB:', error));