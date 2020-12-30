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
                { id: 1, name: 'Độ Ẩm' },
                { id: 2, name: 'Ánh Sáng' },
                { id: 3, name: 'pH' },
                { id: 4, name: 'Amoni' },
            ]
        }
    }
    // componentDidMount() {
    //     axios.get('https://www.kluit-staging.tk:8000/statistics/humidity_date')
    //         .then(res => {
    //             this.setState({
    //                 categories: [
    //                     data = res.data
    //                 ]
    //             })
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         })
    // }

    render() {
        const { navigation } = this.props;
        const { categories } = this.state;
        return (
            <FlatList
                data={categories}
                renderItem={({ item }) =>
                    <CategoryList
                        category={item}
                        onPress={() => navigation.navigate('Category', {
                            categoryName: item.name
                        })}
                    />
                }
                keyExtractor={item => `${item.id}`}
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
