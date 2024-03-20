function locomotiveAnimation(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});




// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
locomotiveAnimation()

function navbarAnimation(){
    gsap.to("#nav-part-1 svg",{
        transform:"translateY(-100%)",
        scrollTrigger:{
            trigger:"#page1",
            scroller:"#main",
            start:"top 0",
            end:"top -5%",
            scrub:true,
        },
    })
    gsap.to("#nav-part-2 #links",{
        transform:"translateY(-100%)",
        opacity:0,
        scrollTrigger:{
            trigger:"#page1",
            scroller:"#main",
            start:"top 0",
            end:"top -5%",
            scrub:true,
        }
    });
    
}
navbarAnimation()

function videoconAnimation() {
    var  videocon = document.querySelector("#video-container")
var playbtn = document.querySelector("#play")
videocon.addEventListener("mouseenter", function(){
       gsap.to(playbtn,{
        scale:1,
        opacity:1


       })
    });
    videocon.addEventListener("mouseleave", function(){
        gsap.to(playbtn,{
         scale:0,
         opacity:0

        })
        });
        videocon.addEventListener("mousemove",function(dets){
            gsap.to(playbtn,{
                left:dets.x-70,
                top:dets.y-60
            })
        });
}

videoconAnimation();
 function loadingAnimation(){
    
 gsap.from("#page1 h1,h2",{
      y:100,    
      opacity:0,
      delay:0.6,
      duration:0.9,
      stagger:0.3,
 

 });
 


 gsap.from("#page1 #video-container",{
    scale:0.9,
    opacity:0,
    delay:1.3,
    duration:0.3,
    
 });
}


loadingAnimation();


function cursorAnimation(){
    document.addEventListener("mousemove", function(dets){
        gsap.to("#cursor",{
            left:dets.x,
            top:dets.y
        })
     });
    document.querySelectorAll(".child").forEach(function (elem) {
        elem.addEventListener("mouseenter", function (){
            gsap.to("#cursor" , {
                transform: `translate(-50%,-50%) scale(1)`,   
        });
    });
    elem.addEventListener("mouseleave", function (){
        gsap.to("#cursor" , {
            transform: `translate(-50%,-50%) scale(0)`, 
        });
    });
    });  

}
cursorAnimation();



function toggle(index) {
    const hiddenContainer = document.getElementById("hiddenContainer");
    const passages = hiddenContainer.querySelectorAll(".hidden-passage");
    const icons = document.querySelectorAll(".icon");
  
    // Ensure only one passage is visible at a time
    passages.forEach(passage => {
      passage.style.opacity = 0;
      passage.style.transform = "scale(0)";
    });
  
    const passageToShow = document.getElementById(`passage${index}`);
  
    // Reveal the selected passage with smooth animation
    passageToShow.style.opacity = 1;
    passageToShow.style.transform = "scale(1)";
  
    // Optional: Add a visual cue to the active icon
    icons.forEach(icon => {
      icon.classList.remove("active");
    });
    const activeIcon = document.querySelector(`.icon[data-index="${index}"]`);
    activeIcon.classList.add("active");
    
    
  }
 
 /* document.addEventListener("DOMContentLoaded", function () {
    // Debugging statement to confirm script execution
    console.log("Script loaded.");

  function toggle(index) {
    // Get the hidden passage corresponding to the clicked icon
    let hiddenPassage = document.getElementById('passage' + index);

    // Create a SplitText instance for the hidden passage
    let splitText = new SplitType(hiddenPassage, { types: 'lines,words,chars', linesClass: 'line' });

    // Toggle visibility of the hidden passage
    hiddenPassage.classList.toggle('active');

    // Add GSAP animation
    gsap.from(splitText.chars, { opacity: 0, y: 10, duration: 0.5, stagger: 0.02, ease: 'power2.out' });
    gsap.from(splitText.words, { opacity: 0, y: -80, duration: 0.5, stagger: 0.03, ease: 'power2.out' });
    gsap.from(splitText.lines, { opacity: 0, y: -100, duration: 0.5, stagger: 0.04, ease: 'power2.out' });
  }
 });*/

  document.addEventListener("DOMContentLoaded", function () {
    // Debugging statement to confirm script execution
    console.log("Script loaded.");

    // Your existing JavaScript code

    // Add event listeners to each icon
    for (let i = 1; i <= 8; i++) {
      var icon = document.querySelector('.icon[data-index="' + i + '"]');
      
      // Debugging statement to confirm icon selection
      console.log("Icon " + i + " selected:", icon);

      if (icon) {
        icon.addEventListener('click', function () {
          toggle(i);
        });
      } else {
        // Debugging statement for missing icon
        console.log("Icon " + i + " not found.");
      }
    }
  });
   
  
      
    


   
