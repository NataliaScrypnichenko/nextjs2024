import type {Metadata} from "next";
import React from 'react';

export const metadata: Metadata = {
    title: "RecipesLayout metadata",

};

type Props={children: React.ReactNode;};
const RecipesLayout = ({children}:Props) => {
    return (
        <div>
<hr/>

    {children}
<hr/>
    </div>
);
};

export default RecipesLayout;