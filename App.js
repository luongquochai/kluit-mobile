import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import CategoryList from './components/CategoryList';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [
        { id: 1, name: 'Độ Ẩm' },
        { id: 2, name: 'Ánh Sáng' },
        { id: 3, name: 'pH' },
        { id: 4, name: 'Amoni' },
      ]
    }
  }
  render() {
    const { categories } = this.state;
    return (
      <View>
        <StatusBar style="auto" />
        <FlatList
          data={categories}
          renderItem={({ item }) => <CategoryList category={item} />}
          keyExtractor={item => `${item.id}`}
          contentContainerStyle={{ paddingLeft: 16, paddingRight: 16 }}
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingLeft: 16,
    paddingRight: 16,
  },
});
