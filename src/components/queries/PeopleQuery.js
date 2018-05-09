import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

//Define a query tag literal using the gql default export using graphql-tag module.
export const GET_PEOPLE = gql`
    query getPeople {
        people {
            id 
            name
            height
            films {
                title
            }
            homeWorld {
                name
            }
        }
    }
`
//Pass the defined query as a query argument in the Query component.

const PeopleQuery = (props) => {
    return (
        <Query query={GET_PEOPLE}>
            {
                //by default graphql takes loading, errror, data) arguments in the callback within Query component.
                ({loading, error, data}) => {
                    if(loading) {
                        return (
                            <div>
                                <img className='le-image'          
                                    src="https://media.giphy.com/media/GIEXgLDfghUSQ/giphy.gif" 
                                    alt="Loading"
                                />
                            </div>
                        )
                    } else if(error) {
                        return (
                            <div>
                                <img className='le-image'
                                    src="http://www.fico.com/en/blogs/wp-content/uploads/2017/03/Lack-of-Data.gif"
                                    alt="error"
                                />
                            </div>
                        )
                    } 
                    return props.render(data);
                }
            }
        </Query>
    );
};

export default PeopleQuery;