import { selector } from "recoil";
import { IEvento } from "../../../interfaces/IEvento";
import { filtroDeEventos, listaDeEventosState } from "../../atom";


export const eventosFiltradosState = selector({
	key: "eventosFiltradosState",
	get: ({ get }) => {
		const filtro = get(filtroDeEventos)
		const todosOsEventos = get(listaDeEventosState)
		const eventos = todosOsEventos.filter(evento => {
			if (!filtro.data) {
				return true;
			}
			const ehMesmoDia = filtro.data.toISOString().slice(0, 10) === evento.inicio.toISOString().slice(0, 10);
			return ehMesmoDia;
		}).filter(evento => {
			if (!filtro.status) {
				return true;
			}
			switch (filtro.status) {
				case "completas":
					return evento.completo === true;
				case "incompletas":
					return evento.completo === false;
				default:
					return true;
			}
		})
		return eventos
	}
})

export const eventosAsync = selector({
	key: "eventosAsync",
	get: async () => {
		const respostaHttp = await fetch(`http://localhost:8080/eventos`)
		const eventosJson: IEvento[] = await respostaHttp.json()
		return eventosJson.map(evento => ({
			...evento,
			inicio: new Date(evento.inicio),
			fim: new Date(evento.fim),
		}))
	}
})