import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * 📌 Componente `NavbarComponent`
 *
 * Este componente representa la barra de navegación de la aplicación.
 * Incluye enlaces a distintas secciones del sitio y un sistema de menús desplegables.
 * También maneja el cierre automático de los menús después de un tiempo o cuando
 * el usuario hace clic fuera de ellos.
 *
 * ℹ️ **Uso:** Se coloca en la parte superior de la aplicación para permitir la navegación global.
 */
@Component({
  standalone: true,
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements AfterViewInit {
  /**
   * Constructor del componente.
   * @param elementRef - Referencia al elemento del DOM del componente.
   */
  constructor(private elementRef: ElementRef) {}

  /**
   * 📌 Método `ngAfterViewInit()`
   *
   * - Agrega eventos a los menús desplegables para cerrarlos automáticamente después de 1.5 segundos.
   * - Detecta clics fuera de los menús para cerrarlos si están abiertos.
   */
  ngAfterViewInit() {
    /**
     * 🔹 Función para cerrar un menú desplegable dado su ID.
     * @param menuId - ID del menú que se desea cerrar.
     */
    const cerrarMenu = (menuId: string) => {
      const menu = document.getElementById(menuId);
      if (menu) {
        menu.classList.remove('show');
      }
    };

    // Obtener todos los elementos con la clase 'nav-link dropdown-toggle' dentro del componente
    const dropdownToggles = this.elementRef.nativeElement.querySelectorAll('.nav-link.dropdown-toggle');

    // Agregar event listeners a cada elemento desplegable
    dropdownToggles.forEach((toggle: HTMLElement) => {
      toggle.addEventListener('click', function () {
        // Obtener el ID del menú correspondiente
        const menuId = this.id.replace('Dropdown', 'Menu');

        // Configurar el temporizador para cerrar el menú después de 1 segundos
        setTimeout(() => cerrarMenu(menuId), 1000);
      });
    });
    

    // Cerrar los menús al hacer clic fuera de ellos
    document.addEventListener('click', (event: MouseEvent) => {
      dropdownToggles.forEach((toggle: HTMLElement) => {
        const menuId = toggle.id.replace('Dropdown', 'Menu');
        const menu = document.getElementById(menuId);
        // Verificar si el clic fue fuera del menú y del botón que lo abre
        if (menu && !menu.contains(event.target as Node) && !toggle.contains(event.target as Node)) {
          cerrarMenu(menuId);
        }
      });
    });
  }
}
