"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { IUsers } from "@/models/IUsers";
import { IRecipes } from "@/models/IRecipes";

export default function UserDetailPage({ params }: { params: { id: string } }) {
    const [user, setUser] = useState<IUsers | null>(null);
    const [recipes, setRecipes] = useState<IRecipes[]>([]); // Типізуємо масив рецепті
    const [error, setError] = useState<string>(""); // Типізуємо error як рядок

    const router = useRouter(); // Ініціалізація useRouter

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Отримуємо деталі користувача
                const userRes = await axios.get<IUsers>(`https://dummyjson.com/users/${params.id}`);
                setUser(userRes.data);

                // Отримуємо рецепти цього користувача
                const recipesRes = await axios.get<{ recipes: IRecipes[] }>(`https://dummyjson.com/recipes`);
                setRecipes(recipesRes.data.recipes.filter((recipe) => recipe.userId === userRes.data.id)); // фільтруємо за userId
            } catch (error: unknown) {
                // Перевірка чи error є об'єктом з полем message
                if (error instanceof Error) {
                    setError(error.message);  // Використовуємо message помилки
                } else {
                    setError("Не вдалося завантажити дані користувача або рецепти");
                }
            }
        };
        fetchUserData();
    }, [params.id]);

    return (
        <div className="p-4">
            {error && <div className="text-red-500">{error}</div>}
            {user ? (
                <>
                    <div className="flex items-center mb-4">
                        <img
                            alt={user.username}
                            className="w-20 h-20 rounded-full mr-4"
                           // Додано джерело для зображення
                        />
                        <div>
                            <h2 className="text-xl font-bold">{user.username}</h2>
                            <p>{user.email}</p>
                            <p>{user.phone}</p>
                            {/* Можна додати інші поля тут */}
                        </div>
                    </div>

                    <h3 className="text-lg font-semibold">Рецепти користувача:</h3>
                    <ul>
                        {recipes.map((recipe) => (
                            <li key={recipe.id} className="p-2 border-b">
                                <div className="flex justify-between">
                                    <span>{recipe.tags}</span> {/* Тепер це типізовано */}
                                    <button
                                        onClick={() => router.push(`/recipe/${recipe.id}`)} // Використовуємо router.push
                                        className="text-blue-500"
                                    >
                                        Переглянути рецепт
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <p>Завантаження...</p>
            )}
        </div>
    );
}
