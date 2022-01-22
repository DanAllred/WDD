function toc() {
  const links = [{
    label: "Week01 Notes",
    url: "week1/index.html",
    label: "Week02 notes",
    url: "week2/index.html",
    label: "Week02 Team",
    url: "week2/team.html",
    label: "Week02 notes",
    url: "week2/index.html"
  }]
  document.getElementById("toc").innerHTML = links;
}