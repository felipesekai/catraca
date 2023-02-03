import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import { api } from '../service/api';
import { UserType } from '../utils/@Types';

interface props {

    usuario: UserType;
}

export function DadosAluno({ usuario }: props) {

    const [menssagem, setMenssagem] = useState<string>('');

    const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        api.post('registrar_ponto.php', usuario).then((response) => {
            setMenssagem(response.data.messagem);
            setTimeout(() => window.location.reload(), 1500)
        })
    }, [usuario]);

    useEffect(() => {
        setTimeout(() => window.location.reload(), 30000); //30 seconds
    }, [])

    return (
        <div className="container-fluid">
            <div className="justify-content-center">
                <div className="row">
                    <div className="text-center relogio">
                        <p style={{ color: 'green' }}>{menssagem}</p>
                    </div>
                </div>
                {/* <!-- <header class="text-center titulos">REGISTRO DE ENTRADA/SAÍDA</h1> --> */}

                <div className="box">
                    <div className="row">
                        <div className="text-center relogio">
                            <h2 id="horario">{usuario.nome}</h2>
                            <div className="text-center relogio">
                                <h2 id="horario">{usuario.email}</h2>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <br />
                            <input className="botao" value="REGISTRAR" type="submit"></input>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
}