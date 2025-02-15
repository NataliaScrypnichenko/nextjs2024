This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.





https://dummyjson.com/docs

Сайт на якому знаходиться акумульована інформація з dummyjson.com про користувачів та рецепти.

Обов'язкові компоненти:
Меню - містить лінки на сторінки та лого залогіненого користувача.У випадку, якщо меню показується 
не аутентифікованому користувачеві - то в меню пристунє лише лінка на сторінгу аутентифікації.
Пошук - шукає той чи інший рецепт/користувача в залежності від сторінки. 
Один Текстовий інпут та кнопка за бажанням. Через пошук можна знайти когось/щось за 
стрінговим значенням, згідно документації, або за ід!!!
Пагінація - пагінує данні.

Головна сторінка (ГС):
За замовчуванням передбачаємо, що користувач не залогінений
При контакті з ГС на ній є повідомлення, що вам потрібно аутентифікуватисьі в меню відповідна лінка.

Сторінка aутентифікації (САФ):
Містить форму з інпутами необхідними для аутентифікацї через dummyjson.
Данні для аутентифікацї брати з dummyjson, з будь-якого користувача.
Після завершення процесу аутентифікації в меню з'являються лінки на сторінку всіх рецептів 
та сторінку вісх користувачів, та лого користувача (брати з об'єкта)




Сторінка з користувачами:
Містить меню, пошук, список користувачів з мінімальною інфою на 3 поля з об'єкту
При кліку на користувача перехід на сторіку з більш детальною інфою про цього
користувача (на 7-10 полів, за вашим бажанням) та список його рецептів.
При кліку на рецепт - перехід на детальну сторінку рецепту

Сторінка з рецептами:
Мість меню, пошук, список рецептів (лише назва+ теги)
при кліку на рецепт - перехід на сторінку рецепту з детальною інформацією, 
та лінкою на сторінку користувача, який його зробив.
При кліку на тег - фільтрація/пошук всіх рецептів з таким самим тегом

Дизайн довільний

Всі данні ,які відображаються списком - пагіновані.

Стейтом керуємо через редакс і тільки черз нього.
