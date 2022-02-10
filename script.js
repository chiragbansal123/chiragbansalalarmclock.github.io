var setAlarm = document.getElementById('setAlarm');//this is set alarm button
var time = document.getElementById('show-time');  //this is time container
function showtime(){
  // this is used to show current time
  var currentTime = setInterval(function () {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let session = "AM";
  
    //because of date function gives 24 hour time
    if (hours == 0) {
      hours = 12;
    }
  
    if (hours > 12) {
      hours = hours - 12;
      session = "PM";
    }
    
  
    // for prepending zero to hours,sec & min
    hours   = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
  
    let currentTime = hours + ":" + minutes + ":" + seconds + " " + session;
  
    time.innerHTML = currentTime;
  
  }, 1000);
  }
var arr = [];    // this array stores all alarms 
let defaultAlarms = document.querySelectorAll('#default-alarm span');  // this is default alarm div
// this contains music
const music = new Audio('alarm.mp3');
//below function helps to go to selected tools i.e Stopwatch,Alarm,Clock
function goToSelectedTools(value){
	if(value=='alarm')
	{
    document.getElementById("alarm").scrollIntoView({behavior:'smooth'});
	}
	else if(value=='stopwatch'){
		document.getElementById("stopwatch").scrollIntoView({behavior: 'smooth'});
	}
	else if(value=='clock'){
		document.getElementById("clock").scrollIntoView({behavior: 'smooth'});
	}
  else{
    document.getElementById("countdown").scrollIntoView({behavior: 'smooth'});

  }
	
}



function setHrs() {  //this is used to append options in the select bar in hours
  var select = document.getElementById('hr');
  total_hrs = 12;
  for (i = 1; i <= total_hrs; i++) {
    select.options[select.options.length] = new Option(i < 10 ? "0" + i : i, i);
  }
}
setHrs();
function setMins() { //this is used to append options in the select bar in secs
  var select = document.getElementById('minn');

  total_mins = 59;
  for (i = 0; i <= total_mins; i++) {
    select.options[select.options.length] = new Option(i < 10 ? "0" + i : i, i);

  }
}
setMins();

function setSecs() {  //this is used to append options in the select bar in secs
  var select = document.getElementById('secc');
  total_secs = 59;
  for (i = 0; i <= total_secs; i++) {
    select.options[select.options.length] = new Option(i < 10 ? "0" + i : i, i);

  }

}
setSecs();
setAlarm.addEventListener('click', function () {  // this will invoke when we click on setalarmsbtn   
  var gethrs = document.getElementById('hr').options[hr.selectedIndex].value;   //selecting option that we choose
  if (gethrs < 10) {       //if hrs is less than 10,we append 0 in front of it
    gethrs = "0" + gethrs;
  }
  var getmins = document.getElementById('minn').options[minn.selectedIndex].value;   //selecting option that we choose
  if (getmins < 10) {      
    getmins = "0" + getmins;
  }
  var getsecs = document.getElementById('secc').options[secc.selectedIndex].value;   //selecting option that we choose
  if (getsecs < 10) {
    getsecs = "0" + getsecs;
  }
  var getmeridian = document.getElementById('meridian').options[meridian.selectedIndex].value;  //selecting option that we choose
  alarm_time = gethrs + ":" + getmins + ":" + getsecs + " " + getmeridian;
  createAlarm(alarm_time);
});
function createAlarm(alarm_time){
  window.alert("Your alarm has been set for "+alarm_time);
  if (!arr.includes(alarm_time)) {                           // this we have to prevent the duplicate alarms
    var div = document.createElement('div');           
    div.setAttribute("id","setalarmcard");
    var span = document.createElement('span');
    span.setAttribute("id", "alarmtime");
    span.innerHTML = alarm_time;                                // put alarm time in span
    var deleteBtn = document.createElement('button');        //create btn to delete alarm
    const textButton = document.createTextNode("Delete");   // put text inside delete btn
    deleteBtn.setAttribute("id", "delete-alarm");           // set attribute for delete btn
    deleteBtn.appendChild(textButton);                  
    div.appendChild(span);                                  // put alarmtime container in div
    div.append(deleteBtn);                                  // put deletebtn inside div
    var listalarms = document.getElementById('list-alarms');  //getting element in which we have to show the set alarms
    
    listalarms.appendChild(div);                            // put the div inside listalarms
    arr.push(alarm_time);
    deleteBtn.onclick = function () {
      var time=span.innerHTML;
      removeAlarm(deleteBtn,time);                          // this function has time,deletebtn used to delete alarm
    }
  }
}

function removeAlarm(button1,time) { 
  var parent = button1.parentNode;                         // got parent of deletebtn
  var index=arr.indexOf(time);                             // found index of time to be deleted from the arr
  var grand_father = parent.parentNode;                    // found parent of div i.e listalarms
  grand_father.removeChild(parent);                        // deleted that div
  arr.splice(index,1);                                     // used splice to delete the time from arr
  window.alert('Your alarm '+alarm_time+" has been deleted");
}


