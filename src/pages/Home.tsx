import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import { DadosAluno } from '../components/DadosAluno';
import { Matricula } from '../components/Matricula';
import { api } from '../service/api';
import { UserType } from '../utils/@Types';


export function Home() {
    const [hora, setHora] = useState<string>("");
    const [matricula, setMatricula] = useState<string>('');
    const [usuario, setUsuario] = useState<UserType | null>(null);
    const [erroMessage, setErrorMessage] = useState<string | null>(null);

    function atualizarHorario() {
        var data = new Date().toLocaleString("pt-br", {
            timeZone: "America/Recife"
        });
        //var formatarData = data.replace(", ", " - ");
        //apHorario.innerHTML = formatarData; 
        setHora(data.replace(", ", " - "))
    }
    const inputChange = useCallback((event: FormEvent<HTMLInputElement>) => {
        const { value, name } = event.currentTarget
        setMatricula(value);
    }, [setMatricula]);

    const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        api.get('getUser.php?matricula=' + matricula).then((response) => {
            setUsuario(response.data.usuario)
        }).catch(() => {
            setErrorMessage("Não foi Posssivel Localizar a Matricula!");
            setTimeout(() => setErrorMessage(null), 1500);
        })
    }, [matricula]);

    useEffect(
        () => {
            setInterval(atualizarHorario, 1000);
        }, [setHora]);


    return (
        <div className='App'>

            {/* <!-- inicio Cabecalho --> */}
            <header className="cabecalho">
                <nav className="navbar" id="cor_header">
                    <div className="menu" >
                        <a href="#">
                            <img className="logo" src="./logo-ifpe-branca.png" alt='logo ifpe' width="142" />
                        </a>
                    </div>
                </nav>
            </header>
            {/* <!--/fim Cabecalho --> */}
            {usuario === null ?
                <Matricula hora={hora}
                    inputChange={inputChange}
                    handleSubmit={handleSubmit}
                    erro={erroMessage}
                />
                : <DadosAluno usuario={usuario} />
            }

            {/* <!-- Inicio do footer --> */}
            <footer className="bg-success text-white text-center">
                <div className="copyright">&copy;2023- Coordenação de Tecnologia da Informação e Comunicação<br />Campus Olinda</div>
            </footer>
            {/* <!-- /fim do footer --> */}
        </div>
    );
}