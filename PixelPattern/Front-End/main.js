import './style.css'

const socket = io();

socket.on('connect', () => {
    console.log("Client connected");
});

const map = (value, start1, stop1, start2, stop2) => {return (value - start1) / (stop1 - start1) * (stop2 - start2) + start2}

let click = 0;

const mouse = {

    setData: function(event){

        this.mouse = {
            x : event.clientX,
            y :  event.clientY,
        }  
    
        socket.emit('message', {
            x : map(this.mouse.x, 0, window.innerWidth, 0, 100),
            y : map(this.mouse.y, 0, window.innerHeight, 0, 100),
            click : click
        });        

    },

    setClick: function(event){

        click += 1;

        if(click > 4){
            click = 0;
        }

        socket.emit('message', {
            x : map(this.mouse.x, 0, window.innerWidth, 0, 100),
            y : map(this.mouse.y, 0, window.innerHeight, 0, 100),
            click : click
        });        

    },


    init: function(){
        document.addEventListener("mousemove", this.setData);
        document.addEventListener("click", this.setClick);
    }
}

mouse.init();