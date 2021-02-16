# Stock Market Web App

This app allows the user to query an organzation and view its stock details. I developed this app with Angular Material as front-end and Node.js as Backend. The Angular app sends request to Node backend which inturn sends request to 3rd party APIs like Tiingo, NewsAPI and HighStocks API.

## Features of the App

### 1. Autocomplete 
As soon as user begins typing the stock symbol, a list of options with similar prefix appears as shown in the figure below. I used debounceTime function in Angular to set a interval of delay when the user types, after which I send HTTP Get Request to Tiingo API with what the user typed in the search box. The response contains a JSON array of organization names and their ticker values.

![Autocomplete](https://user-images.githubusercontent.com/40236708/108006338-0ee8d800-6fb0-11eb-8ad6-bcacb3c483ac.JPG)

### 2. Details View - Organization Summary
Once the user clicks on search button from above image, the stock details of that organization are displayed as shown in the image below. These details are updated every 15 seconds when the market is open. If the market is close then the last stock values are displayed. To achieve this, I send GET request to Tiingo API to fetch stock data and HighStock API to get chart data. To get periodic data in 15 second intervals, I used interval function and subscribed to the request.     

![Details Page - Summary](https://user-images.githubusercontent.com/40236708/108007532-1362c000-6fb3-11eb-86a2-6bde738622a8.JPG)


### 3. Details View - Organization News

As the user clicks the News Tab, he is shown the latest news of the organization as shown in the figure below. I send GET request to NewsAPI to get top 20 latest news. Further if the user clicks on any of the news, a dialogue pops up as shown below and the user can share the news on Twitter and Facebook. He can also view the entire news once he clicks "here"

![Details Page - News](https://user-images.githubusercontent.com/40236708/108009214-11026500-6fb7-11eb-9655-13d742a7351b.JPG)
![News Share](https://user-images.githubusercontent.com/40236708/108008738-ea8ffa00-6fb5-11eb-81fe-a3289b0389cf.JPG)








