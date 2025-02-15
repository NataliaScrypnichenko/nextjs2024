import type {Metadata} from "next";
import React from 'react';

export const metadata: Metadata = {
    title: "RecipesLayout metadata",

};

type Props={children: React.ReactNode;};
const RecipesLayout = ({children}:Props) => {
    return (
        <div>

        recipes Layout
    {children}

    </div>
);
};

export default RecipesLayout;