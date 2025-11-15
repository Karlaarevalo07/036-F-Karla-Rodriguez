import { useState, useEffect } from "react";
import { getCocktailsByCategory, getCocktailById } from "../services/api";
import type { Drink, DrinkDetail } from "../services/api";

export default function Consumo() {
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDrink, setSelectedDrink] = useState<DrinkDetail | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);

  useEffect(() => {
    loadDrinks();
  }, []);

  const loadDrinks = async () => {
    try {
      setLoading(true);
      const data = await getCocktailsByCategory("Ordinary_Drink");
      setDrinks(data.slice(0, 15)); // Mostrar solo 15 elementos
    } catch (error) {
      console.error("Error cargando cócteles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDrinkClick = async (id: string) => {
    try {
      setLoadingDetail(true);
      setModalOpen(true);
      const detail = await getCocktailById(id);
      setSelectedDrink(detail);
    } catch (error) {
      console.error("Error cargando detalles:", error);
    } finally {
      setLoadingDetail(false);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedDrink(null);
  };

  // Función para obtener ingredientes
  const getIngredients = (drink: DrinkDetail) => {
    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
      const ingredient = drink[`strIngredient${i}` as keyof DrinkDetail];
      const measure = drink[`strMeasure${i}` as keyof DrinkDetail];
      if (ingredient) {
        ingredients.push(`${measure || ""} ${ingredient}`.trim());
      }
    }
    return ingredients;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-pink-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando cócteles...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800">Catálogo de Cócteles</h2>
        <p className="text-gray-600 mt-2">Ordinary Drinks Collection</p>
      </div>

      {/* Grid de tarjetas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {drinks.map((drink) => (
          <div
            key={drink.idDrink}
            className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className="aspect-square overflow-hidden">
              <img
                src={drink.strDrinkThumb}
                alt={drink.strDrink}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 space-y-3">
              <h3 className="font-semibold text-gray-800 text-center line-clamp-2 min-h-[3rem]">
                {drink.strDrink}
              </h3>
              <button
                onClick={() => handleDrinkClick(drink.idDrink)}
                className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Ver detalles
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de detalles */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {loadingDetail ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-pink-500 mx-auto"></div>
                <p className="mt-4 text-gray-600">Cargando detalles...</p>
              </div>
            ) : selectedDrink ? (
              <div>
                {/* Imagen */}
                <div className="relative">
                  <img
                    src={selectedDrink.strDrinkThumb}
                    alt={selectedDrink.strDrink}
                    className="w-full h-64 object-cover"
                  />
                  <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Contenido */}
                <div className="p-6 space-y-4">
                  <h2 className="text-3xl font-bold text-gray-800">{selectedDrink.strDrink}</h2>
                  
                  <div className="flex gap-4 flex-wrap">
                    <span className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm font-medium">
                      {selectedDrink.strCategory}
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {selectedDrink.strAlcoholic}
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                      {selectedDrink.strGlass}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Ingredientes:</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {getIngredients(selectedDrink).map((ingredient, index) => (
                        <li key={index} className="text-gray-700">{ingredient}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Instrucciones:</h3>
                    <p className="text-gray-700 leading-relaxed">{selectedDrink.strInstructions}</p>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </section>
  );
}
