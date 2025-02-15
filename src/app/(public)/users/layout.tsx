import type {Metadata} from "next";
import React from 'react';

export const metadata: Metadata = {
    title: "UsersLayout metadata",

};

type Props={children: React.ReactNode;};
const UsersLayout = ({children}:Props) => {
    return (
        <div>
            <hr/>

            {children}
            <hr/>
        </div>
    );
};

export default UsersLayout;