import Link from "next/link";

export default function HomePage() {
    return (
        <div className="text-center mt-10">
            <h2 className="text-2xl font-bold">Ласкаво просимо!</h2>
            <p className="mt-2">Щоб побачити користувачів і рецепти, потрібно увійти і за реєструватися</p>
            <Link href="/auth">
                <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Увійти
                </button>
            </Link>
        </div>
    );
}