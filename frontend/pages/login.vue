<template>
  <div class="login-container">
    <h1 class="login-title">Login</h1>
    <form @submit.prevent="handleLogin" class="login-form">
      <div class="form-group">
        <label for="email" class="form-label">Email:</label>
        <input id="email" v-model="email" type="text" class="form-input" required />
      </div>
      <div class="form-group">
        <label for="password" class="form-label">Password:</label>
        <input id="password" v-model="password" type="password" class="form-input" required />
      </div>
      <button type="submit" class="login-button">Log in</button>
    </form>
    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { useAuth } from '~/composables/useAuth';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const error = ref('');

const { login } = useAuth();
const router = useRouter();

async function handleLogin() {
  try {
    console.log('Logging in...');
    await login(email.value, password.value);

    console.log('Login successful, redirecting to /tasks');
    await nextTick();
    router.push('/tasks');
  } catch (err: any) {
    console.error('Error during login:', err.message);
    error.value = err.message;
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.login-title {
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: 20px;
}

.login-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

.form-label {
  display: block;
  margin-bottom: 5px;
  font-size: 1rem;
  color: #333;
}

.form-input {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-input:focus {
  border-color: #4caf50;
  outline: none;
}

.login-button {
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.login-button:hover {
  background-color: #45a049;
}

.error-message {
  margin-top: 15px;
  color: #e74c3c;
  text-align: center;
  font-size: 1rem;
}
</style>
