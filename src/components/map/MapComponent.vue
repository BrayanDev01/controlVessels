<template>
    <div class="map-wrap">
      <div class="map" ref="mapContainer"></div>
    </div>
  </template>
  
  <script setup>
  import { Map, MapStyle, Marker, config } from '@maptiler/sdk';
  import { shallowRef, onMounted, onUnmounted, markRaw } from 'vue';
  import '@maptiler/sdk/dist/maptiler-sdk.css';
  
  const mapContainer = shallowRef(null);
  const map = shallowRef(null);
  
  onMounted(() => {
    console.log("CONSUMINDO")

    config.apiKey = `${import.meta.env.VITE_KEY_MAP}`;
  
    const initialState = { lat: -3.153301, lng: -59.938048, zoom: 11 };

  
    map.value = markRaw(new Map({
      container: mapContainer.value,
      style: MapStyle.STREETS,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom
    }));

    // new Marker({
    //   color: "#FF0000"
    // }).setLngLat([
    //   initialState.lng,
    //   initialState.lat
    // ]).addTo(map.value);

    const customMarker = document.createElement('div');
    customMarker.style.backgroundImage = 'url(src/assets/logo_poseidon.png)';
    customMarker.style.backgroundSize = 'cover';
    customMarker.style.width = '40px';
    customMarker.style.height = '40px'; 

    
    new Marker({
      element: customMarker,
      anchor:'bottom'
    })
    .setLngLat([initialState.lng, initialState.lat])
    .addTo(map.value);
  
  }),
  onUnmounted(() => {
    map.value?.remove();
  })
  </script>
  
<style scoped>
  .map-wrap {
    position: relative;
    width: 500px;
    height: 500px; /* calculate height of the screen minus the heading */
  }
  
  .map {
    position: absolute;
    width: 100%;
    height: 100%;
  }
</style>