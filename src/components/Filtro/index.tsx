import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { IFIltroDeEventos } from '../../interfaces/IFiltroDeEventos';
import { filtroDeEventos } from '../../state/atom';
import style from './Filtro.module.scss';

const Filtro: React.FC = () => {

  const [data, setData] = useState('')
  // const [estado, setEstado] = useState<"ambos" | "incompletos" | "completos">("ambos");
  const setFiltroDeEventos = useSetRecoilState<IFIltroDeEventos>(filtroDeEventos)

  const submeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault()
    const filtro: IFIltroDeEventos = {}
    if (data) {
      filtro.data = new Date(data)
    } else {
      filtro.data = null
    }
    setFiltroDeEventos(filtro);
  }

  return (
    <form className={style.Filtro} onSubmit={submeterForm}>
      <h3 className={style.titulo}>Filtrar por data</h3>
      <input
        type="date"
        name="data"
        className={style.input}
        onChange={evento => setData(evento.target.value)}
        placeholder="Por data"
        value={data} />
      <button className={style.botao}>
        Filtrar
      </button>
      {/* <div>
        <h3>Filtrar por estado:</h3>
        <label>
          Ambos:
          <input type="radio" name="estado" />
        </label>
        <label>
          Completos:
          <input type="radio" name="estado" />
        </label>
        <label>
          Incompletos:
          <input type="radio" name="estado" />
        </label>
      </div> */}
    </form>)
}

export default Filtro