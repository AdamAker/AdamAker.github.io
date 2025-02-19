document.querySelectorAll("#projectList li").forEach(item => {
    item.addEventListener("mouseover", (event) => {
        let previewBox = document.getElementById("previewBox");
        let previewImage = document.getElementById("previewImage");

        let previewSrc = event.target.getAttribute("data-preview");
        if (previewSrc) {
            previewImage.src = previewSrc;
            previewBox.style.display = "block";
        }
    });

    item.addEventListener("mouseout", () => {
        document.getElementById("previewBox").style.display = "none";
    });
});
