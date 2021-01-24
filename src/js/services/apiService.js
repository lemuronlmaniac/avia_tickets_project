import axios from 'axios';
import config from '../config/apiConfig';

class Api {
  constructor(config) {
    this.url = config.url;
    this.url2 = config.url2;
    this.token = config.token;
  }
  async countries() {
    try {
      const response = await axios.get(`${this.url}/countries`);
      // console.log(response);
      return response.data;
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }
  async cities() {
    try {
      const response = await axios.get(`${this.url}/cities`);
      // console.log(response);
      return response.data;
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }
  async airlines() {
    try {
      const response = await axios.get(`${this.url}/airlines`);
      // console.log(response);
      return response.data;
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }
  async prices(params) {
    let newParams = {token: this.token, ...params,
    };
    // let headers =  {
    //   headers: {
    //     'X-Access-Token': this.token,
    //     'Access-Control-Allow-Origin': '*',
    //     'Access-Control-Allow-Headers' : 'Origin, X-Requested-With, Content-Type, Accept',
    //     'Access-Control-Allow-Methods': 'GET'
    //   }
    // }
    console.log(newParams);
    // axios.defaults.headers.common['X-Access-Token'] = this.token;
    // axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    // axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';
    // axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET';
    try {
      const response = await axios.get(`${this.url}/prices/cheap`, {
        newParams,
      });
      // const response = await axios.get(`${this.url2}/prices/cheap`, {
      //   newParams,
      // }, headers);
      // const response = await axios.get(`https://api.travelpayouts.com/v1/prices/cheap?origin=MOW&destination=HKT&depart_date=2016-11&return_date=2016-12&token=${this.token}`);
      
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log('PricesError');
      console.log(err);
      return Promise.reject(err);
    }
  }
}

const api = new Api(config);

export default api;
