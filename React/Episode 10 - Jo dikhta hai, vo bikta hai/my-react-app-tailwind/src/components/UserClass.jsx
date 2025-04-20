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
      const { name, avatar_url } = userInfo;
  
      return (
        <div className="max-w-sm mx-auto p-6 mt-6 rounded-xl shadow-lg bg-gray-100 text-center font-sans text-gray-800">
  <img
    src={avatar_url}
    alt="Avatar"
    className="w-36 mx-auto rounded-lg"
  />
  <h1 className="text-2xl font-bold text-blue-600 my-2">Count: {count}</h1>
  <button
    onClick={() =>
      this.setState({
        count: count + 1,
      })
    }
    className="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
  >
    Increase Count
  </button>
  <h2 className="text-xl font-semibold mt-4">{name}</h2>
  <h3 className="text-md text-gray-600">Location: Banglore</h3>
  <h4 className="text-sm text-gray-500">Contact: @zameerK</h4>
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
