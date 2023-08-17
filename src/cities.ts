const generateId = () => Math.random().toString(36).substr(2, 9)

const cities: Record<string, { id: string; city: string; coordinates: [number, number] }[]> = {
  'Santa Cruz SC': [
    {
      id: generateId(),
      city: 'Santa Cruz de la Sierra 🏛',
      coordinates: [-17.78629, -63.18117]
    },
    {
      id: generateId(),
      city: 'Montero',
      coordinates: [-17.33866, -63.2505]
    },
    {
      id: generateId(),
      city: 'Warnes',
      coordinates: [-17.510278, -63.164722]
    },
    {
      id: generateId(),
      city: 'La Guardia',
      coordinates: [-17.891, -63.324]
    },
    {
      id: generateId(),
      city: 'Cotoca',
      coordinates: [-17.753889, -62.996944]
    }
  ],
  'La Paz LP': [
    {
      id: generateId(),
      city: 'El Alto',
      coordinates: [-16.504722, -68.163333]
    },
    {
      id: generateId(),
      city: 'Nuestra Señora de La Paz 🏛',
      coordinates: [-16.5, -68.15]
    },
    {
      id: generateId(),
      city: 'Viacha',
      coordinates: [-16.633333, -68.283333]
    }
  ],
  'Cochabamba CB': [
    {
      id: generateId(),
      city: 'Cochabamba 🏛',
      coordinates: [-17.3895, -66.1568]
    },
    {
      id: generateId(),
      city: 'Sacaba',
      coordinates: [-17.39799, -66.03825]
    },
    {
      id: generateId(),
      city: 'Quillacollo',
      coordinates: [-17.39228, -66.27838]
    },
    {
      id: generateId(),
      city: 'Villa Tunari',
      coordinates: [-16.9725, -65.42]
    }
  ],
  'Chuquisaca CH': [
    {
      id: generateId(),
      city: 'Sucre 🏛',
      coordinates: [-19.03332, -65.26274]
    }
  ],
  'Oruro OR': [
    {
      id: generateId(),
      city: 'Oruro 🏛',
      coordinates: [-17.98333, -67.15]
    }
  ],
  'Tarija TJ': [
    {
      id: generateId(),
      city: 'Tarija 🏛',
      coordinates: [-21.53549, -64.72956]
    },
    {
      id: generateId(),
      city: 'Yacuiba',
      coordinates: [-22.01643, -63.67753]
    }
  ],
  'Potosí PT': [
    {
      id: generateId(),
      city: 'Potosí 🏛',
      coordinates: [-19.58361, -65.75306]
    }
  ],
  'Beni BN': [
    {
      id: generateId(),
      city: 'Trinidad 🏛',
      coordinates: [-14.83333, -64.9]
    },
    {
      id: generateId(),
      city: 'Riberalta',
      coordinates: [-11.005, -66.066111]
    }
  ],
  'Pando PA': [
    {
      id: generateId(),
      city: 'Cobija 🏛',
      coordinates: [-11.02671, -68.76918]
    }
  ]
}

export default cities
