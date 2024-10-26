import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';

const InfiniteScroll = () => {
  // State variables to manage products, pagination, and loading states
  const [products, setProducts] = useState([]); // Stores the list of products
  const [page, setPage] = useState(1); // Current page number
  const [isEndReached, setIsEndReached] = useState(false); // Indicates if there are no more products to load
  const [isFetching, setIsFetching] = useState(false); // Indicates if data is currently being fetched

  const LIMIT = 6; // Number of products to fetch per request

  // Function to fetch products from the API
  const fetchProducts = async () => {
    if (isFetching || isEndReached) return; // Prevent fetching if already loading or at the end

    setIsFetching(true); // Set loading state to true

    try {
      const response = await axios.get('https://dummyjson.com/products', {
        params: {limit: LIMIT, skip: (page - 1) * LIMIT}, // Calculate skip based on current page
      });

      const fetchedProducts = response.data.products; // Get products from the response

      if (fetchedProducts.length < LIMIT) {
        setIsEndReached(true); // No more products to load
      }

      setProducts(prev => [...prev, ...fetchedProducts]); // Add new products to the existing list
      setPage(prev => prev + 1); // Increment page for next fetch
    } catch (error) {
      console.error('Error fetching products:', error); // Log any errors
    } finally {
      setIsFetching(false); // Reset loading state after fetching
    }
  };

  useEffect(() => {
    fetchProducts(); // Fetch products on component mount
  }, []);

  // Render each product item
  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemDescription}>{item.description}</Text>
    </View>
  );

  // Render a loader at the bottom when fetching more products
  const renderFooter = () => {
    if (isFetching) {
      return (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    return null; // No loader when not fetching
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products} // List of products to display
        keyExtractor={item => item.id.toString()} // Unique key for each item
        renderItem={renderItem} // Function to render each item
        onEndReached={fetchProducts} // Fetch more products when reaching the end of the list
        onEndReachedThreshold={0.5} // Trigger fetch when within half a screen height of the end
        ListFooterComponent={renderFooter} // Show loader when scrolling down
      />
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  itemContainer: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDescription: {
    marginTop: 8,
    fontSize: 14,
    color: '#555',
  },
  loaderContainer: {
    paddingVertical: 20,
  },
});

export default InfiniteScroll;
