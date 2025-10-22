import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { signupSchema, SignupFormData } from '../lib/schemas/authSchema';
import "@/global.css";

export default function SignupScreen() {
  const [formData, setFormData] = useState<SignupFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof SignupFormData, string>>>({});
  const [touchedFields, setTouchedFields] = useState<Partial<Record<keyof SignupFormData, boolean>>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateField = (fieldName: keyof SignupFormData, value: string) => {
    try {
      if (fieldName === 'confirmPassword') {
        signupSchema.parse({ ...formData, [fieldName]: value });
      } else {
        const fieldSchema = signupSchema.shape[fieldName];
        if (fieldSchema) fieldSchema.parse(value);
      }
      setErrors(prev => ({ ...prev, [fieldName]: undefined }));
    } catch (err: any) {
      if (err.errors && err.errors[0]) {
        setErrors(prev => ({ ...prev, [fieldName]: err.errors[0].message }));
      }
    }
  };

  const handleChangeText = (fieldName: keyof SignupFormData, value: string) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
    if (touchedFields[fieldName]) validateField(fieldName, value);
  };

  const handleBlur = (fieldName: keyof SignupFormData) => {
    setTouchedFields(prev => ({ ...prev, [fieldName]: true }));
    validateField(fieldName, formData[fieldName]);
  };

  const handleSubmit = () => {
    try {
      signupSchema.parse(formData);
      Alert.alert(
        '¡Registro exitoso! ✅',
        `Nombre: ${formData.name}\nEmail: ${formData.email}`,
        [{ text: 'OK' }]
      );
      setErrors({});
    } catch (err: any) {
      if (err.errors) {
        const newErrors: Partial<Record<keyof SignupFormData, string>> = {};
        err.errors.forEach((error: any) => {
          newErrors[error.path[0] as keyof SignupFormData] = error.message;
        });
        setErrors(newErrors);
        setTouchedFields({
          name: true,
          email: true,
          password: true,
          confirmPassword: true
        });
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-[#0a1628]"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View className="flex-1 justify-center px-6 py-12">
          {/* Header */}
          <View className="mb-10">
            <Text className="text-4xl font-bold text-white mb-2">Crear Cuenta</Text>
            <Text className="text-lg text-blue-400 opacity-90">
              Completa tus datos para registrarte
            </Text>
          </View>

          {/* Formulario */}
          <View className="gap-5">
            {/* Campo Nombre */}
            <View className="mb-5">
              <Text className="text-sm font-semibold mb-2 text-blue-400">Nombre completo</Text>
              <TextInput
                value={formData.name}
                onChangeText={(text) => handleChangeText('name', text)}
                onBlur={() => handleBlur('name')}
                placeholder="Juan Pérez"
                placeholderTextColor="#64748b"
                autoComplete="name"
                className={`bg-blue-900/30 border-2 border-blue-900 rounded-xl px-4 py-4 text-base text-white shadow-blue-400 shadow-sm 
                  ${errors.name && touchedFields.name ? 'border-red-500 shadow-none' : ''}`}
              />
              {errors.name && touchedFields.name && (
                <View className="mt-2 bg-red-500/10 rounded-lg px-3 py-2">
                  <Text className="text-red-500 text-xs">⚠️ {errors.name}</Text>
                </View>
              )}
            </View>

            {/* Campo Email */}
            <View className="mb-5">
              <Text className="text-sm font-semibold mb-2 text-blue-400">Correo electrónico</Text>
              <TextInput
                value={formData.email}
                onChangeText={(text) => handleChangeText('email', text)}
                onBlur={() => handleBlur('email')}
                placeholder="correo@ejemplo.com"
                placeholderTextColor="#64748b"
                keyboardType="email-address"
                autoComplete="email"
                autoCapitalize="none"
                className={`bg-blue-900/30 border-2 border-blue-900 rounded-xl px-4 py-4 text-base text-white shadow-blue-400 shadow-sm 
                  ${errors.email && touchedFields.email ? 'border-red-500 shadow-none' : ''}`}
              />
              {errors.email && touchedFields.email && (
                <View className="mt-2 bg-red-500/10 rounded-lg px-3 py-2">
                  <Text className="text-red-500 text-xs">⚠️ {errors.email}</Text>
                </View>
              )}
            </View>

            {/* Campo Contraseña */}
            <View className="mb-5">
              <Text className="text-sm font-semibold mb-2 text-blue-400">Contraseña</Text>
              <View className="relative">
                <TextInput
                  value={formData.password}
                  onChangeText={(text) => handleChangeText('password', text)}
                  onBlur={() => handleBlur('password')}
                  placeholder="••••••••"
                  placeholderTextColor="#64748b"
                  secureTextEntry={!showPassword}
                  autoComplete="password-new"
                  className={`bg-blue-900/30 border-2 border-blue-900 rounded-xl px-4 py-4 pr-12 text-base text-white shadow-blue-400 shadow-sm 
                    ${errors.password && touchedFields.password ? 'border-red-500 shadow-none' : ''}`}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4"
                >
                  <Text className="text-lg">{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
                </TouchableOpacity>
              </View>
              {errors.password && touchedFields.password && (
                <View className="mt-2 bg-red-500/10 rounded-lg px-3 py-2">
                  <Text className="text-red-500 text-xs">⚠️ {errors.password}</Text>
                </View>
              )}
            </View>

            {/* Campo Confirmar Contraseña */}
            <View className="mb-5">
              <Text className="text-sm font-semibold mb-2 text-blue-400">Confirmar contraseña</Text>
              <View className="relative">
                <TextInput
                  value={formData.confirmPassword}
                  onChangeText={(text) => handleChangeText('confirmPassword', text)}
                  onBlur={() => handleBlur('confirmPassword')}
                  placeholder="••••••••"
                  placeholderTextColor="#64748b"
                  secureTextEntry={!showConfirmPassword}
                  autoComplete="password-new"
                  className={`bg-blue-900/30 border-2 border-blue-900 rounded-xl px-4 py-4 pr-12 text-base text-white shadow-blue-400 shadow-sm 
                    ${errors.confirmPassword && touchedFields.confirmPassword ? 'border-red-500 shadow-none' : ''}`}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-4"
                >
                  <Text className="text-lg">{showConfirmPassword ? '👁️' : '👁️‍🗨️'}</Text>
                </TouchableOpacity>
              </View>
              {errors.confirmPassword && touchedFields.confirmPassword && (
                <View className="mt-2 bg-red-500/10 rounded-lg px-3 py-2">
                  <Text className="text-red-500 text-xs">⚠️ {errors.confirmPassword}</Text>
                </View>
              )}
            </View>

            {/* Botón Submit */}
            <TouchableOpacity
              onPress={handleSubmit}
              activeOpacity={0.8}
              className="bg-blue-500 rounded-xl py-4 mt-6 shadow-blue-400 shadow-lg"
            >
              <Text className="text-white text-center text-lg font-bold">Registrarse</Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View className="mt-8">
            <Text className="text-center text-blue-400 opacity-80">
              ¿Ya tienes cuenta?{' '}
              <Text className="font-bold text-white">Inicia sesión</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
