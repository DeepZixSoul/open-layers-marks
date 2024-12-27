<template>
  <div>
    <!-- Mapa -->
    <div id="map" style="width: 80%; height: 70vh"></div>

    <!-- Popup con el formulario o información -->
    <div id="popup" class="ol-popup">
      <!-- Formulario para agregar un marcador -->
      <MarkerForm
        v-if="showForm"
        :coordinates="currentCoordinates"
        :next-id="nextId"
        @save="saveMarkerData"
        @cancel="cancelForm"
      />

      <!-- Información del marcador seleccionado -->
      <div v-if="markerInfo" id="popup-content">
        <div class="popup-header">
          <h3>Cliente</h3>
          <!-- Imagen del icono a la derecha del título -->
          <img
            v-if="markerInfo.icon && markerInfo.icon.length > 0"
            :src="markerInfo.icon[0]"
            alt="Icono"
            width="50"
            height="50"
            style="
              border-radius: 50%;
              border: 1px solid #ddd;
              margin-left: 10px;
            "
          />
        </div>

        <ul>
          <li><strong>ID:</strong> {{ markerInfo.id }}</li>
          <li><strong>Nombre:</strong> {{ markerInfo.name }}</li>
          <li><strong>Dirección:</strong> {{ markerInfo.address }}</li>
          <li>
            <strong>Actualizado:</strong> {{ markerInfo.updated ? "Sí" : "No" }}
          </li>
          <li>
            <strong>Imágenes:</strong>
            <ul>
              <li v-for="image in markerInfo.images" :key="image.name">
                {{ image.name }}
              </li>
            </ul>
          </li>
        </ul>
        <button @click="closePopup">Cerrar</button>
      </div>
    </div>

    <!-- Tabla de marcadores -->
    <div id="marker-list">
      <h3>Clientes</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Icono</th>
            <th>Dirección</th>
            <th>Actualizado</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="marker in markers"
            :key="marker.id"
            @click="showMarkerInfo(marker)"
          >
            <td>{{ marker.id }}</td>
            <td>{{ marker.name }}</td>
            <td>
              <img :src="marker.iconUrl" alt="Icono" width="32" height="32" />
            </td>
            <td>{{ marker.address }}</td>
            <td>{{ marker.updated ? "Sí" : "No" }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script src="./MapComponent.js"></script>
<style src="./MapComponent.css"></style>
