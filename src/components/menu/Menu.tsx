import Link from "next/link";

export const Menu = ()=>{
    return (
        <div>
            <ul>
                <li>
                    <Link href={'/'}></Link>
                </li>
                <li>
                    <Link href={'/auth'}></Link>
                </li>
                <li>
                    <Link href={'/users'}></Link>
                </li>
                <li>
                    <Link href={'/recipes'}></Link>
                </li>

            </ul>
        </div>
    )
}