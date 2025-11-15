// src/services/api.tsx

const COCKTAIL_API_BASE = "https://www.thecocktaildb.com/api/json/v1/1";

export interface Drink {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

export interface DrinkDetail {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strCategory: string;
  strAlcoholic: string;
  strGlass: string;
  strInstructions: string;
  strIngredient1?: string;
  strIngredient2?: string;
  strIngredient3?: string;
  strIngredient4?: string;
  strIngredient5?: string;
  strMeasure1?: string;
  strMeasure2?: string;
  strMeasure3?: string;
  strMeasure4?: string;
  strMeasure5?: string;
}

// Obtener lista de cócteles por categoría
export async function getCocktailsByCategory(category: string = "Ordinary_Drink") {
  try {
    const response = await fetch(`${COCKTAIL_API_BASE}/filter.php?c=${category}`);
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    const data = await response.json();
    return data.drinks as Drink[];
  } catch (error) {
    console.error("Error al obtener cócteles:", error);
    throw error;
  }
}

// Obtener detalles de un cóctel por ID
export async function getCocktailById(id: string) {
  try {
    const response = await fetch(`${COCKTAIL_API_BASE}/lookup.php?i=${id}`);
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    const data = await response.json();
    return data.drinks[0] as DrinkDetail;
  } catch (error) {
    console.error("Error al obtener detalles del cóctel:", error);
    throw error;
  }
}


