import React, { Component } from "react";
//import logo from "./logo.svg";
import "./App.css";
import contactsJSON from "./contacts.json";

//ここはchild!
const ContactsList = props => {
  //const { pictureUrl, name, popularity } = props.data;
  //この下のreturnの内容が、Appのなかの<ContactsList contacts={this.state.contacts} />におさまるよ
  //最初はcontacts: contactsJSON.slice(0, 5)として、６人に絞っているよ
  return (
    <table>
      <thead>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Popularity</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {props.contacts.map((contact, i) => {
          return (
            <tr key={contact.id}>
              <td>
                <img height="150px" src={contact.pictureUrl} />
              </td>
              <td>{contact.name}</td>
              <td>{contact.popularity.toFixed(2)}</td>
              <td>
                <button
                  onClick={() => {
                    props.deleted(i);
                  }}
                >
                  Delete
                </button>
                {/* このdeleteボタンのファンクションはparentに、ボタンはchildにある。１ */}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

//ここのしたからが、画面に表示される部分 parent!!!!
class App extends Component {
  //stateはコンポーネントの中しか作れない
  state = {
    contacts: contactsJSON.slice(0, 5)
  };

  //Iteration 2 | Add New Random Contacts
  addRandom = () => {
    let found;

    while (!found && this.state.contacts.length < contactsJSON.length) {
      const random =
        contactsJSON[Math.floor(Math.random() * contactsJSON.length)];
      const alreadyExisting = this.state.contacts.find(contact => {
        return contact.id === random.id;
      });
      if (!alreadyExisting) {
        found = random;
      }
    }
    if (found) {
      this.setState({
        contacts: [found, ...this.state.contacts]
      });
    }
  };

  //Iteration 3 | Sort Contacts By Name And Popularity
  sortByName = () => {
    this.setState({
      //aとbのnameを比べる
      contacts: this.state.contacts.sort(function(a, b) {
        let nameA = a.name.toUpperCase(); //大文字小文字の違いをなくすため
        let nameB = b.name.toUpperCase(); //大文字小文字の違いをなくすため

        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      })
    });
  };
  //Another example!:D
  // sortByName = () => {
  //   const sorted = [...this.state.contacts].sort((a, b) => {
  //     return a.name.localeCompare(b.name);
  //   });

  //   this.setState({
  //     contacts: sorted
  //   });
  // };

  /* メモ
  contacts: this.state.contactsは、現在の表示されているオブジェクトのArray
  それをsortして、aとbをargumentとしてパスし、popularityを比べている
  */
  sortByPopularity = () => {
    this.setState({
      //aとbのpopularityを比べる
      contacts: this.state.contacts.sort(function(a, b) {
        return b.popularity - a.popularity;
        // let popularityA = a.popularity;
        // let popularityB = b.popularity;

        // if (popularityA > popularityB) {
        //   return -1;
        // }
        // if (popularityA < popularityB) {
        //   return 1;
        // }
        // return 0;
      })
    });
  };

  //Iteration 4 | Remove Contacts
  deleted = index => {
    const withoutContact = [...this.state.contacts];
    withoutContact.splice(index, 1);

    this.setState({
      contacts: withoutContact
    });

    //
  };

  //screen に renderされる部分↓
  render() {
    return (
      <div>
        <h1>Iron Contacts</h1>
        <button onClick={this.addRandom}>Add Random Contact</button>
        <button onClick={this.sortByName}>Sort by name</button>
        <button onClick={this.sortByPopularity}>Sort by popularity</button>
        <ContactsList deleted={this.deleted} contacts={this.state.contacts} />
      </div>
    );
  }
}

export default App;
