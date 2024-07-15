// import React from 'react';
import TodoContainer from '../components/todo/TodoContainer';
import Container from '../components/ui/Container';

const Todo = () => {
    return (
        <Container>
            <h1 className='text-3xl text-center font-semibold my-10'>My Todos</h1>
            <TodoContainer></TodoContainer>
        </Container>
    );
};

export default Todo;