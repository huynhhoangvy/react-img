import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import ModalImage from "react-modal-image";
import useDataApi from './js/useDataApi';

import {
  Card,
  CardBody,
  CardTitle,
  Container,
  Button,
} from 'reactstrap';

function App() {

  const [query, setQuery] = useState('');

  const [
    {
      data,
      setData,
      isLoading,
      setIsLoading,
      page,
      setPage
    },
    doFetch
  ] = useDataApi(
    [],
    `https://api.unsplash.com/search/photos?per_page=20&query=nature&client_id=355581c98687f518288324ca4a6822a48c0be05c9e72d390a82ad7d5b57df61f&orientation=landscape`
  )

  const fetchMoreListItems = () => {
    setTimeout(() => {
      const fetchData = async () => {
        try {
          if (query === '') {
            setPage(page + 1);
            const result = await axios(`https://api.unsplash.com/search/photos?per_page=20&query=nature&client_id=355581c98687f518288324ca4a6822a48c0be05c9e72d390a82ad7d5b57df61f&orientation=landscape&page=${page + 1}`)
            setData(prevState => ([...prevState, ...result.data.results]));
          } else {
            setPage(page + 1);
            const result = await axios(`https://api.unsplash.com/search/photos?per_page=20&query=${query}&client_id=355581c98687f518288324ca4a6822a48c0be05c9e72d390a82ad7d5b57df61f&orientation=landscape&page=${page + 1}`)
            setData(prevState => ([...prevState, ...result.data.results]));
          }
        } catch (error) {
          console.error(error);
        }
        setIsLoading(false);
      };
      fetchData();
    }, 500)

  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <a className="navbar-brand" href="#">Imgr</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
          </ul>
          <form
            onSubmit={e => {
              e.preventDefault();
              doFetch(`https://api.unsplash.com/search/photos?per_page=20&query=${query}&client_id=355581c98687f518288324ca4a6822a48c0be05c9e72d390a82ad7d5b57df61f&orientation=landscape`)
            }}
            className="form-inline my-2 my-lg-0"
          >
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={e => setQuery(e.target.value)}
            />
            <button className="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
      </nav>
      <Container className="d-flex flex-wrap justify-content-center App">
        {isLoading ? <h3>Loading...</h3> :
          data.map((data, i) => {
            return (
              <Card key={data.id} className="m-1 bg-light" >
                <ModalImage
                  smallSrcSet={data.urls.small}
                  large={data.urls.full}
                />
                <CardBody>
                  <CardTitle>
                    {
                      data.description ? (data.description.length > 50 ? data.description.match(/.{1,47}/g)[0] + '...' : data.description) : 'No Description'
                    }
                  </CardTitle>
                  <div className="d-flex justify-content-between">
                    <div>
                      <a href={data.user.links.html} rel="noopener noreferrer" target="_blank" >
                        <img className="user-avatar" src={data.user.profile_image.small} alt="user avatar" />
                        {data.user.name}</a>
                    </div>
                    <div>
                      <a href={data.links.download} rel="noopener noreferrer" target="_blank" ><i className="fas fa-download" /></a> <i className="fa fa-heart" />
                      <small className="text-muted"> {data.likes}</small>
                    </div>
                  </div>
                </CardBody>
              </Card>
            )
          })}
      </Container>
      <Container className="d-flex justify-content-center">
        <Button
          color="success"
          onClick={() => fetchMoreListItems()}
        >
          View More
      </Button>
      </Container>
    </>
  );
}

export default App;
