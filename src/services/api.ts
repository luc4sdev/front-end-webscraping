/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import * as io from "socket.io-client";


interface Data {
  name: string,
  url: string,
  mainTag: string,
  timeTag: string,
  currecyTag: string,
  eventTag: string,
  actualTag: string,
  forecastTag: string,
  previousTag: string,
  time: string,
  currency: string,
  event: string,
  actual: string,
  forecast: string,
  previous: string,
}


const socket = io.connect("http://localhost:3001");

export const sendForexTag = (tag: string, url: string): Promise<Data> => {

  return new Promise<Data>((resolve) => {
    const parameters = {
      tag,
      url
    }
    socket.emit("send_forex_parameters", parameters);
    socket.on('forexData', (newValue: Data) => {
      const data = newValue
      resolve(data)
    });
});

};

export const sendFinancialTag = (tag: string): Promise<Data> => {

  return new Promise<Data>((resolve) => {
    socket.emit("send_financial_tag", tag);
    socket.on('financialData', (newValue: Data) => {
      const data = newValue
      resolve(data)
    });
});

};

export const sendInvestingTag = (tag: string, url: string): Promise<Data> => {

  return new Promise<Data>((resolve) => {
    const parameters = {
      tag,
      url
    }
    socket.emit("send_investing_parameters", parameters);
    socket.on('investingData', (newValue: Data) => {
      const data = newValue
      resolve(data)
    });
});

};

