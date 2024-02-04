import React,{Component} from 'react'
import { BrowserRouter,Switch,Route } from 'react-router-dom';
import Home from './components/Home';
import addProducts from './components/addProducts';
import ProductsContextProvider from './global/ProductsContext';
import Signup from './components/Signup';
import Login from './components/Login';
import { auth,db } from './components/config/Config';
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore';



export class App extends Component{

    state={
      user: null
    }
    componentDidMount() {
      // getting user info for navigation bar
      auth.onAuthStateChanged(user => {
          if (user) {
              const userRef = doc(getFirestore(), 'SignedUpUsersData', user.uid);
              getDoc(userRef).then(snapshot => {
                  if (snapshot.exists()) {
                      this.setState({
                          user: snapshot.data().Name
                      });
                  } else {
                      // Handle the case where the document does not exist
                      this.setState({
                          user: null
                      });
                  }
              });
          } else {
              this.setState({
                  user: null
              });
          }
      });
    }
    

  render(){
  return (
    <ProductsContextProvider>
    <BrowserRouter>
      <Switch>
      <Route exact path='/' component={() => <Home user={this.state.user} />} />
        <Route path = '/addProducts' component={addProducts}/>
        <Route path = '/signup' component={Signup}/>
        <Route path = '/login' component={Login}/>
      </Switch>
    </BrowserRouter>
  </ProductsContextProvider>
  )
}
}

export default App;

