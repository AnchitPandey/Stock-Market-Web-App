# Stock Market Web App

This was a course project at USC that helped me gain exposure to Angular and Node.js. This app allows the user to query an organzation and view its stock details. I developed it with Angular Material as front-end and Node.js as Backend. The Angular app sends request to Node backend which inturn sends request to 3rd party APIs like Tiingo, NewsAPI and HighStocks API.

## Features of the App

### 1. Autocomplete 
As soon as user begins typing the stock symbol, a list of options with similar prefix appears as shown in the figure below. I used debounceTime function in Angular to set a interval of delay when the user types, after which I send HTTP Get Request to Tiingo API with what the user typed in the search box. The response contains a JSON array of organization names and their ticker values. When the user clicks the buy button, a dialogue appears which allows users add the selected quantity of the stock to their portfolio 

![Autocomplete](https://user-images.githubusercontent.com/40236708/108006338-0ee8d800-6fb0-11eb-8ad6-bcacb3c483ac.JPG)
![Purchase](https://user-images.githubusercontent.com/40236708/108013365-63944f00-6fc0-11eb-9bf7-694fc43020d7.JPG)

### 2. Details View - Organization Summary
Once the user clicks on search button from above image, the stock details of that organization are displayed as shown in the image below. These details are updated every 15 seconds when the market is open. If the market is close then the last stock values are displayed. To achieve this, I send GET request to Tiingo API to fetch stock data and HighStock API to get chart data. To get periodic data in 15 second intervals, I used interval function and subscribed to the request.     

![Details Page - Summary](https://user-images.githubusercontent.com/40236708/108007532-1362c000-6fb3-11eb-86a2-6bde738622a8.JPG)


### 3. Details View - Organization News

As the user clicks the News Tab, he is shown the latest news of the organization as shown in the figure below. I send GET request to NewsAPI to get top 20 latest news. Further if the user clicks on any of the news, a dialogue pops up as shown below and the user can share the news on Twitter and Facebook. He can also view the entire news once he clicks "here"

![Details Page - News](https://user-images.githubusercontent.com/40236708/108009214-11026500-6fb7-11eb-9655-13d742a7351b.JPG)
![News Share](https://user-images.githubusercontent.com/40236708/108008738-ea8ffa00-6fb5-11eb-81fe-a3289b0389cf.JPG)

### 4. Details View - Organization Yearly Stock Summary

Once the user clicks on the charts tab, I send GET Request to HighStock API and Tiingo API to get the stock details like Open Price, Low Price, High Price, Close Price and Volume past 4 years as shown in figure below. The user can filter this view by months (1,3,6), weeks and years

![Details Page - Charts](https://user-images.githubusercontent.com/40236708/108009558-d8af5680-6fb7-11eb-9c02-d1f9cf26370b.JPG)

### 5. Watchlist View
If the user clicks on Watchlist in the navbar or simply types the url, he is shown a list of companies sorted in ascending order by their stock symbol and the corresponding latest stock data. In the details page as shown below, when the user clicks on the star icon, an alert is shown for 5 seconds notifying that the stock has been added to the watchlist. To achive this, I add the companies in the localStorage and make GET requests to the Tiingo API to display the latest data once the user clicks on watchlist component. As shown in figures below, I have also added validation to display whenever there are no stocks present in the watchlist.  

![Watchlist - Full](https://user-images.githubusercontent.com/40236708/108014085-f97ca980-6fc1-11eb-94f3-caa3c4cd6c0a.JPG)
![Watchlist- Empty](https://user-images.githubusercontent.com/40236708/108014924-e4087f00-6fc3-11eb-8608-ecddd4d485c7.JPG)
![notification](https://user-images.githubusercontent.com/40236708/108015654-8d03a980-6fc5-11eb-81e5-fc521a32072c.JPG)

### 6. Portfolio View
If the user clicks on the portfolio button in the navbar, he can view the sorted list of companies stock details and the quantity of stocks he purchased. Again for this, as user clicks buy button in the details page, I store the company and the quantity of stock purchased in the localStorage. While displaying, I read the list from localStorage. I also use validation to display appropriate message if the portfolio is empty. In this view, the user can buy or sell stocks in portfolio. When the user clicks on buy button, he sees an alert as shown in the figure below. The same alert appears when the user clicks on sell button.

![Portfolio Page](https://user-images.githubusercontent.com/40236708/108019223-9e04e880-6fce-11eb-89a0-a115eb048ec0.JPG)
![buy portfolio](https://user-images.githubusercontent.com/40236708/108019239-a5c48d00-6fce-11eb-9cd6-2dd121d87388.JPG)

