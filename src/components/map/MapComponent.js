import "ol/ol.css";
import Overlay from "ol/Overlay";
import Map from "ol/Map";
import View from "ol/View";
import { defaults as defaultControls, ScaleLine } from "ol/control";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { OSM, Vector as VectorSource } from "ol/source";

import MarkerForm from "@/components/form/MakerForm.vue";
import { createMarker } from "@/utils/markerUtils";

export default {
  name: "MapComponent",
  components: {
    MarkerForm,
  },
  data() {
    return {
      map: null,
      vectorSource: null,
      popupOverlay: null, // Overlay para el popup del formulario
      showForm: false,
      currentCoordinates: null,
      nextId: 1,
      markers: [],
      markerInfo: null,
    };
  },
  mounted() {
    this.initiateMap();
    this.createPopupOverlay();
    this.setupMapClickListener();
  },
  methods: {
    initiateMap() {
      const raster = new TileLayer({
        source: new OSM(),
      });
      this.vectorSource = new VectorSource();

      this.vectorLayer = new VectorLayer({
        source: this.vectorSource,
      });

      this.map = new Map({
        controls: defaultControls().extend([
          new ScaleLine({
            units: "degrees",
          }),
        ]),
        target: "map",
        layers: [raster, this.vectorLayer],
        view: new View({
          projection: "EPSG:4326",
          center: [-0.9050238876558648, 38.11140787888144],
          zoom: 14,
        }),
      });
    },
    createPopupOverlay() {
      this.popupOverlay = new Overlay({
        element: document.getElementById("popup"),
        autoPan: true,
        autoPanAnimation: {
          duration: 250,
        },
      });
      this.map.addOverlay(this.popupOverlay);
    },
    setupMapClickListener() {
      this.map.on("click", (event) => {
        const feature = this.map.forEachFeatureAtPixel(
          event.pixel,
          (feature) => feature
        );

        if (feature) {
          // Si se hizo clic en un marcador
          this.markerInfo = feature.getProperties();
          this.showForm = false; // Asegurarse de cerrar el formulario
          this.popupOverlay.setPosition(event.coordinate);
        } else {
          // Si se hizo clic en un área vacía
          this.markerInfo = null; // Limpiar cualquier información de marcador previa
          this.showForm = true; // Mostrar el formulario
          this.currentCoordinates = event.coordinate;
          this.popupOverlay.setPosition(event.coordinate);
        }
      });
    },

    saveMarkerData(markerData) {
      console.log("Guardando marcador:", markerData);

      // Asignar el ID del siguiente marcador
      markerData.id = this.nextId;

      // Usar el icono por defecto si no se especifica
      const iconUrl = markerData.iconUrl || "/icons/weitec2.png";

      // Crear el marcador con las coordenadas y el icono
      const marker = createMarker(markerData.coordinates, iconUrl);

      // Establecer las propiedades del marcador (incluyendo el ID)
      marker.setProperties(markerData);

      // Añadir el marcador a la capa de vectores
      this.vectorSource.addFeature(marker);

      // Agregar el marcador con el ID al array de marcadores
      this.markers.push({
        id: this.nextId, // Asegurarte de que el ID está en los datos
        ...markerData,
      });

      // Incrementar el siguiente ID para el próximo marcador
      this.nextId += 1;

      // Cerrar el formulario
      this.cancelForm();
    },
    cancelForm() {
      this.showForm = false;
      this.popupOverlay.setPosition(undefined); // Ocultar el popup
    },
    closePopup() {
      this.markerInfo = null;
      this.popupOverlay.setPosition(undefined); // Ocultar el popup
    },
  },
};
