import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Exercise = props => ( 
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0,10)}</td>
        <td>
            <Link className="text-decoration-none" to={"/edit/"+props.exercise._id}>edit</Link> | <a className="text-decoration-none" href="#" onClick={() => { props.deleteExercise(props.exercise._id)}}>delete </a>
        </td>
    </tr>
)

export default class ExercisesList extends Component {
    constructor(props) {
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);
        
        this.state = {exercises: []};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/exercises/')
            .then(response => {
                this.setState({ exercises: response.data})
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteExercise(id) {
        axios.delete('http://localhost:5000/exercises/'+id)
            .then(res => console.log(res.data));

        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)
        })   
    }

    exerciseList() {
        return this.state.exercises.map(currentexercise => {
            return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
        })
    }

    render() {
        return (
            <div>
                <h3 className="text-center text-danger">Logged Exercises</h3>
                <table className="table">
                    <thead className="">
                        <tr>
                            <th className="table-warning">Username</th>
                            <th className="table-primary">Description</th>
                            <th className="table-danger">Duration</th>
                            <th className="table-success">Date</th>
                            <th className="table-info">Actions</th>
                        </tr>
                    </thead>
                        <tbody>
                            { this.exerciseList() }
                        </tbody>
                </table>
            </div>
        )
    }
}
