"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import {IRecipes} from "@/models/IRecipes";


export default function RecipeDetailPage({ params }: { params: { id: string } }) {
    const [recipe, setRecipe] = useState<IRecipes | null>(null);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchRecipeData = async () => {
            try {
                const res = await axios.get<IRecipes>(`https://dummyjson.com/recipes/${params.id}`);
                setRecipe(res.data);
            } catch (error: unknown) {
                // Перевірка помилки
                if (error instanceof Error) {
                    setError(error.message); // Використовуємо message помилки
                } else {
                    setError("Не вдалося завантажити рецепт");
                }
            }
        };
        fetchRecipeData();
    }, [params.id]);

    return (
        <div className="p-4">
            {error && <div className="text-red-500">{error}</div>}
            {recipe ? (
                <>
                    <h2 className="text-xl font-bold">{recipe.name}</h2> {/* Замінили title на name */}
                    <h3 className="mt-2 font-semibold">Інгредієнти:</h3>
                    <ul>
                        {recipe.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                    <h3 className="mt-2 font-semibold">Інструкція:</h3>
                    <p>{recipe.instructions.join(" ")}</p> {/* Якщо instructions - масив, перетворюємо його в текст */}
                    <h3 className="mt-2 font-semibold">Теги:</h3>
                    <ul>
                        {recipe.tags.map((tag, index) => (
                            <li key={index}>{tag}</li>
                        ))}
                    </ul>
                </>
            ) : (
                <p>Завантаження...</p>
            )}
        </div>
    );
}
