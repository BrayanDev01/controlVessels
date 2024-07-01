<template>
    <div class="map-wrap">
      <div class="map" ref="mapContainer"></div>
    </div>
  </template>
  
  <script setup>
  import { Map, MapStyle, Marker, data, config } from '@maptiler/sdk';
  import { shallowRef, onMounted, onUnmounted, markRaw, ref, toRefs} from 'vue';
  import '@maptiler/sdk/dist/maptiler-sdk.css';
  import caminho from '../map/route.json'
  
  const mapContainer = shallowRef(null);
  const map = shallowRef(null);

  const props = defineProps({
    latitude: String,
    longitude: String
  })
  
  const { latitude } = toRefs(props)
  const { longitude } = toRefs(props)
  const rota = caminho

  const cordinades = { lat: latitude, long: longitude}

  onMounted(() => {
    config.apiKey = `${import.meta.env.VITE_KEY_MAP}`;
    
  
    map.value = markRaw(new Map({
      container: mapContainer.value,
      style: MapStyle.STREETS,
      center: [cordinades.long._object.longitude, cordinades.long._object.latitude],
      zoom: 9
    }));
    
    

    const customMarker = document.createElement('div');
    customMarker.style.backgroundImage = 'url(src/assets/logo_poseidon.png)';
    customMarker.style.backgroundSize = 'cover';
    customMarker.style.width = '40px';
    customMarker.style.height = '40px'; 

    
    new Marker({
      element: customMarker,
      anchor:'bottom'
    })
    .setLngLat([cordinades.long._object.longitude, cordinades.long._object.latitude])
    .addTo(map.value);

    // Função de colocar o tracejado no mapa
    // Está funcionando, mas no momento é feito manualmente

      // map.value.on('load', async function() {
      //   const geojson = caminho;
      //   map.value.addSource('gps_tracks', {
      //     'type': 'geojson',
      //     'data': geojson
      //   });
      //   map.value.addLayer({
      //     'id': 'grand_teton',
      //     'type': 'line',
      //     'source': 'gps_tracks',
      //     'layout': {},
      //     'paint': {
      //       'line-color': '#e11',
      //       'line-width': 4
      //     }
      //   });
      // });
    
    
  }),
  onUnmounted(() => {
    map.value?.remove();
  })
  </script>
  
<style scoped>
  .map-wrap {
    position: relative;
    width: 900px;
    height: 400px;
    box-shadow: 10px 10px 16px -9px rgba(0,0,0,0.41);
  }
  
  .map {
    position: absolute;
    width: 100%;
    height: 100%;
  }
</style>