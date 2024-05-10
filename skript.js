const imagePaths = [
    "./img/img_1.jpg",
    "./img/img_2.jpg",
    "./img/img_3.jpg",
    "./img/img_4.jpg",
    "./img/img_5.jpg",
    "./img/img_6.jpg",
    "./img/img_7.jpg",
    "./img/img_8.jpg",
    "./img/img_9.jpg",
    "./img/img_10.jpg"
];

document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector(".items");
    let imageIndex = 0; 
    let animationTimeout = null;
    let currentlyAnimating = false;

    function addNewItem(x, y) {
        const newItem = document.createElement("div");
        newItem.className = "item";
        newItem.style.left = `${x - 75}px`;
        newItem.style.top = `${y - 100}px`;

        const img = document.createElement("img");
        img.src = imagePaths[imageIndex];
        newItem.appendChild(img);
        imageIndex = (imageIndex + 1) % imagePaths.length; 

        container.appendChild(newItem);
        manageItemLimit();
    }

    function manageItemLimit() {
        while (container.children.length > 20) {
          container.removeChild(container.firstChild);
        }
    }

    function startAnimation() {
        if (currentlyAnimating || container.children.length === 0) return;
        currentlyAnimating = true;
        gsap.to(".item", {
          y: 1000,
          scale: 0.5,
          opacity: 0,
          duration: 0.5,
          stagger: 0.025,
          onComplete: function () {
            this.targets().forEach((item) => {
              if (item.parentNode) {
                item.parentNode.removeChild(item);
              }
            });
            currentlyAnimating = false;
          },
        });
    }

    container.addEventListener("mousemove", function (event) {
        clearTimeout(animationTimeout);
        addNewItem(event.pageX, event.pageY);
        animationTimeout = setTimeout(startAnimation, 100);
    });
});