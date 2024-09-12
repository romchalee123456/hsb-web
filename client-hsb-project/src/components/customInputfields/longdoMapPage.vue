<script>
import { ref, onMounted, defineProps } from 'vue';
import AutoComplete from 'primevue/autocomplete'; // Ensure this is the correct path
import axios from 'axios';
import 'primeicons/primeicons.css'
import projectService from '@/service/projectService';

export default {
  name: "LongdoMap",
  components: {
    AutoComplete
  },
  props: {
    id: {
      type: Number,
      required: true
    },
    locationsCode: {
      default: "",
      type: String,
      required: true,
    },
    lat: {
      type: Number,
      required: true,
    },
    lon: {
      type: Number,
      required: true,
    },
  },
  setup(props ,{ emit }) {

    const value = ref('');
    const markerRef = ref();
    const items = ref([]); // Replace with your actual items or suggestions
    const search = async (event) => {
      const res = await axios.get(
        `https://search.longdo.com/smartsearch/json/search?keyword=${event.query}&key=2dad446cee13a4155665e5000991ef93`,
      )

      const result = res.data;

      items.value = result.data
    };

    const searchSelected = async (event) => {

      value.value = event.value;
      const map = new longdo.Map({
        placeholder: document.getElementById("map"),
      });
      map.location({ lon: event.value.lon, lat: event.value.lat }, true);
      markerRef.value = marker;
      var marker = new longdo.Marker({ lon: event.value.lon, lat: event.value.lat });

      map.Overlays.add(marker);
    }

    const addMarkerData = async () => {
      const map = new longdo.Map({
        placeholder: document.getElementById("map"),
      });

      // Get the current location (lat, lon)
      const result = map.location();

      // Add a marker on the map at the current location
      const marker = new longdo.Marker(result);
      markerRef.value = marker;
      map.Overlays.add(marker);

      try {
        // Reverse geocoding to get location name and ID
        const res = await axios.get(
          `https://api.longdo.com/POIService/json/search?lon=${result.lon}&lat=${result.lat}&key=2dad446cee13a4155665e5000991ef93`
        );

        const locationData = res.data;
        console.log("Location Name:", locationData);
        // Assuming the response includes name and id fields
        const locationName = locationData.address || 'Unknown Location'; // Adjust based on actual response format
        const locationCode = locationData.id || 'Unknown ID';

        console.log("Location Name:", locationName);
        console.log("Location Code (ID):", locationCode);

        value.value = locationData.data[0];
        // You can now use these values to update the UI or trigger other actions
      } catch (error) {
        console.error("Error fetching location details:", error);
      }
    };
    const removeMarkerData = async () => {
      const map = new longdo.Map({
        placeholder: document.getElementById("map"),
      });
      map.Overlays.clear();
      value.value = '';
    }

    const updateProjectLocation = async () => {

      if(value.value){
        const locationsData =
      {
        locationCode: value.value.id,
        locationName: value.value.name,
        lon: value.value.lon,
        lat: value.value.lat,
      }

      const res = await projectService.updateProjectLocation(locationsData, props.id);

      if (res.status === 'success') {
        // alert("กรุณาเลือกที่ตั้ง");

       await emit('location-updated', locationsData);

      }
      }else{
        emit('location-Wanning');
       
      }
      


    }

    const fetchDataLocations = async () => {
      const map = new longdo.Map({
        placeholder: document.getElementById("map"),
      });

      try {
        // Reverse geocoding to get location name and ID
        const res = await axios.get(
          `https://api.longdo.com/POIService/json/search?lon=${props.lon}&lat=${props.lat}&key=2dad446cee13a4155665e5000991ef93`
        );
        console.log(res.data);
        const locationData = res.data;

        map.location({ lon: locationData.data[0].lon, lat: locationData.data[0].lat }, true);
        // Add a marker on the map at the current location
        const marker = new longdo.Marker({ lon: locationData.data[0].lon, lat: locationData.data[0].lat });
        markerRef.value = marker;
        map.Overlays.add(marker);

        console.log("Location Name:", locationData);
        // Assuming the response includes name and id fields
        const locationName = locationData.address || 'Unknown Location'; // Adjust based on actual response format
        const locationCode = locationData.id || 'Unknown ID';

        console.log("Location Name:", locationName);
        console.log("Location Code (ID):", locationCode);

        value.value = locationData.data[0];
        // You can now use these values to update the UI or trigger other actions
      } catch (error) {
        console.error("Error fetching location details:", error);
      }
    };
    onMounted(async () => {
      console.log(props.id);
      const map = new longdo.Map({
        placeholder: document.getElementById("map"),
      });
      map.location({ lon: 100, lat: 16 }, true); // Go to 100, 16 when created map
      console.log(props.locationsCode);
      if (props.locationsCode != "") {
        await fetchDataLocations();
      }
    });

    return {
      value,
      items,
      search,
      searchSelected,
      addMarkerData,
      updateProjectLocation,
      removeMarkerData
    };
  }
};
</script>

<template>
  <div class="grid" style="padding-bottom: 10px;padding-top: 10px;">
    <div class="col">
      <div class="bg-primary" style="width: 100%; padding: 0;">
        <AutoComplete v-model="value" optionLabel="name" :suggestions="items" @complete="search"
          @item-select="searchSelected" inputStyle="width: 100%;" style="width: 100%;">
          <template #option="slotProps">
            <div class="flex align-items-center">
              <div>{{ slotProps.option.name }}</div>
            </div>
          </template>
        </AutoComplete>
      </div>
    </div>
    <div class="col-1">
      <div class="font-bold">
        <Button type="button" label="เพิ่มหมุด" @click="addMarkerData"
          style="background-color: red;border-color: red;" />
        <Button type="button" label="ลบหมุด" @click="removeMarkerData" />
        <Button type="button" label="บันทึกที่ตั้ง" @click="updateProjectLocation" severity="info" />
      </div>
    </div>

  </div>
  <div class="grid">

  </div>
  <div id="result"></div>
  <div id="map"></div>
</template>

<style scoped>
html,
body,
#map {
  height: 100%;
  margin: 0;
}

.grid {
  display: flex;
  flex-wrap: wrap;
  margin-right: -0.5rem;
  margin-left: -0.5rem;
  margin-top: -0.5rem;
}

.col {
  flex-grow: 1;
  flex-basis: 0;
  /* padding: $gutter; */
}

.w-full {
  width: 100%;
}

.col-1 {
  flex: 0 0 auto;
  width: 40%;
}
</style>
