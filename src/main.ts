import type { Map, TileLayerOptions, GeoJSONOptions } from 'leaflet'
import './style.css'
import 'leaflet/dist/leaflet.css'
import { map, tileLayer, geoJSON } from 'leaflet'
import citiesList from './cities'

// Get a random city from the list of cities
const getRandomCity = (): { id: string; city: string; coordinates: [number, number] } => {
  const cities = Object.values(citiesList).flat()
  const randomIndex = Math.floor(Math.random() * cities.length)
  return cities[randomIndex]
}

// Set up the Leaflet map with a random city as the initial view
const randomCity = getRandomCity()
const mapElementId = 'leafletMap'
const leafletMap: Map = map(mapElementId).setView(randomCity.coordinates, 13)

// Create a search bar for selecting cities
const createSearchBar = () => {
  const citiesSelector: HTMLSelectElement = document.getElementById(
    'cities-selector'
  ) as HTMLSelectElement

  // Add each state and its cities to the search bar
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

  // Update the map view when a city is selected
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

// Call the createSearchBar function to set up the search bar
createSearchBar()

// Define tile layer URL and options
const tileLayerUrl: string = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const tileLayerOptions: TileLayerOptions = {
  attribution:
    'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  maxZoom: 18
}

// Add tile layer to the map
tileLayer(tileLayerUrl, tileLayerOptions).addTo(leafletMap)

// Fetch geoJSON data from a URL and add it to the map
const drawGeoJSON = async <T>(url: string, options: GeoJSONOptions<T> = {}) => {
  const data = await jsonFetch(url)
  geoJSON(data, options).addTo(leafletMap)
}

// Fetch JSON data from a URL
const jsonFetch = async (url: string) => {
  const response = await fetch(url)
  const data = await response.json()
  return data
}

// Define a type for the properties of a GeoJSON feature
type FeatureProperties = {
  quadkey: string
  descarga_fijo: number // Megabits per second
  subida_fijo: number // Megabits per second
  avg_lat_ms: number // milliseconds
  tests: number
  devices: number
}

// Define a function to get a color based on download speed
enum SpeedRange {
  VerySlow = 1,
  Slow = 10,
  BelowAverage = 50,
  Average = 100,
  Fast = 250,
  VeryFast = 500
}

const getColor = (downloadSpeed: number): string =>
  downloadSpeed <= SpeedRange.VerySlow
    ? '#FF0000' // red
    : downloadSpeed <= SpeedRange.Slow
    ? '#FF5733' // orange
    : downloadSpeed <= SpeedRange.BelowAverage
    ? '#FFC300' // yellow
    : downloadSpeed <= SpeedRange.Average
    ? '#DAF7A6' // light green
    : downloadSpeed <= SpeedRange.Fast
    ? '#7FFF00' // green
    : downloadSpeed <= SpeedRange.VeryFast
    ? '#00FF00' // bright green
    : '#00FF7F' // turquoise for ExtremelyFast

// Draw GeoJSON data on the map with styling and popups
drawGeoJSON<FeatureProperties>(
  'https://raw.githubusercontent.com/lab-tecnosocial/velocidad_internet_BO/main/2021/fijo-T1-2021.geojson',
  {
    style: feature => {
      const downloadSpeed = feature?.properties?.descarga_fijo
      return {
        fillColor: getColor(downloadSpeed || 0),
        weight: 0.5,
        opacity: 0.75,
        color: '#000',
        fillOpacity: 0.5
      }
    },
    onEachFeature: (
      {
        properties: {
          descarga_fijo: downloadSpeed,
          subida_fijo: uploadSpeed,
          avg_lat_ms: latency,
          tests,
          devices
        }
      },
      layer
    ) => {
      layer.bindPopup(`
    <ul>
      <li><b>Velocidad de bajada:</b> ${downloadSpeed} Mbps</li>
      <li><b>Velocidad de subida:</b> ${uploadSpeed} Mbps</li>
      <li><b>Latencia:</b> ${latency} ms</li>
      <li><b>Tests:</b> ${tests}</li>
      <li><b>Dispositivos:</b> ${devices}</li>
    </ul>
    `)
    }
  }
)
