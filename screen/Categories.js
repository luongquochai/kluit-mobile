import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import CategoryList from '../components/CategoryList';

export default class Categories extends React.Component {
    static navigationOptions = {
        title: 'Home',
    };

    constructor(props) {
        super(props);
        this.state = {
            categories: [
                { id: 1, name: 'Độ Ẩm', source: require('../assets/humidity.png') },
                { id: 2, name: 'Ánh Sáng', source: require('../assets/brightness.png') },
                { id: 3, name: 'pH', source: require('../assets/pH.png') },
                { id: 4, name: 'Amoni', source: require('../assets/amoni.png') },
            ]
        }
    }
    render() {
        const { navigation } = this.props;
        const { categories } = this.state;
        return (
            <FlatList
                data={categories}
                renderItem={({ item }) => {
                    return (
                        <CategoryList
                            category={item}
                            onPress={() => navigation.navigate('Category', {
                                categoryName: item.name
                            })}
                            image={item.source}
                        />
                    )
                }
                }
                keyExtractor={item => `${item.id}`
                }
                contentContainerStyle={styles.container}
            />
        );
    }

}

const styles = StyleSheet.create({
    container: {
        paddingTop: 16,
        paddingLeft: 16,
        paddingRight: 16,
    },
});
