import React, { FormEvent } from 'react';

interface props {
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
    inputChange: (event: FormEvent<HTMLInputElement>) => void;
    hora: string;
    erro: string | null;
}

export function Matricula({ hora, inputChange, handleSubmit, erro }: props) {
    return (
        <div className="container-fluid">
            <div className="justify-content-center">
                <h1 className="text-center titulos" >REGISTRO DE ENTRADA/SAÍDA</h1>
                <div className="box">
                    <div className="row">
                        <div className="text-center relogio">
                            {/* <h2 id="horario">{hora}</h2> */}
                        </div>
                    </div>
                    <div className="row">
                        {erro !== null && <h2 style={{ color: 'red', textAlign: 'center' }}>{erro}</h2>}
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <input id="matricula" onChange={inputChange} type="text" name="matricula" placeholder="Digite a matrícula" />
                        </div>

                        <div className="row">
                            <br />
                            <input className="botao" value="ENTRAR" type="submit" name="SendLogin"></input>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
}