setInterval(function(){                                // this function is checking if there is an alarm at the current time
   let current_Time = time.innerHTML;
    for(let i of arr){
      if(i==current_Time){
        music.play();                                  // it will play the music
        document.getElementById("bell").style.display = "block";    
      }
    }
  },1000);
  function stopAlarm(){
    if (music.duration > 0 && !music.paused) {
      document.getElementById("bell").style.display = "none";
      alert("Your alarm will stop now!!!")
      music.pause();
    } else {
      alert("There is no alarm currently ringing!!!");
    }
    document.getElementById("bell").style.display = "none"; 

  }

  //Stopwatch Section
  var thousands=00;            
  var tens=00;
  var ones=00;
  var h2=document.getElementById('timer');
  var min=document.getElementById('minutes');
  var sec=document.getElementById('seconds');
  var milliseconds=document.getElementById('milliseconds');

  var startbutton=document.getElementById('start');
  var stopbutton=document.getElementById('stop');
  var resetbutton=document.getElementById('reset');
  var interval;
  startbutton.onclick=function(){
    clearInterval(interval);
    interval=setInterval(startTimer,10);
    }
    stopbutton.onclick = function() {
      clearInterval(interval);
 }
 resetbutton.onclick=function(){
   clearInterval(interval);
   thousands="00";
   tens="00";
   ones="00";
   min.innerHTML=thousands;
   sec.innerHTML=":"+tens;
   milliseconds.innerHTML=":"+ones;
 }


  function startTimer(){
    ones++;
    if(ones<=9){
      milliseconds.innerHTML=":0"+ones;
    }
    if(ones>9){
      milliseconds.innerHTML=":"+ones;
    }
    if(tens<=9){
      sec.innerHTML=":0"+tens;
    }
    if(ones>99){
      tens++;
      sec.innerHTML=":"+tens;
      ones=0;
      milliseconds.innerHTML=":0"+ones;
    }
    if(thousands<=9){
      min.innerHTML="0"+thousands;
    }
    if(thousands>9){
      min.innerHTML=thousands;
    }
    if(tens>59){
      tens=0;
      ones=0;
      thousands++;
      sec.innerHTML=":"+tens;
      // min.innerHTML="0"+thousands
    }
  }
  
  //clock
  var hourhand=document.getElementById('hourhand');
  var minutehand=document.getElementById('minutehand');
  var secondhand=document.getElementById('secondhand')

  setInterval(function(){
    d = new Date();
    htime = d.getHours();
    mtime = d.getMinutes();
    stime = d.getSeconds();
    hrotation = 30*htime + mtime/2;            
    mrotation = 6*mtime;
    srotation = 6*stime;

    hourhand.style.transform = 'rotate('+hrotation+'deg)';
    minutehand.style.transform = 'rotate('+mrotation+'deg)';
    secondhand.style.transform = 'rotate('+srotation+'deg)';
  },1000);
  
  //countdown section
  var countdown_min_select=document.getElementById('min-selector');
  var countdown_sec_select=document.getElementById('sec-selector');
  var submitBtn_countdown=document.getElementById('setcountdownbtn');
  function setvaluemin(){
    for (i = 0; i <= 59; i++) {
      countdown_min_select.options[countdown_min_select.options.length] = new Option(i < 10 ? "0" + i: i, i);
    }

  }
  setvaluemin();
  function setvaluesec(){
    for(i=0;i<=59;i++){
      countdown_sec_select.options[countdown_sec_select.options.length] = new Option(i < 10 ? "0" + i : i, i);
    }
  }
  setvaluesec();
  var intervalcountdown;
  var mindisplay=document.getElementById('mindisplay');
  var secdisplay=document.getElementById('secdisplay');
  var stopcountdown=document.createElement('button');
  var textofcountdownbtn=document.createTextNode('Stop Countdown'); 
  stopcountdown.appendChild(textofcountdownbtn);
  var parentofminspan=mindisplay.parentElement;
  parentofminspan.appendChild(stopcountdown);
  stopcountdown.style.display="none";
  submitBtn_countdown.addEventListener('click',function(){
    var getcountdownmin=parseInt(countdown_min_select.options[countdown_min_select.selectedIndex].value); //converted selected  min from countdown-selecter to integer
    var getcountdownsec=parseInt(countdown_sec_select.options[countdown_sec_select.selectedIndex].value); // converted selected seconds to integer 
    mindisplay.innerHTML=getcountdownmin+':';
    secdisplay.innerHTML=getcountdownsec;
    stopcountdown.style.display="inline"
    
    intervalcountdown=setInterval(function(){
    getcountdownsec--;
    if(getcountdownsec>10){
      secdisplay.innerHTML=getcountdownsec;
    }
    else if(getcountdownsec==0 && getcountdownmin==0){
      secdisplay.innerHTML=getcountdownsec;
      music.play();
      document.getElementById("bell").style.display = "block";
      document.getElementById("bell").style.zIndex="3";
      clearInterval(intervalcountdown); 
    }
    else if(getcountdownsec<0){
      getcountdownmin--;
      getcountdownsec=59;
      secdisplay.innerHTML=getcountdownsec;
      mindisplay.innerHTML=getcountdownmin+':';
    }
    else if(getcountdownsec<10){
      secdisplay.innerHTML="0"+getcountdownsec;
    }
    
    }  ,1000);
  });
  stopcountdown.addEventListener('click',function(){
    clearInterval(intervalcountdown);
    mindisplay.innerHTML="";
    secdisplay.innerHTML="";
    stopcountdown.style.display="none";
  });
     
