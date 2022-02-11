const links = [
  {
    label: "Week1 notes",
    url: "week1/index.html"  
  },
  {
    label: "Week2 notes",
    url: "week2/index.html"
  }, 
  {
    label: "Week3 notes",
    url: "week3/index.html"
  },
  {
    label: "Week4 notes",
    url: "week4/index.html"
  },
  {
    label: "Week5 notes",
    url: "week5/index.html"
  },  
  {
    label: "Week 6 To Do",
    url: "week6/todo.html"
  }            
]

var olist = document.getElementById("list");

for (let i=0; i < links.length; i++){
  let a = document.createElement("a");
  let li = document.createElement("li");
  a.textContent = links[i].label;
  a.setAttribute('href', links[i].url);
  li.appendChild(a);
  olist.appendChild(li); 
}