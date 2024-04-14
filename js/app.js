// Loader 
window.onload = function() {
    setTimeout(function() {
        document.getElementById('loading').style.display = 'none';
    }, 3000);
  };
  
  
  var crsr = document.querySelector("#cursor");
  var blur = document.querySelector("#cursor-blur");
  
  document.addEventListener("mousemove", function (dets) {
    crsr.style.left = dets.x + "px";
    crsr.style.top = dets.y + "px";
    blur.style.left = dets.x - 250 + "px";
    blur.style.top = dets.y - 250 + "px";
  });
  
  var h4all = document.querySelectorAll("#nav h4");
  h4all.forEach(function (elem) {
    elem.addEventListener("mouseenter", function () {
      crsr.style.scale = 3;
      crsr.style.border = "1px solid #fff";
      crsr.style.backgroundColor = "transparent";
    });
    elem.addEventListener("mouseleave", function () {
      crsr.style.scale = 1;
      crsr.style.border = "0px solid #95C11E";
      crsr.style.backgroundColor = "#95C11E";
    });
  });
  
  gsap.to("#nav", {
    backgroundColor: "#000",
    duration: 0.5,
    height: "110px",
    scrollTrigger: {
      trigger: "#nav",
      scroller: "body",
      start: "top -10%",
      end: "top -11%",
      scrub: 1,
    },
  });
  
  gsap.to("#main", {
    backgroundColor: "#000",
    scrollTrigger: {
      trigger: "#main",
      scroller: "body",
      start: "top -25%",
      end: "top -70%",
      scrub: 2,
    },
  });
  
  gsap.from("#about-us img,#about-us-in", {
    y: 90,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: "#about-us",
      scroller: "body",
      start: "top 70%",
      end: "top 65%",
      scrub: 1,
    },
  });
  
  gsap.from(".card", {
    scale: 0.8,
  
    duration: 1,
    stagger: 0.1,
    scrollTrigger: {
      trigger: ".card",
      scroller: "body",
  
      start: "top 70%",
      end: "top 65%",
      scrub: 1,
    },
  });
  gsap.from("#colon1", {
    y: -70,
    x: -70,
    scrollTrigger: {
      trigger: "#colon1",
      scroller: "body",
      start: "top 55%",
      end: "top 45%",
      scrub: 4,
    },
  });
  gsap.from("#colon2", {
    y: 70,
    x: 70,
    scrollTrigger: {
      trigger: "#colon1",
      scroller: "body",
      start: "top 55%",
      end: "top 45%",
      scrub: 4,
    },
  });
  
  
  
  
  // news page6
  
  
  const apiKey = 'e86ba346e8734411816b2f2204af0b54';
  const searchField = document.querySelector(".search-inp");
  const searchBtn = document.querySelector(".search-Btn");
  
  
  
  async function fetchRandomNews() {
     try {
         const apiUrl = 
         "https://newsapi.org/v2/top-headlines?country=in&pageSize=12&category=business&apiKey=e86ba346e8734411816b2f2204af0b54";
         const response = await fetch(apiUrl);
         const data = await response.json();
         return data.articles;
  
     } catch(error) {
         console.error("Error Fetching Random News",error);
  
     }
  }
  
  searchBtn.addEventListener("click", async ()=> {
  
     const query = searchField.value.trim();
     if(query !==0) {
         try {
             const articles = await fetchNewsQuery(query);
             displayBlogs(articles);
         }
        
         
      catch(error) {
         console.error("Error fetching news by query", error);
  
     }
     }
  })
  
  async function fetchNewsQuery(query) {
     try {
         const apiUrl = 
         `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=e86ba346e8734411816b2f2204af0b54`;
         const response = await fetch(apiUrl);
         const data = await response.json();
         return data.articles;
  
     } catch(error) {
         console.error("Error Fetching Random News",error);
  
     }
  }
  
  
     function displayBlogs(articles) {
         const cardContainer = document.querySelector('.cards-container');
         cardContainer.innerHTML = "";
         articles.forEach((element) => {
             
         const newscard = document.createElement('div');
         newscard.classList.add('cards');
         
         const imageContainer = document.createElement('div');
         imageContainer.classList.add('image-container');
         
         const img = document.createElement('img');
         imageContainer.appendChild(img);
         img.src = element.urlToImage
         
         
         const textContainer = document.createElement('div');
         textContainer.classList.add('text');
         
         const headline = document.createElement('h2');
         const description = document.createElement('p');
     
         const truncatedTitle = element.title.length > 30 ? element.title.slice(0,30) + "..." : element.title;   
         headline.innerText = truncatedTitle;
         // const truncatedDescription = element.description.length > 50 ? element.description.slice(0,70) + "..." : element.description;   
         description.innerText = element.description;
         
         textContainer.appendChild(headline);
         textContainer.appendChild(description);
         
         newscard.appendChild(imageContainer);
         newscard.appendChild(textContainer);
         
         newscard.addEventListener("click", ()=> {
             window.open(element.url, "_blank");
         })
         cardContainer.appendChild(newscard);
     
  
         })
         
  
     }
  
  const getNews = async () => {
     try {
         console.log('yes')
         const articles = await fetchRandomNews();
         displayBlogs(articles);
     }
     catch(error) {
         console.error("Error Fetching Random News", error);
     }
  
  }
  
  getNews();
  
  