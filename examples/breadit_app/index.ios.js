/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  ScrollView,
  Text,
  View
} from 'react-native';

import ApolloClient, { createNetworkInterface } from 'apollo-client';
import gql from 'graphql-tag';
import { ApolloProvider, graphql } from 'react-apollo'

const networkInterface = createNetworkInterface('http://localhost:3000/graph');

const client = new ApolloClient({ networkInterface });

function PostList({ data: { loading, posts }}) {
  if (loading) {
    return (
      <View style={styles.loadingView}>
        <Text>Loading</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.postListContainer}>
        <ScrollView>
          {posts.map(post => (
            <View key={post.id} style={styles.postListItem}>
              <Text>{ post.title }</Text>
              <Text>{ post.description }</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    )
  }
}

const ConnectedPostList = graphql(gql`
  query getPosts {
    posts(limit: 30) {
      id
      title
      description
    }
  }
`)(PostList);

export default class breadit_app extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <ConnectedPostList/>
      </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  loadingView: {
    backgroundColor: 'gray',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  postListContainer: {
    marginTop: 20,
    backgroundColor: 'gray'
  },
  postListItem: {
    marginHorizontal: 10,
    marginBottom: 20,
    backgroundColor: 'white'
  }
});

AppRegistry.registerComponent('breadit_app', () => breadit_app);
