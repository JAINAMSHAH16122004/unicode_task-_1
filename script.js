const container = document.querySelector(".container");

window.addEventListener("load", async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await res.json();
    console.log(data);
    data.forEach((user) => {
        createuser(user);
    });
});

const Idh = document.createElement("td");
Idh.innerHTML = "id";
Idh.className = "d";
container.appendChild(Idh);

const nameh = document.createElement("td");
nameh.innerHTML = "name";
nameh.className = "d";
container.appendChild(nameh);

const unameh = document.createElement("td");
unameh.className = "d";
unameh.innerHTML = "username";
container.appendChild(unameh);

const emailh = document.createElement("td");
emailh.innerHTML = "Email";
emailh.className = "d";
container.appendChild(emailh);

const adh = document.createElement("td");
adh.innerHTML = "Address";
adh.className = "d";
container.appendChild(adh);

const phn = document.createElement("td");
phn.innerHTML = "Phone No.";
phn.className = "d";
container.appendChild(phn);

const opt = document.createElement("td");
opt.innerHTML = "Option";
opt.className = "d";
container.appendChild(opt);

function createuser(user) {
    const { id, name, username, email, address, phone } = user;
    const userDiv = document.createElement("tr");
    userDiv.className = "user";

    const Id = document.createElement("td");
    Id.className = "main";
    Id.innerHTML = id;

    const nameDiv = document.createElement("td");
    nameDiv.className = "main";
    nameDiv.innerHTML = name;

    const usernameDiv = document.createElement("td");
    usernameDiv.className = "main";
    usernameDiv.innerHTML = username;

    const emailDiv = document.createElement("td");
    emailDiv.className = "main";
    emailDiv.innerHTML = email;

    const adDiv = document.createElement("td");
    adDiv.className = "main";
    adDiv.innerHTML = address.street;

    const pDiv = document.createElement("td");
    pDiv.innerHTML = phone;

    const button = document.createElement("td");
    button.className = "c";

    const btn1 = document.createElement("button");
    btn1.innerText = "TODOs";

    btn1.addEventListener("click", () => {
        alert(`View TODOs for user: ${user.name}`);

    });

    const btn2 = document.createElement("button");
    btn2.innerText = "Albums";

    btn2.addEventListener("click", async () => {
        try {
            const albums = await fetchAlbums(user.id);
            const photos = await fetchPhotos(user.id);
            displayAlbumsAndPhotos(albums, photos);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    });

    button.appendChild(btn1);
    button.appendChild(btn2);

    userDiv.appendChild(Id);
    userDiv.appendChild(nameDiv);
    userDiv.appendChild(usernameDiv);
    userDiv.appendChild(emailDiv);
    userDiv.appendChild(adDiv);
    userDiv.appendChild(pDiv);
    userDiv.appendChild(button);

    container.appendChild(userDiv);
}






async function fetchAlbums(userId) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`);
    return res.json();
}

async function fetchPhotos(albumId) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
    return res.json();
}


//function albums and photos ko dikhane ke liya Problem- har ek user ka photo nahi araha aur albums arha he 

function displayAlbumsAndPhotos(albums, photos) {
    const albumGrid = document.createElement("div");
    albumGrid.className = "album-grid";

    albums.forEach((album) => {
        const albumCard = document.createElement("div");
        albumCard.className = "album-card";

        const title = document.createElement("h3");
        title.innerText = album.title;

        const albumPhotos = photos.filter((photo) => photo.albumId === album.id);

        albumPhotos.forEach((photo) => {
            const img = document.createElement("img");
            img.src = photo.thumbnailUrl;
            img.alt = photo.title;
            albumCard.appendChild(img);
        });

        albumCard.appendChild(title);
        albumGrid.appendChild(albumCard);
    });

    ////album grid
    container.innerHTML = "";
    container.appendChild(albumGrid);
}




//pending-Search bar,add,edit,view and delete todo and checkbox for all completed task
