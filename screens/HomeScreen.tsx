import React from 'react'
import { SafeAreaView } from 'react-native'
import { defaultStyles } from '../styles/styles'
import { Header } from '../componentes/Header'
import { Filtros } from '../componentes/Filtros'
import { Lista } from '../componentes/Lista'
import { Footer } from '../componentes/Footer'
import { executaRequisicao } from '../services/api'
import { useEffect } from 'react'
import moment from 'moment'

export const HomeScreen = () => {
  // STATES DA LISTA
  const [tarefas, setTarefas] = React.useState([])
  const [refreshing, setRefreshing] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  // STATES DOS FILTROS
  const [periodoDe, setPeriodoDe] = React.useState(new Date())
  const [periodoAte, setPeriodoAte] = React.useState(new Date())
  const [status, setStatus] = React.useState(0)

  // STATE DE EXIBICAO DO MODAL
  const [showModal, setShowModal] = React.useState(false)

  // STATES DO CADASTRO
  const [erro, setErro] = React.useState('')
  const [nomeTarefa, setNomeTarefa] = React.useState('')
  const [dataPrevisaoTarefa, setDataPrevisaoTarefa] = React.useState('')

  const getTarefasComFiltro = async () => {
    try {
      setRefreshing(true)
      setLoading(true)
      let filtros = '?status=' + status

      if (periodoDe) {
        filtros += '&periodoDe=' + moment(periodoDe).format('yyyy-MM-DD')
      }

      if (periodoAte) {
        filtros += '&periodoAte=' + moment(periodoAte).format('yyyy-MM-DD')
      }

      const resultado = await executaRequisicao('tarefa' + filtros, 'get')
      if (resultado && resultado.data) {
        setTarefas(resultado.data)
      }
    } catch (error) {
      console.log(error)
    }
    setRefreshing(false)
    setLoading(false)
  }

  useEffect(() => {
    getTarefasComFiltro()
  }, [status, periodoDe, periodoAte])

  return (
    <SafeAreaView style={[defaultStyles.container, defaultStyles.containerTop]}>
      <Header />
      <Filtros
        status={status}
        setStatus={setStatus}
        periodoDe={periodoDe}
        setPeriodoDe={setPeriodoDe}
        periodoAte={periodoAte}
        setPeriodoAte={setPeriodoAte}
      />

      <Lista
        lista={tarefas}
        refreshing={refreshing}
        getLista={getTarefasComFiltro}
        loading={loading}
      />

      <Footer getLista={getTarefasComFiltro} />
    </SafeAreaView>
  )
}
