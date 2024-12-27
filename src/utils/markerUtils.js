import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Style, Icon } from "ol/style";

/**
 * Crea un marcador con un ícono personalizado.
 * @param {Array<number>} coordinates - Coordenadas del marcador [longitud, latitud].
 * @param {string} iconUrl - URL del ícono.
 * @param {number} [scale=0.1] - Escala del ícono (opcional, por defecto 0.1).
 * @returns {Feature} - El marcador como una característica de OpenLayers.
 */
export function createMarker(coordinates, iconUrl, scale = 0.5) {
  const markerStyle = new Style({
    image: new Icon({
      anchor: [0.5, 1], // Punto de anclaje (centro inferior del ícono)
      src: iconUrl, // URL del ícono
      scale, // Tamaño del ícono
    }),
  });

  const marker = new Feature({
    geometry: new Point(coordinates), // Geometría del marcador
  });

  marker.setStyle(markerStyle);
  return marker; // Devuelve el marcador creado
}
