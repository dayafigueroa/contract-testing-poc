# contract-testing-poc

 1. Build: `tsc`

 ## provider
 1. On terminal 1 run server: `yarn start:server`
 2. Confirm server is running successfully by opening your browser and navigating to: `http://localhost:3000/products` 

 ## consumer pact
 1. run `yarn execute:test`
 
 ## pact broker
 1. install docker:
 ```
  $ sudo hdiutil attach Docker.dmg
  $ sudo /Volumes/Docker/Docker.app/Contents/MacOS/install
  $ sudo hdiutil detach /Volumes/Docker
```
 2. pull pact broker image:
 `docker pull pactfoundation/pact-broker`
 3. create a db 
 4. 

 

