import React from 'react'
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native'
import moment from 'moment'
import DateTimePicker from '@react-native-community/datetimepicker'
import { footerStyles, filtrosStyles } from '../styles/styles'
import { defaultStyles } from '../styles/styles'
import { ModalAdicaoEdicao } from './Modal'

export const Footer = (props: any) => {
  // STATES DO CADASTRO
  const { getLista } = props

  const [modalVisible, setModalVisible] = React.useState(false)

  return (
    <View style={[footerStyles.container]}>
      <TouchableOpacity
        style={footerStyles.button}
        onPress={() => setModalVisible(true)}
      >
        <Image
          style={footerStyles.image}
          source={require('../assets/images/add.png')}
        />
        <Text style={footerStyles.text}>Adicionar tarefa</Text>
      </TouchableOpacity>
      <ModalAdicaoEdicao
        getLista={getLista}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  )
}
