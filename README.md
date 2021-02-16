# Stock Market Web App

This app allows the user to query an organzation and view its stock details. I developed this app with Angular Material as front-end and Node.js as Backend. The Angular app sends request to Node backend which inturn sends request to 3rd party APIs like Tiingo, NewsAPI and HighStocks API.

## Features of the App

### 1. Autocomplete 
As soon as user begins typing the stock symbol, a list of options with similar prefix appears as shown in the figure below. I used debounceTime function in Angular to set a interval of delay when the user types, after which I send HTTP Get Request to Tiingo API with what the user typed in the search box. The response contains a JSON array of organization names and their ticker values.

![Autocomplete](https://user-images.githubusercontent.com/40236708/108006338-0ee8d800-6fb0-11eb-8ad6-bcacb3c483ac.JPG)








