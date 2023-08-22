import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Condominio from "./imovel/imovel";


export default function Rotas(){

  

    return(

        <>

        <Routes>

        <Route path="/condominio">
        <Condominio/>
        </Route>
        
        </Routes>

            </>
    )
}