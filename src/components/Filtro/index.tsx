import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { IFIltroDeEventos } from '../../interfaces/IFiltroDeEventos';
import { filtroDeEventos } from '../../state/atom';
import style from './Filtro.module.scss';

const Filtro: React.FC = () => {

  const [data, setData] = useState('')
  const [status, setStatus] = useState('')
  const setFiltroDeEventos = useSetRecoilState<IFIltroDeEventos>(filtroDeEventos)

  const submeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault()
    const filtro: IFIltroDeEventos = {}
    if (data) {
      filtro.data = new Date(data);
    } else {
      filtro.data = null;
    }
    if (status) {
      filtro.status = status;
    } else {
      filtro.status = 'todas';
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
      <h3 className={style.titulo}>Filtrar por status</h3>
    <select 
      name="status"
      onChange={evento => {setStatus(evento.target.value)}}
      value={status}
    >
      <option value="todas">Todas</option>
      <option value="completas">Completas</option>
      <option value="incompletas">Incompletas</option>
    </select>
    </form>)
}

export default Filtro