"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {IRecipes} from "@/models/IRecipes";


export default function RecipesPage() {
    const [recipes, setRecipes] = useState<IRecipes[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [filteredRecipes, setFilteredRecipes] = useState<IRecipes[]>([]);
    const [error, setError] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const res = await axios.get("https://dummyjson.com/recipes");
                setRecipes(res.data.recipes);
                setFilteredRecipes(res.data.recipes); // Показуємо всі рецепти за замовчуванням
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    // Якщо це AxiosError, вивести деталі помилки
                    setError(`Помилка: ${error.message}`);
                } else {
                    // Якщо це не AxiosError, вивести загальну помилку
                    setError("Не вдалося завантажити рецепти");
                }
            }
        };
        fetchRecipes();
    }, []);

    useEffect(() => {
        // Фільтруємо рецепти за пошуковим запитом
        if (searchQuery) {
            setFilteredRecipes(
                recipes.filter((recipe) =>
                    recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    recipe.tags.some(tag =>
                        tag.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                )
            );
        } else {
            setFilteredRecipes(recipes); // Якщо нічого не шукаємо, показуємо всі рецепти
        }
    }, [searchQuery, recipes]);

    const handleTagClick = (tag: string) => {
        setSearchQuery(tag); // При кліку на тег фільтруємо за ним
    };

    return (
        <div className="p-4">
            {error && <div className="text-red-500">{error}</div>}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Пошук рецептів або тегів..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="p-2 border rounded"
                />
            </div>

            {filteredRecipes.length === 0 ? (
                <p>Немає рецептів за вашим запитом.</p>
            ) : (
                <ul>
                    {filteredRecipes.map((recipe) => (
                        <li key={recipe.id} className="p-2 border-b">
                            <div className="flex justify-between">
                                <span>{recipe.name}</span>
                                <button
                                    onClick={() => router.push(`/recipe/${recipe.id}`)}
                                    className="text-blue-500"
                                >
                                    Переглянути рецепт
                                </button>
                            </div>
                            <div>
                                {recipe.tags.map((tag) => (
                                    <button
                                        key={tag}
                                        onClick={() => handleTagClick(tag)}
                                        className="text-sm text-gray-500 mr-2"
                                    >
                                        #{tag}
                                    </button>
                                ))}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
