import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

  const [username, setUsername] = useState(''); // State để lưu username
  const [password, setPassword] = useState(''); // State để lưu password
  const [ttDangNhap, setTTDangNhap] = useState('');

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 40 }}>Thông tin đăng nhập: {ttDangNhap}</Text>

      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        placeholder="Nhập tên đăng nhập"
        onChangeText={(text) => setUsername(text)}
        value={username}
      />

      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        placeholder="Nhập mật khẩu"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true} // Để che đi mật khẩu
      />

      <Button title='Lưu thông tin' onPress={async () => {
        try {
          const dangNhap = {
            username: username,
            password: password
          };

          const jsonValue = JSON.stringify(dangNhap);
          await AsyncStorage.setItem('dangnhap', jsonValue);

          console.log('Đã lưu');
        } catch (e) {
          console.log(e);
        }
      }} />

      <Button title='Lấy thông tin' onPress={async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('dangnhap');
          let tt = JSON.parse(jsonValue);
          setTTDangNhap(tt.username + " - " + tt.password);
        } catch (e) {
          console.log(e);
        }
      }} />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
