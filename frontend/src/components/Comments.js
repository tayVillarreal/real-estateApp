import React from 'react'
import { connect } from 'react-redux'
import userActions from '../redux/actions/userActions'
import '../styles/comments.css'
class Comments extends React.Component{

    state={
        newComment:"",
        user:"",
        house: this.props.idHouse,
        comments:[]
    }
    
    

componentDidMount(){
    this.getComments()
}

getComments = async () =>{
    var comments = await this.props.getComments(this.state.house)
    this.setState({
        ...this.state,
        comments
    })
}

/* deleteComment = async (id) =>{
    await this.props.deleteComment(id)
    this.getComments()
} */

getNewComment = (e) =>{
    e.preventDefault()
    const value = e.target.value
    const name = e.target.name

    this.setState({
        ...this.state,
        [name]: value
    })

}

sendComment = async () =>{
    // eslint-disable-next-line
    var response = await this.props.commentItinerary(this.props.token, this.state.house, this.state.newComment)
    this.getComments()
    this.setState({
        ...this.state,
        newComment: ""
    })
}

    render(){

        return(
            <div className="commentsContainer">
                <div className="comments">
                    {this.state.comments.map(comment =>{
                        return(
                            <div className="commentContainer">
                                
                                <div className="nameDelete">
                                    <p className="userName">{comment.user} asked:</p>
                                    {/* {this.props.user === comment.user ? <button className="deleteButton" onClick={() =>this.deleteComment(comment._id)}>X</button> : null } */}
                                </div>

                                <p className="comment">{comment.comment}</p> 
                               
                            </div>
                        )
                    })}
                </div>
                <div className="inputContainer">
                    <input className="input" onChange={this.getNewComment} value={this.state.newComment} type="text" name="newComment" placeholder="Insert a comment"></input>
                    <button className="submitBtn" onClick={this.sendComment}>Submit</button>
                </div>
            </div>
        )
    }


}

const mapStateToProps  = (state) =>{
    return{
        token: state.userRed.token,
        user: state.userRed.name
    }
}

const mapDispatchToProps = {
    commentItinerary: userActions.commentItinerary,
    getComments: userActions.getComments,
    /* deleteComment: usersActions.deleteComment */
}


export default connect(mapStateToProps, mapDispatchToProps) (Comments)