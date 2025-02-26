import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';

/**
 * 📌 Componente `LoginComponent`
 *
 * Este componente gestiona el inicio de sesión verificando los datos almacenados en `localStorage`.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, CommonModule]
})
export class LoginComponent {
  /**
   * 📌 Formulario de inicio de sesión.
   * Contiene los campos de email y contraseña con sus respectivas validaciones.
   */
  loginForm: FormGroup;

  /**
   * 📌 Mensaje de error en caso de credenciales incorrectas.
   */
  mensajeError: string | null = null;

  /**
   * Constructor del componente.
   * @param fb - Servicio `FormBuilder` para crear el formulario reactivo.
   * @param router - Servicio `Router` para redirigir al usuario tras el inicio de sesión.
   */
  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  /**
   * 📌 Método que se ejecuta al enviar el formulario.
   *
   * - Verifica que el formulario sea válido.
   * - Busca el usuario en `localStorage` y valida la contraseña.
   * - Si el inicio de sesión es correcto, almacena los datos en `sessionStorage` y redirige.
   */
  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      // Obtener la lista de usuarios desde localStorage
      const usuariosGuardados = localStorage.getItem('usuarios');
      const usuarios = usuariosGuardados ? JSON.parse(usuariosGuardados) : [];

      // Buscar si el usuario existe
      const usuarioEncontrado = usuarios.find((u: any) => u.email === email);

      if (usuarioEncontrado && usuarioEncontrado.password === password) {
        // Guardar usuario en `sessionStorage` para mantener la sesión iniciada
        sessionStorage.setItem('usuarioActual', JSON.stringify(usuarioEncontrado));

        console.log('Inicio de sesión exitoso:', usuarioEncontrado);
        this.router.navigate(['/profile']); // Redirige al perfil del usuario
      } else {
        this.mensajeError = 'Email o contraseña incorrectos.';
      }
    }
  }

  /**
   * 📌 Método para obtener mensajes de error en los campos del formulario.
   * @param campo - Nombre del campo del formulario (email o password).
   * @returns Mensaje de error correspondiente según la validación que haya fallado.
   */
  getErrorMessage(campo: string): string {
    const control = this.loginForm.get(campo);
    if (control?.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if (campo === 'email' && control?.hasError('email')) {
      return 'Por favor, introduce un email válido';
    }
    if (campo === 'password' && control?.hasError('minlength')) {
      return 'La contraseña debe tener al menos 6 caracteres';
    }
    return '';
  }
}
