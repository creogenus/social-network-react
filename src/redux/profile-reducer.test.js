import profileReducer, {addPostActionCreator, deletePostActionCreator} from "./profile-reducer";
import {render, screen} from "@testing-library/react";
import App from "../App";

let state = {
    posts: [
        {id: 1, message: 'My Last post!', likes_count: 22},
        {id: 2, message: 'My First post!', likes_count: 10}
    ],
    profile: null,
    status: "ALOXA"
};

test('new post should be added', () => {
    //1. data
    //2. action
    let action = addPostActionCreator('creogenus new post state!');
    let newState = profileReducer(state,action)
    //3. expectation
    expect(newState.posts.length).toBe(3);
});

test('delete post by id, expects decrementing by 1',() =>{
    //2. action
    let action = deletePostActionCreator(1);
    let newState = profileReducer(state,action)
    //3. expectation
    expect(newState.posts.length).toBe(1);
})

