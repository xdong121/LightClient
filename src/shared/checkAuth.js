var temp = window.localStorage.getItem(appSettings.PROFILE_KEY);

if (!temp) {
    goToAuth();
} else {
    var profile = JSON.parse(temp);
    console.log(profile);
    if (!profile.userName) {
        goToAuth();
    } else {

    }
}

function goToAuth() {
    window.location.href = "/auth.html?profileKey=" + appSettings.PROFILE_KEY;
}