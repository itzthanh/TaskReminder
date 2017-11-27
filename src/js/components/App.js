import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addTodo, deleteTodo, clearTodos } from '../../actions';
import { Col, Row, Form, FormGroup, ControlLabel, FormControl, InputGroup, Glyphicon} from 'react-bootstrap';
import moment from 'moment';

import '../../css/app.css';

class App extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			todo: '',
			date: '',
			error: false
		};

		this.addToDo = this.addToDo.bind(this);
		this.deleteToDo = this.deleteToDo.bind(this);
	}

	onKeyPress(e, submit){
		if (e.key === 'Enter'){
			e.preventDefault();
			if (submit){
				this.addToDo();
			}
		} else if (e.keyCode === 13){
			e.preventDefault();
			if (submit){
				this.addToDo();
			}
		}
	}

	addToDo(){
		if (this.state.todo !== ''){
			this.setState({
				error: false
			});
			this.props.addTodo(this.state.todo, this.state.date);
		} else{
			this.setState({
				error: true
			});
		}
	}

	deleteToDo(id){
		this.props.deleteTodo(id);
	}

	sortTodoList(todoList){
		return todoList.sort(
			(firstTodo, secondTodo) => {
				return moment(new Date(firstTodo.date)) - moment(new Date(secondTodo.date));
			}
		);
	}

	renderTodos(){
		//const todos = this.props.todo;
		const todos = this.sortTodoList(this.props.todo);
		return (
			<Row className="task-list-container">
				<Col sm={6} smOffset={3}>
					<ul className="list-group task-list">
						{
							todos.map(todo => {
								return (
									<li key={todo.id} className="list-group-item task">
										<div>
											<div className="task-name">{todo.todo}</div>
											<div className="list-item delete-button remove-task-button" 
												onClick={()=>this.deleteToDo(todo.id)}>
												&#x2715;
											</div>
											{console.log(moment(new Date(todo.date)) > moment(new Date('January 21, 2018')))}
											<div className="task-date"><em>{moment(new Date(todo.date)).fromNow()}</em></div>
										</div>
									</li>
								)
							})
						}
					</ul>
				</Col>
			</Row>
		);
	}

	render(){
		return(
			<div className="container-fluid main-app-container">
				<div className="app-title">
					TaskReminder
				</div>
				<div className="main-app">
					<Form inline>
						<FormGroup>
							<Col md={4} style={{padding:0}} className="task-input">
								<ControlLabel className="labels">New Task:</ControlLabel>
								<FormControl
									className="task-input-form"
									type="text"
									placeholder="Enter a new task..."
									onChange={e=>this.setState({todo: e.target.value})}
									onKeyPress={e => this.onKeyPress(e, false)}
								/>
								</Col>
							<Col md={4} style={{padding:0}} className="task-deadline-input">
								<ControlLabel className="labels">Deadline:</ControlLabel>
								<FormControl
									className="task-deadline-input-form"
									type="datetime-local"
									onChange={e=>this.setState({date: e.target.value})}
									onKeyPress={e => this.onKeyPress(e, true)}
								/>
							</Col>
							<Col md={3} style={{padding:0}}>
								<div type="button" className="btn btn-success add-task-button" 
									onClick={this.addToDo}>
									Add New Task
								</div>		
							</Col>						
						</FormGroup>				
					</Form>
					{this.state.error === true ? <Row className="error-msg-row"><Col sm={5} smOffset={3} md={3} mdOffset={4}><h4 className="error-msg"><Glyphicon glyph="exclamation-sign"></Glyphicon> Empty Task or Deadline</h4></Col></Row> : ''}
					{this.renderTodos()}
					<button className="btn btn-danger remove-all-tasks-button" onClick={()=>this.props.clearTodos()}>
						Clear All Tasks
					</button>
				</div>
			</div>
		);
	}
};

// function mapDispatchToProps(dispatch){
// 	return bindActionCreators({addTodo}, dispatch);
// }


function mapStateToProps(state){
	return {
		todo: state
	};
}

export default connect(mapStateToProps, {addTodo, deleteTodo, clearTodos})(App);