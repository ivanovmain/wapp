import { observable, action, decorate } from 'mobx';
import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-boost';

class Store {
  cities = ['Сургут'];

  client = new ApolloClient({
    uri: 'https://7b3u2.sse.codesandbox.io/',
  });

  setCity(cities) {
    this.cities = cities;
  }

  addCity(city) {
    this.setCity([...this.cities, city]);
  }

  getCurrentWeather(city) {
    return this.client.query({
      query: gql`
        query weather($city: String!) {
          getCurrentWeather(cityName: $city) {
            cod
          }
        }
      `,
      variables: { city },
    });
  }

  deleteCity(city) {
    const newArr = this.cities.filter((item) => item !== city);
    this.setCity(newArr);
  }
}

decorate(Store, {
  cities: observable,
  setCity: action,
  addCity: action,
  getCurrentWeather: action,
  deleteCity: action
});

export default new Store();
