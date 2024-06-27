document.addEventListener("DOMContentLoaded", () => {
    const apiBaseUrl = 'https://crudcrud.com/api/YOUR_UNIQUE_ENDPOINT/bookmarks';

    // Function to add a new bookmark
    async function addLink(event) {
        event.preventDefault(); // Prevent the form from submitting and refreshing the page

        const titleInput = document.getElementById('title');
        const linkInput = document.getElementById('link');
        const title = titleInput.value.trim();
        const link = linkInput.value.trim();

        if (title === "" || link === "") {
            alert("Both fields are required!");
            return;
        }

        try {
            const bookmark = {
                title: title,
                link: link
            };

            await axios.post(apiBaseUrl, bookmark);
            titleInput.value = "";
            linkInput.value = "";
            displayBookmarks();
        } catch (error) {
            console.error("Error adding bookmark:", error);
        }
    }

    // Function to display all bookmarks
    async function displayBookmarks() {
        const linkList = document.getElementById('linkList');
        linkList.innerHTML = '';

        try {
            const response = await axios.get(apiBaseUrl);
            const bookmarks = response.data;

            bookmarks.forEach((bookmark) => {
                const bookmarkDiv = document.createElement('div');
                bookmarkDiv.classList.add('bookmark');

                const bookmarkTitle = document.createElement('span');
                bookmarkTitle.textContent = bookmark.title;

                const bookmarkLink = document.createElement('a');
                bookmarkLink.textContent = bookmark.link;
                bookmarkLink.href = bookmark.link;
                bookmarkLink.target = '_blank';

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.onclick = () => {
                    deleteBookmark(bookmark._id);
                };

                bookmarkDiv.appendChild(bookmarkTitle);
                bookmarkDiv.appendChild(bookmarkLink);
                bookmarkDiv.appendChild(deleteButton);

                linkList.appendChild(bookmarkDiv);
            });
        } catch (error) {
            console.error("Error displaying bookmarks:", error);
        }
    }
});
