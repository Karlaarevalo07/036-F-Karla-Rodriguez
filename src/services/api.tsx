// src/services/api.tsx

// Dirección base de la API (solo actualízala cuando sepas cuál es)
const API_BASE_URL = "https://ejemploapi.com/api"; // 👈 Cambia esta URL cuando tengas la API real

// Función genérica GET
export async function getData(endpoint: string) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error al obtener datos:", error);
    throw error;
  }
}

// Función genérica POST
export async function postData(endpoint: string, data: unknown) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error al enviar datos:", error);
    throw error;
  }
}


