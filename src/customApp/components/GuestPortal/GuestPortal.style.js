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

  #loader {
    border: 8px solid #f3f3f3;
    border-top: 8px solid #000000;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: spin 2s linear infinite;
    margin: 0 auto;
    opacity: 0;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
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