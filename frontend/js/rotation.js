const feed = () => {
    window.location.href = "/feed.html"
};

const toAddPicture = () => {
    window.location.href = '/uploadPic.html';
};

const toDiscoveryFeed = () => {
    window.location.href = '/discovery.html';
};

const toProfile = () => {
    window.location.href = './index.html';
};

const checkifLoggedIn = () => {
    const token = localStorage.getItem('x-auth');

    if (!token) {
        alert('Redirecting to login');
        window.location.href = "/login.html";
    }
};

checkifLoggedIn();