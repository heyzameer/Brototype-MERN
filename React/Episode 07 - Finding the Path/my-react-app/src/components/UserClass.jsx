import React from 'react';

class UserClass extends React.Component {
  constructor(props) {
    super(props);

    // console.log(props);
    // older ways to create states when there was no hooks
    this.state = {
      count: 0,
      // count2: 2
      // userInfo: {
      //   name: 'Dummy',
      //   location: 'Default',
      // },
    };
    // console.log(this.props.name + 'Child Constructor');
    // Initial state
      this.state = {
        count: 0,
        userInfo: {
          name: "Loading...",
          location: "Fetching...",
          avatar_url: "",
        },
      };
  
      console.log(this.props.name + ' Child Constructor');
    }
  
    async componentDidMount() {
      console.log(this.props.name + ' Child Component Did Mount');
  
      // Fetch GitHub user info
      const data = await fetch('https://api.github.com/users/heyzameer');
      const json = await data.json();
  
      // Update state with fetched data
      this.setState({
        userInfo: json,
      });
  
      console.log(json);
    }
  
    render() {
      const { count, userInfo } = this.state;
      const { name, location, avatar_url } = userInfo;
  
      return (
        <div className="user-card">
          <img src={avatar_url} alt="Avatar" width="150" style={{ borderRadius: "10px" }} />
          <h1>Count: {count}</h1>
          <button
            onClick={() => {
              this.setState({
                count: count + 1,
              });
            }}
          >
            Increase Count
          </button>
          <h2>{name}</h2>
          <h3>Location: {location}</h3>
          <h4>Contact: @zameerK</h4>
        </div>
      );
    }
  }
  
  export default UserClass;
  

/* ****************************************************************
 *
 *
 * ----- Mounting CYCLE -----
 *   Constructor (dummy)
 *   Render (dummy)
 *       <HTML Dummy></HTML>
 *   Component Did Mount
 *       <API Call>
 *       <this.setState> - State variable is updated
 *
 * ----- UPDATE CYCLE -----
 *       render(API data)
 *       <HTML (new API data)>
 *   Component Did Update
 *   Component Will Unmount
 *
 *
 * Life Cycle Diagram Website Reference: https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/
 */
