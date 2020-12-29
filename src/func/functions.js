//

    import Unsplash from 'unsplash-js';


//

// Create new Unsplash object
export function getUnsplash(code) {
    return (
        new Unsplash({
            accessKey: "R7CjTiW7HCRbzAFdjt-Hm7p5T4Y8bGe2ltCU5xUwdAU",
            secret: "1emEqAbl6jTGEI54UtjVJ0Mfsv7la1T1IJxAM3i5VYY",
            // callbackUrl: "http://localhost:3000/",
            callbackUrl: "http://cu87032.tmweb.ru/",
            bearerToken: code,
        })
    );
}

// Return string with name
export function getName(first_name, last_name) {
    let name = '';
    if (first_name) {
        name += first_name;
    }

    if (last_name) {
        name += last_name;
    }

    return name;
}

// For authorisation
export function redirect() {
    const unsplash = getUnsplash();

    const authenticationUrl = unsplash.auth.getAuthenticationUrl([
        "public",
        "write_likes"
    ]);

    window.location.assign(authenticationUrl);
}

// Return correct form time
export function getDate(date) {
    let time = new Date(date);

    return time = `
        ${time.getFullYear()}.${time.getMonth() + 1}.${time.getDate()}
        ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}
    `;
}

// Checked URL
export function checkURL() {
    const urlForCheck = window.location.pathname;
    if (urlForCheck === '/' || urlForCheck === '') {
        return true;
    }
    return false;
}
