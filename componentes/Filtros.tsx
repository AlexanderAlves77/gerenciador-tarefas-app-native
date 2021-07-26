import React from 'react'
import { useState } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { filtrosStyles, defaultStyles } from '../styles/styles'
import { Picker } from '@react-native-picker/picker'
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'

export const Filtros = () => {
  const [showFiltros, setShowFiltros] = useState(false)
  const [status, setStatus] = useState(0)
  const [periodoDe, setPeriodoDe] = useState<Date>(new Date())
  const [showPeriodoDe, setShowPeriodoDe] = useState(false)
  const [periodoAte, setPeriodoAte] = useState<Date>(new Date())
  const [showPeriodoAte, setShowPeriodoAte] = useState(false)

  return (
    <View style={filtrosStyles.container}>
      <View style={filtrosStyles.title}>
        <Text style={filtrosStyles.titleText}>Tarefas</Text>
        <TouchableOpacity onPress={() => setShowFiltros(!showFiltros)}>
          <Image source={require('../assets/images/filtro.png')} />
        </TouchableOpacity>
      </View>
      {showFiltros === true && (
        <View style={filtrosStyles.filtros}>
          <View style={filtrosStyles.filtrosCampos}>
            <Text style={filtrosStyles.label}>Período de:</Text>
            <TouchableOpacity
              style={[defaultStyles.inputSelect, filtrosStyles.datePicker]}
              onPress={() => setShowPeriodoDe(!showPeriodoDe)}
            >
              <Text style={filtrosStyles.label}>
                {moment(periodoDe).format('DD/MM/yyyy')}
              </Text>
            </TouchableOpacity>
            {showPeriodoDe === true && (
              <DateTimePicker
                mode="date"
                value={periodoDe}
                is24Hour={true}
                display="default"
                onChange={(_: any, selectedDate: any) => {
                  setPeriodoDe(selectedDate)
                  setShowPeriodoDe(false)
                }}
                //onDateChange={date => {}}
              />
            )}
          </View>
          <View style={filtrosStyles.filtrosCampos}>
            <Text style={filtrosStyles.label}>Período até:</Text>
            <TouchableOpacity
              style={[defaultStyles.inputSelect, filtrosStyles.datePicker]}
              onPress={() => setShowPeriodoAte(!showPeriodoAte)}
            >
              <Text style={filtrosStyles.label}>
                {moment(periodoAte).format('DD/MM/yyyy')}
              </Text>
            </TouchableOpacity>
            {showPeriodoAte === true && (
              <DateTimePicker
                mode="date"
                value={periodoAte}
                is24Hour={true}
                display="default"
                onChange={(_: any, selectedDate: any) => {
                  setPeriodoAte(selectedDate)
                  setShowPeriodoAte(false)
                }}
                //onDateChange={date => {}}
              />
            )}
          </View>
          <View style={filtrosStyles.filtrosCampos}>
            <Text style={filtrosStyles.label}>Status:</Text>
            <Picker
              style={defaultStyles.inputSelect}
              itemStyle={defaultStyles.inputSelect}
              selectedValue={status}
              onValueChange={itemValue => setStatus(itemValue)}
            >
              <Picker.Item label="Todas" value={0} />
              <Picker.Item label="Ativas" value={1} />
              <Picker.Item label="Concluídas" value={2} />
            </Picker>
          </View>
        </View>
      )}
    </View>
  )
}
