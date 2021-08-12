import styled from 'styled-components';

export const Content = styled.div`
  padding: 20px;
  margin: 50px auto 0;
`;

export const Center = styled.div`
  width: fit-content;
  margin: 0 auto;

  h1 {
    font-size: 1.5rem;
    margin-bottom : 20px;
  }

  #fail-message {
    font-size: 0.8rem;
    margin-bottom : 10px;
    color: red;
    opacity: 0;
  }

  #arrival-time-edit-message {
    font-size: 0.8rem;
    margin-bottom : 10px;
    opacity: 0;
  }

  #arrival-time-button {
    opacity: 0;
  }

  #time-picker {
    opacity: 0;
  }
`;

export const GuestInfo = styled.div`
  margin-left : 20px;
  font-size: 1.2rem;
  max-width: 600px;
  opacity: 0;

  img {
    width : 150px;
    height : 100px;
  }

  p {
    display : inline
  }

  #date-wrapper{
    display : flex; 
  }

  #date-content{
    flex: 50%;
  }
`;