import React from "react";
import Shirts from "/imports/ui/Shirts";        
import Pants from "/imports/ui/Pants";
import Shoes from "/imports/ui/Shoes";
import HomePage from "/imports/ui/HomePage";

export const publicRoutes = {
    home : {
        path: "/",
        element: ( <HomePage /> ) as React.ReactNode,
    },
    shirts : {  
        path: "/shirts",
        element: ( <Shirts /> ) as React.ReactNode, 
    },
    pants : {   
        path: "/pants",
        element: ( <Pants /> ) as React.ReactNode,  
    },
    shoes : {   
        path: "/shoes",
        element: ( <Shoes /> ) as React.ReactNode,
}
}