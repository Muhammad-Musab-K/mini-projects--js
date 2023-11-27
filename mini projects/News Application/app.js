
let search = document.getElementById("search")
let detail = document.getElementById("detail")

//api is not working idont know why!!!!
//All code is correct
function getData() {
    fetch(`https://newsapi.org/v2/everything?q=${search.value}&from=2023-10-27&sortBy=publishedAt&apiKey=e400114b318f4787a9052fbe3461562c`)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            const box = document.getElementById('box');
           
            box.innerHTML = ''

            res.articles.forEach(article => {
                if (article.urlToImage) {
                   
                    box.innerHTML += `<a href="${article.url}" target="_blank">
            <div class="card" id="detail">
                    <div>
                   <img class="image" src="${article.urlToImage}" alt="">
                  </div>
                 <div class="information">
                      <h3 class="title">${article.title}</h3>
                      <p class="author">Author is ${article.author}</p>
                     <p class="description">${article.description}</p>
                 </div>
            </div>
            </a>
          `
                };
            });
        })
        .catch(err => console.log(err))

    search.value = ''

}

