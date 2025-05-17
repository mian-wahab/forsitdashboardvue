<template>
  <div class="add-product-page">
    <h1>Add New Product</h1>
    <form @submit.prevent="submitForm" class="product-form">

      <!-- Name -->
      <label>
        Product Name
        <input v-model="form.name" type="text" required />
      </label>

      <!-- Description -->
      <label>
        Description
        <textarea v-model="form.description" rows="4" required />
      </label>

      <!-- Category -->
      <label>
        Category
        <input v-model="form.category" type="text" placeholder="e.g. Electronics" />
      </label>

      <!-- Price -->
      <label>
        Price ($)
        <input v-model.number="form.price" type="number" step="0.01" min="0" required />
      </label>

      <!-- Initial Stock -->
      <label>
        Initial Stock
        <input v-model.number="form.stock" type="number" min="0" required />
      </label>

      <!-- Image Upload -->
      <label>
        Product Image
        <input @change="onFileChange" type="file" accept="image/*" />
      </label>
      <div v-if="previewUrl" class="preview">
        <img :src="previewUrl" alt="Image Preview" />
      </div>

      <button type="submit" :disabled="submitting">
        {{ submitting ? 'Adding...' : 'Add Product' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { addProduct } from '@/services/inventoryService.js'

const router = useRouter()
const form = ref({
  name: '',
  description: '',
  category: '',
  price: null,
  stock: null,
  imageFile: null
})
const previewUrl = ref(null)
const submitting = ref(false)

// Handle file input -> Data URL
function onFileChange(e) {
  const file = e.target.files[0]
  if (!file) return
  form.value.imageFile = file
  const reader = new FileReader()
  reader.onload = () => { previewUrl.value = reader.result }
  reader.readAsDataURL(file)
}

// Submit the form
async function submitForm() {
  submitting.value = true
  try {
    const imageDataUrl = previewUrl.value // could be null
    await addProduct({
      name: form.value.name,
      description: form.value.description,
      category: form.value.category || 'Uncategorized',
      price: form.value.price,
      stock: form.value.stock,
      imageDataUrl
    })
    // after adding, navigate to inventory page to see it reflected
    router.push('/inventory')
  } catch (err) {
    console.error(err)
    alert('Failed to add product.')
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.add-product-page {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
}
.product-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.product-form label {
  display: flex;
  flex-direction: column;
  font-weight: 500;
}
.product-form input,
.product-form textarea {
  margin-top: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.preview img {
  max-width: 200px;
  margin-top: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}
button {
  align-self: flex-start;
  padding: 0.6rem 1.2rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:disabled {
  background-color: #9e9e9e;
  cursor: not-allowed;
}
</style>
