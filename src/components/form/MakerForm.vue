<template>
  <div id="form-modal">
    <form @submit.prevent="handleSubmit">
      <h3>Añadir Información del Marcador</h3>
      <label>ID</label>
      <input type="text" v-model="form.id" disabled />

      <label>Nombre del Cliente:</label>
      <input type="text" v-model="form.name" required />

      <label>Icono de la Empresa (URL):</label>
      <input type="file" @change="handleFileUpload" multiple />

      <label>Dirección:</label>
      <input type="text" v-model="form.address" required />

      <div class="checkbox-container">
        <label>Actualizada</label>
        <input type="checkbox" v-model="form.updated" />
      </div>
      <label>Imagenes:</label>
      <input type="file" @change="handleFileUpload" multiple />

      <button type="submit">Guardar</button>
      <button type="button" @click="$emit('cancel')">Cancelar</button>
    </form>
  </div>
</template>

<script src="@/components/form/MakerForm"></script>
<style src="@/components/form/MakerFormSytle.css"></style>
