## Caching data using temporal storage units

## Redis 
Redis is a key-value in-memory storage unit used as a database, cache and memory broker. It supports a variety of data structures such as strings, hashes, list, sets, sorted sets, geospatial indexes and many others. Essentially, redis loads the data in RAM, which is one of the many reasons that make Redis blazing fast. 

## LocalStorage
LocalStorage is a web storage unit attached to a browser window and its similar with sessionStorage. Data that is stored in localStoarge has no expiration date, is site specific -- only pages from the same origin can access the data -- and is not transmitted through HTTP/HTTPS request. Moreover, LocalStorage is known for its large capacity.

## Goal:
In this repository, using nodeJS, we investigate how caching may positively affect the performance of a web-application. 
