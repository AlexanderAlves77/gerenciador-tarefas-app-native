import React from 'react'
import { SafeAreaView } from 'react-native'
import { defaultStyles } from '../styles/styles'
import { Header } from '../componentes/Header'
import { Filtros } from '../componentes/Filtros'
import { Lista } from '../componentes/Lista'
import { Footer } from '../componentes/Footer'
import { executaRequisicao } from '../services/api'
import { useEffect } from 'react'

export const HomeScreen = () => {
  // STATES DA LISTA
  const [tarefas, setTarefas] = React.useState([])

  // STATES DOS FILTROS
  const [periodoDe, setPeriodoDe] = React.useState('')
  const [periodoAte, setPeriodoAte] = React.useState('')
  const [status, setStatus] = React.useState('')

  // STATE DE EXIBICAO DO MODAL
  const [showModal, setShowModal] = React.useState(false)

  // STATES DO CADASTRO
  const [erro, setErro] = React.useState('')
  const [nomeTarefa, setNomeTarefa] = React.useState('')
  const [dataPrevisaoTarefa, setDataPrevisaoTarefa] = React.useState('')

  const getTarefaComFiltro = async () => {
    try {
      let filtros = '?status' + status
      if (periodoDe) {
        filtros += '&periodoDe=' + periodoDe
      }

      if (periodoAte) {
        filtros += '&periodoAte=' + periodoAte
      }

      const resultado = await executaRequisicao('tarefa' + filtros, 'get')
      if (resultado && resultado.data) {
        setTarefas(resultado.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getTarefaComFiltro()
  }, [status, periodoDe, periodoAte])

  return (
    <SafeAreaView style={[defaultStyles.container, defaultStyles.containerTop]}>
      <Header />
      <Filtros />
      <Lista lista={tarefas} />
      <Footer />
    </SafeAreaView>
  )
}
