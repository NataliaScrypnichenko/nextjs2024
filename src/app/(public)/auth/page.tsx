"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {IUser} from "@/models/IUser";


export default function AuthPage() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [user, setUser] = useState<IUser | null>(null); // Типізація користувача
    const [error, setError] = useState<string>(""); // Для відображення помилок
    const [users, setUsers] = useState<IUser[]>([]); // Для зберігання даних користувачів
    const router = useRouter();

    // Отримуємо користувачів з API при завантаженні сторінки
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get("https://dummyjson.com/users");
                setUsers(res.data.users); // Зберігаємо список користувачів
            } catch (error) {
                console.error("Не вдалося отримати користувачів", error);
            }
        };

        fetchUsers();
    }, []);

    // Обробка логіну
    const handleLogin = () => {
        const foundUser = users.find(user => user.email === email && user.username === password);

        if (foundUser) {
            console.log("Успішний вхід", foundUser);

            // Зберігаємо дані користувача в стейті та localStorage
            setUser(foundUser);
            localStorage.setItem("user", JSON.stringify(foundUser));

            // Перенаправляємо на сторінку користувачів після успішної аутентифікації
            router.push("/users");
        } else {
            setError("Невірний логін або пароль!");
        }
    };

    return (
        <div>
            <div className="max-w-md mx-auto p-4 bg-white shadow-md">
                <h2 className="text-xl font-bold">Вхід</h2>

                {error && <div className="text-red-500 mt-4">{error}</div>} {/* Показуємо помилку */}

                <div className="mt-4">
                    <label htmlFor="email" className="block">Електронна пошта</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Введіть вашу електронну пошту"
                        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div className="mt-4">
                    <label htmlFor="password" className="block">Пароль</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Введіть ваш пароль"
                        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
                    />
                </div>

                <button
                    onClick={handleLogin}
                    className="bg-blue-500 text-white px-4 py-2 mt-4 w-full"
                >
                    Увійти
                </button>
            </div>

            {/* Меню після входу */}
            {user && (
                <div className="bg-gray-800 text-white p-4">
                    <div className="flex items-center">
                        {/* Лого користувача */}
                        <img src={user.avatar} alt="Logo" className="w-8 h-8 rounded-full mr-2" />
                        <span className="font-semibold">{user.username}</span>
                    </div>
                    <nav className="mt-4">
                        <ul>
                            <li>
                                <Link href="/users" className="block py-2">Користувачі</Link>
                            </li>
                            <li>
                                <Link href="/recipes" className="block py-2">Рецепти</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            )}
        </div>
    );
}
