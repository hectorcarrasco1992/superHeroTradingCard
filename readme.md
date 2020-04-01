## **The SuperHero App** 

  > Welcome to the Superhero Card App. Here you can make your own personal collection of hero or villains. 
---
  ### Technologies and Environment Variables used
   * the environment was created using npx generator.
   * the engine that was selected was EJS
   * the heroes are being pulled from a superhero api. You can follow their documentation here: https://superheroapi.com/
  ---
 Api Routes

 1. /api/users
 2. api/admin
   
    /api/users pertain to routes that involve that user's profile..these include:
   * /api/users/home - user's home page
   * /api/users/profile - user's profile page
   * /api/users/update-profile - update the user profile
  
    /api/admin/ pertains to routes that involve the content on the page. in this case the cards,heroes, and packs. These include: 
  * api/admin/add-pack - allows user to create a pack 
  * /api/admin/add-card - allows user to look up a card
  * /api/admin/delete-hero - allows user to delete a card.
---
### Future Improvements 

>At the moment the user can not trade with other users. This is a feature that will be added in the future.

> Will add a way to edit the cards in the packs and allow user to see packs already made and organize by publisher

