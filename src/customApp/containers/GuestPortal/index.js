import React, { Component } from 'react';
import { connect } from "react-redux";
import { TimePicker } from 'antd';
import Card from "../../../components/uielements/card"
import IntlMessages from "../../../components/utility/intlMessages";

// Style
import { Content, Center, GuestInfo } from './GuestPortal.style';

class GuestPortal extends Component{
  render() {
    // fetch('https://glacial-fortress-60211.herokuapp.com/https://bv-online-assessment.herokuapp.com/api/bookings')
    // .then(response => response.json())
    // .then(data => console.log(data))

    return (
      <Card>
        <Content>
          <Center>
            <h1><IntlMessages id = {'custApp.yourBookingCode'}></IntlMessages></h1>

            {/* Fail message to show :
                  1. Validation fail
                  2. Booking code not exist in endpoint
            */}
            <h3 id="fail-message">this-is-a-fail-message</h3>

            
            {/* Input Textbox for user to type in Booking Code */}
            <input id="cust-app-input"></input>

            {/* Button for user to click after finished typing Booking Code */}
            <button onClick={async () => {
              let inputString = document.getElementById("cust-app-input").value;
              let responseData;
              let failValidation = false;

              // validate input
              if (inputString != ""){
                for (let i = 0, len = inputString.length; i < len; i++) {
                  let code = inputString.charCodeAt(i);
                  if (!(code > 47 && code < 58) && // numeric (0-9)
                      !(code > 64 && code < 91) && // upper alpha (A-Z)
                      !(code > 96 && code < 123)) { // lower alpha (a-z)
                    document.getElementById("fail-message").style.opacity = 1;
                    document.getElementById("fail-message").innerHTML = "Should be combination of numbers & alphabets";
                    failValidation = true;
                    break;
                  }
                }
              }
              else{ // special occasion when input is empty
                document.getElementById("fail-message").style.opacity = 1;
                document.getElementById("fail-message").innerHTML = "Should be combination of numbers & alphabets";
                failValidation = true;
              }

              // continue to fetch if validation successed
              if (!failValidation){
                let responseValid = true;
                await fetch('https://glacial-fortress-60211.herokuapp.com/https://bv-online-assessment.herokuapp.com/api/bookings/' + inputString)
                .then(response => response.json())
                .then(data => responseData = data)
                .catch(error => {
                  // when booking code does not exist
                  console.log('Authorization failed : ' + error.message);
                  document.getElementById("fail-message").style.opacity = 1;
                  document.getElementById("fail-message").innerHTML = "Booking code not identified";
                  responseValid = false;
                });

                // if booking code exists, display details
                if (responseValid){
                  document.getElementById("fail-message").style.opacity = 0;
                  document.getElementById("guest-details-wrapper").style.opacity = 1;

                  document.getElementById("profile-picture").src = await responseData.profile_picture;
                  document.getElementById("guest-name").innerHTML = responseData.guest_name;
                  document.getElementById("property-name").innerHTML = responseData.property_name;
                  document.getElementById("check-in-date").innerHTML = responseData.check_in_date;
                  document.getElementById("check-out-date").innerHTML = responseData.check_out_date;

                  // display helper text when no arrival time has been set
                  if (responseData.arrival_time === ""){
                    document.getElementById("arrival-time").innerHTML = "--:-- (please set your arrival time)"
                    document.getElementById("time-picker").style.opacity = 1;
                  }
                  else{ // display the arrival time otherwise
                    document.getElementById("arrival-time").innerHTML = responseData.arrival_time;
                    document.getElementById("arrival-time-edit-message").style.opacity = 0;
                    document.getElementById("time-picker").style.opacity = 0;
                  }
                }
              }
              
            }}>Go</button>
          </Center>

          <br/><br/><br/>

          {/* Guest Details container */}
          <GuestInfo id="guest-details-wrapper">
            <img id="profile-picture" alt="profile"></img>
            <br/><br/>
            <p>Hi, <b id="guest-name"></b></p>
            <br/>
            <p>Thank you for booking with Bukit Vista. Here are the details of your current booking: </p>
            <br/>
            <p>Property name: <b id="property-name"></b></p>
            <br/>
            <div id="date-wrapper">
              <p id="date-content">Check in date: <b id="check-in-date"></b></p>
              <p id="date-content">Check out date: <b id="check-out-date"></b></p>
            </div>
            <div>Arrival time: <p id="arrival-time"></p></div>
          </GuestInfo>

          <br/><br/>

          {/* Time Picker */}
          <Center>
            <h3 id="arrival-time-edit-message">this-is-a-notification-message</h3>
            <TimePicker 
              placeholder = "Set Arrival Time"
              id = "time-picker"
              format = "HH:mm"
              addon = {() => (
                // Button to commit setting arrival time
                <button size="small" type="primary" 
                  onClick={ () => {
                    let timePicked = document.getElementById("time-picker").value.toString(); // get the time from time picker value
                    let bookingCode = document.getElementById("cust-app-input").value;  // get the booking code from input textbox value

                    // perform a PUT request with bookingCode as URL Parameter and arrival_time as body
                    var xhr = new XMLHttpRequest();
                    xhr.open("PUT", "https://glacial-fortress-60211.herokuapp.com/https://bv-online-assessment.herokuapp.com/api/bookings/" + bookingCode + "/update-eta" , true);
                    xhr.setRequestHeader("Content-Type", "application/json");
                    xhr.onload = function () {
                      // notify the user whether request successed or failed
                      if (xhr.status == 200){
                        document.getElementById("arrival-time-edit-message").style.opacity = 1;
                        document.getElementById("arrival-time-edit-message").style.color = "green";
                        document.getElementById("arrival-time-edit-message").innerHTML = "Arrival time successfully set";
                        document.getElementById("arrival-time").innerHTML = timePicked;
                      }
                      else{
                        document.getElementById("arrival-time-edit-message").style.opacity = 1;
                        document.getElementById("arrival-time-edit-message").style.color = "red";
                        document.getElementById("arrival-time-edit-message").innerHTML = "Failed to set arrival time";
                      }
                    };
                    xhr.send(JSON.stringify({
                        arrival_time: timePicked
                    }));
                  }}>
                  OK
                </button>
              )}
            />
          </Center>
        </Content>
      </Card>
    )
  }
}

export default connect(state => ({
  ...state.App,
  locale: state.LanguageSwitcher.language.locale,
  height: state.App.height
}))(GuestPortal);