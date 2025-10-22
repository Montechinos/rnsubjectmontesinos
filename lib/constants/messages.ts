export const VALIDATION_MESSAGES = {
    name: {
      required: 'El nombre es obligatorio',
      minLength: 'El nombre debe tener al menos 3 caracteres',
      maxLength: 'El nombre no puede exceder 50 caracteres'
    },
    email: {
      required: 'El correo electrónico es obligatorio',
      invalid: 'Por favor ingresa un correo electrónico válido'
    },
    password: {
      required: 'La contraseña es obligatoria',
      minLength: 'La contraseña debe tener al menos 8 caracteres',
      uppercase: 'Debe contener al menos una letra mayúscula',
      lowercase: 'Debe contener al menos una letra minúscula',
      number: 'Debe contener al menos un número',
      special: 'Debe contener al menos un carácter especial (!@#$%^&*)'
    },
    confirmPassword: {
      required: 'Debes confirmar tu contraseña',
      mismatch: 'Las contraseñas no coinciden'
    }
  } as const;