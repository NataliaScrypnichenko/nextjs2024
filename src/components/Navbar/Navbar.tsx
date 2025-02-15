"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {IUser} from "@/models/IUser";


export default function Header() {
    const [user, setUser] = useState<IUser | null>(null);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser)); // Завантажуємо дані користувача з localStorage
        } else {
            // Якщо користувача немає в localStorage, перенаправляємо на сторінку логіну
            router.push("/auth");
        }
    }, [router]);

    return (
        <header className="bg-gray-800 text-white p-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    {/* Лого користувача */}
                    {user?.avatar && (
                        <img
                            src={user.avatar}
                            alt="Logo"
                            className="w-8 h-8 rounded-full mr-2"
                        />
                    )}
                    <span className="font-semibold">{user?.username}</span>
                </div>
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <Link href="/users" className="text-white">
                                Користувачі
                            </Link>
                        </li>
                        <li>
                            <Link href="/recipes" className="text-white">
                                Рецепти
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
