import type { Map, TileLayerOptions, TileLayer, Marker, geoJSON, GeoJSONOptions } from 'leaflet'
import './style.css'
import citiesList from './cities'

/**
 * Leaflet object with map, tileLayer, marker, and geoJSON methods.
 * @property {Function} map - Creates a new map instance.
 * @property {Function} tileLayer - Creates a new tile layer instance.
 * @property {Function} marker - Creates a new marker instance.
 * @property {Function} geoJSON - Creates a new GeoJSON layer instance.
 */

declare const L: {
  map: (id: string) => Map
  tileLayer: (url: string, options: TileLayerOptions) => TileLayer
  marker: (latlng: [number, number]) => Marker
  geoJSON: typeof geoJSON
}

function getRandomCity(): { id: string; city: string; coordinates: [number, number] } {
  const cities = Object.values(citiesList).flat()
  const randomIndex = Math.floor(Math.random() * cities.length)
  return cities[randomIndex]
}

const randomCity = getRandomCity()
const mapElement = 'leafletMap'
const leafletMap: Map = L.map(mapElement).setView(randomCity.coordinates, 13)

const createSearchBar = () => {
  const citiesSelector: HTMLSelectElement = document.getElementById(
    'cities-selector'
  ) as HTMLSelectElement

  Object.entries(citiesList).forEach(([state, cities]) => {
    const optgroup = document.createElement('optgroup')
    optgroup.label = state
    cities.forEach(({ city, id }) => {
      const option = document.createElement('option')
      option.value = id
      option.innerText = city
      if (id === randomCity.id) {
        citiesSelector.title = city
        option.selected = true
      }
      optgroup.appendChild(option)
    })
    citiesSelector?.appendChild(optgroup)
  })

  citiesSelector.onchange = event => {
    const selectedCity = Object.values(citiesList)
      .flat()
      .find(({ id }) => id === (event.target as HTMLSelectElement)?.value || null)
    if (selectedCity) {
      citiesSelector.title = selectedCity.city
      leafletMap.setView(selectedCity.coordinates, 13)
    }
  }
}

createSearchBar()

// Define tile layer URL and options
const tileLayerUrl: string = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const tileLayerOptions: TileLayerOptions = {
  attribution:
    'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  maxZoom: 18
}

// Add tile layer to the map
L.tileLayer(tileLayerUrl, tileLayerOptions).addTo(leafletMap)

// Fetch geoJSON data from a URL and add it to the map
const drawGeoJSON = async <T>(url: string, options: GeoJSONOptions<T> = {}) => {
  const data = await jsonFetch(url)
  L.geoJSON(data, options).addTo(leafletMap)
}

// Fetch JSON data from a URL
const jsonFetch = async (url: string) => {
  const response = await fetch(url)
  const data = await response.json()
  return data
}

// Define a type for the properties of a GeoJSON feature
type featureProp = {
  quadkey: string
  avg_d_kbps: number // kilobits per second
  avg_u_kbps: number // kilobits per second
  avg_lat_ms: number // mili seconds
  tests: number
  devices: number
  descarga_fijo?: number // Megabits per second
  subida_fijo?: number // Megabits per second
}

// Define a function to get a color based on speed
enum SpeedRange {
  VerySlow = 1,
  Slow = 10,
  BelowAverage = 50,
  Average = 100,
  Fast = 250,
  VeryFast = 500
  // ExtremelyFast = 1000
}

const getColor = (speed: number): string =>
  speed <= SpeedRange.VerySlow
    ? '#FF0000' // red
    : speed <= SpeedRange.Slow
    ? '#FF5733' // orange
    : speed <= SpeedRange.BelowAverage
    ? '#FFC300' // yellow
    : speed <= SpeedRange.Average
    ? '#DAF7A6' // light green
    : speed <= SpeedRange.Fast
    ? '#7FFF00' // green
    : speed <= SpeedRange.VeryFast
    ? '#00FF00' // bright green
    : '#00FF7F' // turquoise for ExtremelyFast

// Draw GeoJSON data on the map with styling and popups
drawGeoJSON<featureProp>(
  'https://raw.githubusercontent.com/lab-tecnosocial/velocidad_internet_BO/main/2021/fijo-T1-2021.geojson',
  {
    style: feature => {
      const descarga_fijo = feature?.properties?.descarga_fijo
      return {
        fillColor: getColor(descarga_fijo || 0),
        weight: 0.5,
        opacity: 0.75,
        color: '#000',
        fillOpacity: 0.5
      }
    },
    onEachFeature: (
      { properties: { descarga_fijo, subida_fijo, avg_lat_ms, tests, devices } },
      layer
    ) => {
      layer.bindPopup(`
    <ul>
      <li><b>Velocidad de descarga:</b> ${descarga_fijo} Mbps</li>
      <li><b>Velocidad de subida:</b> ${subida_fijo} Mbps</li>
      <li><b>Latencia:</b> ${avg_lat_ms} ms</li>
      <li><b>Test realizados:</b> ${tests}</li>
      <li><b>Dispositivos:</b> ${devices}</li>
    </ul>
    `)
    }
  }
)
