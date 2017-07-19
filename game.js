var on=false;
var count=0;
var timeouts = [];
var store=[];
var usr_str=[];

var strict_mode = false;


function reset()
{
    for (var i = 0; i < timeouts.length; i++) {
            clearTimeout(timeouts[i]);
        }

    count=0;
    document.getElementById("count").innerHTML=count;
    document.getElementById("red").removeEventListener("click",fn1);
    document.getElementById("green").removeEventListener("click",fn2);
    document.getElementById("yellow").removeEventListener("click",fn3);
    document.getElementById("blue").removeEventListener("click",fn4);

}


document.getElementById("count").innerHTML=count;
document.getElementById("OnBtn").addEventListener("change", function(){
            on=!on;
            if(on===false)
            {
                 reset();
                 document.getElementById("start").removeEventListener("click", fn);
                 document.getElementById("strict").removeEventListener("click", fs);
            }
            else
            {
                document.getElementById("red").addEventListener("click", fn1);
                document.getElementById("green").addEventListener("click", fn2 );
                document.getElementById("yellow").addEventListener("click", fn3);
                document.getElementById("blue").addEventListener("click", fn4);
                document.getElementById("start").addEventListener("click", fn);
                document.getElementById("strict").addEventListener("click", fs);
            }
    });






//-----------------mouse click by script-------------
    function click_red()
    {
        document.getElementById("red").click();
        document.getElementById('Sred').play();
        usr_str.pop();
    }
    
    function click_green()
    {
        document.getElementById("green").click();
        document.getElementById('Sgreen').play();
        usr_str.pop();
    }

    function click_yellow()
    {
        document.getElementById("yellow").click();
        document.getElementById('Syellow').play();
        usr_str.pop();
    }

    function click_blue()
    {
        document.getElementById("blue").click();
        document.getElementById('Sblue').play();
        usr_str.pop();
    }


    function fs()
    {
        strict_mode=!strict_mode;
    }

    function fn(){
            if(on===true)
                startGame();
    }

    function fn1(){
            usr_str.push(1);
            document.getElementById('Sred').play();
            document.getElementById("red").style.cssText = "background-color:red";
            timeouts.push(setTimeout(function(){
            document.getElementById("red").style.cssText = "background-color:coral";
            },400));
        }


    function fn2(){
            usr_str.push(2);
            document.getElementById('Sgreen').play();
            document.getElementById("green").style.cssText = "background-color:green";
            timeouts.push(setTimeout(function(){
            document.getElementById("green").style.cssText = "background-color:#6bcc77";
            },400));
        }


    function fn3(){
            usr_str.push(3);
            document.getElementById('Syellow').play();
            document.getElementById("yellow").style.cssText = "background-color:yellow";
            timeouts.push(setTimeout(function(){
            document.getElementById("yellow").style.cssText = "background-color:#ffd150";
            },400));
        }

    function fn4(){
             usr_str.push(4);
             document.getElementById('Sblue').play();
            document.getElementById("blue").style.cssText = "background-color:blue";
            timeouts.push(setTimeout(function(){
            document.getElementById("blue").style.cssText = "background-color:#5b50ff";
            },400));
        }
        



    function startGame()
    {
        reset();
        

        if(on===false)
            return;
       
       while(store.length > 0) {
              store.pop();
        }

        while(usr_str.length > 0) {
              usr_str.pop();
        }

        document.getElementById("count").innerHTML=count;

        document.getElementById("red").addEventListener("click", fn1);
        document.getElementById("green").addEventListener("click", fn2 );
        document.getElementById("yellow").addEventListener("click", fn3);
        document.getElementById("blue").addEventListener("click", fn4);



        //----------------------------------------------//
        function addMove()
        {
            if(on===false)
                return;


            if(store.length === 20)
                return ;
            console.log("In AddMove "+store.length);
            var selBtn = Math.floor(Math.random()*5);
            switch (selBtn) {
                case 1:
                    store.push(1);
                    break;
                case 2:
                    store.push(2);
                    break;
                case 3:
                    store.push(3);
                    break;
                case 4:
                    store.push(4);
                    break;
                default:
                    store.push(4);
                    break;
            }

            count=store.length;
            document.getElementById("count").innerHTML=count;
            click_sequence(store);
        }



        function comp(store,usr_str) {
            if(on===false)
                return;

            console.log(usr_str);

            if(JSON.stringify(store) === JSON.stringify(usr_str))
            {
                console.log("correct");
                console.log(usr_str);
                console.log(store);
                addMove();
            }
            else
            {
                document.getElementById('Swrong').play();
                document.getElementById("count").innerHTML="!!";
                if(strict_mode === true)
                {
                    startGame();
                }
                else
                {
                    click_sequence();
                }
            }
        }

        function click_sequence(){
            if(on===false)
                return;
            var time = 1000;
            for(var i=0;i<store.length;i++)
            {
                switch(store[i])
                {
                    case 1:
                        timeouts.push(setTimeout(click_red,time));
                        break;
                    case 2:
                        timeouts.push(setTimeout(click_green,time));
                        break;
                    case 3:
                        timeouts.push(setTimeout(click_yellow,time));
                        break;
                    case 4:
                        timeouts.push(setTimeout(click_blue,time));
                        break;
                    default:
                        break;
                }
                time+=1000;
            }
            
            time+=2000;
             while(usr_str.length > 0) {
                 usr_str.pop();
             }
             timeouts.push(setTimeout(comp,time+1000*store.length,store,usr_str));


        }
        
        //--------------------------------------------------------

        addMove();




    }
    
