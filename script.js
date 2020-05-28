let restaurents = [
    {
        id: 1,
        name: 'Lea Arabia',
        location: 'Kazhakuttom',
        ETA: '25min',
        rating: 4.1,
        tags: ['arabian', 'fast food', 'hygenic'],
        imageUrl: 'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/dzfrhyygasypi5zep2iy'
    },
    {
        id: 2,
        name: 'Malabar Restaurent',
        location: 'Ambalathinkara',
        ETA: '15min',
        rating: 4.6,
        tags: ['kerala food', 'fast food', 'arabian'],
        imageUrl: 'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/wmpckzner5mokk0xeijc'
    },
    {
        id: 3,
        name: 'Desi Cuppa',
        location: 'Kazhakuttom',
        ETA: '35min',
        rating: 3.8,
        tags: ['vegitarian', 'desserts', 'healthy'],
        imageUrl: 'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/ceqvw1dm3lhpnxgddtec'
    },
    {
        id: 4,
        name: 'Green Habito',
        location: 'Near Infosys',
        ETA: '45min',
        rating: 4.3,
        tags: ['Juices', 'desserts', 'healthy'],
        imageUrl: 'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/qrk7rtm7u4gg7sjvx30h'
    },

];

localStorage.restaurentsArray = JSON.stringify(restaurents);
localStorage.favouritesList = JSON.stringify([]);

const restaurentsView = document.getElementById("restaurents-view");
const filter = document.getElementById('filter');
const sortBy = document.getElementById('sort');

let listedRestaurents = [];

getCard = restaurent => {
    return `<div class= "card"> \
                <img class= "card-image" src= ${restaurent.imageUrl} alt= "" /> \
                <div class= "card-name">${restaurent.name}</div> \
                    <div class= "card-features"> \
                        <div class= "rating">Rating: ${restaurent.rating}</div> \
                        <div class= "card-eta">ETA: ${restaurent.ETA}</div> \
                    </div> \
                <div class= "location">${restaurent.location}</div>\
                <img class= "favourite" src= "assets/icons/favourites-filled.png" alt= "favourites" onclick= "updateFavourites(${restaurent.id})" /> \
            </div>`;
};

generateView = restaurents => {
    if(restaurents.length) {
        listedRestaurents = restaurents.map( restaurent => {
            return getCard(restaurent);
        });
    }
    else {
        listedRestaurents = '<div>No Restaurents found!</div>';
    }

    restaurentsView.innerHTML = listedRestaurents;
};

searchRestaurents = tag => {
    filterArray = restaurents.filter(restaurent => {
        return restaurent.name.toLowerCase().includes(tag.toLowerCase());
    });

    generateView(filterArray);
};

listTags = (restaurents) => {
    if(restaurents.length) {
        restaurents.forEach(restaurent => {
            restaurent.tags.forEach(tag => {
                let optionElement = document.createElement('option');
                optionElement.setAttribute('value', tag);
                let value = document.createTextNode(tag);
                optionElement.appendChild(value);
                filter.appendChild(optionElement);
            });
        });
    }
    else return null;

};

sortOption = () => {
    console.log(sortBy.value);
    let sortedArray = restaurents.sort(compare);
    console.log(sortedArray);
    generateView(sortedArray);
};

filterTag = () => {
    let filterValue = filter.value;
    if(restaurents.length) {
        let filterArray =  restaurents.filter(restaurent => {
            return restaurent.tags.find(tag => tag === filterValue);
        });
        generateView(filterArray);
    }
    else return null;
}

compare = (a, b) => {
    a = Number(a.rating);
    b = Number(b.rating);
    if(a > b) return 1;
    if(b > a) return -1;

    return 0;
 };

 listFavourites = () => {
    let favourites = localStorage.favouritesList && JSON.parse(localStorage.favouritesList);
    if(favourites) {
        let favouritesRestaurents = restaurents.filter(restaurent => {
            return favourites.find(item => item === restaurent.id);
        });
        generateView(favouritesRestaurents);
        console.log('scscscsc', favouritesRestaurents);
    }
    else {
        console.log('xvvvvvvdvvdvdv');
    }
 }

 updateFavourites = (id) => {
    console.log(id);
    let selectedRestaurent = restaurents.find(restaurent => restaurent.id === id);
    let favouritesList = localStorage.favouritesList || [];
    favouritesList = JSON.parse(favouritesList);
    if(favouritesList.length) {
        //check item already exist in thr list
        let itemIndex = favouritesList.findIndex(favourite => favourite === selectedRestaurent.id);
        console.log('itemIndex', itemIndex);
        if(itemIndex === -1) {
            favouritesList.push(selectedRestaurent.id);
            window.alert('added to Favourites list');
        }
        else {
            //remove from list
            favouritesList.splice(itemIndex, 1);
            window.alert('Removed to Favourites list');
        }
    }
    else {
        favouritesList.push(selectedRestaurent.id);
        window.alert('added to Favourites list');
    }
    localStorage.favouritesList = JSON.stringify(favouritesList);

 };

listTags(restaurents);
generateView(restaurents);