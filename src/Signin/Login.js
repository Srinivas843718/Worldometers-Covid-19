import React, { Component } from "react"
import "./Login.css"
import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import Footer from "../Footer/Footer"

firebase.initializeApp({
  apiKey: "AIzaSyBx9VPbWquuLHND4Mj8tIQR6ZI_T_6G0RM",
  authDomain: "myfirstreact-app.firebaseapp.com"
})

class App extends Component {
  state = { isSignedIn: false }
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
      
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
      console.log("user", user)
    })
  }

  render() {
    return (<>
      <div className="App bg-white"><br />
        {this.state.isSignedIn ? (
          <span>
            <div className="text-primary"><h4>Hey! You have Signed In &#128525;</h4></div>
           
            <h1 style={{color:"green"}}><i>Welcome {firebase.auth().currentUser.displayName}</i></h1>
            <img
              alt="profile picture"  
              src={firebase.auth().currentUser.photoURL} 
            /><br /><br />
              <button className="btn btn-danger" onClick={() => firebase.auth().signOut()}>Sign out!</button>

          </span>
        ) : (
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        )}
      </div><br />
      <div className="bg-info" >
      <img className="img-fluid" src="https://img.freepik.com/free-vector/thank-you-frontliners-concept-various-occupations-people-wearing-face-masks_218660-60.jpg?size=626&ext=jpg" style={{paddingLeft:"320px"}} />
      </div>
      <Footer />
</>

    )
  }
}

export default App