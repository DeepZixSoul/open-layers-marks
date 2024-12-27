export default {
  name: "MarkerForm",
  props: {
    coordinates: {
      type: Array,
      required: true,
    },
    id: {
      type: Number, // ID generado en el padre
      required: true,
    },
  },
  data() {
    return {
      form: {
        id: this.id,
        name: "",
        icon: [],
        address: "",
        updated: false,
        images: [],
      },
    };
  },
  methods: {
    handleSubmit() {
      this.$emit("save", { ...this.form, coordinates: this.coordinates });
    },
    handleFileUpload(event) {
      const files = Array.from(event.target.files);
      this.form.icon = files.map((file) => URL.createObjectURL(file)); // Crear URLs temporales para mostrar el icono
    },
  },
};
