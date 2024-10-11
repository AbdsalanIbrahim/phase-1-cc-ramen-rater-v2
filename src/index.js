document.addEventListener("DOMContentLoaded", main);

function main() {
    displayRamens();
    addSubmitListener();
}

function displayRamens() {
    fetch("http://localhost:3000/ramens")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(ramens => {
            const ramenMenu = document.getElementById("ramen-menu");
            ramenMenu.innerHTML = ""; 
            
            ramens.forEach(ramen => {
                const ramenItem = document.createElement("div");
                ramenItem.className = "ramen-item";
                ramenItem.innerHTML = `<img src="${ramen.image}" alt="${ramen.name}" />`;
                ramenItem.addEventListener("click", () => handleClick(ramen));
                ramenMenu.appendChild(ramenItem);
            });
        })
        .catch(error => console.error("Error fetching ramens:", error));
}

function handleClick(ramen) {
    const ramenTitle = document.getElementById("ramen-title");
    const ramenImage = document.getElementById("ramen-image");
    const ramenRating = document.getElementById("ramen-rating");
    const ramenComment = document.getElementById("ramen-comment");
    
    ramenTitle.textContent = ramen.name;
    ramenImage.src = ramen.image;
    ramenRating.textContent = ramen.rating;
    ramenComment.textContent = ramen.comment;
}

function addSubmitListener() {
    const newRamenForm = document.getElementById("new-ramen");
    
    newRamenForm.addEventListener("submit", (event) => {
        event.preventDefault(); 

        const newRamenName = document.getElementById("new-name").value;
        const newRamenRestaurant = document.getElementById("new-restaurant").value;
        const newRamenImage = document.getElementById("new-image").value;
        const newRamenRating = document.getElementById("new-rating").value;
        const newRamenComment = document.getElementById("new-comment").value;

        const newRamen = {
            name: newRamenName,
            restaurant: newRamenRestaurant,
            image: newRamenImage,
            rating: newRamenRating,
            comment: newRamenComment
        };

        console.log("New ramen added:", newRamen);

        newRamenForm.reset();

        displayNewRamen(newRamen);

    });
}

function displayNewRamen(ramen) {
    const ramenMenu = document.getElementById("ramen-menu");
    
    const ramenItem = document.createElement("div");
    ramenItem.className = "ramen-item";
    ramenItem.innerHTML = `<img src="${ramen.image}" alt="${ramen.name}" />`;
    ramenItem.addEventListener("click", () => handleClick(ramen));
    ramenMenu.appendChild(ramenItem);
}

// Optional function to send new ramen to the server (uncomment if needed)
// function postNewRamen(ramen) {
//     fetch("http://localhost:3000/ramens", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(ramen)
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return response.json();
//     })
//     .then(data => console.log("Successfully added new ramen:", data))
//     .catch(error => console.error("Error adding new ramen:", error));
// }
