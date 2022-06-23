let club = {
    fetchClub: function (name) {
      fetch(
        "https://api-football-v1.p.rapidapi.com/v3/teams?search=" +
          name,{
            headers: {
              'X-RapidAPI-Key': 'd83c80ab6amshdbe8d65981c4f0cp10aa80jsn9f32b7e5bc5f',
              'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
            },
          }
      )
        .then((response) => {
          if(response.errors){
            alert(response.errors);
            throw new Error(response.errors);
          }
          return response.json();
        })
        .then((data) => this.displayClub(data));
    },
    displayClub: function (data) {
      console.log(data);
      if(data.response.length == 0){
        alert("Klub Tidak Ditemukan");
        return;
      }
      const name = isEmpty(data.response[0].team.name);
      const country = isEmpty(data.response[0].team.country);
      const logo = isEmpty(data.response[0].team.logo);
      const stadion = isEmpty(data.response[0].venue.name);
      const address = isEmpty(data.response[0].venue.address);
      document.querySelector(".name").innerText = "Nama : " + name;
      document.querySelector(".country").innerText = "Negara : " + country;
      document.querySelector(".stadion").innerText = "Stadiun : " + stadion;
      document.querySelector(".address").innerText = "Alamat : " + address;
      document.querySelector(".logo").src = logo;
    },
    search: function () {
      this.fetchClub(document.querySelector(".search-bar").value);
    },
  };

  function isEmpty(value){
    if(value == null || value.length === 0){
      return '-';
    }else{
      return value;
    }
  }

  document.querySelector(".search button").addEventListener("click", function () {
    club.search();
  });
  
  document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        club.search();
      }
    });

  club.fetchClub("Jakarta");