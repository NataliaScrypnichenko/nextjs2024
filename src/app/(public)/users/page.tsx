"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {IUsers} from "@/models/IUsers";


export default function UsersPage() {
    const [users, setUsers] = useState<IUsers[]>([]);
    const [search, setSearch] = useState<string>(""); // Для пошуку
    const [error, setError] = useState<string>("");

    const router = useRouter();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get("https://dummyjson.com/users");
                setUsers(res.data.users); // Якщо API повертає дані в такому форматі
            } catch (error) {
                setError("Не вдалося завантажити користувачів");
            }
        };
        fetchUsers();
    }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const filteredUsers = users.filter((user) =>
        user.username.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-4">
            <input
                type="text"
                placeholder="Пошук за ім'ям"
                value={search}
                onChange={handleSearch}
                className="border p-2 rounded-md"
            />
            {error && <div className="text-red-500">{error}</div>}
            <ul>
                {filteredUsers.map((user) => (
                    <li key={user.id} className="p-2 border-b">
                        <div className="flex items-center">
                            <img
                                alt={user.username}
                                className="w-8 h-8 rounded-full mr-2"
                            />
                            <span>{user.username}</span>
                        </div>
                        <button
                            onClick={() => router.push(`/user/${user.id}`)}
                            className="mt-2 text-blue-500"
                        >
                            Переглянути деталі
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
