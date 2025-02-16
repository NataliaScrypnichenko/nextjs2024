
"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { IUsers } from "@/models/IUsers";
import { IRecipes } from "@/models/IRecipes";

export default function UserDetailPage() {
    const { id } = useParams();
    const [user, setUser] = useState<IUsers | null>(null);
    const [recipes, setRecipes] = useState<IRecipes[]>([]);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userRes = await axios.get<IUsers>(`https://dummyjson.com/users/${id}`);
                setUser(userRes.data);

                const recipesRes = await axios.get<{ recipes: IRecipes[] }>(`https://dummyjson.com/recipes`);
                setRecipes(recipesRes.data.recipes.filter((recipe) => recipe.userId === userRes.data.id));
            } catch (error: unknown) {
                setError(error instanceof Error ? error.message : "Не вдалося завантажити дані користувача або рецепти");
            }
        };
        if (id) fetchUserData();
    }, [id]);

    return (
        <div className="p-4">
            {error && <div className="text-red-500">{error}</div>}
            {user ? (
                <>
                    <div className="flex items-center mb-4">
                        <img
                            src={user.image}
                            alt={user.username}
                            className="w-20 h-20 rounded-full mr-4"
                        />
                        <div>
                            <h2 className="text-xl font-bold">{user.username}</h2>
                            <p>Email: {user.email}</p>
                            <p>Phone: {user.phone}</p>
                        </div>
                    </div>

                    <h3 className="text-lg font-semibold">Рецепти користувача:</h3>
                    <ul>
                        {recipes.map((recipe) => (
                            <li key={recipe.id} className="p-2 border-b">
                                <div className="flex justify-between">
                                    <span>{recipe.tags.join(", ")}</span>
                                    <button
                                        onClick={() => window.location.href = `/recipes/${recipe.id}`}
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
