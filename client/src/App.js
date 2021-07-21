import './App.css';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './Components/Header';
import Footer from "./Components/Footer";


//connect to server
const httpLink = createHttpLink({
  uri: '/graphql',
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className='flex-column justify-flex-start min-100-vh'>
          <Header />
          <div className='container'>
            <Route exact path='/' component={Home} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/login' component={Login} />
            <Route exact path = '/profile' component={Profile} />
            <Route exact path='/artforsale' component={ArtForSale} />
            <Route exact path='/contact' component={Contact} />
            <route exact path='/gallery' component={Gallery} />
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
    
  );
}

export default App;
