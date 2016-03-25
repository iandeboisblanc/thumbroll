import React from 'react'
import ClassData from './ClassData/ClassData'
import {Route, RouteHandler, Link} from 'react-router'
import api from '../../../utils/api';

class Classes extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {

      classes : ['1','2','3'],

      newClassName : '',
      currentClass: '',
      currentStudent: ''
    };
  }

  render(){
    return (
      <div>
        <h2>Classes</h2>
        {this.state.classes.map((specificClass) => {
          return (<li style={{cursor: 'default'}} key={specificClass}>
            <Link to={`class/${specificClass}/lessons`}>{specificClass}</Link>
            </li>)
         })
        }

        <div>
          <form onSubmit={this.addClass.bind(this)}>
            <input className='newClassForm' type='text' value={this.state.newClassName} onChange={(event) => {
              this.setState({
                newClassName: event.target.value
              });
            }} />
            <div>
              <button type='submit'>Add new class</button>
            </div>
          </form>
        </div>
        <h2>Today's Lessons</h2>
        <p>There are no lessons today.</p>
      <div>
        {this.props.children}
      </div>
    </div>
    );
  }

  addClass(e){
    e.preventDefault();
    // update state with new list item
    if(!!this.state.newClassName.trim()){
      var classesCopy = this.state.classes.slice();
      classesCopy.push(this.state.newClassName);

      this.setState({
        classes: classesCopy,
        newClassName: ''
      });
    }

    // post to DB with teacher associated
  }

  componentWillMount(){
    this.setState({
      classes: [1,2,3] //api.getClassData()
    });
  }

}

module.exports = Classes;