"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IUser } from "@/models/IUser";

export default function AuthPage() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [username, setUsername] = useState<string>(""); // Додано для реєстрації
    const [error, setError] = useState<string>(""); // Для відображення помилок
    const [user, setUser] = useState<IUser | null>(null); // Типізація користувача
    const [isLogin, setIsLogin] = useState<boolean>(true); // Стан для переключення між формами логіну та реєстрації
    const router = useRouter();

    // Обробка логіну
    const handleLogin = async () => {
        try {
            const res = await axios.post("https://dummyjson.com/auth/login", {
                email: email,
                password: password,
            });

            const loggedInUser = res.data;
            setUser(loggedInUser);
            localStorage.setItem("user", JSON.stringify(loggedInUser));

            router.push("/users");
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                setError(`Помилка: ${error.response?.data.message || error.message}`);
            } else {
                setError("Не вдалося увійти. Перевірте правильність введених даних.");
            }
        }
    };

    // Обробка реєстрації
    const handleRegister = async () => {
        try {
            // Перевірка на наявність всіх необхідних полів
            if (!email || !password || !username) {
                setError("Будь ласка, заповніть всі поля.");
                return;
            }

            const newUser: { password: string; phone: string; id: number; email: string; username: string } = {
                id: Date.now(),  // Встановлюємо унікальний ID
                email: email,
                phone: '',       // Якщо потрібно, додайте значення
                username: username,
                password: password,
            };

            // Зберігаємо нового користувача в localStorage
            localStorage.setItem("user", JSON.stringify(newUser));

            // Переведення на сторінку користувачів після реєстрації
            // @ts-ignore
            setUser(newUser);
            router.push("/users");
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                setError(`Помилка: ${error.response?.data.message || error.message}`);
            } else {
                setError("Не вдалося зареєструвати користувача.");
            }
        }
    };

    return (
        <div>
            <div >
                <h2>{isLogin ? "Вхід" : "Реєстрація"}</h2>

                {error && <div >{error}</div>}

                {/* Форма для логіну або реєстрації */}
                {!isLogin && (
                    <div className="mt-4">
                        <label htmlFor="username" className="block">користувач</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Введіть ваше ім'я"
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
                        />
                    </div>
                )}

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
                        className="w-full px-4 py-2 mt-2 border-2 border-gray-300 rounded-md"
                    />
                </div>

                <button
                    onClick={isLogin ? handleLogin : handleRegister}
                    className="bg-blue-500 text-white px-4 py-2 mt-4 w-full"
                >
                    {isLogin ? "Увійти" : "Зареєструватися"}
                </button>
                <div className="mt-4 text-center">
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-blue-500"
                    >
                        {isLogin ? "Не маєте акаунту? Зареєструйтесь!" : "Маєте акаунт? Увійдіть!"}
                    </button>
                </div>
            </div>

            {/* Меню після входу */}
            {user && (
                <div className="bg-gray-800 text-white p-4">
                    <div className="flex items-center">
                        {/* Лого користувача */}
                        <img src={user.image || ""} alt="Logo" className="w-8 h-8 rounded-full mr-2" />
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
