/**
 * signup: data를 database에 넣는다
 */

export function signUp(data){
  if(data.isAdmin){
    playerRef = firebase.database().ref(`user/admin/${data.uid}`);
  }
  else {

  }
}


/**
 * login: auth가 달라지면 database를 그 auth를 추가한다.
 */
export function login() {
  firebase.auth().onAuthStateChanged((user) => {
    console.log(user);
    if (user) {
        //user가 admin인지 player인지 db로부터 정보를 가져와 함
      //You're logged in!
      playerId = user.uid;
      playerRef = firebase.database().ref(`user/${playerId}`);

      const name = createName();
      playerNameInput.value = name;

      const { x, y } = getRandomSafeSpot();

      playerRef.set({
        id: playerId,
        name,
        direction: "right",
        color: randomFromArray(playerColors),
        x,
        y,
        coins: 0,
      });

      //Remove me from Firebase when I diconnect
      playerRef.onDisconnect().remove();

      //Begin the game now that we are signed in
      initGame();
    } else {
      //You're logged out.
    }
  });

  firebase
    .auth()
    .signInAnonymously()
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      console.log(errorCode, errorMessage);
    });
};