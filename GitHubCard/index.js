/* Step 1: using axios, send a GET request to the following URL
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

/* Step 2: Inspect and study the data coming back, this is YOUR
   github info! You will need to understand the structure of this
   data in order to use it to build your component function

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function,
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either
          follow this link in your browser https://api.github.com/users/<Your github name>/followers
          , manually find some other users' github handles, or use the list found
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.

          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [];

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

/* List of LS Instructors Github username's:
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/

function CardComponent(data) {
  let card = document.createElement("div");
  let cardImg = document.createElement("img");
  let cardInfo = document.createElement("div");
  let cardUserName = document.createElement("h3");
  let cardUserProfileName = document.createElement("p");
  let cardUserLocation = document.createElement("p");
  let cardProfile = document.createElement("p");
  let cardProfileLink = document.createElement("a");
  let cardfollowers = document.createElement("p");
  let cardfollowing = document.createElement("p");
  let cardBio = document.createElement("p");

  // add class to main card div
  card.classList.add("card");

  // set card image src
  cardImg.src = data.avatar_url;

  // add class for card-info div
  cardInfo.classList.add("card-info");

  // add class for name and add data
  cardUserName.classList.add("name");
  cardUserName.textContent = data.name;

  // add profile name data
  cardUserProfileName.classList.add("username");
  cardUserProfileName.textContent = data.login;

  // add Location
  cardUserLocation.textContent = `Location: ${data.location}` || "null";

  // add profile link
  cardProfileLink.href = data.html_url;
  cardProfileLink.textContent = data.html_url;

  // add followers count
  cardfollowers.textContent = `Followers: ${data.followers}`;

  //add following count
  cardfollowing.textContent = `Following: ${data.following}`;

  //add bio information
  cardBio.textContent = `Bio: ${data.bio}`;

  // add cardProfile child
  cardProfile.textContent = "Profile:";
  cardProfile.appendChild(cardProfileLink);

  // add card-info childs
  cardInfo.appendChild(cardUserName);
  cardInfo.appendChild(cardUserProfileName);
  cardInfo.appendChild(cardUserLocation);
  cardInfo.appendChild(cardProfile);
  cardInfo.appendChild(cardfollowers);
  cardInfo.appendChild(cardfollowing);
  cardInfo.appendChild(cardBio);

  // add main card childs
  card.appendChild(cardImg);
  card.appendChild(cardInfo);

  return card;
}

// stretch goal
function getFollowers(followers_url) {
  return axios
    .get(followers_url)
    .then(res => {
      return res.data.map(follower => {
        return follower.url;
      });
    })
    .then(followers => {
      return followers.map(followerlink => {
        return axios.get(followerlink);
      });
    })
    .catch(err => {
      throw new Error(err);
    });
}

let cardsContainer = document.querySelector(".cards");

axios
  .get("https://api.github.com/users/rjsmith25")
  .then(res => {
    cardsContainer.appendChild(CardComponent(res.data));
    return getFollowers(res.data.followers_url);
  })
  .then(followers => {
    return Promise.all(followers);
  })
  .then(followersData => {
    followersData.forEach(follower => {
      cardsContainer.appendChild(CardComponent(follower.data));
    });
  })
  .catch(err => {
    console.log(err);
  });
